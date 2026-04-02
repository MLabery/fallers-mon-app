export const HeroSection = () => {
  return (
    <div className="relative rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-black/50 h-[400px]">
      <img src="/fallas_hero_bg.png" alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/75" />

      {/* Vertical BG Text */}
      <div className="absolute top-10 left-4 text-white/10 font-black text-[120px] rotate-90 origin-top-left pointer-events-none select-none">
        FALLAS
      </div>

      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <span className="inline-block px-4 py-1.5 bg-[#007C91] text-white text-[10px] font-bold rounded-full uppercase tracking-widest mb-4 w-fit shadow-lg backdrop-blur-sm">
          EXPERIENCIA OFICIAL
        </span>
        <h1 className="text-white text-5xl font-black leading-[0.9] mb-3 drop-shadow-xl">
          Guía oficial <br /> para el <br /> asistente
        </h1>
        <p className="text-white/90 text-sm font-medium leading-relaxed max-w-[240px] drop-shadow-md">
          Vive la unión del fuego valenciano y la esencia de La Rioja.
        </p>
      </div>
    </div>
  );
};
