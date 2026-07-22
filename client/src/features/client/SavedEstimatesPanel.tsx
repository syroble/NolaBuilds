import React from "react";
import { FolderOpen, Calendar, Trash2 } from "lucide-react";
import { SavedEstimate } from "../../types";

interface SavedEstimatesPanelProps {
  savedEstimates: SavedEstimate[];
  onLoadEstimate: (selections: Record<string, string>, services: string[]) => void;
  onDeleteEstimate: (id: string, name: string) => void;
}

export default function SavedEstimatesPanel({
  savedEstimates,
  onLoadEstimate,
  onDeleteEstimate,
}: SavedEstimatesPanelProps) {

  const handleLoad = (item: SavedEstimate) => {
    const services = item.selectedServices || [];
    onLoadEstimate(item.selections, services);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-100 dark:border-slate-800 shadow-xs transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 font-display">
          <FolderOpen className="w-4 h-4 text-emerald-500" />
          Saved Estimates ({savedEstimates.length})
        </h4>
      </div>

      {/* History List */}
      <div className="max-h-[220px] overflow-y-auto space-y-2 pr-1">
        {savedEstimates.length === 0 ? (
          <div className="text-center py-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
            <span className="text-xs text-slate-400 dark:text-slate-500 block">
              No saved estimates yet
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-1">
              Configure selections and tap Save in the navigation bar above
            </span>
          </div>
        ) : (
          savedEstimates.map((item: SavedEstimate) => (
            <div
              key={item.id}
              className="group flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100/80 dark:bg-slate-800/40 dark:hover:bg-slate-800/80 rounded-lg border border-slate-100 dark:border-slate-800/60 transition-all"
            >
              <div className="min-w-0 flex-1 cursor-pointer" onClick={() => handleLoad(item)}>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 block truncate hover:text-emerald-500 transition-colors">
                  {item.name}
                </span>
                <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-400">
                  <span className="flex items-center gap-0.5">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {item.date}
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="font-semibold text-slate-600 dark:text-slate-300">
                    {formatCurrency(item.totalCost)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                <button
                  onClick={() => handleLoad(item)}
                  className="px-2.5 py-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 border border-slate-200 dark:border-slate-700 rounded-md transition-all cursor-pointer"
                  title="Load estimate"
                >
                  Apply
                </button>
                <button
                  onClick={() => onDeleteEstimate(item.id, item.name)}
                  className="p-1 text-slate-400 hover:text-red-500 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-all cursor-pointer"
                  title="Delete estimate"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
