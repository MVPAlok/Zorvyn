import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import PortfolioGrowthChart from './components/PortfolioGrowthChart';
import SpendingDistribution from './components/SpendingDistribution';
import InsightCards from './components/InsightCards';
import TransactionsTable from './components/TransactionsTable';

function App() {
  return (
    <div className="bg-surface min-h-screen">
      {/* Sidebar Navigation */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="ml-72 min-h-screen">
        {/* Top Header */}
        <Header />
        
        {/* Content Area */}
        <div className="pt-32 pb-16 px-12 max-w-[1600px] mx-auto space-y-10">
          {/* Summary Header */}
          <div className="flex items-end justify-between animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div>
              <p className="text-on-surface-variant text-[11px] font-bold tracking-[0.25em] uppercase mb-2 flex items-center gap-2">
                <span className="w-4 h-px bg-primary/40"></span>
                Portfolio Intelligence
              </p>
              <h3 className="text-on-surface text-4xl font-extrabold font-headline tracking-tight">
                Welcome back, Alex.
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-white border border-border/60 text-on-surface px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-surface transition-all duration-200 active:scale-95 shadow-soft">
                <span className="material-symbols-outlined text-lg">file_download</span>
                Export
              </button>
              <button className="primary-gradient text-white px-7 py-3 rounded-xl text-sm font-bold flex items-center gap-2 shadow-glow hover:shadow-primary/40 transition-all duration-200 active:scale-95">
                <span className="material-symbols-outlined text-lg">add</span>
                New Transaction
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <SummaryCards />

          {/* Hero Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
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
