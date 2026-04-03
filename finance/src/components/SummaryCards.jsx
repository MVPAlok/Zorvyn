import { useFinance, formatINR } from '../context/FinanceContext';
import { useState, useEffect } from 'react';

function AnimatedValue({ value, prefix = '' }) {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    setDisplay(value);
  }, [value]);
  return <span className="tabular-nums animate-count-up">{prefix}{display}</span>;
}

export default function SummaryCards() {
  const { summaryData } = useFinance();

  const cards = [
    {
      title: 'Total Balance',
      value: formatINR(summaryData.totalBalance),
      icon: 'account_balance_wallet',
      trend: summaryData.balanceChange,
      trendUp: true,
      gradient: 'from-indigo-500 to-violet-600',
      lightBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      glowColor: 'shadow-[0_0_20px_rgba(99,102,241,0.15)]',
    },
    {
      title: 'Monthly Income',
      value: formatINR(summaryData.monthlyIncome),
      icon: 'payments',
      trend: summaryData.incomeChange,
      trendUp: true,
      gradient: 'from-emerald-500 to-green-600',
      lightBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      glowColor: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
    },
    {
      title: 'Monthly Expenses',
      value: formatINR(summaryData.monthlyExpenses),
      icon: 'shopping_cart',
      trend: summaryData.expenseChange,
      trendUp: false,
      gradient: 'from-rose-500 to-red-600',
      lightBg: 'bg-rose-50',
      iconColor: 'text-rose-600',
      glowColor: 'shadow-[0_0_20px_rgba(239,68,68,0.12)]',
    },
    {
      title: 'Savings Goal',
      value: formatINR(summaryData.savingsGoal),
      icon: 'savings',
      trend: `${summaryData.savingsProgress}%`,
      trendUp: true,
      gradient: 'from-amber-500 to-orange-600',
      lightBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      glowColor: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]',
      hasProgress: true,
      progressValue: summaryData.savingsProgress,
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 stagger-children">
      {cards.map((card, idx) => (
        <div
          key={card.title}
          className={`animate-fade-in bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-white/80 hover-lift group cursor-pointer relative overflow-hidden ${card.glowColor} hover:shadow-card-hover`}
        >
          {/* Background shimmer on hover */}
          <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 from-primary to-primary-light pointer-events-none" />

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 ${card.lightBg} rounded-xl flex items-center justify-center transition-all duration-350 ease-smooth group-hover:scale-110 group-hover:shadow-soft`}>
                <span className={`material-symbols-outlined text-lg ${card.iconColor}`}>{card.icon}</span>
              </div>
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-all duration-300 ${
                card.trendUp ? 'bg-success/8 text-success' : 'bg-rose-50 text-rose-500'
              }`}>
                <span className="material-symbols-outlined text-[10px]">
                  {card.trendUp ? 'trending_up' : 'trending_down'}
                </span>
                {card.trend}
              </div>
            </div>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.15em] mb-1.5">
              {card.title}
            </p>
            <h4 className="text-xl font-black font-headline tracking-tight text-on-surface">
              <AnimatedValue value={card.value} />
            </h4>

            {/* Progress bar for savings */}
            {card.hasProgress && (
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000 ease-smooth"
                    style={{ width: `${card.progressValue}%` }}
                  />
                </div>
                <span className="text-[9px] font-bold text-amber-600">{card.progressValue}%</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
