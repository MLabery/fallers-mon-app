import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { localRoutes } from '../../data/routes';

export const RoutesScroll = () => {
  const scroll = (direction: 'left' | 'right') => {
    const el = document.getElementById('routes-scroll');
    if (el) {
      el.scrollBy({ left: direction === 'left' ? -350 : 350, behavior: 'smooth' });
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Rutas por Logroño</h2>
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Descubre la ciudad paso a paso</p>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/itinerarios" className="text-[#BF360C] text-xs font-black tracking-widest uppercase hover:underline">Ver todas</Link>
          <div className="hidden md:flex gap-3">
            <button 
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-sm flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-400" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-sm flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
      
      <div 
        id="routes-scroll"
        className="flex gap-6 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory scroll-smooth touch-pan-x -mx-5 px-5"
      >
        {localRoutes.map((route, index) => (
          <motion.div
            key={route.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex-shrink-0"
          >
            <Link 
              to="/itinerarios" 
              className="block w-[280px] sm:w-[320px] card-premium p-6 shadow-2xl shadow-black/5 border border-black/5 dark:border-white/5 space-y-5 active:scale-[0.98] transition-all snap-start group"
            >
              <div className="h-44 rounded-[36px] overflow-hidden shadow-inner relative">
                <img 
                  src={route.image} 
                  alt={route.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-4 left-6">
                   <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] text-white font-black uppercase tracking-widest border border-white/20">
                        {route.duration}
                      </span>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] text-white font-black uppercase tracking-widest border border-white/20">
                        {route.places} PARADAS
                      </span>
                   </div>
                </div>
              </div>
              <div className="px-2">
                <h4 className="font-black text-slate-900 dark:text-white text-xl leading-tight group-hover:text-[#BF360C] transition-colors">{route.title}</h4>
                <p className="text-slate-400 dark:text-slate-500 text-xs font-medium mt-2 line-clamp-2 leading-relaxed">
                  {route.description}
                </p>
                <div className="pt-4 flex items-center justify-between">
                   <span className="text-[10px] font-black text-[#BF360C] uppercase tracking-widest">Descubrir ruta</span>
                   <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 text-slate-400 dark:text-slate-600 flex items-center justify-center group-hover:bg-[#BF360C] group-hover:text-white transition-all">
                      <ChevronRight className="w-4 h-4" />
                   </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
        <div className="flex-shrink-0 w-8 snap-start"></div>
      </div>
    </section>
  );
};

