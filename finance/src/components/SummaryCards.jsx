import { useFinance } from '../context/FinanceContext';

export default function SummaryCards() {
  const { summaryData } = useFinance();

  const cards = [
    {
      title: 'Total Balance',
      value: `$${summaryData.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: 'account_balance_wallet',
      bgColor: 'bg-primary',
      trend: summaryData.balanceChange,
      trendUp: true,
      lightBg: 'bg-primary/5'
    },
    {
      title: 'Monthly Income',
      value: `$${summaryData.monthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: 'payments',
      bgColor: 'bg-success',
      trend: summaryData.incomeChange,
      trendUp: true,
      lightBg: 'bg-success/5'
    },
    {
      title: 'Monthly Expenses',
      value: `$${summaryData.monthlyExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: 'shopping_cart',
      bgColor: 'bg-error',
      trend: summaryData.expenseChange,
      trendUp: false,
      lightBg: 'bg-error/5'
    },
    {
      title: 'Savings Goal',
      value: `$${summaryData.savingsGoal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: 'savings',
      bgColor: 'bg-warning',
      trend: `${summaryData.savingsProgress}%`,
      trendUp: true,
      lightBg: 'bg-warning/5'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white/50 p-4 rounded-2xl border border-white hover-card-effect group shadow-premium opacity-90 hover:opacity-100"
        >
          <div className="flex justify-between items-start mb-3">
            <div className={`w-9 h-9 ${card.lightBg} text-primary rounded-lg flex items-center justify-center transition-all duration-200`}>
              <span className="material-symbols-outlined text-lg">{card.icon}</span>
            </div>
            <div className={`flex items-center gap-1 px-1.5 py-0.5 ${card.trendUp ? 'bg-success/10 text-success' : 'bg-error/10 text-error'} rounded-full text-[9px] font-bold`}>
              <span className="material-symbols-outlined text-[9px]">
                {card.trendUp ? 'arrow_upward' : 'arrow_downward'}
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
