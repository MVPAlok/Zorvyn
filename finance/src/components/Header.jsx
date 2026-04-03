import { useFinance } from '../context/FinanceContext';

export default function Header() {
  const { state, dispatch } = useFinance();

  return (
    <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-18rem)] h-16 sm:h-20 z-30 glass-header border-b border-border/30 flex items-center justify-between px-4 sm:px-8 lg:px-12 animate-fade-in-down">
      {/* Left: Hamburger + Search */}
      <div className="flex items-center gap-4 sm:gap-10">
        <button
          className="lg:hidden w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-white hover:shadow-soft rounded-xl transition-all duration-300 ease-smooth active:scale-90"
          onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <div className="relative group hidden sm:block">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary transition-all duration-300 group-focus-within:scale-110">
            search
          </span>
          <input
            type="text"
            placeholder="Search transactions..."
            value={state.filters.searchQuery}
            onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
            className="bg-white/70 border border-border/50 rounded-2xl pl-11 pr-10 py-2.5 w-60 lg:w-80 text-sm focus:ring-4 focus:ring-primary/8 focus:border-primary/40 focus:bg-white outline-none transition-all duration-400 ease-smooth placeholder:text-on-surface-variant/35 shadow-soft hover:shadow-premium"
          />
          {state.filters.searchQuery && (
            <button
              onClick={() => dispatch({ type: 'SET_SEARCH', payload: '' })}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-slate-200/60 text-on-surface-variant/60 hover:bg-error/10 hover:text-error transition-all duration-200"
            >
              <span className="material-symbols-outlined text-xs">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Role Toggle */}
        <div className="flex bg-slate-100/60 p-1 rounded-2xl items-center border border-border/30 shadow-inner-glow">
          <button
            onClick={() => dispatch({ type: 'SET_ROLE', payload: 'admin' })}
            className={`px-3 sm:px-5 py-1.5 text-xs font-bold rounded-xl transition-all duration-350 ease-smooth ${
              state.role === 'admin'
                ? 'bg-white shadow-soft text-on-surface scale-[1.02]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => dispatch({ type: 'SET_ROLE', payload: 'viewer' })}
            className={`px-3 sm:px-5 py-1.5 text-xs font-bold rounded-xl transition-all duration-350 ease-smooth ${
              state.role === 'viewer'
                ? 'bg-white shadow-soft text-on-surface scale-[1.02]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Viewer
          </button>
        </div>

        <div className="h-6 w-px bg-gradient-to-b from-transparent via-border/60 to-transparent hidden sm:block"></div>

        {/* Notifications + Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="relative w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-white hover:shadow-soft rounded-xl transition-all duration-300 ease-smooth active:scale-90 group">
            <span className="material-symbols-outlined group-hover:text-primary transition-colors duration-200">notifications</span>
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-error border-2 border-white rounded-full animate-dot-pulse"></span>
          </button>

          <div className="flex items-center gap-3 pl-2 group cursor-pointer">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors duration-200">Alok</p>
              <p className="text-[10px] uppercase font-extrabold tracking-wider">
                <span className={`${state.role === 'admin' ? 'text-primary' : 'text-amber-500'} transition-colors duration-300`}>
                  {state.role === 'admin' ? 'Admin' : 'Viewer'}
                </span>
                <span className="text-on-surface-variant/40"> • </span>
                <span className="text-success">Premium</span>
              </p>
            </div>
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-sm ring-2 ring-white shadow-soft transition-all duration-300 ease-smooth group-hover:scale-110 group-hover:shadow-glow group-hover:ring-primary/20">
                AK
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success border-2 border-white rounded-full"></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
