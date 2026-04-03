export default function InsightCards() {
  const insights = [
    {
      title: 'Housing Spike Detected',
      description: 'Housing costs rose by +5%. AI suggests reviewing contracts for $240 annual savings.',
      icon: 'insights',
      badge: 'Optimization',
      bgColor: 'bg-indigo-50/50',
      borderColor: 'border-indigo-100',
      badgeBg: 'bg-indigo-100',
      badgeText: 'text-indigo-700',
      iconBg: 'bg-white',
      iconColor: 'text-indigo-600',
      confidence: 80,
      progressColor: 'bg-indigo-500'
    },
    {
      title: 'Goal Performance',
      description: "Excellent! You've contributed an extra $400 surplus to your primary investment goal this month.",
      icon: 'stars',
      badge: 'Milestone',
      bgColor: 'bg-emerald-50/50',
      borderColor: 'border-emerald-100',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-700',
      iconBg: 'bg-white',
      iconColor: 'text-emerald-600',
      hasMilestone: true
    },
    {
      title: 'Subscription Waste',
      description: 'We found 2 idle subscriptions costing $45/mo. Deactivating these increases cash flow.',
      icon: 'bolt',
      badge: 'Alert',
      bgColor: 'bg-amber-50/50',
      borderColor: 'border-amber-100',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-700',
      iconBg: 'bg-white',
      iconColor: 'text-amber-600',
      hasAction: true,
      actionText: 'Review Now',
      actionColor: 'text-amber-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
      {insights.map((insight) => (
        <div
          key={insight.title}
          className={`${insight.bgColor} p-8 rounded-3xl ${insight.borderColor} border hover-card-effect flex flex-col gap-6 relative group`}
        >
          <div className="flex items-center justify-between">
            <div className={`w-11 h-11 ${insight.iconBg} ${insight.iconColor} rounded-2xl flex items-center justify-center shadow-soft border ${insight.borderColor}/50`}>
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                {insight.icon}
              </span>
            </div>
            <div className={`px-3 py-1 ${insight.badgeBg} text-[10px] font-black ${insight.badgeText} rounded-full uppercase tracking-widest`}>
              {insight.badge}
            </div>
          </div>

          <div>
            <h6 className="font-extrabold text-lg text-on-surface mb-2 tracking-tight">
              {insight.title}
            </h6>
            <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
              {insight.description}
            </p>
          </div>

          {insight.confidence && (
            <div className="mt-auto flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-indigo-100 rounded-full overflow-hidden">
                <div className={`w-3/4 h-full ${insight.progressColor}`}></div>
              </div>
              <span className="text-[10px] font-bold text-indigo-600">
                {insight.confidence}% Conf.
              </span>
            </div>
          )}

          {insight.hasMilestone && (
            <div className="mt-auto">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-xs">check</span>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-[9px]">
                  1/3
                </div>
              </div>
            </div>
          )}

          {insight.hasAction && (
            <button className={`mt-auto text-[11px] font-black ${insight.actionColor} uppercase tracking-[0.1em] flex items-center gap-1 hover:gap-2 transition-all duration-200`}>
              {insight.actionText}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
