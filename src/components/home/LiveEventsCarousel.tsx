import { Zap, ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface LiveEventsCarouselProps {
  events: any[];
  activeIdx: number;
  currentStartIdx: number;
  timeInfo: { label: string; isCurrent: boolean } | null;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (idx: number) => void;
  formatDayLabel: (date: string) => string;
}

export const LiveEventsCarousel = ({
  events,
  activeIdx,
  currentStartIdx,
  timeInfo,
  onPrev,
  onNext,
  onSelect,
  formatDayLabel
}: LiveEventsCarouselProps) => {
  const activeEvent = events[activeIdx];
  const canGoPrev = activeIdx > 0;
  const canGoNext = activeIdx < events.length - 1;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Qué está pasando ahora</h2>
          <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold tracking-widest uppercase mt-0.5 flex items-center gap-1">
            EN DIRECTO DESDE LA CIUDAD <Zap className="w-3 h-3 fill-[#BF360C] text-[#BF360C] animate-pulse" />
          </p>
        </div>
        
        {/* Arrow controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={!canGoPrev}
            className="w-10 h-10 rounded-2xl bg-black/5 dark:bg-white/10 shadow-sm flex items-center justify-center active:scale-90 transition-all disabled:opacity-30 disabled:pointer-events-none hover:bg-black/10 dark:hover:bg-white/20 text-slate-600 dark:text-slate-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold w-12 text-center tracking-widest">
            {activeIdx + 1}/{events.length}
          </span>
          <button
            onClick={onNext}
            disabled={!canGoNext}
            className="w-10 h-10 rounded-2xl bg-black/5 dark:bg-white/10 shadow-sm flex items-center justify-center active:scale-90 transition-all disabled:opacity-30 disabled:pointer-events-none hover:bg-black/10 dark:hover:bg-white/20 text-slate-600 dark:text-slate-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          {activeEvent && timeInfo && (
            <motion.div
              key={activeEvent.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Link
                to={`/actos/${activeEvent.id}`}
                className="block relative card-premium p-6 shadow-2xl shadow-black/5 border-l-[6px] border-l-[#BF360C] active:scale-[0.98] transition-all group"
              >
                <div className="flex justify-between items-center gap-6">
                  <div className="flex-1 min-w-0 space-y-3">
                    {/* Status badge */}
                    <span className="flex items-center text-[10px] font-black uppercase tracking-[0.15em] text-[#BF360C]">
                      <span className={`w-2 h-2 rounded-full mr-2 ${timeInfo.isCurrent ? 'bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]' : 'bg-[#BF360C]'}`} />
                      {timeInfo.isCurrent ? 'EN CURSO AHORA' : 'PRÓXIMO ACTO'}
                    </span>

                    <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-[#BF360C] transition-colors">{activeEvent.title}</h3>

                    <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-xs font-semibold">
                      <MapPin className="w-4 h-4 text-[#BF360C] shrink-0" />
                      <span className="truncate">{activeEvent.location_name}</span>
                    </div>

                    <div className="flex items-center gap-4 pt-1">
                      <div className="flex items-center gap-2 px-4 py-2 bg-[#BF360C]/10 text-[#BF360C] font-black rounded-2xl text-base shadow-sm">
                        <Clock className="w-4 h-4" />
                        {activeEvent.start_time.substring(0, 5)}
                      </div>
                      <div className={`text-[11px] font-black uppercase tracking-wide px-3 py-1.5 rounded-xl border ${timeInfo.isCurrent ? 'text-green-600 border-green-100 bg-green-50 dark:bg-green-900/10 dark:border-green-900/30' : 'text-slate-400 dark:text-slate-600 border-black/5 dark:border-white/5'}`}>
                        {timeInfo.label}
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-wider opacity-60">
                      {formatDayLabel(activeEvent.date)}
                    </p>
                  </div>

                  {/* Thumbnail */}
                  <div className="w-24 h-24 rounded-[28px] overflow-hidden shadow-xl border border-black/5 dark:border-white/5 shrink-0 relative">
                    <img
                      src={activeEvent.image_url || '/falla_monument_img.png'}
                      alt={activeEvent.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                  </div>
                </div>

                {/* Progress indicator dots */}
                <div className="flex justify-center gap-2 mt-6">
                  {events.map((_, i) => (
                    <button
                      key={i}
                      onClick={e => { e.preventDefault(); e.stopPropagation(); onSelect(i); }}
                      className={`h-1.5 rounded-full transition-all duration-500 ease-in-out ${
                        i === activeIdx 
                          ? 'bg-[#BF360C] w-8' 
                          : i === currentStartIdx 
                            ? 'bg-amber-400 w-3' 
                            : 'bg-black/10 dark:bg-white/10 w-1.5'
                      }`}
                    />
                  ))}
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
