import { useState, useMemo } from 'react';
import { useFinance, formatINR } from '../context/FinanceContext';

export default function PortfolioGrowthChart() {
  const { state, dispatch, balanceTrend } = useFinance();
  const [tooltipData, setTooltipData] = useState(null);

  const chartWidth = 920;
  const chartHeight = 320;
  const padding = { top: 20, bottom: 30 };
  const effectiveHeight = chartHeight - padding.top - padding.bottom;

  const pathData = useMemo(() => {
    const data = balanceTrend;
    if (data.length < 2) return { path: '', areaPath: '', points: [] };

    const minVal = Math.min(...data.map(d => d.value)) * 0.92;
    const maxVal = Math.max(...data.map(d => d.value)) * 1.04;
    const range = maxVal - minVal || 1;

    const points = data.map((d, i) => ({
      x: (i / (data.length - 1)) * chartWidth,
      y: padding.top + effectiveHeight - ((d.value - minVal) / range) * effectiveHeight,
      value: d.value,
      label: d.month,
    }));

    let path = `M${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx1 = prev.x + (curr.x - prev.x) * 0.4;
      const cpx2 = prev.x + (curr.x - prev.x) * 0.6;
      path += ` C${cpx1},${prev.y} ${cpx2},${curr.y} ${curr.x},${curr.y}`;
    }

    const lastPoint = points[points.length - 1];
    const areaPath = `${path} L${lastPoint.x},${chartHeight} L${points[0].x},${chartHeight} Z`;

    return { path, areaPath, points };
  }, [balanceTrend, chartWidth, chartHeight, effectiveHeight, padding.top]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    const data = balanceTrend;
    const idx = Math.round(pct * (data.length - 1));
    const clamped = Math.max(0, Math.min(data.length - 1, idx));
    const point = pathData.points[clamped];
    if (point) {
      setTooltipData({
        x: point.x, y: point.y, value: point.value,
        label: point.label, pct: (point.x / chartWidth) * 100,
      });
    }
  };

  return (
    <div className="lg:col-span-3 bg-white/80 backdrop-blur-sm p-6 sm:p-10 rounded-3xl shadow-hero-glow border border-white/60 relative overflow-hidden flex flex-col justify-between min-h-[380px] sm:min-h-[480px] hover-lift group">
      {/* Background gradient orb */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/[0.04] rounded-full blur-3xl pointer-events-none transition-all duration-700 group-hover:bg-primary/[0.07] group-hover:scale-110" />

      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8 sm:mb-12 relative z-10">
        <div className="animate-slide-in-left">
          <h5 className="text-xl sm:text-3xl font-extrabold font-headline text-on-surface tracking-tight">
            Portfolio Growth
          </h5>
          <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-1 flex items-center gap-2">
            Smart performance analysis
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-success/8 text-success text-[10px] font-bold rounded-full">
              <span className="material-symbols-outlined text-[10px]">trending_up</span>
              +8.1%
            </span>
          </p>
        </div>
        <div className="flex items-center gap-1 bg-slate-50/80 p-1 rounded-2xl border border-border/30 shadow-inner-glow">
          <button
            onClick={() => dispatch({ type: 'SET_TIME_RANGE', payload: 'monthly' })}
            className={`px-4 sm:px-6 py-2 text-xs font-bold rounded-xl transition-all duration-350 ease-smooth ${
              state.timeRange === 'monthly'
                ? 'bg-white shadow-soft text-on-surface scale-[1.02]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => dispatch({ type: 'SET_TIME_RANGE', payload: 'quarterly' })}
            className={`px-4 sm:px-6 py-2 text-xs font-bold rounded-xl transition-all duration-350 ease-smooth ${
              state.timeRange === 'quarterly'
                ? 'bg-white shadow-soft text-on-surface scale-[1.02]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Quarterly
          </button>
        </div>
      </div>

      <div
        className="flex-1 w-full relative cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTooltipData(null)}
      >
        {/* Glass Tooltip */}
        {tooltipData && (
          <div
            className="absolute top-0 -translate-x-1/2 glass-dark text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-elevated z-20 flex flex-col items-center pointer-events-none border border-white/10 animate-fade-in-scale"
            style={{ left: `${tooltipData.pct}%`, animationDuration: '0.15s' }}
          >
            <span className="opacity-50 text-[10px] mb-1 uppercase tracking-widest">{tooltipData.label}</span>
            <span className="text-base tracking-tight font-grotesk">{formatINR(tooltipData.value)}</span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-on-surface/90" />
          </div>
        )}

        {/* Chart SVG */}
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox={`0 0 ${chartWidth} ${chartHeight + 30}`}>
          <defs>
            <linearGradient id="hero-gradient" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.12" />
              <stop offset="60%" stopColor="#818CF8" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="line-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
            <filter id="glow-line">
              <feGaussianBlur result="blur" stdDeviation="4" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
            <line key={i} className="chart-grid-line" x1="0" x2={chartWidth}
              y1={padding.top + effectiveHeight * pct} y2={padding.top + effectiveHeight * pct} />
          ))}

          {/* Area */}
          {pathData.areaPath && <path d={pathData.areaPath} fill="url(#hero-gradient)" className="animate-reveal" />}

          {/* Line */}
          {pathData.path && (
            <path
              d={pathData.path} fill="none" filter="url(#glow-line)"
              stroke="url(#line-gradient)" strokeLinecap="round" strokeWidth="4"
              className="animate-chart-draw"
            />
          )}

          {/* Data Points */}
          {pathData.points.map((point, i) => (
            <g key={i}>
              <circle
                cx={point.x} cy={point.y} r="6"
                fill="white" stroke="#6366F1" strokeWidth="2.5"
                opacity={tooltipData && Math.abs(tooltipData.x - point.x) < 10 ? 1 : 0.5}
                style={{ transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)' }}
              />
            </g>
          ))}

          {/* Active Hover Point */}
          {tooltipData && (
            <>
              <circle cx={tooltipData.x} cy={tooltipData.y} r="8" fill="#6366F1" stroke="white" strokeWidth="3" />
              <circle cx={tooltipData.x} cy={tooltipData.y} r="20" fill="#6366F1" fillOpacity="0.15" className="animate-pulse" />
              <line x1={tooltipData.x} x2={tooltipData.x} y1={tooltipData.y + 14} y2={chartHeight}
                stroke="#6366F1" strokeWidth="1" strokeDasharray="4,4" opacity="0.25" />
            </>
          )}
        </svg>

        {/* X-Axis Labels */}
        <div className="flex justify-between mt-4 sm:mt-8 px-2">
          {balanceTrend.map((d, i) => (
            <span key={i} className="text-[10px] font-bold text-on-surface-variant/35 uppercase tracking-[0.2em] transition-colors duration-200 hover:text-primary">
              {d.month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
