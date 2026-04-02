import { useParams, useNavigate } from 'react-router-dom';
import { Clock, MapPin, Calendar, ArrowLeft, Share2, Navigation, Heart, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFavorites } from '../hooks/useFavorites';
import { clsx } from 'clsx';

import { localEvents } from '../data/events';
import { localPlaces } from '../data/places';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const isFav = id ? isFavorite(id) : false;

  const foundEvent = localEvents.find(e => e.id === id);
  const foundPlace = !foundEvent ? localPlaces.find(p => p.id === id) : null;

  const item = foundEvent ? {
    title: foundEvent.title,
    category: foundEvent.category,
    start_time: foundEvent.start_time.substring(0, 5),
    date: new Date(foundEvent.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' }),
    location_name: foundEvent.location_name,
    description: foundEvent.description,
    image_url: foundEvent.image_url,
    lat: foundEvent.latitude,
    lng: foundEvent.longitude
  } : foundPlace ? {
    title: foundPlace.name,
    category: foundPlace.type === 'falla' ? 'Monumento' : foundPlace.type === 'bar' ? 'Gastronomía' : 'Interés',
    start_time: "Todo el día",
    date: "Durante las fiestas",
    location_name: foundPlace.detail,
    description: "Punto de interés oficial de Fallers pel Món en Logroño. Un lugar imprescindible para vivir el ambiente fallero en pleno corazón de La Rioja.",
    image_url: foundPlace.image,
    lat: foundPlace.lat,
    lng: foundPlace.lng
  } : null;

  if (!item) return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <Info className="w-12 h-12 text-slate-200 mb-4" />
      <h2 className="text-xl font-bold text-slate-900">Acto no encontrado</h2>
      <button onClick={() => navigate(-1)} className="mt-4 text-[#BF360C] font-black uppercase tracking-widest text-xs">Volver atrás</button>
    </div>
  );

  const handleGetDirections = () => {
    if (item.lat && item.lng) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`, '_blank');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: `¡Mira este plan para las Fallas en Logroño: ${item.title}!`,
          url: window.location.href
        });
      } catch (err) { console.error(err); }
    }
  };

  return (
    <div className="bg-[#FBFAF9] min-h-screen pb-60">
      {/* Botones Flotantes Superiores */}
      <div className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 pointer-events-none">
        <button 
          onClick={() => navigate(-1)}
          className="p-4 bg-black/10 dark:bg-white/10 backdrop-blur-xl rounded-[24px] text-slate-900 dark:text-white border border-black/5 dark:border-white/10 shadow-xl pointer-events-auto active:scale-90 transition-transform"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex space-x-3 pointer-events-auto">
          <button 
            onClick={handleShare}
            className="p-4 bg-black/10 dark:bg-white/10 backdrop-blur-xl rounded-[24px] text-slate-900 dark:text-white border border-black/5 dark:border-white/10 shadow-xl active:scale-90 transition-transform"
          >
            <Share2 className="w-6 h-6" />
          </button>
          <button 
            onClick={() => id && toggleFavorite(id)}
            className={clsx(
              "p-4 backdrop-blur-xl rounded-[24px] border transition-all active:scale-90 shadow-xl",
              isFav 
                ? "bg-[#BF360C] border-[#BF360C] text-white" 
                : "bg-black/10 dark:bg-white/10 border-black/5 dark:border-white/10 text-slate-900 dark:text-white"
            )}
          >
            <Heart className={clsx("w-6 h-6", isFav && "fill-current")} />
          </button>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative h-[55vh] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          src={item.image_url || "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa"} 
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-transparent to-black/20" />
      </div>

      {/* Content Section */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="px-8 -mt-32 relative z-10 space-y-10"
      >
        <header className="space-y-4">
          <div className="flex items-center">
            <span className="px-4 py-1.5 bg-[#BF360C] text-white text-[10px] font-black rounded-xl uppercase tracking-[0.2em] shadow-lg shadow-orange-900/20">
              {item.category}
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">{item.title}</h1>
        </header>

        {/* Info Cards Grid */}
        <section className="grid grid-cols-1 gap-4">
          <div className="flex items-center p-6 card-premium group hover:border-[#BF360C]/20 transition-colors">
            <div className="w-12 h-12 bg-orange-50 dark:bg-[#BF360C]/10 rounded-2xl flex items-center justify-center mr-5 shrink-0 group-hover:scale-110 transition-transform">
               <Clock className="w-6 h-6 text-[#BF360C]" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest leading-none mb-1.5">HORARIO</p>
              <p className="font-black text-slate-800 dark:text-slate-200 text-lg uppercase">{item.start_time}</p>
            </div>
          </div>
          
          <div className="flex items-center p-6 card-premium group hover:border-[#BF360C]/20 transition-colors">
            <div className="w-12 h-12 bg-orange-50 dark:bg-[#BF360C]/10 rounded-2xl flex items-center justify-center mr-5 shrink-0 group-hover:scale-110 transition-transform">
               <Calendar className="w-6 h-6 text-[#BF360C]" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest leading-none mb-1.5">FECHA</p>
              <p className="font-black text-slate-800 dark:text-slate-200 text-lg uppercase">{item.date}</p>
            </div>
          </div>

          <div className="flex items-center p-6 card-premium group hover:border-[#BF360C]/20 transition-colors">
            <div className="w-12 h-12 bg-orange-50 dark:bg-[#BF360C]/10 rounded-2xl flex items-center justify-center mr-5 shrink-0 group-hover:scale-110 transition-transform">
               <MapPin className="w-6 h-6 text-[#BF360C]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest leading-none mb-1.5">UBICACIÓN</p>
              <p className="font-black text-slate-800 dark:text-slate-200 text-lg uppercase truncate">{item.location_name}</p>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="space-y-4">
          <h2 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">Sobre este acto</h2>
          <div className="bg-slate-100/50 dark:bg-white/5 p-8 rounded-[40px] border border-slate-100 dark:border-white/5">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-bold text-lg">
              {item.description}
            </p>
          </div>
        </section>

        {/* Action Button Integrated in Content */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGetDirections}
          className="w-full bg-[#BF360C] text-white p-7 rounded-[32px] font-black uppercase tracking-[0.2em] flex items-center justify-center space-x-4 shadow-2xl shadow-orange-900/30 active:shadow-none transition-all"
        >
          <Navigation className="w-7 h-7 fill-current" />
          <span className="text-xl">VER EN GOOGLE MAPS</span>
        </motion.button>

      </motion.div>
    </div>
  );
};

export default EventDetail;
