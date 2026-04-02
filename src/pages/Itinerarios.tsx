import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, MapPin, ChevronRight, Compass, X, Heart, Trash2, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { localEvents } from '../data/events';
import { localPlaces } from '../data/places';

import { localRoutes as ROUTES } from '../data/routes';

const Itinerarios = () => {
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState<typeof ROUTES[0] | null>(null);
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteItems = [
    ...localEvents.filter(e => favorites.includes(e.id)).map(e => ({ id: e.id, name: e.title, img: e.image_url, time: e.start_time.substring(0, 5), type: 'acto', lat: e.latitude, lng: e.longitude })),
    ...localPlaces.filter(p => favorites.includes(p.id)).map(p => ({ id: p.id, name: p.name, img: p.image, time: 'Todo el día', type: 'lugar', lat: p.lat, lng: p.lng }))
  ];

  return (
    <div className="min-h-screen pb-60">
      <header className="p-6 flex items-center space-x-4 sticky top-0 bg-[var(--bg-main)]/80 backdrop-blur-xl z-20 border-b border-black/5 dark:border-white/5">
        <button 
          onClick={() => navigate(-1)} 
          className="p-3 bg-black/5 dark:bg-white/10 shadow-sm rounded-2xl active:scale-95 transition-transform text-slate-900 dark:text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Rutas Falleras</h1>
      </header>

      <main className="px-6 space-y-8 mt-6">
        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed">
          Sigue nuestras rutas recomendadas para no perderte lo mejor de la fiesta.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ROUTES.map((route, idx) => (
            <motion.div 
              key={route.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2, ease: 'easeOut' }}
              onClick={() => setSelectedRoute(route)}
              className="card-premium active:scale-[0.98] transition-all cursor-pointer group shadow-2xl shadow-slate-200/40 dark:shadow-black/20"
            >
              <div className="relative h-64">
                <img src={route.image} alt={route.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="flex items-center text-white/90 text-[10px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-md px-4 py-2 rounded-full w-fit mb-4">
                     {route.places} PARADAS
                  </span>
                  <h2 className="text-3xl font-black text-white leading-tight">{route.title}</h2>
                </div>
              </div>
              <div className="p-8 flex items-center justify-between">
                <div className="flex items-center space-x-8 text-slate-500 dark:text-slate-400 text-sm font-bold">
                   <span className="flex items-center gap-2"><Clock className="w-5 h-5 text-[#BF360C]" /> {route.duration}</span>
                   <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-[#BF360C]" /> Logroño</span>
                </div>
                <div className={`p-4 text-white rounded-[24px] shadow-xl ${route.color} group-hover:translate-x-1 transition-transform`}><ChevronRight className="w-6 h-6" /></div>
              </div>
            </motion.div>
          ))}
        </div>

        {favoriteItems.length > 0 ? (
          <div className="space-y-8 mt-16 pt-12 border-t border-black/5 dark:border-white/5">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white px-2 flex items-center gap-4">
              <Heart className="w-8 h-8 text-red-500 fill-current" />
              Mi Itinerario
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favoriteItems.map((item) => (
                <div key={item.id} className="card-premium p-5 flex items-center gap-6 group hover:shadow-2xl transition-all">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden shrink-0 shadow-sm relative">
                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                  </div>
                  <div className="flex-1 min-w-0 py-1" onClick={() => navigate(`/${item.type === 'acto' ? 'actos' : 'lugares'}/${item.id}`)}>
                    <p className="text-[#BF360C] font-black text-[10px] uppercase tracking-widest">{item.time}</p>
                    <h4 className="text-xl font-black text-slate-900 dark:text-white truncate leading-tight mt-1">{item.name}</h4>
                    <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-1">{item.type}</p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
                    className="p-4 bg-black/5 dark:bg-white/5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-3xl transition-all active:scale-90"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => {
                const waypoints = favoriteItems.map(i => `${i.lat},${i.lng}`).join('|');
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${favoriteItems[favoriteItems.length-1].lat},${favoriteItems[favoriteItems.length-1].lng}&waypoints=${waypoints}`, '_blank');
              }}
              className="w-full px-12 py-7 bg-[#BF360C] text-white rounded-[32px] font-black shadow-2xl shadow-orange-900/40 active:scale-95 transition-all flex items-center justify-center gap-4 mt-4"
            >
              <Navigation className="w-7 h-7" />
              <span className="text-xl tracking-wider">GENERAR RUTA EN GOOGLE MAPS</span>
            </button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="bg-slate-900 dark:bg-white/5 rounded-[48px] p-10 text-center space-y-5 shadow-2xl mt-12 border border-white/5"
          >
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto">
               <Compass className="w-10 h-10 text-orange-400" />
            </div>
            <h3 className="text-white text-2xl font-black">¿Quieres algo a tu medida?</h3>
            <p className="text-white/60 text-sm font-medium px-4">Marca tus lugares favoritos con el corazón para crear tu propio itinerario personalizado.</p>
            <button 
              onClick={() => navigate('/actos')}
              className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black text-sm active:scale-95 transition-transform mt-4 shadow-xl"
            >
              EXPLORAR ACTOS
            </button>
          </motion.div>
        )}
      </main>

      {/* DETAILED ROUTE MODAL */}
      <AnimatePresence>
        {selectedRoute && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-[var(--bg-main)] overflow-y-auto pb-40"
          >
             <div className="relative h-80">
                <img src={selectedRoute.image} alt={selectedRoute.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-black/20 to-black/60" />
                
                <button 
                  onClick={() => setSelectedRoute(null)}
                  className="absolute top-8 right-6 p-4 bg-black/10 dark:bg-white/10 backdrop-blur-xl text-white rounded-2xl active:scale-90 transition-transform shadow-xl border border-white/10"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="absolute bottom-10 left-8 right-8">
                  <span className="inline-block px-4 py-1.5 bg-[#BF360C] text-white text-[10px] font-black rounded-full uppercase tracking-widest mb-4 shadow-lg">
                    ITINERARIO OFICIAL
                  </span>
                  <h1 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">{selectedRoute.title}</h1>
                </div>
             </div>

             <div className="px-8 pt-8 space-y-10">
                <div className="flex bg-white dark:bg-white/5 rounded-[32px] p-6 shadow-xl items-center justify-around divide-x divide-black/5 dark:divide-white/5 border border-black/5 dark:border-white/5">
                   <div className="text-center px-4 flex-1">
                     <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Duración</p>
                     <p className="text-xl font-black text-slate-900 dark:text-slate-100">{selectedRoute.duration}</p>
                   </div>
                   <div className="text-center px-4 flex-1">
                     <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Paradas</p>
                     <p className="text-xl font-black text-slate-900 dark:text-slate-100">{selectedRoute.places}</p>
                   </div>
                </div>

                <p className="text-slate-600 dark:text-slate-400 font-bold text-lg leading-relaxed">
                  {selectedRoute.description}
                </p>

                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[31px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1.5 before:bg-gradient-to-b before:from-[#BF360C]/40 before:to-transparent">
                   {selectedRoute.stops.map((stop, i) => (
                     <div key={i} className="relative flex items-start space-x-8">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-slate-900 shadow-2xl shadow-[#BF360C]/20 border-4 border-[var(--bg-main)] shrink-0 z-10 text-[#BF360C] font-black text-xl">
                           {i + 1}
                        </div>
                        <div className="flex-1 card-premium p-6 hover:shadow-2xl transition-all">
                           {stop.img && (
                             <div className="w-full h-40 rounded-2xl overflow-hidden mb-5 shadow-inner">
                               <img src={stop.img} alt={stop.name} className="w-full h-full object-cover" />
                             </div>
                           )}
                           <span className="text-[#BF360C] font-black text-xs uppercase tracking-widest">{stop.time}</span>
                           <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-1 leading-tight">{stop.name}</h4>
                           <p className="text-slate-500 dark:text-slate-400 text-sm font-bold mt-3 leading-relaxed">{stop.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>

                <button 
                  onClick={() => setSelectedRoute(null)}
                  className="w-full py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[32px] font-black text-lg shadow-2xl mt-8 active:scale-95 transition-transform uppercase tracking-widest"
                >
                  VOLVER A RUTAS
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Itinerarios;
