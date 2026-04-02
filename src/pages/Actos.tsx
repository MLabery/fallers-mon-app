import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, Calendar, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEvents } from '../hooks/useSupabase';
import { clsx } from 'clsx';

const DAYS = [
  { id: '10', label: 'Vie 10' },
  { id: '11', label: 'Sáb 11' },
  { id: '12', label: 'Dom 12' },
  { id: '13', label: 'Lun 13' },
];

const Actos = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState('10');
  const [searchQuery, setSearchQuery] = useState('');
  const { events, loading } = useEvents(selectedDay);

  // Filter events based on search query
  const filteredEvents = useMemo(() => {
    return events.filter(event => 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [events, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen pb-60">
      <div className="bg-[var(--bg-main)]/80 backdrop-blur-xl p-6 pb-2 border-b border-black/5 dark:border-white/5 sticky top-0 z-20">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="p-3 bg-black/5 dark:bg-white/10 rounded-2xl active:scale-90 transition-transform text-slate-900 dark:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Agenda de Actos</h1>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
          <input 
            type="text" 
            placeholder="¿Qué buscas? (Ej: Mascletà, Paella...)" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-black/5 dark:bg-white/5 border-none rounded-[24px] focus:ring-2 focus:ring-[#BF360C]/10 transition-all text-sm font-bold placeholder:text-slate-300 dark:placeholder:text-slate-600 text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar pb-4 -mx-1 px-1">
          {DAYS.map((day) => (
            <button
              key={day.id}
              onClick={() => setSelectedDay(day.id)}
              className={clsx(
                "flex-shrink-0 px-8 py-3 rounded-2xl text-[11px] font-black tracking-widest uppercase transition-all border",
                selectedDay === day.id 
                  ? "bg-[#BF360C] text-white border-[#BF360C] shadow-xl shadow-orange-900/40 scale-[1.02]" 
                  : "bg-black/5 dark:bg-white/5 text-slate-400 dark:text-slate-500 border-transparent hover:bg-black/10 dark:hover:bg-white/10"
              )}
            >
              {day.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-44 bg-black/5 dark:bg-white/5 rounded-[40px] animate-pulse" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              key={selectedDay + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, index) => (
                  <motion.div
                    layout
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="h-full"
                  >
                    <Link 
                      to={`/actos/${event.id}`}
                      className={clsx(
                        "block p-5 card-premium h-full transition-all active:scale-[0.98] hover:shadow-2xl hover:-translate-y-1 duration-500 group",
                        event.highlight && "ring-1 ring-[#BF360C]/20 border-[#BF360C]/20 shadow-[#BF360C]/10"
                      )}
                    >
                      {event.image_url && (
                        <div className="w-full h-44 rounded-[32px] overflow-hidden mb-5 shadow-sm relative">
                          <img src={event.image_url} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                        </div>
                      )}
                      <div className="space-y-4 px-1">
                        <div className="flex items-center gap-3">
                          <span className={clsx(
                            "px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em]",
                            event.category === 'Pólvora'    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 border border-blue-100 dark:border-blue-900/30" :
                            event.category === 'Fuego'      ? "bg-red-50 dark:bg-red-900/20 text-red-600 border border-red-100 dark:border-red-900/30" :
                            event.category === 'Gastronomía'? "bg-orange-50 dark:bg-orange-900/20 text-[#BF360C] border border-orange-100 dark:border-orange-900/30" :
                            event.category === 'Religioso'  ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 border border-purple-100 dark:border-purple-900/30" :
                            event.category === 'Oficial'    ? "bg-slate-100 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800" :
                            event.category === 'Tradición'  ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 border border-yellow-200 dark:border-yellow-900/30" :
                            event.category === 'Música'     ? "bg-pink-50 dark:bg-pink-900/20 text-pink-700 border border-pink-100 dark:border-pink-900/30" :
                            event.category === 'Desfile'    ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 border border-indigo-100 dark:border-indigo-900/30" :
                            event.category === 'Social'     ? "bg-teal-50 dark:bg-teal-900/20 text-teal-700 border border-teal-100 dark:border-teal-900/30" :
                            event.category === 'Ocio'       ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 border border-emerald-100 dark:border-emerald-900/30" :
                            "bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-white/5"
                          )}>
                            {event.category}
                          </span>
                          {event.highlight && (
                            <span className="text-[9px] font-black text-[#BF360C] uppercase tracking-widest flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-[#BF360C] rounded-full animate-pulse" /> Destacado
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 leading-tight group-hover:text-[#BF360C] transition-colors duration-300">
                          {event.title}
                        </h3>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="flex items-center bg-[#FDF2F0] dark:bg-[#BF360C]/10 px-3 py-1.5 rounded-xl text-[#BF360C] text-xs font-black">
                              <Clock className="w-3.5 h-3.5 mr-1.5" />
                              {event.start_time.substring(0, 5)}
                            </div>
                            <div className="flex items-center text-slate-400 dark:text-slate-500 text-[10px] font-bold truncate max-w-[120px]">
                              <MapPin className="w-3 h-3 mr-1 text-[#BF360C] shrink-0" />
                              <span className="truncate uppercase tracking-wider">{event.location_name}</span>
                            </div>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-slate-300 dark:text-slate-600 group-hover:bg-[#BF360C] group-hover:text-white transition-all">
                             <ArrowLeft className="w-4 h-4 rotate-180" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-32 text-center">
                  <div className="w-24 h-24 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl dark:shadow-none">
                     <Calendar className="w-10 h-10 text-slate-200 dark:text-slate-700" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">No hay actos</h3>
                  <p className="text-slate-400 dark:text-slate-500 text-sm mt-2 font-medium">No se han encontrado resultados para tu búsqueda.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Actos;
