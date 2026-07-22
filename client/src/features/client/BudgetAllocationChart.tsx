import React, { useState } from "react";

interface BudgetAllocationChartProps {
  materials: number;
  labor: number;
  overhead: number;
  total: number;
}

export default function BudgetAllocationChart({
  materials,
  labor,
  overhead,
  total,
}: BudgetAllocationChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Fallback if total is 0
  const activeTotal = total || 1;

  const matPercent = (materials / activeTotal) * 100;
  const labPercent = (labor / activeTotal) * 100;
  const ovhPercent = (overhead / activeTotal) * 100;

  // Pie chart variables
  const radius = 40;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius; // 251.327

  // Calculate cumulative offsets
  const segments = [
    {
      id: 0,
      label: "Materials",
      value: materials,
      percentage: matPercent,
      color: "stroke-emerald-500",
      fillColor: "bg-emerald-500",
      hoverColor: "stroke-emerald-400",
    },
    {
      id: 1,
      label: "Labor",
      value: labor,
      percentage: labPercent,
      color: "stroke-blue-500",
      fillColor: "bg-blue-500",
      hoverColor: "stroke-blue-400",
    },
    {
      id: 2,
      label: "Overhead",
      value: overhead,
      percentage: ovhPercent,
      color: "stroke-amber-500",
      fillColor: "bg-amber-500",
      hoverColor: "stroke-amber-400",
    },
  ];

  let currentOffset = 0;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 shadow-xs transition-colors">
      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 font-display">
        Budget Allocation
      </h4>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-4">
        {/* Circle Chart */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full transform -rotate-90 transition-all duration-500"
          >
            {/* Background track */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#e2e8f0"
              className="dark:stroke-slate-800"
              strokeWidth={strokeWidth}
            />

            {total > 0 &&
              segments.map((seg, i) => {
                const strokeDash = (seg.percentage / 100) * circumference;
                const strokeOffset = circumference - strokeDash + currentOffset;
                // Accumulate negative offset for counter-clockwise direction
                currentOffset -= strokeDash;

                const isHovered = hoveredIndex === i;

                return (
                  <circle
                    key={seg.id}
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    className={`transition-all duration-300 cursor-pointer ${
                      isHovered ? seg.hoverColor : seg.color
                    }`}
                    strokeWidth={isHovered ? strokeWidth + 2 : strokeWidth}
                    strokeDasharray={`${strokeDash} ${circumference}`}
                    strokeDashoffset={strokeOffset}
                    strokeLinecap="round"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                );
              })}
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {hoveredIndex !== null
                ? segments[hoveredIndex].label
                : "Total"}
            </span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
              {hoveredIndex !== null
                ? formatCurrency(segments[hoveredIndex].value)
                : formatCurrency(total)}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2.5 w-full">
          {segments.map((seg, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <div
                key={seg.id}
                className={`flex items-center justify-between p-1.5 rounded-lg transition-all duration-200 ${
                  isHovered
                    ? "bg-slate-50 dark:bg-slate-800/50 scale-[1.02]"
                    : "hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                }`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${seg.fillColor} block shrink-0`}
                  />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    {seg.label}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                    {formatCurrency(seg.value)}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block">
                    {seg.percentage.toFixed(0)}% of project
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
