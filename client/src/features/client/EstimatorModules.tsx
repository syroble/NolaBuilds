import React from "react";
import { 
  FolderHeart, 
  Grid, 
  Layers, 
  Paintbrush, 
  Wallpaper, 
  Droplets, 
  Wrench, 
  Sun, 
  TrendingUp, 
  HelpCircle,
  Check,
  Sparkles,
  DollarSign,
  Download,
  FileText,
  Printer,
  ChevronRight,
  Info
} from "lucide-react";
import { RemodelCategory, RemodelOption } from "../../types";

// Dynamic Lucide icon mapper for room configurations
const IconMap: Record<string, React.ComponentType<any>> = {
  FolderHeart,
  Grid,
  Layers,
  Paintbrush,
  Wallpaper,
  Droplets,
  Wrench,
  Sun,
  TrendingUp
};

interface EstimatorControlsProps {
  categories: RemodelCategory[];
  selections: Record<string, string>;
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
  onSelectOption: (catId: string, optId: string, isPremium?: boolean) => void;
  lastChangedCategory: string | null;
}

function getOptionStockImage(catId: string, optId: string): string {
  const normalizedOpt = optId.toLowerCase();
  const normalizedCat = catId.toLowerCase();

  // Flooring image choices
  if (normalizedCat.includes("floor") || normalizedOpt.includes("floor")) {
    if (normalizedOpt.includes("lvp") || normalizedOpt.includes("vinyl")) {
      return "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=150&q=80";
    }
    if (normalizedOpt.includes("tile") || normalizedOpt.includes("ceramic") || normalizedOpt.includes("mosaic")) {
      return "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=150&q=80";
    }
    if (normalizedOpt.includes("carpet")) {
      return "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=150&q=80";
    }
    return "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=150&q=80"; // standard wood/hardwood
  }

  // Cabinets image choices
  if (normalizedCat.includes("cabinet") || normalizedCat.includes("vanity") || normalizedOpt.includes("cabinet") || normalizedOpt.includes("vanity")) {
    if (normalizedOpt.includes("repaint") || normalizedOpt.includes("reface")) {
      return "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=150&q=80";
    }
    if (normalizedOpt.includes("custom")) {
      return "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=150&q=80";
    }
    if (normalizedOpt.includes("stock")) {
      return "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=150&q=80";
    }
    return "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=150&q=80";
  }

  // Countertops image choices
  if (normalizedCat.includes("counter") || normalizedOpt.includes("quartz") || normalizedOpt.includes("marble") || normalizedOpt.includes("granite")) {
    if (normalizedOpt.includes("quartz")) {
      return "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=150&q=80";
    }
    if (normalizedOpt.includes("marble")) {
      return "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=150&q=80";
    }
    if (normalizedOpt.includes("granite")) {
      return "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=150&q=80";
    }
    if (normalizedOpt.includes("butcher")) {
      return "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=150&q=80";
    }
    return "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=150&q=80";
  }

  // Bath / Shower Tub
  if (normalizedCat.includes("shower") || normalizedCat.includes("tub") || normalizedOpt.includes("shower") || normalizedOpt.includes("bath")) {
    return "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=150&q=80";
  }

  // Paint choices
  if (normalizedCat.includes("paint") || normalizedOpt.includes("paint")) {
    return "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=150&q=80";
  }

  // Lighting & Electrical
  if (normalizedCat.includes("light") || normalizedCat.includes("elec")) {
    return "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=150&q=80";
  }

  // Exterior deck framing / decking material
  if (normalizedCat.includes("framing") || normalizedCat.includes("decking") || normalizedOpt.includes("deck") || normalizedOpt.includes("ipe") || normalizedOpt.includes("pine") || normalizedOpt.includes("trex")) {
    return "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=150&q=80";
  }

  // General fallback
  return "https://images.unsplash.com/photo-1615529182906-134d77411d1a?auto=format&fit=crop&w=150&q=80";
}

export function EstimatorControls({
  categories,
  selections,
  activeCategoryId,
  onSelectCategory,
  onSelectOption,
  lastChangedCategory
}: EstimatorControlsProps) {
  const activeCategory = categories.find((c) => c.id === activeCategoryId) || categories[0];

  return (
    <div className="space-y-6">
      {/* Category Selection Tab Rail */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none no-print">
        {categories.map((cat) => {
          const IconComponent = IconMap[cat.iconName] || Grid;
          const isSelected = cat.id === activeCategoryId;
          const selectedOptionId = selections[cat.id];
          const selectedOption = cat.options.find((o) => o.id === selectedOptionId);
          
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex flex-col items-start gap-1.5 p-3 rounded-xl border text-left min-w-[125px] transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/15"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${isSelected ? "bg-white/15 text-white" : "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"}`}>
                  <IconComponent className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider truncate">{cat.name}</span>
              </div>
              <span className={`text-[10px] line-clamp-1 truncate font-medium ${isSelected ? "text-blue-150" : "text-slate-400"}`}>
                {selectedOption ? selectedOption.name : "None selected"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Category Detail Panel & Option Cards Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs relative overflow-hidden">
        
        {/* Subtle Category Background highlight */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-3 border-b border-slate-150 dark:border-slate-800 pb-4 mb-5">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl">
            {React.createElement(IconMap[activeCategory.iconName] || Grid, { className: "w-5 h-5" })}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
              Select {activeCategory.name} Specification
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {activeCategory.description}
            </p>
          </div>
        </div>

        {/* List of Material/Service Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {activeCategory.options.map((opt) => {
            const isSelected = selections[activeCategory.id] === opt.id;
            const itemTotal = opt.materialCost + opt.laborCost + opt.overhead;

            return (
              <button
                key={opt.id}
                onClick={() => onSelectOption(activeCategory.id, opt.id, opt.isPremium)}
                className={`p-3 rounded-xl border text-left flex gap-3.5 transition-all cursor-pointer relative ${
                  isSelected
                    ? "bg-blue-50/45 dark:bg-blue-950/20 border-blue-500/80 ring-1 ring-blue-500/40"
                    : "bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 border-slate-200 dark:border-slate-800"
                }`}
              >
                {/* Stock Image Thumbnail */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 border border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 no-print">
                  <img
                    src={getOptionStockImage(activeCategory.id, opt.id)}
                    alt={opt.name}
                    className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1615529182906-134d77411d1a?auto=format&fit=crop&w=150&q=80";
                    }}
                  />
                </div>

                {/* Content Column */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-xs text-slate-900 dark:text-slate-100 font-display truncate">
                        {opt.name}
                      </span>
                      {opt.isPremium && (
                        <span className="px-1.5 py-0.5 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-black text-[8px] uppercase tracking-wider rounded-md border border-amber-200/40">
                          Premium
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed line-clamp-2">
                      {opt.description}
                    </p>
                  </div>

                  {/* Pricing summary tag */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <div className="flex gap-2 text-[9px] text-slate-400">
                      <span className="hidden xs:inline">Mats: <strong className="font-mono text-slate-600 dark:text-slate-350">${opt.materialCost}</strong></span>
                      <span className="hidden xs:inline">Labor: <strong className="font-mono text-slate-600 dark:text-slate-350">${opt.laborCost}</strong></span>
                      <span>Days: <strong className="font-mono text-slate-600 dark:text-slate-350">{opt.durationDays}d</strong></span>
                    </div>
                    <span className="text-xs font-black font-mono text-slate-800 dark:text-slate-250">
                      ${itemTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute top-3 right-3 bg-blue-600 text-white p-0.5 rounded-full z-10 shadow-xs">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}

interface CostBreakdownProps {
  metrics: {
    materials: number;
    labor: number;
    overhead: number;
    total: number;
    minCost: number;
    maxCost: number;
    duration: number;
    budgetTier: string;
    progressPercent: number;
  };
  sliderPercentage: number;
  logisticsDays: number;
  demoInstallDays: number;
  finishingDays: number;
  logisticsPct: number;
  demoInstallPct: number;
  finishingPct: number;
}

export function CostBreakdown({
  metrics,
  sliderPercentage,
  logisticsDays,
  demoInstallDays,
  finishingDays,
  logisticsPct,
  demoInstallPct,
  finishingPct
}: CostBreakdownProps) {
  
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Dynamic Cost Range display card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider block">
            Estimated Total Cost
          </span>
          
          <div className="mt-1.5 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="text-2xl font-bold font-display tracking-tight text-slate-900 dark:text-white">
              {formatCurrency(metrics.minCost)} – {formatCurrency(metrics.maxCost)}
            </div>
            <div className="inline-block mt-2.5 px-2 py-0.5 bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 text-[10px] font-bold rounded">
              BUDGET TIER: {metrics.budgetTier}
            </div>
          </div>
        </div>

        {/* Progress track with indicator */}
        <div className="w-full space-y-3.5 py-4">
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex relative">
            <div
              className="absolute left-0 top-0 h-full bg-blue-100 dark:bg-blue-950/30 rounded-full"
              style={{ width: `${sliderPercentage}%` }}
            />
            <div
              className="absolute top-0 bottom-0 w-1 bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)] z-10"
              style={{ left: `calc(${sliderPercentage}% - 2px)` }}
            />
            <div className="h-full w-1/4 bg-slate-200/40 dark:bg-slate-700/40"></div>
            <div className="h-full w-1/4 bg-slate-300/40 dark:bg-slate-600/40"></div>
            <div className="h-full w-1/4 bg-slate-400/40 dark:bg-slate-500/40"></div>
            <div className="h-full w-1/4 bg-slate-500/40 dark:bg-slate-400/40"></div>
          </div>
          <div className="flex justify-between text-[10px] font-bold text-slate-400">
            <span className={metrics.budgetTier === "$" ? "text-blue-600" : ""}>$</span>
            <span className={metrics.budgetTier === "$$" ? "text-blue-600" : ""}>$$</span>
            <span className={metrics.budgetTier === "$$$" ? "text-blue-600" : ""}>$$$</span>
            <span className={metrics.budgetTier === "$$$$" ? "text-blue-600" : ""}>$$$$</span>
          </div>
        </div>

        {/* Ledger Breakdown list */}
        <div className="w-full pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col gap-2">
          <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
            <span>Materials Ledger</span>
            <span className="font-bold font-mono text-slate-700 dark:text-slate-200">{formatCurrency(metrics.materials)}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
            <span>Labor Contract Base</span>
            <span className="font-bold font-mono text-slate-700 dark:text-slate-200">{formatCurrency(metrics.labor)}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
            <span>Overheads &amp; Permitting</span>
            <span className="font-bold font-mono text-slate-700 dark:text-slate-200">{formatCurrency(metrics.overhead)}</span>
          </div>
        </div>
      </div>

      {/* 2. Timeline Breakdown card */}
      <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between min-h-[300px]">
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
            Project Timeline
          </span>
          
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-5xl font-black text-blue-400">
              {metrics.duration}
            </span>
            <span className="text-sm font-bold text-slate-400">Business Days</span>
          </div>

          <p className="mt-3 text-[11px] text-slate-400 leading-relaxed">
            Dynamic milestone projections based on Gulf Coast permit times and custom material lead schedules.
          </p>
        </div>

        {/* Timeline Phase stage progressions */}
        <div className="space-y-3.5 pt-6">
          <div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Logistics &amp; Ordering</span>
              <span className="text-slate-200 font-mono font-bold">{logisticsDays} Days</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1">
              <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${logisticsPct}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Site Prep &amp; Install</span>
              <span className="text-slate-200 font-mono font-bold">{demoInstallDays} Days</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1">
              <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${demoInstallPct}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Finishes &amp; Cleanup</span>
              <span className="text-slate-200 font-mono font-bold">{finishingDays} Days</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1">
              <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${finishingPct}%` }}></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
interface ConfigurationActionsProps {
  onSaveDraft: () => void;
  onDownloadPDF: () => void;
  isSaving: boolean;
}

export function ConfigurationActions({
  onSaveDraft,
  onDownloadPDF,
  isSaving
}: ConfigurationActionsProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3 flex flex-col sm:flex-row sm:space-y-0 sm:gap-3 justify-between items-center no-print">
      
      <div className="text-center sm:text-left space-y-0.5">
        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 justify-center sm:justify-start">
          <Info className="w-3.5 h-3.5 text-blue-500" />
          <span>Save or Lock Draft</span>
        </h4>
        <p className="text-[10px] text-slate-400">
          Save specifications to your account portfolio or request contractor scoping.
        </p>
      </div>

      <div className="flex items-center gap-2.5 w-full sm:w-auto">
        <button
          onClick={onSaveDraft}
          disabled={isSaving}
          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-350 text-xs font-bold rounded-xl transition-all cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{isSaving ? "Saving..." : "Save Draft"}</span>
        </button>

        <button
          onClick={onDownloadPDF}
          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-350 text-xs font-bold rounded-xl transition-all cursor-pointer"
          title="Print specifications sheet"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print</span>
        </button>
      </div>

    </div>
  );
}
