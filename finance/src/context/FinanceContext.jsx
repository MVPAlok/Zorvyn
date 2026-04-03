import { createContext, useContext, useReducer, useMemo } from 'react';

// ─── Mock Transaction Data ────────────────────────────────────────────
const TRANSACTIONS = [
  { id: 1, category: 'Retail', categoryIcon: 'storefront', merchant: 'Apple Store Online', detail: 'Electronics • Order #4211', date: '2023-10-24', amount: -1299.00, status: 'Settled' },
  { id: 2, category: 'Business', categoryIcon: 'work', merchant: 'Stripe SaaS Payout', detail: 'Monthly Recurring Revenue', date: '2023-10-22', amount: 8450.00, status: 'Settled' },
  { id: 3, category: 'Dining', categoryIcon: 'restaurant', merchant: 'The Golden Grill', detail: 'Entertainment • Client Dinner', date: '2023-10-21', amount: -184.20, status: 'Pending' },
  { id: 4, category: 'Transport', categoryIcon: 'directions_car', merchant: 'Uber Rides', detail: 'Transportation • 12 trips', date: '2023-10-20', amount: -67.50, status: 'Settled' },
  { id: 5, category: 'Subscription', categoryIcon: 'subscriptions', merchant: 'Netflix Premium', detail: 'Entertainment • Monthly', date: '2023-10-19', amount: -22.99, status: 'Settled' },
  { id: 6, category: 'Grocery', categoryIcon: 'local_grocery_store', merchant: 'Whole Foods Market', detail: 'Groceries • Weekly', date: '2023-10-18', amount: -156.30, status: 'Settled' },
  { id: 7, category: 'Business', categoryIcon: 'work', merchant: 'Freelance Project', detail: 'Design Consultation', date: '2023-10-17', amount: 2200.00, status: 'Settled' },
  { id: 8, category: 'Health', categoryIcon: 'health_and_safety', merchant: 'CVS Pharmacy', detail: 'Health • Prescription', date: '2023-10-16', amount: -45.00, status: 'Settled' },
  { id: 9, category: 'Subscription', categoryIcon: 'subscriptions', merchant: 'Spotify Family', detail: 'Entertainment • Monthly', date: '2023-10-15', amount: -16.99, status: 'Settled' },
  { id: 10, category: 'Retail', categoryIcon: 'storefront', merchant: 'Amazon.com', detail: 'Home Office • Desk Lamp', date: '2023-10-14', amount: -89.99, status: 'Settled' },
  { id: 11, category: 'Transport', categoryIcon: 'directions_car', merchant: 'Shell Gas Station', detail: 'Fuel • Regular', date: '2023-10-13', amount: -52.40, status: 'Settled' },
  { id: 12, category: 'Business', categoryIcon: 'work', merchant: 'Client Invoice #892', detail: 'Web Development', date: '2023-10-12', amount: 3500.00, status: 'Pending' },
  { id: 13, category: 'Dining', categoryIcon: 'restaurant', merchant: 'Starbucks Reserve', detail: 'Coffee • 5 visits', date: '2023-10-11', amount: -32.50, status: 'Settled' },
  { id: 14, category: 'Housing', categoryIcon: 'home', merchant: 'Rent Payment', detail: 'Housing • Monthly', date: '2023-10-01', amount: -2100.00, status: 'Settled' },
  { id: 15, category: 'Housing', categoryIcon: 'home', merchant: 'Con Edison', detail: 'Utilities • Electric', date: '2023-10-05', amount: -142.80, status: 'Settled' },
  { id: 16, category: 'Grocery', categoryIcon: 'local_grocery_store', merchant: 'Trader Joe\'s', detail: 'Groceries • Weekly', date: '2023-10-10', amount: -98.60, status: 'Settled' },
  { id: 17, category: 'Health', categoryIcon: 'health_and_safety', merchant: 'Equinox Gym', detail: 'Fitness • Monthly', date: '2023-10-02', amount: -89.00, status: 'Settled' },
  { id: 18, category: 'Subscription', categoryIcon: 'subscriptions', merchant: 'Adobe Creative Cloud', detail: 'Software • Monthly', date: '2023-10-03', amount: -54.99, status: 'Settled' },
  { id: 19, category: 'Retail', categoryIcon: 'storefront', merchant: 'Nike Online', detail: 'Apparel • Running Shoes', date: '2023-10-08', amount: -134.99, status: 'Settled' },
  { id: 20, category: 'Business', categoryIcon: 'work', merchant: 'Dividend Payment', detail: 'Investment • Q3 2023', date: '2023-10-09', amount: 250.00, status: 'Settled' },
];

// ─── Monthly Balance Trend Data ───────────────────────────────────────
const MONTHLY_BALANCE_DATA = [
  { month: 'May', value: 118200 },
  { month: 'Jun', value: 122450 },
  { month: 'Jul', value: 119800 },
  { month: 'Aug', value: 128900 },
  { month: 'Sep', value: 135600 },
  { month: 'Oct', value: 142850 },
];

const QUARTERLY_BALANCE_DATA = [
  { month: 'Q1', value: 98500 },
  { month: 'Q2', value: 115200 },
  { month: 'Q3', value: 128900 },
  { month: 'Q4', value: 142850 },
];

// ─── Reducer ──────────────────────────────────────────────────────────
const initialState = {
  transactions: TRANSACTIONS,
  role: 'admin', // 'admin' | 'viewer'
  filters: {
    category: 'All',
    searchQuery: '',
    sortBy: 'date',       // 'date' | 'amount' | 'merchant'
    sortOrder: 'desc',    // 'asc' | 'desc'
  },
  timeRange: 'monthly',  // 'monthly' | 'quarterly'
  currentPage: 1,
  itemsPerPage: 5,
  sidebarOpen: false,     // mobile sidebar
};

function financeReducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'SET_CATEGORY_FILTER':
      return { ...state, filters: { ...state.filters, category: action.payload }, currentPage: 1 };
    case 'SET_SEARCH':
      return { ...state, filters: { ...state.filters, searchQuery: action.payload }, currentPage: 1 };
    case 'SET_SORT':
      return {
        ...state,
        filters: {
          ...state.filters,
          sortBy: action.payload,
          sortOrder: state.filters.sortBy === action.payload
            ? (state.filters.sortOrder === 'asc' ? 'desc' : 'asc')
            : 'desc',
        },
      };
    case 'SET_TIME_RANGE':
      return { ...state, timeRange: action.payload };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'CLOSE_SIDEBAR':
      return { ...state, sidebarOpen: false };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────
const FinanceContext = createContext(null);

export function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  // ── Derived: Filtered + Sorted Transactions ──
  const filteredTransactions = useMemo(() => {
    let result = [...state.transactions];

    // Category filter
    if (state.filters.category !== 'All') {
      result = result.filter(t => t.category === state.filters.category);
    }

    // Search
    if (state.filters.searchQuery.trim()) {
      const q = state.filters.searchQuery.toLowerCase();
      result = result.filter(t =>
        t.merchant.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.detail.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      let cmp = 0;
      switch (state.filters.sortBy) {
        case 'date':
          cmp = new Date(a.date) - new Date(b.date);
          break;
        case 'amount':
          cmp = a.amount - b.amount;
          break;
        case 'merchant':
          cmp = a.merchant.localeCompare(b.merchant);
          break;
        default:
          cmp = 0;
      }
      return state.filters.sortOrder === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [state.transactions, state.filters]);

  // ── Pagination ──
  const totalPages = Math.ceil(filteredTransactions.length / state.itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (state.currentPage - 1) * state.itemsPerPage,
    state.currentPage * state.itemsPerPage
  );

  // ── Derived: Categories List ──
  const categories = useMemo(() => {
    const cats = [...new Set(state.transactions.map(t => t.category))];
    return ['All', ...cats.sort()];
  }, [state.transactions]);

  // ── Derived: Summary Data ──
  const summaryData = useMemo(() => {
    const totalIncome = state.transactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = Math.abs(
      state.transactions
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + t.amount, 0)
    );
    return {
      totalBalance: 142850,
      monthlyIncome: totalIncome,
      monthlyExpenses: totalExpenses,
      savingsGoal: 85000,
      savingsProgress: 85,
      incomeChange: '+12%',
      expenseChange: '-8%',
      balanceChange: '+2.4%',
    };
  }, [state.transactions]);

  // ── Derived: Category Breakdown ──
  const categoryBreakdown = useMemo(() => {
    const breakdown = {};
    state.transactions.forEach(t => {
      if (t.amount < 0) {
        const cat = t.category;
        breakdown[cat] = (breakdown[cat] || 0) + Math.abs(t.amount);
      }
    });
    const sorted = Object.entries(breakdown)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
    const total = sorted.reduce((s, c) => s + c.value, 0);
    return sorted.map(c => ({ ...c, percentage: ((c.value / total) * 100).toFixed(1) }));
  }, [state.transactions]);

  // ── Derived: Balance Trend ──
  const balanceTrend = state.timeRange === 'monthly'
    ? MONTHLY_BALANCE_DATA
    : QUARTERLY_BALANCE_DATA;

  // ── Derived: Insights ──
  const insights = useMemo(() => {
    const result = [];
    // Highest expense category
    if (categoryBreakdown.length > 0) {
      const top = categoryBreakdown[0];
      result.push({
        title: `${top.name} Spike Detected`,
        description: `${top.name} costs are your highest expense at $${top.value.toLocaleString('en-US', { minimumFractionDigits: 2 })} (${top.percentage}%). Review for potential savings.`,
        icon: 'insights',
        badge: 'Optimization',
        bgColor: 'bg-indigo-50/50',
        borderColor: 'border-indigo-100',
        badgeBg: 'bg-indigo-100',
        badgeText: 'text-indigo-700',
        iconBg: 'bg-white',
        iconColor: 'text-indigo-600',
        confidence: 80,
        progressColor: 'bg-indigo-500',
      });
    }
    // Savings milestone
    result.push({
      title: 'Goal Performance',
      description: `Excellent! You've contributed an extra $400 surplus to your primary investment goal this month. Savings at ${summaryData.savingsProgress}%.`,
      icon: 'stars',
      badge: 'Milestone',
      bgColor: 'bg-emerald-50/50',
      borderColor: 'border-emerald-100',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-700',
      iconBg: 'bg-white',
      iconColor: 'text-emerald-600',
      hasMilestone: true,
    });
    // Subscription alert
    const subTotal = state.transactions
      .filter(t => t.category === 'Subscription' && t.amount < 0)
      .reduce((s, t) => s + Math.abs(t.amount), 0);
    const subCount = state.transactions.filter(t => t.category === 'Subscription').length;
    result.push({
      title: 'Subscription Audit',
      description: `Found ${subCount} active subscriptions totaling $${subTotal.toFixed(2)}/mo. Review idle ones to increase cash flow.`,
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
      actionColor: 'text-amber-600',
    });
    return result;
  }, [categoryBreakdown, summaryData, state.transactions]);

  const value = {
    state,
    dispatch,
    filteredTransactions,
    paginatedTransactions,
    totalPages,
    categories,
    summaryData,
    categoryBreakdown,
    balanceTrend,
    insights,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error('useFinance must be used within FinanceProvider');
  return ctx;
}
