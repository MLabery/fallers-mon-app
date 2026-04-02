import { useState, useMemo } from 'react';
import { 
  Flame, Castle, Utensils, Navigation, Wine, Bed, ShoppingCart, 
  GraduationCap, Church, CalendarHeart, Search, Menu, MapPin, 
  Layers, X, Compass, Info, Tent, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { localPlaces } from '../data/places';
import { localEvents } from '../data/events';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  { id: 'all',        label: 'Todo',        icon: Flame,        color: 'bg-[#BF360C]',   textColor: 'text-[#BF360C]'   },
  { id: 'falla',      label: 'Fallas',      icon: Flame,        color: 'bg-[#BF360C]',   textColor: 'text-[#BF360C]'   },
  { id: 'evento',     label: 'Actos',       icon: CalendarHeart,color: 'bg-rose-600',     textColor: 'text-rose-600'     },
  { id: 'monument',   label: 'Monumentos',  icon: Castle,       color: 'bg-[#0E4E64]',   textColor: 'text-[#0E4E64]'   },
  { id: 'church',     label: 'Iglesias',    icon: Church,       color: 'bg-purple-600',   textColor: 'text-purple-600'  },
  { id: 'gastro',     label: 'Restaurantes',icon: Utensils,     color: 'bg-[#E64A19]',   textColor: 'text-[#E64A19]'   },
  { id: 'bar',        label: 'Bares',       icon: Wine,         color: 'bg-amber-500',    textColor: 'text-amber-500'   },
  { id: 'hotel',      label: 'Hoteles',     icon: Bed,          color: 'bg-indigo-600',   textColor: 'text-indigo-600'  },
  { id: 'supermarket',label: 'Supermercados',icon: ShoppingCart, color: 'bg-emerald-600',  textColor: 'text-emerald-600' },
  { id: 'school',     label: 'Colegios',    icon: GraduationCap,color: 'bg-blue-600',     textColor: 'text-blue-600'    },
  { id: 'epicentro',  label: 'Epicentro',   icon: Tent,         color: 'bg-black',        textColor: 'text-black'       },
];

const Mapa = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [is3D, setIs3D] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<any[] | null>(null);
  const [hoveredGroup, setHoveredGroup] = useState<any[] | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectedPlace = selectedGroup ? selectedGroup[activeIndex] : null;

  const unifiedMapData = useMemo(() => {
    const placesParsed = localPlaces.map(p => ({
      ...p,
      name: p.name,
      detail: p.detail,
      isEvent: false,
      highlight: false,
    }));

    const eventsParsed = localEvents.map(e => ({
      id: e.id,
      name: e.title,
      detail: `${e.start_time.substring(0, 5)} · ${e.location_name}`,
      type: 'evento',
      pinX: e.pinX ?? 50,
      pinY: e.pinY ?? 50,
      lat: e.latitude,
      lng: e.longitude,
      image: e.image_url,
      isEvent: true,
      highlight: e.highlight,
    }));

    return [...placesParsed, ...eventsParsed];
  }, []);

  const groupedPins = useMemo(() => {
    const filtered = filter === 'all' ? unifiedMapData : unifiedMapData.filter(p => p.type === filter);
    const groups: { x: number, y: number, pins: any[] }[] = [];
    const THRESHOLD = 3.5; // Agrupar si están a menos de un 3.5% de distancia

    filtered.forEach(p => {
      const foundIdx = groups.findIndex(g => {
        const dx = g.x - p.pinX;
        const dy = g.y - p.pinY;
        return Math.sqrt(dx*dx + dy*dy) < THRESHOLD;
      });

      if (foundIdx !== -1) {
        groups[foundIdx].pins.push(p);
      } else {
        groups.push({ x: p.pinX, y: p.pinY, pins: [p] });
      }
    });

    return groups;
  }, [filter, unifiedMapData]);

  const handleGetDirections = (place: any) => {
    if (place.lat && place.lng) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`, '_blank');
    }
  };

  const getPlaceCat = (type: string) => CATEGORIES.find(c => c.id === type) || CATEGORIES[1];

  return (
    <div className="relative h-full w-full bg-[var(--bg-main)] overflow-hidden" style={{ perspective: '1200px' }}>

      {/* Modern Floating Header */}
      <div className="absolute top-0 left-0 right-0 z-50 pt-10 pb-6 px-6 flex items-center justify-between pointer-events-none max-w-2xl mx-auto md:pt-14">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 pointer-events-auto"
        >
          <div className="p-3 card-premium shadow-xl dark:bg-[#0C4A6E]/30 backdrop-blur-2xl">
            <Menu className="w-5 h-5 text-slate-800 dark:text-sky-300" />
          </div>
          <div className="px-4 py-2 card-premium shadow-xl dark:bg-[#0C4A6E]/30 backdrop-blur-2xl flex items-center gap-2.5">
             <img src="/logo-fpm.jpg" alt="FPM" className="w-6 h-6 object-contain" />
             <h1 className="text-sm font-black text-slate-900 dark:text-sky-100 tracking-tight uppercase">Explora Logroño</h1>
          </div>
        </motion.div>

        <div className="flex gap-2 pointer-events-auto">
           <button 
             onClick={() => setIs3D(!is3D)}
             className={clsx(
               "p-3 rounded-2xl shadow-xl transition-all duration-500 border backdrop-blur-2xl",
               is3D ? "bg-[#BF360C] text-white border-[#BF360C] scale-110 shadow-[#BF360C]/30" : "bg-white/90 dark:bg-[#0C4A6E]/30 text-slate-800 dark:text-sky-300 border-white/50 dark:border-sky-500/20"
             )}
           >
             <Layers className={clsx("w-5 h-5 transition-transform duration-500", is3D && "rotate-180")} />
           </button>
           <div className="p-3 card-premium shadow-xl dark:bg-[#0C4A6E]/30 backdrop-blur-2xl">
             <Search className="w-5 h-5 text-slate-800 dark:text-sky-300" />
           </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="absolute top-24 md:top-28 left-0 right-0 z-40 px-6 max-w-2xl mx-auto">
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-2">
          {CATEGORIES.map((cat, idx) => {
            const isActive = filter === cat.id;
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => { setFilter(cat.id); setSelectedGroup(null); }}
                className={clsx(
                  "flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg border",
                  isActive
                    ? `${cat.color} text-white border-transparent scale-105`
                    : "bg-white/90 dark:bg-[#0C4A6E]/20 text-slate-500 dark:text-sky-200 border-white/50 dark:border-sky-500/10 hover:bg-white dark:hover:bg-sky-900/40"
                )}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Map Body */}
      <motion.div 
        className="absolute inset-0 z-0 origin-center flex items-center justify-center overflow-hidden"
        animate={{
          scale: is3D ? 1.4 : 1,
          y: is3D ? '-5.5%' : '0%',
        }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative w-full h-full min-w-full min-h-full">
          <img
            src="/logrono_map_3d.png"
            alt="Mapa 3D de Logroño"
            className={clsx(
              "absolute inset-0 w-full h-full object-cover transition-all duration-1000",
              is3D ? "brightness-110 saturate-[1.1]" : "brightness-100 dark:brightness-75 dark:contrast-125"
            )}
          />

        {/* Improved Interactive Pins - Clustered */}
        {groupedPins.map((group, groupIdx) => {
          const { x, y, pins } = group;
          const primaryPlace = pins[0];
          const cat = getPlaceCat(primaryPlace.type);
          const isSelected = selectedGroup === pins;
          const isHovered = hoveredGroup === pins;
          const Icon = cat.icon;

          return (
            <motion.div
              key={`group-${groupIdx}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div 
                className="relative cursor-pointer group"
                onClick={() => {
                  setSelectedGroup(isSelected ? null : pins);
                  setActiveIndex(0);
                }}
                onMouseEnter={() => setHoveredGroup(pins)}
                onMouseLeave={() => setHoveredGroup(null)}
              >
                {(primaryPlace.highlight || isSelected) && (
                  <div className="absolute -inset-4 pointer-events-none">
                     <div className={`w-full h-full rounded-full animate-ping opacity-20 ${cat.color}`} />
                  </div>
                )}

                <motion.div
                  animate={{ 
                    scale: isSelected ? 1.3 : isHovered ? 1.15 : 1,
                    rotateX: is3D ? -50 : 0,
                    y: (isHovered || isSelected) ? -15 : 0
                  }}
                  transition={{ type: 'spring', stiffness: 450, damping: 18 }}
                  className={clsx(
                    "w-10 h-10 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 border-[3px] relative",
                    cat.color,
                    isSelected ? "border-white ring-[8px] ring-white/30" : "border-white/90 dark:border-white/30 group-hover:border-white shadow-slate-900/10"
                  )}
                >
                  <Icon className="w-5 h-5 text-white" strokeWidth={3} />
                  
                  {pins.length > 1 && (
                    <div className="absolute -top-2.5 -right-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-[2.5px] border-white dark:border-slate-800 shadow-xl z-20">
                      {pins.length}
                    </div>
                  )}

                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-black/10 blur-md rounded-full -z-10" />
                </motion.div>

                <AnimatePresence>
                  {(isHovered || isSelected) && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 35, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-800 text-white px-4 py-2 rounded-2xl shadow-2xl z-50 pointer-events-none border border-white/10"
                    >
                       <p className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                         {pins.length > 1 ? `${pins.length} Sitios aquí` : primaryPlace.name}
                       </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
        </div>
      </motion.div>

      {/* Floating Detail Panel */}
      <AnimatePresence>
        {selectedPlace && (
          <motion.div
            initial={{ y: 250, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 250, opacity: 0 }}
            className="absolute bottom-40 md:bottom-44 left-6 right-6 z-[60] max-w-xl mx-auto"
          >
            <div className="card-premium p-4 md:p-6 shadow-2xl flex gap-4 md:gap-5 items-center relative overflow-hidden backdrop-blur-3xl w-full">

              <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl md:rounded-[36px] overflow-hidden shadow-2xl border-4 border-white dark:border-white/10 shrink-0">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedPlace.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    src={selectedPlace.image || 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa'}
                    alt={selectedPlace.name}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>

              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={clsx(
                      "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-white shadow-sm",
                      getPlaceCat(selectedPlace.type).color
                    )}>
                      {selectedPlace.type}
                    </span>
                    {selectedPlace.highlight && (
                      <span className="flex items-center gap-1 text-[8px] font-black text-[#BF360C] dark:text-[#E64A19] bg-orange-50 dark:bg-orange-950/30 px-2.5 py-1 rounded-full border border-orange-100 dark:border-orange-900/30 uppercase tracking-tighter">
                        <Compass className="w-2 h-2" /> Recomendado
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    {selectedGroup && selectedGroup.length > 1 && (
                      <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 rounded-full px-1.5 py-1 border border-black/5 dark:border-white/10 shadow-inner">
                        <button 
                          onClick={() => setActiveIndex(i => Math.max(0, i - 1))}
                          disabled={activeIndex === 0}
                          className="p-1 rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-30 transition-colors bg-white dark:bg-slate-900 shadow-sm"
                        >
                          <ChevronRight className="w-4 h-4 rotate-180" />
                        </button>
                        <span className="text-[9px] font-black text-slate-600 dark:text-slate-400 w-6 text-center">{activeIndex + 1}/{selectedGroup.length}</span>
                        <button 
                          onClick={() => setActiveIndex(i => Math.min(selectedGroup.length - 1, i + 1))}
                          disabled={activeIndex === selectedGroup.length - 1}
                          className="p-1 rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-30 transition-colors bg-white dark:bg-slate-900 shadow-sm"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    <button 
                      onClick={() => setSelectedGroup(null)}
                      className="p-1.5 bg-black/5 dark:bg-white/10 rounded-full text-slate-400 dark:text-slate-500 hover:text-black dark:hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.h3 
                    key={`title-${selectedPlace.id}`}
                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                    className="text-lg font-black text-slate-900 dark:text-white leading-tight mb-2 uppercase tracking-tight line-clamp-2"
                  >
                    {selectedPlace.name}
                  </motion.h3>
                </AnimatePresence>
                
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[11px] font-bold">
                  <MapPin className="w-3.5 h-3.5 text-[#BF360C]" />
                  <span className="truncate">{selectedPlace.detail}</span>
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => handleGetDirections(selectedPlace)}
                    className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 h-12 rounded-2xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                  >
                    <Navigation className="w-4 h-4" /> Ver Ruta
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (selectedPlace.isEvent) {
                        navigate(`/actos/${selectedPlace.id}`);
                      } else {
                        navigate(`/lugares/${selectedPlace.id}`);
                      }
                    }}
                    className="w-12 h-12 bg-black/5 dark:bg-white/10 text-slate-900 dark:text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-95 transition-all hover:bg-black/10 dark:hover:bg-white/20"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!is3D && !selectedPlace && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="absolute bottom-40 md:bottom-44 left-1/2 -translate-x-1/2 bg-white/40 dark:bg-black/40 backdrop-blur-lg px-6 py-3 rounded-full border border-white/50 dark:border-white/10 shadow-xl pointer-events-none"
          >
             <p className="text-[10px] font-black text-slate-800 dark:text-slate-300 uppercase tracking-widest flex items-center gap-2">
               Activa vista <Layers className="w-3.5 h-3.5" /> para Modo 3D
             </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Mapa;
