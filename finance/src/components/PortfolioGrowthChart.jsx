import { useState, useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';

export default function PortfolioGrowthChart() {
  const { state, dispatch, balanceTrend } = useFinance();
  const [tooltipData, setTooltipData] = useState(null);

  // Build SVG path from real data
  const chartWidth = 920;
  const chartHeight = 320;
  const padding = { top: 20, bottom: 30 };
  const effectiveHeight = chartHeight - padding.top - padding.bottom;

  const pathData = useMemo(() => {
    const data = balanceTrend;
    if (data.length < 2) return { path: '', areaPath: '', points: [] };

    const minVal = Math.min(...data.map(d => d.value)) * 0.95;
    const maxVal = Math.max(...data.map(d => d.value)) * 1.02;
    const range = maxVal - minVal || 1;

    const points = data.map((d, i) => ({
      x: (i / (data.length - 1)) * chartWidth,
      y: padding.top + effectiveHeight - ((d.value - minVal) / range) * effectiveHeight,
      value: d.value,
      label: d.month,
    }));

    // Build smooth curve using cubic bezier
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

    // Find closest data point
    const data = balanceTrend;
    const idx = Math.round(pct * (data.length - 1));
    const clamped = Math.max(0, Math.min(data.length - 1, idx));
    const point = pathData.points[clamped];

    if (point) {
      setTooltipData({
        x: point.x,
        y: point.y,
        value: point.value,
        label: point.label,
        pct: (point.x / chartWidth) * 100,
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltipData(null);
  };

  return (
    <div className="lg:col-span-3 bg-white p-6 sm:p-10 rounded-3xl shadow-hero-glow border border-white/60 relative overflow-hidden flex flex-col justify-between min-h-[380px] sm:min-h-[480px] hover-card-effect">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8 sm:mb-12 relative z-10">
        <div>
          <h5 className="text-xl sm:text-3xl font-extrabold font-headline text-on-surface tracking-tight">
            Portfolio Growth
          </h5>
          <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-1">
            Institutional-grade performance analysis
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-border/40">
          <button
            onClick={() => dispatch({ type: 'SET_TIME_RANGE', payload: 'monthly' })}
            className={`px-4 sm:px-6 py-2 text-xs font-bold rounded-lg transition-all duration-200 active:scale-95 ${
              state.timeRange === 'monthly'
                ? 'bg-white shadow-soft text-on-surface'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => dispatch({ type: 'SET_TIME_RANGE', payload: 'quarterly' })}
            className={`px-4 sm:px-6 py-2 text-xs font-bold rounded-lg transition-all duration-200 active:scale-95 ${
              state.timeRange === 'quarterly'
                ? 'bg-white shadow-soft text-on-surface'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Quarterly
          </button>
        </div>
      </div>

      <div className="flex-1 w-full relative" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        {/* Floating Glass Tooltip */}
        {tooltipData && (
          <div
            className="absolute top-2 -translate-x-1/2 bg-on-surface/95 backdrop-blur-xl text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-elevated z-20 flex flex-col items-center pointer-events-none border border-white/10"
            style={{ left: `${tooltipData.pct}%` }}
          >
            <span className="opacity-50 text-[10px] mb-1 uppercase tracking-widest">{tooltipData.label}</span>
            <span className="text-base tracking-tight">
              ${tooltipData.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-on-surface/95"></div>
          </div>
        )}

        {/* Chart SVG */}
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox={`0 0 ${chartWidth} ${chartHeight + 30}`}>
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
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
            <line
              key={i}
              className="chart-grid-line"
              x1="0"
              x2={chartWidth}
              y1={padding.top + effectiveHeight * pct}
              y2={padding.top + effectiveHeight * pct}
            />
          ))}
          
          {/* Area Gradient */}
          {pathData.areaPath && (
            <path d={pathData.areaPath} fill="url(#hero-gradient)" />
          )}
          
          {/* Main Path */}
          {pathData.path && (
            <path
              d={pathData.path}
              fill="none"
              filter="url(#glow-line)"
              stroke="#6366F1"
              strokeLinecap="round"
              strokeWidth="5"
              className="animate-chart-draw"
            />
          )}
          
          {/* Data Points */}
          {pathData.points.map((point, i) => (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="5"
              fill="#6366F1"
              stroke="white"
              strokeWidth="2"
              opacity={tooltipData && Math.abs(tooltipData.x - point.x) < 5 ? 1 : 0.4}
              style={{ transition: 'opacity 0.15s ease' }}
            />
          ))}

          {/* Highlighted Point */}
          {tooltipData && (
            <>
              <circle
                cx={tooltipData.x}
                cy={tooltipData.y}
                fill="#6366F1"
                r="9"
                stroke="white"
                strokeWidth="3"
              />
              <circle
                cx={tooltipData.x}
                cy={tooltipData.y}
                fill="#6366F1"
                fillOpacity="0.25"
                r="18"
                className="animate-pulse"
              />
              {/* Vertical guide line */}
              <line
                x1={tooltipData.x}
                x2={tooltipData.x}
                y1={tooltipData.y + 12}
                y2={chartHeight}
                stroke="#6366F1"
                strokeWidth="1"
                strokeDasharray="4,4"
                opacity="0.3"
              />
            </>
          )}
        </svg>

        <div className="flex justify-between mt-4 sm:mt-10 px-2">
          {balanceTrend.map((d, i) => (
            <span key={i} className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em]">
              {d.month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
