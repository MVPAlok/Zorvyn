import { useFinance } from './context/FinanceContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import PortfolioGrowthChart from './components/PortfolioGrowthChart';
import SpendingDistribution from './components/SpendingDistribution';
import InsightCards from './components/InsightCards';
import TransactionsTable from './components/TransactionsTable';

function App() {
  const { state, dispatch } = useFinance();
  const isAdmin = state.role === 'admin';

  return (
    <div className="bg-surface min-h-screen">
      {/* Mobile Overlay */}
      {state.sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => dispatch({ type: 'CLOSE_SIDEBAR' })}
        />
      )}

      {/* Sidebar Navigation */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen transition-all duration-300">
        {/* Top Header */}
        <Header />
        
        {/* Content Area */}
        <div className="pt-24 sm:pt-32 pb-10 sm:pb-16 px-4 sm:px-8 lg:px-12 max-w-[1600px] mx-auto space-y-6 sm:space-y-10">
          {/* Summary Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div>
              <p className="text-on-surface-variant text-[11px] font-bold tracking-[0.25em] uppercase mb-2 flex items-center gap-2">
                <span className="w-4 h-px bg-primary/40"></span>
                Portfolio Intelligence
              </p>
              <h3 className="text-2xl sm:text-4xl font-extrabold font-headline tracking-tight text-on-surface">
                Welcome back, Alex.
              </h3>
            </div>
            {isAdmin && (
              <div className="flex items-center gap-3 sm:gap-4">
                <button className="bg-white border border-border/60 text-on-surface px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-surface transition-all duration-200 active:scale-95 shadow-soft">
                  <span className="material-symbols-outlined text-lg">file_download</span>
                  <span className="hidden sm:inline">Export</span>
                </button>
                <button className="primary-gradient text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl text-sm font-bold flex items-center gap-2 shadow-glow hover:shadow-primary/40 transition-all duration-200 active:scale-95">
                  <span className="material-symbols-outlined text-lg">add</span>
                  <span className="hidden sm:inline">New Transaction</span>
                </button>
              </div>
            )}
            {!isAdmin && (
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl border border-border/40">
                <span className="material-symbols-outlined text-on-surface-variant text-lg">visibility</span>
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">View Only Mode</span>
              </div>
            )}
          </div>

          {/* Summary Cards */}
          <SummaryCards />

          {/* Hero Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <PortfolioGrowthChart />
            <SpendingDistribution />
          </div>

          {/* AI Insights */}
          <InsightCards />

          {/* Transactions Table */}
          <TransactionsTable />
        </div>
      </main>
    </div>
  );
}

export default App;
