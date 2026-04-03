import { createContext, useContext, useReducer, useMemo } from 'react';

// ─── Indian Mock Transaction Data ─────────────────────────────────────
const TRANSACTIONS = [
  { id: 1, category: 'Shopping', categoryIcon: 'storefront', merchant: 'Flipkart Online', detail: 'Electronics • Order #IN4211', date: '2023-10-24', amount: -32999.00, status: 'Settled' },
  { id: 2, category: 'Income', categoryIcon: 'work', merchant: 'TCS Salary Credit', detail: 'Monthly Salary • Oct 2023', date: '2023-10-01', amount: 185000.00, status: 'Settled' },
  { id: 3, category: 'Food', categoryIcon: 'restaurant', merchant: 'Swiggy', detail: 'Food Delivery • 8 orders', date: '2023-10-21', amount: -2840.00, status: 'Settled' },
  { id: 4, category: 'Transport', categoryIcon: 'directions_car', merchant: 'Ola Cabs', detail: 'Rides • 15 trips', date: '2023-10-20', amount: -3670.00, status: 'Settled' },
  { id: 5, category: 'Subscription', categoryIcon: 'subscriptions', merchant: 'Netflix India', detail: 'Entertainment • Monthly', date: '2023-10-19', amount: -649.00, status: 'Settled' },
  { id: 6, category: 'Grocery', categoryIcon: 'local_grocery_store', merchant: 'BigBasket', detail: 'Groceries • Weekly Order', date: '2023-10-18', amount: -4560.00, status: 'Settled' },
  { id: 7, category: 'Income', categoryIcon: 'work', merchant: 'Freelance — Upwork', detail: 'UI/UX Design Project', date: '2023-10-17', amount: 45000.00, status: 'Settled' },
  { id: 8, category: 'Health', categoryIcon: 'health_and_safety', merchant: 'Apollo Pharmacy', detail: 'Health • Prescription', date: '2023-10-16', amount: -1850.00, status: 'Settled' },
  { id: 9, category: 'Subscription', categoryIcon: 'subscriptions', merchant: 'Spotify India', detail: 'Music • Monthly Plan', date: '2023-10-15', amount: -119.00, status: 'Settled' },
  { id: 10, category: 'Shopping', categoryIcon: 'storefront', merchant: 'Myntra Fashion', detail: 'Apparel • Casual Wear', date: '2023-10-14', amount: -5499.00, status: 'Settled' },
  { id: 11, category: 'Transport', categoryIcon: 'directions_car', merchant: 'Indian Oil Petrol', detail: 'Fuel • Petrol', date: '2023-10-13', amount: -3200.00, status: 'Settled' },
  { id: 12, category: 'Income', categoryIcon: 'work', merchant: 'Mutual Fund Dividend', detail: 'HDFC Flexi Cap Fund', date: '2023-10-12', amount: 12400.00, status: 'Settled' },
  { id: 13, category: 'Food', categoryIcon: 'restaurant', merchant: 'Zomato Gold', detail: 'Dining Out • Weekend', date: '2023-10-11', amount: -1890.00, status: 'Pending' },
  { id: 14, category: 'Housing', categoryIcon: 'home', merchant: 'Rent Payment', detail: 'Housing • Monthly Rent', date: '2023-10-01', amount: -25000.00, status: 'Settled' },
  { id: 15, category: 'Housing', categoryIcon: 'home', merchant: 'TATA Power Bill', detail: 'Utilities • Electricity', date: '2023-10-05', amount: -2860.00, status: 'Settled' },
  { id: 16, category: 'Grocery', categoryIcon: 'local_grocery_store', merchant: 'DMart Ready', detail: 'Groceries • Monthly Stock', date: '2023-10-10', amount: -6780.00, status: 'Settled' },
  { id: 17, category: 'Health', categoryIcon: 'health_and_safety', merchant: 'Cult.fit Membership', detail: 'Fitness • Monthly Plan', date: '2023-10-02', amount: -1499.00, status: 'Settled' },
  { id: 18, category: 'Subscription', categoryIcon: 'subscriptions', merchant: 'Hotstar Premium', detail: 'Entertainment • Annual', date: '2023-10-03', amount: -299.00, status: 'Settled' },
  { id: 19, category: 'Shopping', categoryIcon: 'storefront', merchant: 'Amazon India', detail: 'Home • Kitchen Appliances', date: '2023-10-08', amount: -8999.00, status: 'Pending' },
  { id: 20, category: 'Income', categoryIcon: 'work', merchant: 'Fixed Deposit Interest', detail: 'SBI FD • Quarter Payout', date: '2023-10-09', amount: 8500.00, status: 'Settled' },
  { id: 21, category: 'Education', categoryIcon: 'school', merchant: 'Coursera Plus', detail: 'Learning • Annual Plan', date: '2023-10-07', amount: -3499.00, status: 'Settled' },
  { id: 22, category: 'Food', categoryIcon: 'restaurant', merchant: 'Chai Point', detail: 'Beverages • Office Orders', date: '2023-10-06', amount: -650.00, status: 'Settled' },
];

// ─── Monthly Balance Trend Data (in ₹) ───────────────────────────────
const MONTHLY_BALANCE_DATA = [
  { month: 'May', value: 485000 },
  { month: 'Jun', value: 512000 },
  { month: 'Jul', value: 498000 },
  { month: 'Aug', value: 545000 },
  { month: 'Sep', value: 578000 },
  { month: 'Oct', value: 624500 },
];

const QUARTERLY_BALANCE_DATA = [
  { month: 'Q1', value: 385000 },
  { month: 'Q2', value: 468000 },
  { month: 'Q3', value: 545000 },
  { month: 'Q4', value: 624500 },
];

// ─── Reducer ──────────────────────────────────────────────────────────
const initialState = {
  transactions: TRANSACTIONS,
  role: 'admin',
  filters: {
    category: 'All',
    searchQuery: '',
    sortBy: 'date',
    sortOrder: 'desc',
  },
  timeRange: 'monthly',
  currentPage: 1,
  itemsPerPage: 5,
  sidebarOpen: false,
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

// ─── Format INR ───────────────────────────────────────────────────────
export function formatINR(num, showDecimal = false) {
  const abs = Math.abs(num);
  const formatted = abs.toLocaleString('en-IN', {
    minimumFractionDigits: showDecimal ? 2 : 0,
    maximumFractionDigits: showDecimal ? 2 : 0,
  });
  return `₹${formatted}`;
}

// ─── Context ──────────────────────────────────────────────────────────
const FinanceContext = createContext(null);

export function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  const filteredTransactions = useMemo(() => {
    let result = [...state.transactions];

    if (state.filters.category !== 'All') {
      result = result.filter(t => t.category === state.filters.category);
    }

    if (state.filters.searchQuery.trim()) {
      const q = state.filters.searchQuery.toLowerCase();
      result = result.filter(t =>
        t.merchant.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.detail.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      let cmp = 0;
      switch (state.filters.sortBy) {
        case 'date': cmp = new Date(a.date) - new Date(b.date); break;
        case 'amount': cmp = a.amount - b.amount; break;
        case 'merchant': cmp = a.merchant.localeCompare(b.merchant); break;
        default: cmp = 0;
      }
      return state.filters.sortOrder === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [state.transactions, state.filters]);

  const totalPages = Math.ceil(filteredTransactions.length / state.itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (state.currentPage - 1) * state.itemsPerPage,
    state.currentPage * state.itemsPerPage
  );

  const categories = useMemo(() => {
    const cats = [...new Set(state.transactions.map(t => t.category))];
    return ['All', ...cats.sort()];
  }, [state.transactions]);

  const summaryData = useMemo(() => {
    const totalIncome = state.transactions.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
    const totalExpenses = Math.abs(state.transactions.filter(t => t.amount < 0).reduce((s, t) => s + t.amount, 0));
    return {
      totalBalance: 624500,
      monthlyIncome: totalIncome,
      monthlyExpenses: totalExpenses,
      savingsGoal: 500000,
      savingsProgress: 78,
      incomeChange: '+14.2%',
      expenseChange: '-6.5%',
      balanceChange: '+8.1%',
    };
  }, [state.transactions]);

  const categoryBreakdown = useMemo(() => {
    const breakdown = {};
    state.transactions.forEach(t => {
      if (t.amount < 0) {
        breakdown[t.category] = (breakdown[t.category] || 0) + Math.abs(t.amount);
      }
    });
    const sorted = Object.entries(breakdown).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
    const total = sorted.reduce((s, c) => s + c.value, 0);
    return sorted.map(c => ({ ...c, percentage: ((c.value / total) * 100).toFixed(1) }));
  }, [state.transactions]);

  const balanceTrend = state.timeRange === 'monthly' ? MONTHLY_BALANCE_DATA : QUARTERLY_BALANCE_DATA;

  const insights = useMemo(() => {
    const result = [];
    if (categoryBreakdown.length > 0) {
      const top = categoryBreakdown[0];
      result.push({
        title: `${top.name} Expense Alert`,
        description: `${top.name} is your top spend at ${formatINR(top.value)} (${top.percentage}%). AI suggests reviewing for ₹3,200+ monthly savings.`,
        icon: 'insights', badge: 'Optimization',
        bgColor: 'bg-indigo-50/50', borderColor: 'border-indigo-100',
        badgeBg: 'bg-indigo-100', badgeText: 'text-indigo-700',
        iconBg: 'bg-white', iconColor: 'text-indigo-600',
        confidence: 85, progressColor: 'bg-indigo-500',
      });
    }
    result.push({
      title: 'Savings Milestone',
      description: `Great progress Alok! You've invested ₹18,500 extra into SIPs this month. On track for ${summaryData.savingsProgress}% of your goal.`,
      icon: 'stars', badge: 'Milestone',
      bgColor: 'bg-emerald-50/50', borderColor: 'border-emerald-100',
      badgeBg: 'bg-emerald-100', badgeText: 'text-emerald-700',
      iconBg: 'bg-white', iconColor: 'text-emerald-600',
      hasMilestone: true,
    });
    const subTotal = state.transactions.filter(t => t.category === 'Subscription' && t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
    const subCount = state.transactions.filter(t => t.category === 'Subscription').length;
    result.push({
      title: 'Subscription Review',
      description: `${subCount} active subscriptions totaling ${formatINR(subTotal)}/mo. Consider switching to annual plans for 20% discount.`,
      icon: 'bolt', badge: 'Smart Tip',
      bgColor: 'bg-amber-50/50', borderColor: 'border-amber-100',
      badgeBg: 'bg-amber-100', badgeText: 'text-amber-700',
      iconBg: 'bg-white', iconColor: 'text-amber-600',
      hasAction: true, actionText: 'Review Now', actionColor: 'text-amber-600',
    });
    return result;
  }, [categoryBreakdown, summaryData, state.transactions]);

  const value = {
    state, dispatch, filteredTransactions, paginatedTransactions,
    totalPages, categories, summaryData, categoryBreakdown, balanceTrend, insights,
  };

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error('useFinance must be used within FinanceProvider');
  return ctx;
}
