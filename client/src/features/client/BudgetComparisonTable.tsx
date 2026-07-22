import React from "react";
import { Check, Info, ArrowUpRight, Award, Flame, Zap } from "lucide-react";
import { TEMPLATES } from "../../data/data";

interface BudgetComparisonTableProps {
  onLoadTemplate: (selections: Record<string, string>, additionalServices: string[]) => void;
}

export default function BudgetComparisonTable({ onLoadTemplate }: BudgetComparisonTableProps) {
  const categories = [
    { name: "Cabinets Style", key: "cabinets", budget: "Repaint / Reface", midrange: "Stock Cabinets", luxury: "Custom Hardwood" },
    { name: "Countertops", key: "countertops", budget: "Laminate", midrange: "Engineered Quartz", luxury: "Premium Marble" },
    { name: "Flooring", key: "flooring", budget: "Luxury Vinyl Plank (LVP)", midrange: "Ceramic / Porcelain Tile", luxury: "Hardwood" },
    { name: "Paint", key: "paint", budget: "Standard Paint", midrange: "Premium Satin Paint", luxury: "Designer / Texture Finish" },
    { name: "Backsplash", key: "backsplash", budget: "None (Painted)", midrange: "Classic Subway Tile", luxury: "Natural Stone Slab" },
    { name: "Sink", key: "sink", budget: "Standard Drop-In", midrange: "Undermount Stainless", luxury: "Workstation Sink" },
    { name: "Faucet", key: "faucet", budget: "Basic Chrome", midrange: "Pull-Down Sprayer", luxury: "Touchless Motion-Sensor" },
    { name: "Appliances", key: "appliances", budget: "Keep Existing", midrange: "Mid-Range Stainless", luxury: "Premium Chef's Suite" },
    { name: "Lighting", key: "lighting", budget: "Standard Fixtures", midrange: "Recessed Pot Lights", luxury: "Smart Ambience System" },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-100 dark:border-slate-800 shadow-xs transition-colors">
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 font-display flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600" />
          Remodel Class Comparison
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Compare materials side-by-side. Load any profile instantly into your estimator worksheet.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="border-b border-slate-150 dark:border-slate-800">
              <th className="py-3 px-3 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider w-[20%]">
                Remodel Element
              </th>
              
              {/* Budget Column Header */}
              <th className="py-3 px-4 w-[26%]">
                <div className="flex items-center gap-1 text-slate-800 dark:text-slate-200">
                  <Zap className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-xs font-bold font-display">Economical Refresher</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium block mt-0.5">$ (Approx. $10K - $15K)</span>
              </th>

              {/* Midrange Column Header */}
              <th className="py-3 px-4 w-[26%] bg-slate-50/50 dark:bg-slate-800/20 border-x border-slate-100 dark:border-slate-800/60">
                <div className="flex items-center gap-1 text-slate-850 dark:text-slate-100">
                  <ArrowUpRight className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-xs font-bold font-display">Modern Balanced</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium block mt-0.5">$$$ (Approx. $25K - $40K)</span>
              </th>

              {/* Luxury Column Header */}
              <th className="py-3 px-4 w-[28%]">
                <div className="flex items-center gap-1 text-slate-800 dark:text-slate-200">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-xs font-bold font-display">Grand Chef's Dream</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium block mt-0.5">$$$$ (Approx. $65K - $90K)</span>
              </th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
            {categories.map((cat, idx) => (
              <tr key={idx} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/10 transition-colors">
                <td className="py-2.5 px-3 font-semibold text-slate-700 dark:text-slate-300">
                  {cat.name}
                </td>
                <td className="py-2.5 px-4 text-slate-500 dark:text-slate-400">
                  {cat.budget}
                </td>
                <td className="py-2.5 px-4 bg-slate-50/30 dark:bg-slate-800/10 border-x border-slate-100 dark:border-slate-800/60 font-medium text-slate-800 dark:text-slate-200">
                  {cat.midrange}
                </td>
                <td className="py-2.5 px-4 text-slate-600 dark:text-slate-300">
                  {cat.luxury}
                </td>
              </tr>
            ))}
            
            {/* Action buttons footer inside table */}
            <tr className="border-t-2 border-slate-150 dark:border-slate-800 bg-slate-50/20">
              <td className="py-4 px-3 font-bold text-slate-700 dark:text-slate-300">
                Worksheet Blueprint
              </td>
              
              {/* Load Budget */}
              <td className="py-4 px-4">
                <button
                  onClick={() => {
                    const template = TEMPLATES.find((t) => t.id === "budget-template");
                    if (template) onLoadTemplate(template.selections, template.additionalServices);
                  }}
                  className="w-full py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/20 dark:hover:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 font-bold rounded-lg transition-colors cursor-pointer text-center text-[10px] uppercase tracking-wider"
                >
                  Load Budget Setup
                </button>
              </td>

              {/* Load Midrange */}
              <td className="py-4 px-4 bg-slate-50/50 dark:bg-slate-800/20 border-x border-slate-100 dark:border-slate-800/60">
                <button
                  onClick={() => {
                    const template = TEMPLATES.find((t) => t.id === "midrange-template");
                    if (template) onLoadTemplate(template.selections, template.additionalServices);
                  }}
                  className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-lg transition-colors shadow-xs cursor-pointer text-center text-[10px] uppercase tracking-wider"
                >
                  Load Balanced Setup
                </button>
              </td>

              {/* Load Luxury */}
              <td className="py-4 px-4">
                <button
                  onClick={() => {
                    const template = TEMPLATES.find((t) => t.id === "luxury-template");
                    if (template) onLoadTemplate(template.selections, template.additionalServices);
                  }}
                  className="w-full py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 dark:bg-amber-950/20 dark:hover:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-900 font-bold rounded-lg transition-colors cursor-pointer text-center text-[10px] uppercase tracking-wider"
                >
                  Load Luxury Setup
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
