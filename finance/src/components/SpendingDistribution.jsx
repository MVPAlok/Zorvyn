import { useState, useEffect } from 'react';

export default function SpendingDistribution() {
  const [totalValue, setTotalValue] = useState(4210);

  useEffect(() => {
    const interval = setInterval(() => {
      const fluctuation = (Math.random() - 0.5) * 5;
      setTotalValue(prev => Math.round(prev + fluctuation));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-premium border border-white flex flex-col hover-card-effect min-h-[480px]">
      <div className="mb-10">
        <h5 className="text-xl font-extrabold font-headline text-on-surface tracking-tight">
          Spending
        </h5>
        <p className="text-xs text-on-surface-variant font-medium mt-1">Oct Expenditure</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="relative w-44 h-44 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 176 176">
            {/* Background circle */}
            <circle
              cx="88"
              cy="88"
              r="70"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="14"
              className="text-slate-100"
            ></circle>
            
            {/* Fixed Costs (Primary) - approx 68% */}
            <circle
              cx="88"
              cy="88"
              r="70"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="14"
              strokeDasharray="440"
              strokeDashoffset="140"
              strokeLinecap="round"
              className="text-primary"
            ></circle>
            
            {/* Lifestyle (Success) - approx 32% */}
            <circle
              cx="88"
              cy="88"
              r="54"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="12"
              strokeDasharray="340"
              strokeDashoffset="80"
              strokeLinecap="round"
              className="text-success"
            ></circle>
          </svg>

          <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-black font-headline text-on-surface">
              ${totalValue}
            </span>
            <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest">
              Total
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mt-12">
        <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-border/20">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary shadow-glow"></span>
            <span className="text-xs font-bold text-on-surface">Fixed Costs</span>
          </div>
          <span className="text-xs font-black text-on-surface">$2,850</span>
        </div>
        <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-border/20">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-success shadow-glow"></span>
            <span className="text-xs font-bold text-on-surface">Lifestyle</span>
          </div>
          <span className="text-xs font-black text-on-surface">$1,360</span>
        </div>
      </div>
    </div>
  );
}
