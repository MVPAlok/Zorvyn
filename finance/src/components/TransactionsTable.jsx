import { useState, useRef, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';

const CATEGORY_COLORS = {
  Retail: { bg: 'bg-amber-50', text: 'text-amber-600', activeBg: 'bg-amber-600' },
  Business: { bg: 'bg-emerald-50', text: 'text-emerald-600', activeBg: 'bg-emerald-600' },
  Dining: { bg: 'bg-red-50', text: 'text-red-600', activeBg: 'bg-red-600' },
  Transport: { bg: 'bg-blue-50', text: 'text-blue-600', activeBg: 'bg-blue-600' },
  Subscription: { bg: 'bg-violet-50', text: 'text-violet-600', activeBg: 'bg-violet-600' },
  Grocery: { bg: 'bg-emerald-50', text: 'text-emerald-600', activeBg: 'bg-emerald-600' },
  Health: { bg: 'bg-pink-50', text: 'text-pink-600', activeBg: 'bg-pink-600' },
  Housing: { bg: 'bg-indigo-50', text: 'text-indigo-600', activeBg: 'bg-indigo-600' },
};

export default function TransactionsTable() {
  const {
    state,
    dispatch,
    filteredTransactions,
    paginatedTransactions,
    totalPages,
    categories,
  } = useFinance();

  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef(null);
  const isAdmin = state.role === 'admin';

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setFilterOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleSort = (field) => {
    dispatch({ type: 'SET_SORT', payload: field });
  };

  const SortIcon = ({ field }) => {
    if (state.filters.sortBy !== field) {
      return <span className="material-symbols-outlined text-[14px] opacity-30 ml-1">unfold_more</span>;
    }
    return (
      <span className="material-symbols-outlined text-[14px] text-primary ml-1">
        {state.filters.sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward'}
      </span>
    );
  };

  // Highlight matching text
  const highlightText = (text) => {
    const q = state.filters.searchQuery.trim();
    if (!q) return text;
    const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-primary/20 text-primary rounded px-0.5">{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-premium border border-border/30 overflow-hidden animate-fade-in" style={{ animationDelay: '0.5s' }}>
      {/* Header */}
      <div className="p-4 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
        <div>
          <h5 className="text-xl sm:text-2xl font-extrabold font-headline text-on-surface tracking-tight">
            Recent Activity
          </h5>
          <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-1">
            {filteredTransactions.length} verified record{filteredTransactions.length !== 1 ? 's' : ''}
            {state.filters.category !== 'All' && (
              <span className="text-primary font-bold"> • {state.filters.category}</span>
            )}
            {state.filters.searchQuery && (
              <span className="text-primary font-bold"> • "{state.filters.searchQuery}"</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile search */}
          <div className="relative group sm:hidden">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-sm">
              search
            </span>
            <input
              type="text"
              placeholder="Search..."
              value={state.filters.searchQuery}
              onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
              className="bg-slate-50 border border-border/40 rounded-xl pl-9 pr-3 py-2.5 w-36 text-xs focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all"
            />
          </div>

          {/* Category Filter Dropdown */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`pl-4 sm:pl-5 pr-10 sm:pr-12 py-2.5 border rounded-xl text-xs font-bold flex items-center gap-2 transition-all duration-200 ${
                state.filters.category !== 'All'
                  ? 'bg-primary/5 border-primary/30 text-primary'
                  : 'bg-slate-50 border-border/40 text-on-surface hover:bg-white hover:shadow-soft'
              }`}
            >
              <span className="material-symbols-outlined text-lg">filter_list</span>
              <span className="hidden sm:inline">{state.filters.category === 'All' ? 'Category' : state.filters.category}</span>
              {state.filters.category !== 'All' && (
                <span
                  className="absolute right-8 top-1/2 -translate-y-1/2 text-primary/60 hover:text-primary cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({ type: 'SET_CATEGORY_FILTER', payload: 'All' });
                    setFilterOpen(false);
                  }}
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </span>
              )}
            </button>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none text-lg">
              {filterOpen ? 'expand_less' : 'expand_more'}
            </span>

            {/* Dropdown */}
            {filterOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-elevated border border-border/30 py-2 z-30 animate-fade-in">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      dispatch({ type: 'SET_CATEGORY_FILTER', payload: cat });
                      setFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center gap-3 transition-all duration-150 ${
                      state.filters.category === cat
                        ? 'bg-primary/5 text-primary font-bold'
                        : 'text-on-surface-variant hover:bg-slate-50 hover:text-on-surface'
                    }`}
                  >
                    {cat === 'All' ? (
                      <span className="material-symbols-outlined text-sm">select_all</span>
                    ) : (
                      <span className={`w-2 h-2 rounded-full ${CATEGORY_COLORS[cat]?.activeBg || 'bg-slate-400'}`}></span>
                    )}
                    {cat}
                    {state.filters.category === cat && (
                      <span className="material-symbols-outlined text-sm ml-auto">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isAdmin && (
            <button className="p-2.5 bg-slate-50 border border-border/40 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-white hover:shadow-soft transition-all duration-200 active:scale-95">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead className="bg-slate-50/60 text-on-surface-variant text-[10px] font-black uppercase tracking-[0.15em]">
            <tr>
              <th className="pl-6 sm:pl-10 pr-6 py-4">Category</th>
              <th
                className="px-6 py-4 cursor-pointer select-none hover:text-on-surface transition-colors group"
                onClick={() => handleSort('merchant')}
              >
                <span className="flex items-center">
                  Merchant Details
                  <SortIcon field="merchant" />
                </span>
              </th>
              <th
                className="px-6 py-4 cursor-pointer select-none hover:text-on-surface transition-colors group"
                onClick={() => handleSort('date')}
              >
                <span className="flex items-center">
                  Post Date
                  <SortIcon field="date" />
                </span>
              </th>
              <th
                className="px-6 py-4 text-right cursor-pointer select-none hover:text-on-surface transition-colors group"
                onClick={() => handleSort('amount')}
              >
                <span className="flex items-center justify-end">
                  Amount
                  <SortIcon field="amount" />
                </span>
              </th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="pl-6 pr-6 sm:pr-10 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {paginatedTransactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-16">
                  <div className="flex flex-col items-center gap-3">
                    <span className="material-symbols-outlined text-4xl text-on-surface-variant/30">search_off</span>
                    <p className="text-sm text-on-surface-variant font-medium">No transactions found</p>
                    <p className="text-xs text-on-surface-variant/60">Try adjusting your filters or search query</p>
                    <button
                      onClick={() => {
                        dispatch({ type: 'SET_CATEGORY_FILTER', payload: 'All' });
                        dispatch({ type: 'SET_SEARCH', payload: '' });
                      }}
                      className="mt-2 px-4 py-2 text-xs font-bold text-primary hover:bg-primary/5 rounded-lg transition-all"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedTransactions.map((transaction) => {
                const color = CATEGORY_COLORS[transaction.category] || { bg: 'bg-slate-50', text: 'text-slate-600', activeBg: 'bg-slate-600' };
                const isIncome = transaction.amount > 0;

                return (
                  <tr key={transaction.id} className="hover:bg-slate-50/50 transition-all duration-200 group cursor-pointer">
                    <td className="pl-6 sm:pl-10 pr-6 py-6 sm:py-8">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${color.bg} ${color.text} flex items-center justify-center transition-all duration-200 group-hover:${color.activeBg} group-hover:text-white`}>
                          <span className="material-symbols-outlined text-lg sm:text-xl">
                            {transaction.categoryIcon}
                          </span>
                        </div>
                        <span className="font-bold text-xs sm:text-sm text-on-surface">
                          {highlightText(transaction.category)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6 sm:py-8">
                      <p className="font-bold text-xs sm:text-sm text-on-surface">{highlightText(transaction.merchant)}</p>
                      <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mt-0.5">
                        {highlightText(transaction.detail)}
                      </p>
                    </td>
                    <td className="px-6 py-6 sm:py-8 text-xs sm:text-sm font-semibold text-on-surface-variant whitespace-nowrap">
                      {formatDate(transaction.date)}
                    </td>
                    <td className={`px-6 py-6 sm:py-8 text-right font-black text-xs sm:text-sm ${isIncome ? 'text-emerald-600' : 'text-on-surface'}`}>
                      {isIncome ? '+' : '-'}${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-6 sm:py-8 text-center">
                      <span className={`px-3 sm:px-4 py-1.5 text-[10px] font-black rounded-lg uppercase tracking-wider border ${
                        transaction.status === 'Settled'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="pl-6 pr-6 sm:pr-10 py-6 sm:py-8 text-right">
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-transparent group-hover:bg-white group-hover:shadow-soft text-on-surface-variant transition-all">
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

      {/* Footer with Pagination */}
      <div className="p-4 sm:p-8 bg-slate-50/30 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">
          Showing{' '}
          <span className="text-on-surface">
            {Math.min((state.currentPage - 1) * state.itemsPerPage + 1, filteredTransactions.length)}–
            {Math.min(state.currentPage * state.itemsPerPage, filteredTransactions.length)}
          </span>{' '}
          of {filteredTransactions.length} records
        </p>
        {totalPages > 1 && (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className="p-2 rounded-lg hover:bg-white hover:shadow-soft text-on-surface-variant transition-all duration-200 disabled:opacity-20"
              disabled={state.currentPage <= 1}
              onClick={() => dispatch({ type: 'SET_PAGE', payload: state.currentPage - 1 })}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => dispatch({ type: 'SET_PAGE', payload: page })}
                  className={`w-8 h-8 rounded-lg font-bold text-xs transition-all duration-200 ${
                    state.currentPage === page
                      ? 'primary-gradient text-white shadow-glow'
                      : 'hover:bg-white border border-transparent hover:border-slate-100 text-on-surface-variant'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              className="p-2 rounded-lg hover:bg-white hover:shadow-soft text-on-surface-variant transition-all duration-200 disabled:opacity-20"
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
