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
      className={`h-screen w-72 fixed left-0 top-0 overflow-y-auto bg-white/50 backdrop-blur-xl border-r border-border/30 flex flex-col py-8 px-6 z-50 custom-scrollbar transition-transform duration-400 ease-smooth ${
        state.sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      {/* Logo */}
      <div className="mb-12 flex items-center justify-between animate-slide-in-left">
        <div className="flex items-center gap-3 px-2 group cursor-pointer">
          <div className="w-11 h-11 primary-gradient rounded-2xl flex items-center justify-center text-white shadow-glow transition-all duration-350 ease-smooth group-hover:shadow-glow-lg group-hover:scale-105">
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              account_balance
            </span>
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-on-surface font-grotesk tracking-tight leading-none">
              Zorvyn
            </h1>
            <p className="text-[9px] uppercase tracking-[0.25em] text-primary font-bold mt-0.5">
              Finance AI
            </p>
          </div>
        </div>
        <button
          className="lg:hidden w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-slate-100 rounded-lg transition-all duration-200"
          onClick={() => dispatch({ type: 'CLOSE_SIDEBAR' })}
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 stagger-children">
        {navItems.map((item, idx) => (
          <a
            key={item.label}
            href="#"
            onClick={() => dispatch({ type: 'CLOSE_SIDEBAR' })}
            className={`animate-fade-in ${
              item.active
                ? 'nav-active-indicator bg-primary/[0.04] text-primary'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-slate-50/80'
            } rounded-xl px-4 py-3.5 flex items-center gap-3 font-manrope ${
              item.active ? 'font-bold' : 'font-semibold'
            } text-sm transition-all duration-300 ease-smooth group hover:shadow-soft relative overflow-hidden`}
            style={{ animationDelay: `${0.05 + idx * 0.04}s` }}
          >
            <span className={`material-symbols-outlined text-[20px] transition-all duration-300 ${
              item.active ? 'text-primary' : 'group-hover:text-primary group-hover:scale-110'
            }`}>
              {item.icon}
            </span>
            {item.label}
            {item.active && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-dot-pulse"></span>
            )}
          </a>
        ))}
      </nav>

      {/* Bottom */}
      <div className="mt-auto pt-8 border-t border-border/30 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="p-5 primary-gradient-soft rounded-2xl mb-6 border border-primary/8 hover-glow cursor-pointer group">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              AI Active
            </p>
            <span className="w-2 h-2 rounded-full bg-success animate-dot-pulse"></span>
          </div>
          <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
            Analyzing your spending patterns in real-time.
          </p>
        </div>

        <div className="space-y-1">
          <a href="#" className="text-on-surface-variant hover:text-on-surface hover:bg-slate-50/80 rounded-xl px-4 py-3 flex items-center gap-3 font-manrope font-semibold text-sm transition-all duration-300 ease-smooth group">
            <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform duration-300">help</span>
            Support
          </a>
          <a href="#" className="text-on-surface-variant hover:text-on-surface hover:bg-slate-50/80 rounded-xl px-4 py-3 flex items-center gap-3 font-manrope font-semibold text-sm transition-all duration-300 ease-smooth group">
            <span className="material-symbols-outlined text-[20px] group-hover:rotate-90 transition-transform duration-500">settings</span>
            Settings
          </a>
        </div>
      </div>
    </aside>
  );
}
