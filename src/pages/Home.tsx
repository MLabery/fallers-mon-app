import { useState, useMemo, useEffect } from 'react';
import { localEvents } from '../data/events';

// Sub-components
import { HomeHeader } from '../components/home/HomeHeader';
import { HeroSection } from '../components/home/HeroSection';
import { LiveEventsCarousel } from '../components/home/LiveEventsCarousel';
import { QuickActions } from '../components/home/QuickActions';
import { RoutesScroll } from '../components/home/RoutesScroll';
import { TimelineAgenda } from '../components/home/TimelineAgenda';
import { PassportBanner } from '../components/home/PassportBanner';

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Convert an event's date + start_time to a comparable JS Date */
function eventToDate(dateStr: string, timeStr: string): Date {
  return new Date(`${dateStr}T${timeStr}`);
}

/** How far away is the event from now? Returns a human-readable label */
function getEventLabel(eventDate: Date, now: Date): { label: string; isCurrent: boolean } {
  const diffMs = eventDate.getTime() - now.getTime();
  const diffMin = Math.round(diffMs / 60_000);

  if (diffMs < 0 && diffMs > -90 * 60_000) {
    // Event started in the last 90 minutes → consider it "happening now"
    return { label: 'EN CURSO AHORA', isCurrent: true };
  }
  if (diffMin <= 0) {
    return { label: 'YA COMENZÓ', isCurrent: false };
  }
  if (diffMin < 60) {
    return { label: `En ${diffMin} min`, isCurrent: false };
  }
  const hours = Math.floor(diffMin / 60);
  const mins = diffMin % 60;
  if (hours < 24) {
    return { label: mins > 0 ? `En ${hours}h ${mins}min` : `En ${hours}h`, isCurrent: false };
  }
  const days = Math.floor(hours / 24);
  return { label: `En ${days} día${days > 1 ? 's' : ''}`, isCurrent: false };
}

/** Format date label: "Viernes, 10 Abr" */
function formatDayLabel(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })
    .replace(/^./, c => c.toUpperCase());
}

// ── Component ─────────────────────────────────────────────────────────────────

const Home = () => {
  const [showToast, setShowToast] = useState(false);
  const [now, setNow] = useState(new Date());
  const [carouselIdx, setCarouselIdx] = useState(0);

  // Keep `now` refreshed every minute
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const handleNotification = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Sort all events chronologically, pick "current or upcoming" ones first
  const sortedEvents = useMemo(() => {
    return [...localEvents].sort((a, b) =>
      eventToDate(a.date, a.start_time).getTime() -
      eventToDate(b.date, b.start_time).getTime()
    );
  }, []);

  // Find the index of the first event that hasn't finished yet (started < 90 min ago OR in the future)
  const currentStartIdx = useMemo(() => {
    const idx = sortedEvents.findIndex(e => {
      const d = eventToDate(e.date, e.start_time);
      return d.getTime() > now.getTime() - 90 * 60_000;
    });
    return idx === -1 ? 0 : idx;
  }, [sortedEvents, now]);

  // When data or time changes, reset carousel to show the most current event
  useEffect(() => {
    setCarouselIdx(currentStartIdx);
  }, [currentStartIdx]);

  // Data for the carousel
  const activeEventDate = sortedEvents[carouselIdx]
    ? eventToDate(sortedEvents[carouselIdx].date, sortedEvents[carouselIdx].start_time)
    : null;
  const timeInfo = activeEventDate
    ? getEventLabel(activeEventDate, now)
    : null;

  return (
    <div className="bg-[var(--bg-main)] min-h-screen pb-60">
      <HomeHeader onNotificationClick={handleNotification} />

      <main className="px-5 space-y-12">
        <HeroSection />

        <LiveEventsCarousel 
          events={sortedEvents}
          activeIdx={carouselIdx}
          currentStartIdx={currentStartIdx}
          timeInfo={timeInfo}
          onPrev={() => setCarouselIdx(i => Math.max(0, i - 1))}
          onNext={() => setCarouselIdx(i => Math.min(sortedEvents.length - 1, i + 1))}
          onSelect={setCarouselIdx}
          formatDayLabel={formatDayLabel}
        />

        <QuickActions />

        <RoutesScroll />

        <TimelineAgenda />

        <PassportBanner />

        {/* Closing Branding Banner */}
        <section className="pb-10 pt-2">
          <div className="rounded-[40px] overflow-hidden shadow-2xl border border-black/5 dark:border-white/5 h-28 relative">
            <img src="/banner_logo_img.png" alt="Logroño 2026" className="w-full h-full object-cover dark:brightness-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          <div className="mt-8 flex flex-col items-center justify-center space-y-1.5 opacity-60">
            <p className="text-[11px] font-black tracking-[0.3em] text-[#BF360C] dark:text-[#E64A19] uppercase">Organizado por Fallers pel Món</p>
            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Logroño · Abril 2026</p>
          </div>
        </section>
      </main>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-slate-900/90 dark:bg-slate-800/90 backdrop-blur-xl text-white px-8 py-4 rounded-[24px] text-sm font-black shadow-2xl z-50 animate-bounce text-center whitespace-nowrap border border-white/20">
          No tienes notificaciones pendientes 🔔
        </div>
      )}
    </div>
  );
};


export default Home;
