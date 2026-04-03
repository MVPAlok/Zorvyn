import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';

const CATEGORY_COLORS = {
  Housing: { ring: '#6366F1', bg: 'bg-indigo-500', dot: 'bg-indigo-500' },
  Retail: { ring: '#F59E0B', bg: 'bg-amber-500', dot: 'bg-amber-500' },
  Dining: { ring: '#EF4444', bg: 'bg-red-500', dot: 'bg-red-500' },
  Transport: { ring: '#3B82F6', bg: 'bg-blue-500', dot: 'bg-blue-500' },
  Subscription: { ring: '#8B5CF6', bg: 'bg-violet-500', dot: 'bg-violet-500' },
  Grocery: { ring: '#10B981', bg: 'bg-emerald-500', dot: 'bg-emerald-500' },
  Health: { ring: '#EC4899', bg: 'bg-pink-500', dot: 'bg-pink-500' },
};

export default function SpendingDistribution() {
  const { categoryBreakdown } = useFinance();
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const totalExpenses = categoryBreakdown.reduce((s, c) => s + c.value, 0);

  // Build donut segments
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let accumulatedOffset = 0;

  const segments = categoryBreakdown.map((cat, i) => {
    const pct = cat.value / totalExpenses;
    const segLen = pct * circumference;
    const gap = 8; // gap between segments
    const dashLen = Math.max(0, segLen - gap);
    const offset = -accumulatedOffset;
    accumulatedOffset += segLen;

    const color = CATEGORY_COLORS[cat.name] || { ring: '#94A3B8', bg: 'bg-slate-400', dot: 'bg-slate-400' };

    return {
      ...cat,
      dashLen,
      gapLen: circumference - dashLen,
      offset,
      color,
      isHovered: hoveredIdx === i,
    };
  });

  return (
    <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-premium border border-white flex flex-col hover-card-effect min-h-[380px] sm:min-h-[480px]">
      <div className="mb-6 sm:mb-10">
        <h5 className="text-xl font-extrabold font-headline text-on-surface tracking-tight">
          Spending
        </h5>
        <p className="text-xs text-on-surface-variant font-medium mt-1">Oct Expenditure</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="relative w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 176 176">
            {/* Background circle */}
            <circle
              cx="88" cy="88" r={radius}
              fill="transparent"
              stroke="currentColor"
              strokeWidth="14"
              className="text-slate-100"
            />

            {/* Donut segments */}
            {segments.map((seg, i) => (
              <circle
                key={seg.name}
                cx="88" cy="88" r={radius}
                fill="transparent"
                stroke={seg.color.ring}
                strokeWidth={seg.isHovered ? 18 : 14}
                strokeDasharray={`${seg.dashLen} ${seg.gapLen}`}
                strokeDashoffset={seg.offset}
                strokeLinecap="round"
                style={{
                  transition: 'stroke-width 0.2s ease, opacity 0.2s ease',
                  opacity: hoveredIdx !== null && hoveredIdx !== i ? 0.4 : 1,
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
            ))}
          </svg>

          <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-black font-headline text-on-surface">
              ${hoveredIdx !== null
                ? segments[hoveredIdx].value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
                : totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
              }
            </span>
            <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest">
              {hoveredIdx !== null ? segments[hoveredIdx].name : 'Total'}
            </span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2 mt-6 sm:mt-12 max-h-48 overflow-y-auto custom-scrollbar">
        {segments.map((seg, i) => {
          const color = CATEGORY_COLORS[seg.name] || { dot: 'bg-slate-400' };
          return (
            <div
              key={seg.name}
              className={`flex items-center justify-between p-3 rounded-xl border border-border/20 cursor-pointer transition-all duration-200 ${
                hoveredIdx === i ? 'bg-slate-100 shadow-soft' : 'bg-slate-50 hover:bg-slate-100'
              }`}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${color.dot} shadow-sm`}></span>
                <span className="text-xs font-bold text-on-surface">{seg.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-on-surface-variant font-semibold">{seg.percentage}%</span>
                <span className="text-xs font-black text-on-surface">${seg.value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
