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
    <div className="bg-surface min-h-screen bg-grid-pattern">
      {/* Mobile Overlay */}
      {state.sidebarOpen && (
        <div
          className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => dispatch({ type: 'CLOSE_SIDEBAR' })}
        />
      )}

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen transition-all duration-350 ease-smooth">
        <Header />

        <div className="pt-24 sm:pt-32 pb-10 sm:pb-16 px-4 sm:px-8 lg:px-12 max-w-[1600px] mx-auto space-y-8 sm:space-y-10">
          {/* ── Welcome Header ── */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 animate-fade-in">
            <div>
              <p className="text-on-surface-variant text-[11px] font-bold tracking-[0.25em] uppercase mb-2 flex items-center gap-2 animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                <span className="w-5 h-px bg-gradient-to-r from-primary to-primary-light"></span>
                <span className="animate-shimmer px-1">Portfolio Intelligence</span>
              </p>
              <h3 className="text-2xl sm:text-4xl font-extrabold font-headline tracking-tight text-on-surface">
                Welcome back,{' '}
                <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                  Alok
                </span>
                .
              </h3>
            </div>
            {isAdmin && (
              <div className="flex items-center gap-3 sm:gap-4 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                <button className="bg-white border border-border/60 text-on-surface px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-sm font-bold flex items-center gap-2 hover-lift hover:border-primary/20 transition-all duration-350 ease-smooth active:scale-95 shadow-soft group">
                  <span className="material-symbols-outlined text-lg group-hover:text-primary transition-colors duration-200">file_download</span>
                  <span className="hidden sm:inline">Export</span>
                </button>
                <button className="primary-gradient text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-glow hover:shadow-glow-lg transition-all duration-350 ease-smooth active:scale-95 btn-magnetic">
                  <span className="material-symbols-outlined text-lg">add</span>
                  <span className="hidden sm:inline">New Transaction</span>
                </button>
              </div>
            )}
            {!isAdmin && (
              <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-100/80 rounded-2xl border border-border/40 animate-fade-in-scale">
                <span className="material-symbols-outlined text-on-surface-variant text-lg animate-breathe">visibility</span>
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">View Only Mode</span>
              </div>
            )}
          </div>

          {/* ── Summary Cards ── */}
          <SummaryCards />

          {/* ── Charts Section ── */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 animate-fade-in" style={{ animationDelay: '0.25s' }}>
            <PortfolioGrowthChart />
            <SpendingDistribution />
          </div>

          {/* ── Insights ── */}
          <InsightCards />

          {/* ── Transactions ── */}
          <TransactionsTable />
        </div>
      </main>
    </div>
  );
}

export default App;
