import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Utensils, Star, MapPin } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { localPlaces } from '../data/places';

const CATEGORIES = [
  { id: 'all', label: 'Todos', icon: Star },
  { id: 'bar', label: 'Tapas', icon: MapPin },
  { id: 'gastro', label: 'Restaurantes', icon: Utensils },
  { id: 'epicentro', label: 'Epicentro', icon: Star },
];

const Lugares = () => {
  const navigate = useNavigate();
  const [activeCat, setActiveCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLugares = useMemo(() => {
    return localPlaces
      .filter(p => {
        const isGastro = ['bar', 'gastro', 'epicentro', 'cafe'].includes(p.type);
        const matchesCat = activeCat === 'all' || p.type === activeCat;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             p.detail.toLowerCase().includes(searchQuery.toLowerCase());
        return isGastro && matchesCat && matchesSearch;
      });
  }, [activeCat, searchQuery]);

  return (
    <div className="min-h-screen pb-60">
      <header className="p-6 space-y-6 sticky top-0 bg-[var(--bg-main)]/80 backdrop-blur-xl z-30 border-b border-black/5 dark:border-white/5">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate(-1)} 
                className="p-3 bg-black/5 dark:bg-white/10 shadow-sm rounded-2xl active:scale-95 transition-transform text-slate-900 dark:text-white"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Gastronomía</h1>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-orange-50 dark:bg-[#BF360C]/10 flex items-center justify-center">
               <Utensils className="w-5 h-5 text-[#BF360C]" />
            </div>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-600 group-focus-within:text-[#BF360C] transition-colors" />
          <input 
            type="text" 
            placeholder="Buscar sitios recomendados..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-black/5 dark:bg-white/5 border-none rounded-[32px] shadow-xl shadow-slate-200/40 dark:shadow-black/20 placeholder:text-slate-300 dark:placeholder:text-slate-700 font-bold text-sm focus:ring-2 focus:ring-[#BF360C]/10 transition-all text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex space-x-3 overflow-x-auto no-scrollbar py-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={clsx(
                "flex items-center space-x-2 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap border",
                activeCat === cat.id 
                  ? "bg-[#BF360C] text-white border-[#BF360C] shadow-lg shadow-orange-900/40" 
                  : "bg-black/5 dark:bg-white/5 text-slate-400 dark:text-slate-500 border-transparent hover:bg-black/10 dark:hover:bg-white/10"
              )}
            >
              <cat.icon className="w-3 h-3" />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        <AnimatePresence mode="popLayout">
          {filteredLugares.map((lugar) => (
            <motion.div 
              layout
              key={lugar.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={() => navigate(`/lugares/${lugar.id}`)}
              className="group p-4 card-premium flex flex-col items-start gap-5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
               <div className="w-full aspect-[4/3] rounded-[32px] overflow-hidden shadow-inner relative shrink-0">
                  <img 
                    src={lugar.image} 
                    alt={lugar.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl text-[#FFB300] flex items-center gap-1.5 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-xs font-black">5.0</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                     <span className="px-3 py-1.5 bg-black/40 backdrop-blur-md text-white text-[10px] font-black rounded-xl uppercase tracking-widest">
                       {lugar.type === 'bar' ? 'Laurel / San Juan' : 'Restaurante'}
                     </span>
                  </div>
               </div>
               <div className="flex-1 w-full px-2 pb-2 space-y-4">
                  <div className="space-y-1.5">
                     <h3 className="font-black text-slate-900 dark:text-slate-100 text-xl leading-tight group-hover:text-[#BF360C] transition-colors line-clamp-1">{lugar.name}</h3>
                     <p className="text-xs text-slate-400 dark:text-slate-500 font-bold leading-relaxed line-clamp-2 uppercase tracking-wide opacity-80">
                       {lugar.detail}
                     </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-black/5 dark:border-white/5">
                    <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">
                       <MapPin className="w-3 h-3 text-[#BF360C]" />
                       Logroño Centro
                    </div>
                    <button className="w-10 h-10 bg-black/5 dark:bg-white/5 text-slate-900 dark:text-slate-100 rounded-2xl flex items-center justify-center group-hover:bg-[#BF360C] group-hover:text-white transition-all shadow-sm">
                       <ArrowLeft className="w-4 h-4 rotate-180" />
                    </button>
                  </div>
               </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredLugares.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full py-24 text-center"
          >
            <div className="w-24 h-24 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Search className="w-10 h-10 text-slate-200 dark:text-slate-800" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Sin resultados</h3>
            <p className="text-slate-400 dark:text-slate-500 text-sm font-bold mt-2 uppercase tracking-widest">Prueba con otra búsqueda o categoría</p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Lugares;

