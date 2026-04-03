import { useFinance } from '../context/FinanceContext';

export default function Sidebar() {
  const { state, dispatch } = useFinance();

  const navItems = [
    { icon: 'dashboard', label: 'Overview', active: true },
    { icon: 'insights', label: 'Analytics', active: false },
    { icon: 'swap_horiz', label: 'Transactions', active: false },
    { icon: 'payments', label: 'Budgets', active: false },
    { icon: 'description', label: 'Reports', active: false },
    { icon: 'verified_user', label: 'Security', active: false },
  ];

  return (
    <aside
      className={`h-screen w-72 fixed left-0 top-0 overflow-y-auto bg-slate-50 border-r border-border/40 flex flex-col py-8 px-6 z-50 custom-scrollbar transition-transform duration-300 ${
        state.sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      {/* Logo */}
      <div className="mb-12 flex items-center justify-between">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 primary-gradient rounded-xl flex items-center justify-center text-white shadow-glow">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              account_balance
            </span>
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-on-surface font-manrope tracking-tight leading-none">
              Atrium Finance
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mt-1">
              SaaS Intelligence
            </p>
          </div>
        </div>

        {/* Close button on mobile */}
        <button
          className="lg:hidden w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-white rounded-lg transition-all"
          onClick={() => dispatch({ type: 'CLOSE_SIDEBAR' })}
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            onClick={() => dispatch({ type: 'CLOSE_SIDEBAR' })}
            className={`${
              item.active
                ? 'nav-active-indicator bg-primary/[0.03] text-primary'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-white'
            } rounded-xl px-4 py-3.5 flex items-center gap-3 font-manrope ${
              item.active ? 'font-bold' : 'font-semibold'
            } text-sm transition-all duration-200 group hover:shadow-soft`}
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">
              {item.icon}
            </span>
            {item.label}
          </a>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto pt-8 border-t border-border/40">
        <div className="p-5 bg-primary/[0.02] rounded-2xl mb-6 border border-primary/5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-primary uppercase tracking-wider">
              Premium Access
            </p>
            <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
          </div>
          <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
            Your data is being analyzed by AI in real-time.
          </p>
        </div>

        <div className="space-y-1">
          <a
            href="#"
            className="text-on-surface-variant hover:text-on-surface hover:bg-white rounded-xl px-4 py-3 flex items-center gap-3 font-manrope font-semibold text-sm transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[20px]">help</span>
            Support
          </a>
          <a
            href="#"
            className="text-on-surface-variant hover:text-on-surface hover:bg-white rounded-xl px-4 py-3 flex items-center gap-3 font-manrope font-semibold text-sm transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            Settings
          </a>
        </div>
      </div>
    </aside>
  );
}
