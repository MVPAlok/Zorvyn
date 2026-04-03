import { useFinance } from '../context/FinanceContext';

export default function Header() {
  const { state, dispatch } = useFinance();

  return (
    <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-18rem)] h-16 sm:h-20 z-30 glass-header border-b border-border/40 flex items-center justify-between px-4 sm:px-8 lg:px-12">
      {/* Left: Hamburger + Search */}
      <div className="flex items-center gap-4 sm:gap-10">
        {/* Mobile hamburger */}
        <button
          className="lg:hidden w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-white hover:shadow-soft rounded-xl transition-all duration-200 active:scale-90"
          onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        {/* Search */}
        <div className="relative group hidden sm:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary transition-colors duration-200">
            search
          </span>
          <input
            type="text"
            placeholder="Search transactions..."
            value={state.filters.searchQuery}
            onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
            className="bg-white border border-border/60 rounded-xl pl-10 pr-4 py-2.5 w-60 lg:w-80 text-sm focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all duration-300 placeholder:text-on-surface-variant/40"
          />
          {state.filters.searchQuery && (
            <button
              onClick={() => dispatch({ type: 'SET_SEARCH', payload: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-8">
        {/* Role Toggle */}
        <div className="flex bg-slate-200/40 p-1 rounded-xl items-center border border-border/40">
          <button
            onClick={() => dispatch({ type: 'SET_ROLE', payload: 'admin' })}
            className={`px-3 sm:px-5 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 active:scale-95 ${
              state.role === 'admin'
                ? 'bg-white shadow-soft text-on-surface'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => dispatch({ type: 'SET_ROLE', payload: 'viewer' })}
            className={`px-3 sm:px-5 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 active:scale-95 ${
              state.role === 'viewer'
                ? 'bg-white shadow-soft text-on-surface'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Viewer
          </button>
        </div>

        <div className="h-6 w-px bg-border/40 hidden sm:block"></div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="relative w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-white hover:shadow-soft rounded-xl transition-all duration-200 active:scale-90">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error border-2 border-white rounded-full"></span>
          </button>

          <div className="flex items-center gap-3 pl-2 group cursor-pointer">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-on-surface">Alex Wright</p>
              <p className="text-[10px] text-primary-dark uppercase font-extrabold tracking-wider">
                {state.role === 'admin' ? 'Admin' : 'Viewer'} • Premium
              </p>
            </div>
            <img
              alt="User Profile"
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-soft transition-transform duration-200 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeM3lMlpg_Z6SHtMf-wMv5VgUKfhr07rwW3jDBC6UGJ4IumAPCsJ5EvYJzA_XsBX5hnnFWUGOXH9WWyF1AX6mwulxc4UIEJCQczkjYhjzi_lCbDoGF5Ggrz5Jt65OkJ-SLu1WBIFHr5o0RPLwWmavO94QYeBHIaiPGm_PGqWyO_2D7cNdEdxXABE5uI4mb7W9wYFjDYNp138S-Ja3DsQ3N6MaklHD-q_0M-_wim-FRJqFwsqhQT6FWtIeS4F7mTRoFkaqsRYK2lBs"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
