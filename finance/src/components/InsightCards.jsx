import { useFinance } from '../context/FinanceContext';

export default function InsightCards() {
  const { insights } = useFinance();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 stagger-children">
      {insights.map((insight, idx) => (
        <div
          key={insight.title}
          className={`animate-fade-in ${insight.bgColor} p-6 sm:p-7 rounded-3xl ${insight.borderColor} border hover-lift flex flex-col gap-4 sm:gap-5 relative group overflow-hidden cursor-pointer`}
        >
          {/* Hover shimmer overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute inset-0 animate-shimmer" />
          </div>

          <div className="flex items-center justify-between relative z-10">
            <div className={`w-10 h-10 sm:w-11 sm:h-11 ${insight.iconBg} ${insight.iconColor} rounded-2xl flex items-center justify-center shadow-soft border ${insight.borderColor}/50 transition-all duration-350 ease-smooth group-hover:scale-110 group-hover:shadow-premium`}>
              <span className="material-symbols-outlined text-xl sm:text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                {insight.icon}
              </span>
            </div>
            <div className={`px-3 py-1 ${insight.badgeBg} text-[10px] font-black ${insight.badgeText} rounded-full uppercase tracking-widest transition-all duration-300 group-hover:scale-105`}>
              {insight.badge}
            </div>
          </div>

          <div className="relative z-10">
            <h6 className="font-extrabold text-base sm:text-lg text-on-surface mb-2 tracking-tight group-hover:text-primary transition-colors duration-300">
              {insight.title}
            </h6>
            <p className="text-xs sm:text-sm text-on-surface-variant font-medium leading-relaxed">
              {insight.description}
            </p>
          </div>

          {insight.confidence && (
            <div className="mt-auto flex items-center gap-2 relative z-10">
              <div className="flex-1 h-1.5 bg-indigo-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${insight.progressColor} rounded-full`}
                  style={{
                    width: `${insight.confidence}%`,
                    transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              </div>
              <span className="text-[10px] font-bold text-indigo-600 tabular-nums">
                {insight.confidence}% Conf.
              </span>
            </div>
          )}

          {insight.hasMilestone && (
            <div className="mt-auto relative z-10">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-xs">check</span>
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-[9px]">
                    2/3
                  </div>
                </div>
                <div className="flex-1 h-1.5 bg-emerald-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full w-2/3" style={{ transition: 'width 1s ease' }} />
                </div>
              </div>
            </div>
          )}

          {insight.hasAction && (
            <button className={`mt-auto text-[11px] font-black ${insight.actionColor} uppercase tracking-[0.12em] flex items-center gap-1.5 hover:gap-3 transition-all duration-350 ease-smooth relative z-10 group/btn`}>
              {insight.actionText}
              <span className="material-symbols-outlined text-sm transition-transform duration-300 group-hover/btn:translate-x-0.5">arrow_forward</span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
