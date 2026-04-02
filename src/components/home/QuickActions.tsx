import { Compass, Utensils, Map as MapIcon, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export const QuickActions = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      <Link to="/itinerarios" className="card-premium p-8 flex flex-col items-center justify-center space-y-4 shadow-xl shadow-slate-200/40 dark:shadow-black/20 active:scale-95 transition-all group hover:bg-[#BF360C] hover:text-white">
        <div className="p-4 bg-orange-50 dark:bg-[#BF360C]/10 text-[#BF360C] rounded-[24px] group-hover:bg-white/20 group-hover:text-white transition-colors duration-300">
          <Compass className="w-8 h-8" />
        </div>
        <span className="text-[#BF360C] font-black text-sm tracking-tight text-center group-hover:text-white transition-colors duration-300">Itinerarios Falleros</span>
      </Link>
      
      <Link to="/lugares" className="card-premium p-8 flex flex-col items-center justify-center space-y-4 shadow-xl shadow-slate-200/40 dark:shadow-black/20 active:scale-95 transition-all group hover:bg-[#007C91] hover:text-white">
        <div className="p-4 bg-cyan-50 dark:bg-[#007C91]/10 text-[#007C91] rounded-[24px] group-hover:bg-white/20 group-hover:text-white transition-colors duration-300">
          <Utensils className="w-8 h-8" />
        </div>
        <span className="text-[#007C91] font-black text-sm tracking-tight text-center group-hover:text-white transition-colors duration-300">Gastronomía Riojana</span>
      </Link>

      <Link to="/mapa" className="card-premium p-8 flex flex-col items-center justify-center space-y-4 shadow-xl shadow-slate-200/40 dark:shadow-black/20 active:scale-95 transition-all group hover:bg-[#A62612] hover:text-white">
        <div className="p-4 bg-red-50 dark:bg-[#A62612]/10 text-[#A62612] rounded-[24px] group-hover:bg-white/20 group-hover:text-white transition-colors duration-300">
          <MapIcon className="w-8 h-8" />
        </div>
        <span className="text-[#A62612] font-black text-sm tracking-tight text-center group-hover:text-white transition-colors duration-300">Mapa Interactivo</span>
      </Link>

      <Link to="/actos" className="card-premium p-8 flex flex-col items-center justify-center space-y-4 shadow-xl shadow-slate-200/40 dark:shadow-black/20 active:scale-95 transition-all group hover:bg-amber-500 hover:text-white">
        <div className="p-4 bg-amber-50 dark:bg-amber-500/10 text-amber-600 rounded-[24px] group-hover:bg-white/20 group-hover:text-white transition-colors duration-300">
          <Calendar className="w-8 h-8" />
        </div>
        <span className="text-amber-600 font-black text-sm tracking-tight text-center group-hover:text-white transition-colors duration-300">Calendario Oficial</span>
      </Link>
    </div>
  );
};
