import { NavLink, useLocation } from 'react-router-dom';
import { Home, Calendar, Map as MapIcon, User, Compass } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const navItems = [
  { to: '/', icon: Home, label: 'INICIO' },
  { to: '/actos', icon: Calendar, label: 'ACTOS' },
  { to: '/mapa', icon: MapIcon, label: 'MAPA' },
  { to: '/itinerarios', icon: Compass, label: 'RUTAS' },
  { to: '/perfil', icon: User, label: 'PERFIL' },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed md:absolute bottom-0 left-0 right-0 h-auto pb-8 md:pb-0 bg-white/98 dark:bg-slate-900/90 backdrop-blur-3xl border-t border-black/[0.03] dark:border-white/5 flex items-center justify-around px-2 py-4 z-50 rounded-t-[40px] shadow-[0_-15px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_-15px_60px_rgba(0,0,0,0.4)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.to || 
                        (item.to !== '/' && location.pathname.startsWith(item.to));
        
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={clsx(
              "relative flex flex-col items-center justify-center space-y-1.5 w-16 sm:w-20 h-[64px] rounded-3xl transition-all duration-500",
              isActive ? "text-[#BF360C]" : "text-slate-400 dark:text-slate-600 hover:text-slate-600 transition-colors"
            )}
          >
            <div className={clsx(
              "flex flex-col items-center justify-center transition-all duration-500",
              isActive ? "scale-110 -translate-y-1" : "scale-100"
            )}>
              <item.icon className={clsx(
                "w-5 h-5 sm:w-6 sm:h-6 transition-all duration-500", 
                isActive ? "stroke-[2.5px] drop-shadow-[0_0_8px_rgba(191,54,12,0.4)]" : "stroke-2"
              )} />
              <span className="text-[8px] sm:text-[9px] font-black tracking-widest uppercase mt-1.5 transition-all">{item.label}</span>
            </div>
            
            {isActive && (
              <motion.div 
                layoutId="nav-active"
                className="absolute -top-1 w-1.5 h-1.5 bg-[#BF360C] rounded-full shadow-[0_0_10px_rgba(191,54,12,0.8)]"
              />
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomNav;
