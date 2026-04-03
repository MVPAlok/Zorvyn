import { useState } from 'react';
import { useFinance, formatINR } from '../context/FinanceContext';

const CATEGORY_COLORS = {
  Housing: { ring: '#6366F1', dot: 'bg-indigo-500' },
  Shopping: { ring: '#F59E0B', dot: 'bg-amber-500' },
  Food: { ring: '#EF4444', dot: 'bg-red-500' },
  Transport: { ring: '#3B82F6', dot: 'bg-blue-500' },
  Subscription: { ring: '#8B5CF6', dot: 'bg-violet-500' },
  Grocery: { ring: '#10B981', dot: 'bg-emerald-500' },
  Health: { ring: '#EC4899', dot: 'bg-pink-500' },
  Education: { ring: '#06B6D4', dot: 'bg-cyan-500' },
};

export default function SpendingDistribution() {
  const { categoryBreakdown } = useFinance();
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const totalExpenses = categoryBreakdown.reduce((s, c) => s + c.value, 0);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let accumulatedOffset = 0;

  const segments = categoryBreakdown.map((cat, i) => {
    const pct = cat.value / totalExpenses;
    const segLen = pct * circumference;
    const gap = 6;
    const dashLen = Math.max(0, segLen - gap);
    const offset = -accumulatedOffset;
    accumulatedOffset += segLen;
    const color = CATEGORY_COLORS[cat.name] || { ring: '#94A3B8', dot: 'bg-slate-400' };
    return { ...cat, dashLen, gapLen: circumference - dashLen, offset, color, isHovered: hoveredIdx === i };
  });

  return (
    <div className="lg:col-span-1 bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-premium border border-white/60 flex flex-col hover-lift min-h-[380px] sm:min-h-[480px] relative overflow-hidden group">
      {/* Background orb */}
      <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-primary/[0.03] rounded-full blur-3xl pointer-events-none transition-all duration-700 group-hover:bg-primary/[0.06]" />

      <div className="mb-6 sm:mb-8 relative z-10">
        <h5 className="text-xl font-extrabold font-headline text-on-surface tracking-tight">
          Spending
        </h5>
        <p className="text-xs text-on-surface-variant font-medium mt-1">Oct Breakdown</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="relative w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 176 176">
            <circle cx="88" cy="88" r={radius} fill="transparent" stroke="currentColor" strokeWidth="13" className="text-slate-100/80" />
            {segments.map((seg, i) => (
              <circle
                key={seg.name}
                cx="88" cy="88" r={radius}
                fill="transparent"
                stroke={seg.color.ring}
                strokeWidth={seg.isHovered ? 18 : 13}
                strokeDasharray={`${seg.dashLen} ${seg.gapLen}`}
                strokeDashoffset={seg.offset}
                strokeLinecap="round"
                style={{
                  transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                  opacity: hoveredIdx !== null && hoveredIdx !== i ? 0.3 : 1,
                  filter: seg.isHovered ? `drop-shadow(0 0 8px ${seg.color.ring}40)` : 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
            ))}
          </svg>

          <div className="absolute flex flex-col items-center transition-all duration-300 ease-smooth">
            <span className="text-xl sm:text-2xl font-black font-headline text-on-surface tabular-nums">
              {hoveredIdx !== null ? formatINR(segments[hoveredIdx].value) : formatINR(totalExpenses)}
            </span>
            <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mt-0.5">
              {hoveredIdx !== null ? segments[hoveredIdx].name : 'Total'}
            </span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-1.5 mt-6 sm:mt-8 max-h-52 overflow-y-auto custom-scrollbar relative z-10 stagger-children">
        {segments.map((seg, i) => {
          const color = CATEGORY_COLORS[seg.name] || { dot: 'bg-slate-400' };
          return (
            <div
              key={seg.name}
              className={`animate-fade-in flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ease-smooth cursor-pointer ${
                hoveredIdx === i
                  ? 'bg-white shadow-soft border-primary/10 scale-[1.02]'
                  : 'bg-slate-50/60 border-transparent hover:bg-white hover:shadow-soft'
              }`}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="flex items-center gap-2.5">
                <span className={`w-2 h-2 rounded-full ${color.dot} ${hoveredIdx === i ? 'animate-dot-pulse' : ''}`} />
                <span className="text-xs font-bold text-on-surface">{seg.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-on-surface-variant/60 font-semibold">{seg.percentage}%</span>
                <span className="text-xs font-black text-on-surface tabular-nums">{formatINR(seg.value)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
