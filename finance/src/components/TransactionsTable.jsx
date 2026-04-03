import { useState, useRef, useEffect } from 'react';
import { useFinance, formatINR } from '../context/FinanceContext';

const CATEGORY_COLORS = {
  Shopping: { bg: 'bg-amber-50', text: 'text-amber-600', activeBg: 'bg-amber-600' },
  Income: { bg: 'bg-emerald-50', text: 'text-emerald-600', activeBg: 'bg-emerald-600' },
  Food: { bg: 'bg-red-50', text: 'text-red-600', activeBg: 'bg-red-600' },
  Transport: { bg: 'bg-blue-50', text: 'text-blue-600', activeBg: 'bg-blue-600' },
  Subscription: { bg: 'bg-violet-50', text: 'text-violet-600', activeBg: 'bg-violet-600' },
  Grocery: { bg: 'bg-emerald-50', text: 'text-emerald-600', activeBg: 'bg-emerald-600' },
  Health: { bg: 'bg-pink-50', text: 'text-pink-600', activeBg: 'bg-pink-600' },
  Housing: { bg: 'bg-indigo-50', text: 'text-indigo-600', activeBg: 'bg-indigo-600' },
  Education: { bg: 'bg-cyan-50', text: 'text-cyan-600', activeBg: 'bg-cyan-600' },
};

export default function TransactionsTable() {
  const { state, dispatch, filteredTransactions, paginatedTransactions, totalPages, categories } = useFinance();
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef(null);
  const isAdmin = state.role === 'admin';

  useEffect(() => {
    function handleClickOutside(e) {
      if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });

  const handleSort = (field) => dispatch({ type: 'SET_SORT', payload: field });

  const SortIcon = ({ field }) => {
    if (state.filters.sortBy !== field) {
      return <span className="material-symbols-outlined text-[14px] opacity-20 ml-1 group-hover:opacity-50 transition-opacity">unfold_more</span>;
    }
    return (
      <span className="material-symbols-outlined text-[14px] text-primary ml-1 transition-transform duration-300" style={{ transform: state.filters.sortOrder === 'asc' ? 'rotate(0deg)' : 'rotate(180deg)' }}>
        arrow_upward
      </span>
    );
  };

  const highlightText = (text) => {
    const q = state.filters.searchQuery.trim();
    if (!q) return text;
    const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? <mark key={i} className="bg-primary/15 text-primary rounded px-0.5 font-bold">{part}</mark> : part
    );
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-premium border border-white/60 overflow-hidden animate-fade-in hover-glow" style={{ animationDelay: '0.35s' }}>
      {/* Header */}
      <div className="p-4 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
        <div>
          <h5 className="text-xl sm:text-2xl font-extrabold font-headline text-on-surface tracking-tight flex items-center gap-3">
            Recent Activity
            <span className="inline-flex items-center justify-center w-7 h-7 bg-primary/8 text-primary text-[11px] font-black rounded-lg tabular-nums">
              {filteredTransactions.length}
            </span>
          </h5>
          <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-1">
            Verified transaction ledger
            {state.filters.category !== 'All' && (
              <span className="text-primary font-bold ml-1">• {state.filters.category}</span>
            )}
            {state.filters.searchQuery && (
              <span className="text-primary font-bold ml-1">• "{state.filters.searchQuery}"</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile search */}
          <div className="relative sm:hidden">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-sm">search</span>
            <input type="text" placeholder="Search..." value={state.filters.searchQuery}
              onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
              className="bg-slate-50 border border-border/40 rounded-xl pl-9 pr-3 py-2.5 w-36 text-xs focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all" />
          </div>

          {/* Category Filter */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`pl-4 sm:pl-5 pr-10 sm:pr-12 py-2.5 border rounded-2xl text-xs font-bold flex items-center gap-2 transition-all duration-350 ease-smooth ${
                state.filters.category !== 'All'
                  ? 'bg-primary/5 border-primary/20 text-primary shadow-glow/20'
                  : 'bg-white/60 border-border/30 text-on-surface hover:bg-white hover:shadow-soft hover:border-primary/10'
              }`}
            >
              <span className="material-symbols-outlined text-lg">filter_list</span>
              <span className="hidden sm:inline">{state.filters.category === 'All' ? 'Category' : state.filters.category}</span>
              {state.filters.category !== 'All' && (
                <span className="absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer hover:text-error transition-colors"
                  onClick={(e) => { e.stopPropagation(); dispatch({ type: 'SET_CATEGORY_FILTER', payload: 'All' }); setFilterOpen(false); }}>
                  <span className="material-symbols-outlined text-sm">close</span>
                </span>
              )}
            </button>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 pointer-events-none text-lg transition-transform duration-300"
              style={{ transform: filterOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              expand_more
            </span>

            {filterOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white/95 backdrop-blur-xl rounded-2xl shadow-elevated border border-border/20 py-2 z-30 animate-fade-in-scale stagger-children" style={{ animationDuration: '0.2s' }}>
                {categories.map((cat, i) => (
                  <button key={cat}
                    onClick={() => { dispatch({ type: 'SET_CATEGORY_FILTER', payload: cat }); setFilterOpen(false); }}
                    className={`animate-fade-in w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center gap-3 transition-all duration-200 ${
                      state.filters.category === cat
                        ? 'bg-primary/5 text-primary font-bold'
                        : 'text-on-surface-variant hover:bg-slate-50 hover:text-on-surface'
                    }`}
                    style={{ animationDelay: `${i * 0.03}s` }}
                  >
                    {cat === 'All' ? (
                      <span className="material-symbols-outlined text-sm">select_all</span>
                    ) : (
                      <span className={`w-2 h-2 rounded-full ${CATEGORY_COLORS[cat]?.activeBg || 'bg-slate-400'}`} />
                    )}
                    {cat}
                    {state.filters.category === cat && <span className="material-symbols-outlined text-sm ml-auto">check</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isAdmin && (
            <button className="p-2.5 bg-white/60 border border-border/30 rounded-2xl text-on-surface-variant hover:text-on-surface hover:bg-white hover:shadow-soft transition-all duration-300 ease-smooth active:scale-95">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead className="bg-slate-50/50 text-on-surface-variant text-[10px] font-black uppercase tracking-[0.15em]">
            <tr>
              <th className="pl-6 sm:pl-10 pr-6 py-4">Category</th>
              <th className="px-6 py-4 cursor-pointer select-none hover:text-on-surface transition-colors group" onClick={() => handleSort('merchant')}>
                <span className="flex items-center">Merchant <SortIcon field="merchant" /></span>
              </th>
              <th className="px-6 py-4 cursor-pointer select-none hover:text-on-surface transition-colors group" onClick={() => handleSort('date')}>
                <span className="flex items-center">Date <SortIcon field="date" /></span>
              </th>
              <th className="px-6 py-4 text-right cursor-pointer select-none hover:text-on-surface transition-colors group" onClick={() => handleSort('amount')}>
                <span className="flex items-center justify-end">Amount <SortIcon field="amount" /></span>
              </th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="pl-6 pr-6 sm:pr-10 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50/80">
            {paginatedTransactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-16">
                  <div className="flex flex-col items-center gap-3 animate-fade-in">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl text-on-surface-variant/25">search_off</span>
                    </div>
                    <p className="text-sm text-on-surface-variant font-semibold">No transactions found</p>
                    <p className="text-xs text-on-surface-variant/50">Adjust your filters or search query</p>
                    <button
                      onClick={() => { dispatch({ type: 'SET_CATEGORY_FILTER', payload: 'All' }); dispatch({ type: 'SET_SEARCH', payload: '' }); }}
                      className="mt-2 px-5 py-2 text-xs font-bold text-primary bg-primary/5 hover:bg-primary/10 rounded-xl transition-all duration-300"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedTransactions.map((tx, idx) => {
                const color = CATEGORY_COLORS[tx.category] || { bg: 'bg-slate-50', text: 'text-slate-600' };
                const isIncome = tx.amount > 0;
                return (
                  <tr key={tx.id}
                    className="hover:bg-primary/[0.015] transition-all duration-250 ease-smooth group cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${idx * 0.04}s` }}
                  >
                    <td className="pl-6 sm:pl-10 pr-6 py-5 sm:py-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${color.bg} ${color.text} flex items-center justify-center transition-all duration-350 ease-smooth group-hover:scale-110 group-hover:shadow-soft`}>
                          <span className="material-symbols-outlined text-lg sm:text-xl">{tx.categoryIcon}</span>
                        </div>
                        <span className="font-bold text-xs sm:text-sm text-on-surface">{highlightText(tx.category)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 sm:py-6">
                      <p className="font-bold text-xs sm:text-sm text-on-surface">{highlightText(tx.merchant)}</p>
                      <p className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider mt-0.5">{highlightText(tx.detail)}</p>
                    </td>
                    <td className="px-6 py-5 sm:py-6 text-xs sm:text-sm font-semibold text-on-surface-variant whitespace-nowrap tabular-nums">
                      {formatDate(tx.date)}
                    </td>
                    <td className={`px-6 py-5 sm:py-6 text-right font-black text-xs sm:text-sm tabular-nums ${isIncome ? 'text-emerald-600' : 'text-on-surface'}`}>
                      {isIncome ? '+' : '-'}{formatINR(Math.abs(tx.amount))}
                    </td>
                    <td className="px-6 py-5 sm:py-6 text-center">
                      <span className={`inline-flex items-center gap-1 px-3 sm:px-4 py-1.5 text-[10px] font-black rounded-xl uppercase tracking-wider border transition-all duration-300 ${
                        tx.status === 'Settled'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${tx.status === 'Settled' ? 'bg-emerald-500' : 'bg-amber-500 animate-dot-pulse'}`} />
                        {tx.status}
                      </span>
                    </td>
                    <td className="pl-6 pr-6 sm:pr-10 py-5 sm:py-6 text-right">
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-transparent group-hover:bg-white group-hover:shadow-soft text-on-surface-variant/40 group-hover:text-primary transition-all duration-300 ease-smooth">
                        <span className="material-symbols-outlined text-lg">chevron_right</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 sm:p-8 bg-slate-50/20 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest tabular-nums">
          Showing{' '}
          <span className="text-on-surface">{Math.min((state.currentPage - 1) * state.itemsPerPage + 1, filteredTransactions.length)}–{Math.min(state.currentPage * state.itemsPerPage, filteredTransactions.length)}</span>
          {' '}of {filteredTransactions.length} records
        </p>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-xl hover:bg-white hover:shadow-soft text-on-surface-variant transition-all duration-300 ease-smooth disabled:opacity-20 active:scale-90"
              disabled={state.currentPage <= 1}
              onClick={() => dispatch({ type: 'SET_PAGE', payload: state.currentPage - 1 })}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button key={page}
                  onClick={() => dispatch({ type: 'SET_PAGE', payload: page })}
                  className={`w-9 h-9 rounded-xl font-bold text-xs transition-all duration-350 ease-smooth ${
                    state.currentPage === page
                      ? 'primary-gradient text-white shadow-glow scale-105'
                      : 'hover:bg-white border border-transparent hover:border-slate-100 text-on-surface-variant hover:shadow-soft'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              className="p-2 rounded-xl hover:bg-white hover:shadow-soft text-on-surface-variant transition-all duration-300 ease-smooth disabled:opacity-20 active:scale-90"
              disabled={state.currentPage >= totalPages}
              onClick={() => dispatch({ type: 'SET_PAGE', payload: state.currentPage + 1 })}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
