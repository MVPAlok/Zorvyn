import { useState } from 'react';

export default function PortfolioGrowthChart() {
  const [tooltipPos, setTooltipPos] = useState(85);
  const [tooltipDate, setTooltipDate] = useState('Oct 24, 2023');
  const [tooltipValue, setTooltipValue] = useState('$142,850.00');
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    setIsHovering(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let pct = (x / rect.width) * 100;
    pct = Math.max(5, Math.min(95, pct));
    
    setTooltipPos(pct);
    
    const day = Math.max(1, Math.min(31, Math.round((pct / 100) * 31)));
    setTooltipDate(`OCT ${day}, 2023`);
    
    const val = 100000 + (pct * 500) + Math.random() * 50;
    setTooltipValue(`$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className="lg:col-span-3 bg-white p-10 rounded-3xl shadow-hero-glow border border-white/60 relative overflow-hidden flex flex-col justify-between min-h-[480px] hover-card-effect">
      <div className="flex justify-between items-start mb-12 relative z-10">
        <div>
          <h5 className="text-3xl font-extrabold font-headline text-on-surface tracking-tight">
            Portfolio Growth
          </h5>
          <p className="text-sm text-on-surface-variant font-medium mt-1">
            Institutional-grade performance analysis
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-border/40">
          <button className="px-6 py-2 text-xs font-bold rounded-lg bg-white shadow-soft text-on-surface transition-all duration-200 active:scale-95">
            Monthly
          </button>
          <button className="px-6 py-2 text-xs font-bold rounded-lg text-on-surface-variant hover:text-on-surface transition-all duration-200 active:scale-95">
            Quarterly
          </button>
        </div>
      </div>

      <div className="flex-1 w-full relative" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        {/* Floating Glass Tooltip */}
        <div
          className={`absolute left-[${tooltipPos}%] top-4 -translate-x-1/2 bg-on-surface/95 backdrop-blur-xl text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-elevated z-20 flex flex-col items-center pointer-events-none border border-white/10 transition-opacity ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ left: `${tooltipPos}%` }}
        >
          <span className="opacity-50 text-[10px] mb-1 uppercase tracking-widest">{tooltipDate}</span>
          <span className="text-base tracking-tight">{tooltipValue}</span>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-on-surface/95"></div>
        </div>

        {/* Chart SVG */}
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 920 350">
          <defs>
            <linearGradient id="hero-gradient" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.15"></stop>
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0"></stop>
            </linearGradient>
            <filter id="glow-line">
              <feGaussianBlur result="blur" stdDeviation="3"></feGaussianBlur>
              <feComposite in="SourceGraphic" in2="blur" operator="over"></feComposite>
            </filter>
          </defs>
          
          {/* Faint Grid */}
          <line className="chart-grid-line" x1="0" x2="920" y1="0" y2="0"></line>
          <line className="chart-grid-line" x1="0" x2="920" y1="87" y2="87"></line>
          <line className="chart-grid-line" x1="0" x2="920" y1="175" y2="175"></line>
          <line className="chart-grid-line" x1="0" x2="920" y1="262" y2="262"></line>
          <line className="chart-grid-line" x1="0" x2="920" y1="350" y2="350"></line>
          
          {/* Area Gradient */}
          <path
            d="M0,300 C145,280 240,330 335,240 C430,150 525,220 620,120 C715,40 810,200 920,80 L920,90 L920,350 L0,350 Z"
            fill="url(#hero-gradient)"
          ></path>
          
          {/* Main Path */}
          <path
            d="M0,300 C145,280 240,330 335,240 C430,150 525,220 620,120 C715,40 810,200 920,80"
            fill="none"
            filter="url(#glow-line)"
            stroke="#6366F1"
            strokeLinecap="round"
            strokeWidth="6"
            className="animate-chart-draw"
          ></path>
          
          {/* Highlighted Point */}
          <circle
            cx={isHovering ? (tooltipPos / 100) * 920 : '920'}
            cy={isHovering ? '80' : '80'}
            fill="#6366F1"
            r="9"
            stroke="white"
            strokeWidth="3"
            style={{ opacity: isHovering ? 1 : 0, transition: 'all 0.1s ease-out' }}
          ></circle>
          <circle
            cx={isHovering ? (tooltipPos / 100) * 920 : '920'}
            cy="80"
            fill="#6366F1"
            fillOpacity="0.3"
            r="18"
            className="animate-pulse"
            style={{ opacity: isHovering ? 1 : 0 }}
          ></circle>
        </svg>

        <div className="flex justify-between mt-10 px-2">
          <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em]">
            01 Oct
          </span>
          <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em]">
            15 Oct
          </span>
          <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em]">
            31 Oct
          </span>
        </div>
      </div>
    </div>
  );
}
