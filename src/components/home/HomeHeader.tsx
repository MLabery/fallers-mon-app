import { Search, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HomeHeaderProps {
  onNotificationClick: () => void;
}

export const HomeHeader = ({ onNotificationClick }: HomeHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <header className="px-6 pt-10 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-full p-1 shadow-lg shadow-orange-100 dark:shadow-none flex-shrink-0">
            <img src="/logo-fpm.jpg" alt="FPM" className="w-full h-full object-contain rounded-full" />
          </div>
          <div className="flex flex-col">
            <span className="text-[#E64A19] font-black text-xl tracking-tighter">
              FALLERS PEL MÓN
            </span>
            <span className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase">LOGROÑO 2026</span>
          </div>
        </div>
      <div className="flex gap-2">
        <button
          onClick={() => navigate('/actos')}
          className="p-2.5 card-premium text-slate-600 dark:text-slate-400 active:scale-90 transition-transform"
        >
          <Search className="w-5 h-5" />
        </button>
        <button
          onClick={onNotificationClick}
          className="p-2.5 card-premium text-slate-600 dark:text-slate-400 relative active:scale-90 transition-transform"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[var(--bg-card)]"></span>
        </button>
      </div>
    </header>
  );
};
