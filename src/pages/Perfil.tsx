import { useState, useRef, useEffect } from 'react';
import { Camera, Share2, Trash2, X, Bell, Heart, Image as ImageIcon, Settings, ChevronRight, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { photoStorage } from '../lib/storage';
import { useFavorites } from '../hooks/useFavorites';
import { useTheme } from '../context/ThemeContext';
import { localEvents } from '../data/events';
import { localPlaces } from '../data/places';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';
import { Share as CapShare } from '@capacitor/share';

interface Photo {
  id: string;
  url: string;
  date: string;
}

const Perfil = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'recuerdos' | 'favoritos' | 'ajustes' | 'oficial'>('recuerdos');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { favorites } = useFavorites();
  
  // Obtener los datos completos de los favoritos
  const favoriteItems = [
    ...localEvents.map(e => ({ ...e, type: 'evento' })),
    ...localPlaces.map(p => ({ ...p, title: p.name, type: 'lugar' }))
  ].filter(item => favorites.includes(item.id));

  // Estado de notificaciones (simulado)
  const [notifications, setNotifications] = useState({
    mascletas: true,
    actosOficiales: true,
    cremas: false,
    avisosGastro: true
  });

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const savedPhotos = await photoStorage.getAll();
        const legacyPhotos = localStorage.getItem('fallers_photos');
        if (legacyPhotos) {
          try {
            const parsedLegacy = JSON.parse(legacyPhotos) as Photo[];
            for (const p of parsedLegacy) {
              await photoStorage.save(p);
            }
            localStorage.removeItem('fallers_photos');
            const allPhotos = await photoStorage.getAll();
            setPhotos(allPhotos.sort((a, b) => Number(b.id) - Number(a.id)));
          } catch (e) {
            console.error('Error migrando fotos antiguas', e);
          }
        } else {
          setPhotos(savedPhotos.sort((a, b) => Number(b.id) - Number(a.id)));
        }
      } catch (e) {
        console.error('Error al cargar fotos', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadPhotos();
  }, []);

  const saveNewPhoto = async (newPhoto: Photo) => {
    try {
      await photoStorage.save(newPhoto);
      setPhotos(prev => [newPhoto, ...prev]);
    } catch (e) {
      alert('Hubo un problema guardando tu foto. Revisa el espacio de almacenamiento.');
    }
  };

  const handleCaptureClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = img.width;
        let height = img.height;
        const MAX_DIM = 1200;
        
        if (width > height && width > MAX_DIM) {
          height *= MAX_DIM / width;
          width = MAX_DIM;
        } else if (height > MAX_DIM) {
          width *= MAX_DIM / height;
          height = MAX_DIM;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const bannerHeight = Math.max(80, height * 0.12);
        const gradient = ctx.createLinearGradient(0, height - bannerHeight, 0, height);
        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(1, 'rgba(0,0,0,0.85)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, height - bannerHeight, width, bannerHeight);

        const fontSize = Math.max(24, Math.floor(width * 0.045));
        ctx.fillStyle = '#FFFFFF';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        const padding = width * 0.04;
        ctx.textAlign = 'right';
        ctx.font = `900 ${fontSize}px sans-serif`;
        ctx.fillText('🔥 Fallers pel Món', width - padding, height - (bannerHeight / 2));
        
        ctx.textAlign = 'left';
        ctx.font = `600 ${fontSize * 0.75}px sans-serif`;
        ctx.fillText(`Fallas ${new Date().getFullYear()}`, padding, height - (bannerHeight / 2));

        const finalImageBase64 = canvas.toDataURL('image/jpeg', 0.85);

        const newPhoto: Photo = {
          id: Date.now().toString(),
          url: finalImageBase64,
          date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
        };
        
        saveNewPhoto(newPhoto);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Seguro que quieres eliminar esta foto?')) {
      try {
        await photoStorage.delete(id);
        setPhotos(photos.filter(p => p.id !== id));
        setSelectedPhoto(null);
      } catch (e) {
        alert('No se pudo eliminar.');
      }
    }
  };

  const handleShare = async (photo: Photo) => {
    try {
      await CapShare.share({
        title: 'Mi recuerdo fallero',
        text: '¡Mira este recuerdo de Fallers pel Món en Logroño!',
        url: photo.url,
        dialogTitle: 'Compartir Recuerdo',
      });
    } catch (err) {
      console.error('Error al compartir:', err);
      // Fallback web
      if (navigator.share) {
        try {
          const response = await fetch(photo.url);
          const blob = await response.blob();
          const file = new File([blob], `falla-${photo.id}.jpg`, { type: 'image/jpeg' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({ title: 'Mi recuerdo fallero', files: [file] });
          } else {
            await navigator.share({ title: 'Mi recuerdo fallero', url: photo.url });
          }
        } catch (e) {
          console.error('Fallback web falló', e);
        }
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-60">
      {/* Header Premium */}
      <div className="bg-[#BF360C] text-white pt-20 pb-20 px-8 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="relative z-10 flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight">Mi Perfil</h1>
            <div className="flex items-center gap-3">
               <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                 Falle@ 2026
               </div>
               <div className="flex items-center gap-1.5 text-white/60 text-[10px] font-black uppercase tracking-widest">
                  <Heart className="w-3 h-3 fill-current" />
                  {favorites.length} favoritos
               </div>
            </div>
          </div>
          <button 
            onClick={handleCaptureClick}
            className="w-16 h-16 bg-white text-[#BF360C] rounded-3xl flex items-center justify-center shadow-2xl shadow-black/20 active:scale-90 transition-all hover:rotate-6"
          >
            <Camera size={32} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <input 
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {/* Navegación por Pestañas */}
      <div className="px-6 -mt-6 relative z-20">
        <div className="card-premium p-2 flex items-center justify-between">
            <button 
              onClick={() => setActiveTab('recuerdos')}
              className={clsx(
                "flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px]",
                activeTab === 'recuerdos' ? "bg-[#BF360C] text-white shadow-lg" : "text-slate-400"
              )}
            >
              <ImageIcon className="w-5 h-5" />
              <span>Recuerdos</span>
            </button>
            <button 
              onClick={() => setActiveTab('favoritos')}
              className={clsx(
                "flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px]",
                activeTab === 'favoritos' ? "bg-[#BF360C] text-white shadow-lg" : "text-slate-400"
              )}
            >
              <Heart className="w-5 h-5" />
              <span>Favoritos</span>
            </button>
            <button 
              onClick={() => setActiveTab('oficial')}
              className={clsx(
                "flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px]",
                activeTab === 'oficial' ? "bg-[#BF360C] text-white shadow-lg" : "text-slate-400"
              )}
            >
              <ImageIcon className="w-5 h-5" />
              <span>Oficial</span>
            </button>
            <button 
              onClick={() => setActiveTab('ajustes')}
              className={clsx(
                "flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px]",
                activeTab === 'ajustes' ? "bg-[#BF360C] text-white shadow-lg" : "text-slate-400"
              )}
            >
              <Settings className="w-5 h-5" />
              <span>Ajustes</span>
            </button>
        </div>
      </div>

      {/* Contenido Dinámico */}
      <div className="p-6 flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'recuerdos' && (
            <motion.div 
              key="recuerdos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {isLoading ? (
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="aspect-square bg-slate-100 rounded-3xl animate-pulse" />
                  ))}
                </div>
              ) : photos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                  <ImageIcon size={64} className="text-slate-300 mb-4" />
                  <p className="text-xl font-black uppercase tracking-tight">Cero recuerdos aún</p>
                  <p className="font-bold text-xs uppercase tracking-widest mt-2 max-w-[200px]">¡Inmortaliza las Fallas con el botón de cámara!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {photos.map(photo => (
                    <motion.div 
                      key={photo.id}
                      layoutId={`photo-${photo.id}`}
                      className="aspect-square bg-slate-200 rounded-[32px] overflow-hidden shadow-md relative group cursor-pointer"
                      onClick={() => setSelectedPhoto(photo)}
                    >
                      <img src={photo.url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Recuerdo" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <span className="text-white text-[10px] font-black uppercase tracking-wider">{photo.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'favoritos' && (
            <motion.div 
              key="favoritos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {favoriteItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                  <Heart size={64} className="text-slate-300 mb-4" />
                  <p className="text-xl font-black uppercase tracking-tight">Sin favoritos</p>
                  <p className="font-bold text-xs uppercase tracking-widest mt-2 max-w-[200px]">Explora el programa y guarda lo que más te guste.</p>
                </div>
              ) : (
                favoriteItems.map(item => (
                  <div 
                    key={item.id}
                    onClick={() => navigate(item.type === 'evento' ? `/actos/${item.id}` : `/lugares/${item.id}`)}
                    className="flex items-center gap-4 card-premium p-4 active:scale-95 transition-all cursor-pointer group"
                  >
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-inner shrink-0 bg-slate-100">
                      <img src={'image_url' in item ? item.image_url : 'image' in item ? item.image : ''} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#BF360C]/60">{'category' in item ? item.category : 'Gastronomía'}</p>
                      <h4 className="font-bold truncate">{item.title}</h4>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </div>
                ))
              )}
            </motion.div>
          )}

          {activeTab === 'oficial' && (
            <motion.div 
              key="oficial"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                {localEvents.map(event => (
                  <motion.div 
                    key={event.id}
                    layoutId={`oficial-${event.id}`}
                    className="aspect-square bg-slate-200 rounded-[32px] overflow-hidden shadow-lg relative group cursor-pointer border-4 border-white dark:border-white/10"
                    onClick={() => setSelectedPhoto({
                      id: event.id,
                      url: event.image_url || '',
                      date: event.title
                    })}
                  >
                    <img src={event.image_url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={event.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
                      <p className="text-white text-[9px] font-black uppercase tracking-widest leading-tight line-clamp-2">{event.title}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'ajustes' && (
            <motion.div 
              key="ajustes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Ajustes de Visualización */}
              <div className="card-premium overflow-hidden">
                <div className="p-6 border-b border-white/5">
                  <h3 className="font-black uppercase tracking-widest text-xs flex items-center gap-2">
                    {theme === 'dark' ? <Moon className="w-4 h-4 text-[#BF360C]" /> : <Sun className="w-4 h-4 text-[#BF360C]" />} 
                    Visualización
                  </h3>
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-bold text-sm">Modo Oscuro</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Cambia el aspecto de la app</p>
                  </div>
                  <button 
                    onClick={toggleTheme}
                    className={clsx(
                      "w-12 h-6 rounded-full transition-all relative",
                      theme === 'dark' ? "bg-[#BF360C]" : "bg-slate-200"
                    )}
                  >
                    <div className={clsx(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                      theme === 'dark' ? "left-7" : "left-1"
                    )} />
                  </button>
                </div>
              </div>

              {/* Ajustes de Notificaciones */}
              <div className="card-premium overflow-hidden">
                <div className="p-6 border-b border-white/5">
                  <h3 className="font-black uppercase tracking-widest text-xs flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#BF360C]" /> Notificaciones
                  </h3>
                </div>
                <div className="divide-y divide-white/5">
                  {[
                    { id: 'mascletas', label: 'Aviso Mascletás', desc: 'Recuerda 15 min antes de empezar' },
                    { id: 'actosOficiales', label: 'Actos Oficiales', desc: 'Cambios de horario o noticias' },
                    { id: 'cremas', label: 'Aviso Cremá', desc: 'No te pierdas el gran final' },
                    { id: 'avisosGastro', label: 'Promos Gastro', desc: 'Ofertas de los bares colaboradores' }
                  ].map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between p-6">
                      <div className="space-y-0.5">
                        <p className="font-bold text-sm">{setting.label}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{setting.desc}</p>
                      </div>
                      <button 
                        onClick={() => setNotifications(prev => ({ ...prev, [setting.id]: !prev[setting.id as keyof typeof notifications] }))}
                        className={clsx(
                          "w-12 h-6 rounded-full transition-all relative",
                          notifications[setting.id as keyof typeof notifications] ? "bg-[#BF360C]" : "bg-slate-200"
                        )}
                      >
                        <div className={clsx(
                          "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                          notifications[setting.id as keyof typeof notifications] ? "left-7" : "left-1"
                        )} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 text-center space-y-4">
                 <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest">Premium Build 1.1.0 · LGR</p>
                 <button className="text-red-400 text-xs font-black uppercase tracking-widest hover:underline flex items-center gap-2 mx-auto">
                    <Trash2 className="w-4 h-4" /> Borrar todo el progreso
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal de Foto Ampliada */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex flex-col backdrop-blur-md animate-in fade-in duration-200">
          <div className="flex justify-between items-center p-8 text-white mt-10">
            <span className="font-black text-[10px] uppercase tracking-widest text-white/60">{selectedPhoto.date}</span>
            <button onClick={() => setSelectedPhoto(null)} className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl active:scale-90 transition-all"><X size={24} /></button>
          </div>
          <div className="flex-1 flex items-center justify-center p-6">
            <motion.img layoutId={`photo-${selectedPhoto.id}`} src={selectedPhoto.url} className="max-w-full max-h-[70vh] rounded-[40px] shadow-2xl object-contain border border-white/10" alt="Recuerdo" />
          </div>
          <div className="p-8 flex justify-center gap-4 mb-10">
            <button onClick={() => handleShare(selectedPhoto)} className="flex-1 py-5 bg-[#BF360C] text-white rounded-[2rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-[#BF360C]/40">
              <Share2 size={20} /> Compartir
            </button>
            <button onClick={() => handleDelete(selectedPhoto.id)} className="w-20 py-5 bg-white/10 text-white rounded-[2rem] flex items-center justify-center">
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;

