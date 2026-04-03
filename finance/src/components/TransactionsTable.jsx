import { useState } from 'react';

export default function TransactionsTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const transactions = [
    {
      id: 1,
      category: 'Retail',
      categoryIcon: 'storefront',
      categoryColor: 'indigo',
      merchant: 'Apple Store Online',
      detail: 'Electronics • Order #4211',
      date: 'Oct 24, 2023',
      amount: '-$1,299.00',
      amountColor: 'text-on-surface',
      status: 'Settled',
      statusColor: 'bg-emerald-50 text-emerald-600 border-emerald-100'
    },
    {
      id: 2,
      category: 'Business',
      categoryIcon: 'work',
      categoryColor: 'emerald',
      merchant: 'Stripe SaaS Payout',
      detail: 'Monthly Recurring Revenue',
      date: 'Oct 22, 2023',
      amount: '+$8,450.00',
      amountColor: 'text-emerald-600',
      status: 'Settled',
      statusColor: 'bg-emerald-50 text-emerald-600 border-emerald-100'
    },
    {
      id: 3,
      category: 'Dining',
      categoryIcon: 'restaurant',
      categoryColor: 'amber',
      merchant: 'The Golden Grill',
      detail: 'Entertainment • Client Dinner',
      date: 'Oct 21, 2023',
      amount: '-$184.20',
      amountColor: 'text-on-surface',
      status: 'Pending',
      statusColor: 'bg-amber-50 text-amber-600 border-amber-100'
    }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-premium border border-border/30 overflow-hidden animate-fade-in" style={{ animationDelay: '0.5s' }}>
      {/* Header */}
      <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h5 className="text-2xl font-extrabold font-headline text-on-surface tracking-tight">
            Recent Activity
          </h5>
          <p className="text-sm text-on-surface-variant font-medium mt-1">
            Verified transaction ledger
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <button className="pl-5 pr-12 py-2.5 bg-slate-50 border border-border/40 rounded-xl text-xs font-bold text-on-surface hover:bg-white hover:shadow-soft transition-all duration-200 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">filter_list</span>
              Category
            </button>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none group-hover:text-primary transition-colors">
              expand_more
            </span>
          </div>
          <button className="p-2.5 bg-slate-50 border border-border/40 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-white hover:shadow-soft transition-all duration-200 active:scale-95">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/60 text-on-surface-variant text-[10px] font-black uppercase tracking-[0.15em]">
            <tr>
              <th className="pl-10 pr-6 py-4">Category</th>
              <th className="px-6 py-4">Merchant Details</th>
              <th className="px-6 py-4">Post Date</th>
              <th className="px-6 py-4 text-right">Amount</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="pl-6 pr-10 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-slate-50/50 transition-all duration-200 group cursor-pointer">
                <td className="pl-10 pr-6 py-8">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-${transaction.categoryColor}-50 text-${transaction.categoryColor}-600 flex items-center justify-center transition-all duration-200 group-hover:bg-${transaction.categoryColor}-600 group-hover:text-white`}>
                      <span className="material-symbols-outlined text-xl">
                        {transaction.categoryIcon}
                      </span>
                    </div>
                    <span className="font-bold text-sm text-on-surface">
                      {transaction.category}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-8">
                  <p className="font-bold text-sm text-on-surface">{transaction.merchant}</p>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mt-0.5">
                    {transaction.detail}
                  </p>
                </td>
                <td className="px-6 py-8 text-sm font-semibold text-on-surface-variant">
                  {transaction.date}
                </td>
                <td className={`px-6 py-8 text-right font-black text-sm ${transaction.amountColor}`}>
                  {transaction.amount}
                </td>
                <td className="px-6 py-8 text-center">
                  <span className={`px-4 py-1.5 ${transaction.statusColor} text-[10px] font-black rounded-lg uppercase tracking-wider border`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="pl-6 pr-10 py-8 text-right">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-transparent group-hover:bg-white group-hover:shadow-soft text-on-surface-variant transition-all">
                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with Pagination */}
      <div className="p-8 bg-slate-50/30 border-t border-slate-50 flex items-center justify-between">
        <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">
          Showing <span className="text-on-surface">3</span> of 128 verified records
        </p>
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-lg hover:bg-white hover:shadow-soft text-on-surface-variant transition-all duration-200 disabled:opacity-20"
            disabled
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <div className="flex gap-1">
            <button className="w-8 h-8 rounded-lg primary-gradient text-white font-bold text-xs shadow-glow">
              1
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-white border border-transparent hover:border-slate-100 font-bold text-xs text-on-surface-variant transition-all duration-200">
              2
            </button>
          </div>
          <button className="p-2 rounded-lg hover:bg-white hover:shadow-soft text-on-surface-variant transition-all duration-200">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}
