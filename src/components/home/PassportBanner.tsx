export const PassportBanner = () => {
  const tags = ['🍳 Gastronomía', '🔥 Tradición', '🌙 Ocio', '⛪ Religioso'];
  
  return (
    <section className="pb-6">
      <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-[#0E4E64] via-[#1a7a9a] to-[#0E4E64] p-8 shadow-2xl shadow-[#0E4E64]/20 dark:shadow-none group cursor-pointer hover:shadow-cyan-100/50 dark:hover:shadow-cyan-900/20 transition-all active:scale-[0.98] border border-white/10">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 text-[140px] opacity-10 font-black leading-none select-none pointer-events-none group-hover:scale-110 transition-transform duration-700">🏅</div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-[32px] flex items-center justify-center text-5xl shrink-0 shadow-inner group-hover:rotate-12 transition-transform border border-white/20">🏅</div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-white font-black text-2xl tracking-tight leading-tight">Passport Cultural</h3>
            <p className="text-white/80 text-sm font-medium mt-2 leading-relaxed max-w-[320px] mx-auto sm:mx-0">
              Asiste a los actos, acumula sellos y desbloquea logros en tu experiencia fallera. ¡Completa los 4 días!
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2.5 mt-5">
              {tags.map(tag => (
                <span key={tag} className="px-4 py-2 bg-white/10 text-white text-[10px] font-black rounded-2xl border border-white/20 backdrop-blur-md shadow-sm group-hover:bg-white/20 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
