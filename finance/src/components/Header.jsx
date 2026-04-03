export default function Header() {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-18rem)] h-20 z-40 glass-header border-b border-border/40 flex items-center justify-between px-12">
      <div className="flex items-center gap-10">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary transition-colors duration-200">
            search
          </span>
          <input
            type="text"
            placeholder="Search insights or records..."
            className="bg-white border border-border/60 rounded-xl pl-10 pr-4 py-2.5 w-80 text-sm focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all duration-300 placeholder:text-on-surface-variant/40"
          />
        </div>
      </div>

      <div className="flex items-center gap-8">
        {/* Role Toggle */}
        <div className="flex bg-slate-200/40 p-1 rounded-xl items-center border border-border/40">
          <button className="px-5 py-1.5 text-xs font-bold rounded-lg bg-white shadow-soft text-on-surface transition-all duration-200 active:scale-95">
            Admin
          </button>
          <button className="px-5 py-1.5 text-xs font-bold rounded-lg text-on-surface-variant hover:text-on-surface transition-all duration-200 active:scale-95">
            Viewer
          </button>
        </div>

        <div className="h-6 w-px bg-border/40"></div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button className="relative w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-white hover:shadow-soft rounded-xl transition-all duration-200 active:scale-90">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error border-2 border-white rounded-full"></span>
          </button>

          <div className="flex items-center gap-3 pl-2 group cursor-pointer">
            <div className="text-right">
              <p className="text-sm font-bold text-on-surface">Alex Wright</p>
              <p className="text-[10px] text-primary-dark uppercase font-extrabold tracking-wider">
                Premium Tier
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
