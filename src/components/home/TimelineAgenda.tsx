export const TimelineAgenda = () => {
  const days = [
    {
      label: 'VIERNES, 10 ABRIL',
      title: 'Recepción · Pasacalles · Entrega de la Virgen',
      desc: 'Recepción de colegios, concurso DAMEL, pasacalles inaugural y ofrenda de la Virgen a la Parroquia Santiago.',
      color: 'bg-[#BF360C]',
      border: 'border-[#BF360C]/20'
    },
    {
      label: 'SÁBADO, 11 ABRIL',
      title: 'Crida · Mascletá DAMEL · Ofrenda Floral',
      desc: 'El día grande: recepción oficial en el ayuntamiento, La Crida y la emotiva Ofrenda Floral en La Redonda.',
      color: 'bg-rose-600',
      border: 'border-rose-600/20'
    },
    {
      label: 'DOMINGO, 12 ABRIL',
      title: 'Despertà · Paella Gigante · Cremà',
      desc: 'Pólvora matinal, gran desfile de Moros y Cristianos, Mascletá Family Cash y el fuego purificador de la Cremà.',
      color: 'bg-[#0E4E64]',
      border: 'border-[#0E4E64]/20'
    },
    {
      label: 'LUNES, 13 ABRIL',
      title: 'Regreso a Valencia · Despedida',
      desc: 'Recogida en los hoteles y fin del viaje tras unos días inolvidables disfrutando de las fallas en Logroño.',
      color: 'bg-slate-500',
      border: 'border-slate-500/20'
    }
  ];

  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Agenda del evento</h2>
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full border border-black/5 dark:border-white/10">4 DÍAS INTENSOS</span>
      </div>

      <div className="relative pl-8 space-y-10">
        <div className="absolute left-[3px] top-2 bottom-6 w-0.5 bg-black/5 dark:bg-white/10 shadow-inner"></div>

        {days.map((day, i) => (
          <div key={i} className="relative group">
            <div className={`absolute -left-10 top-1.5 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900 shadow-lg z-10 transition-transform group-hover:scale-125 ${day.color}`}></div>
            <div className="space-y-2 group-hover:translate-x-1 transition-transform">
              <span className={`text-[10px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-lg ${day.color.replace('bg-', 'text-').replace('[', '').replace(']', '')} bg-opacity-10 dark:bg-opacity-20 border border-current shadow-sm`}>
                {day.label}
              </span>
              <h4 className="text-lg font-black text-slate-900 dark:text-slate-100 leading-snug pt-1">{day.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-[280px]">
                {day.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
