export default function SummaryCards() {
  const cards = [
    {
      title: 'Total Balance',
      value: '$142,850.00',
      icon: 'account_balance_wallet',
      bgColor: 'bg-primary',
      trend: '+2.4%',
      lightBg: 'bg-primary/5'
    },
    {
      title: 'Monthly Income',
      value: '$12,400.00',
      icon: 'payments',
      bgColor: 'bg-success',
      trend: '+12%',
      lightBg: 'bg-success/5'
    },
    {
      title: 'Monthly Expenses',
      value: '$4,210.50',
      icon: 'shopping_cart',
      bgColor: 'bg-error',
      trend: '-8%',
      lightBg: 'bg-error/5'
    },
    {
      title: 'Savings Goal',
      value: '$85,000.00',
      icon: 'savings',
      bgColor: 'bg-warning',
      trend: '85%',
      lightBg: 'bg-warning/5'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white/50 p-4 rounded-2xl border border-white hover-card-effect group shadow-premium opacity-90 hover:opacity-100"
        >
          <div className="flex justify-between items-start mb-3">
            <div className={`w-9 h-9 ${card.lightBg} text-primary rounded-lg flex items-center justify-center transition-all duration-200 group-hover:${card.bgColor} group-hover:text-white`}>
              <span className="material-symbols-outlined text-lg">{card.icon}</span>
            </div>
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-success/10 text-success rounded-full text-[9px] font-bold">
              <span className="material-symbols-outlined text-[9px]">
                {card.title.includes('Expenses') ? 'arrow_downward' : 'arrow_upward'}
              </span>
              {card.trend}
            </div>
          </div>
          <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">
            {card.title}
          </p>
          <h4 className="text-lg font-black font-headline tracking-tight">{card.value}</h4>
        </div>
      ))}
    </div>
  );
}
