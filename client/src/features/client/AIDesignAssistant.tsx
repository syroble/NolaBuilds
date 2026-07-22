import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, CheckCircle2, RotateCcw, AlertCircle } from "lucide-react";
import apiClient from "../../api/client";
import { AISuggestionResult } from "../../types";

interface AIDesignAssistantProps {
  onApplyAISuggestions: (matchedOptionIds: Record<string, string>) => void;
  initialDescription?: string;
}

export default function AIDesignAssistant({ onApplyAISuggestions, initialDescription }: AIDesignAssistantProps) {
  const [inputValue, setInputValue] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AISuggestionResult | null>(null);

  const samplePrompts = [
    "Bright modern kitchen, quartz counters, dark floors",
    "Cozy farmhouse style with butcher block and farmhouse sink",
    "Ultra luxury marble countertops and custom chef appliances",
    "Economical simple remodel to repaint cabinets and save money",
  ];

  const handleAnalyze = async (text: string) => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    setResult(null);

    try {
      // Make real call to server-side Gemini endpoint
      const response = await apiClient.post("/ai/suggestion", { prompt: text });
      const data = response.data;

      // Map backend response schema to frontend AISuggestionResult format
      const selections = data.selections || {};
      
      // Map keys to pretty material names for rendering in the suggestion card
      const prettyMaterials: Record<string, string> = {
        cabinets: selections.cabinets === "repaint" ? "Repainted Existing Cabinets" : selections.cabinets === "stock" ? "Stock Laminate Cabinets" : "Bespoke Hardwoods",
        countertops: selections.countertops === "butcher-block" ? "Butcher Block" : selections.countertops === "quartz" ? "Engineered Quartz" : selections.countertops === "marble" ? "Premium Marble" : selections.countertops === "granite" ? "Natural Granite" : "Standard Laminate",
        flooring: selections.flooring === "hardwood" ? "Engineered Oak Hardwood" : selections.flooring === "tile" ? "Porcelain / Slate Tile" : selections.flooring === "vinyl" ? "Luxury Vinyl Plank" : "Laminate Planks"
      };

      const finalResult: AISuggestionResult = {
        style: data.style || "Custom Concept",
        budgetTier: data.budgetTier || "$$",
        explanation: data.explanation || "Configured with durable premium materials tailored to your specific concepts.",
        matchedOptionIds: selections,
        suggestedMaterials: prettyMaterials
      };

      setResult(finalResult);
    } catch (err) {
      console.error("AI Assistant API call failed, using offline fallback", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    if (initialDescription) {
      setInputValue(initialDescription);
      handleAnalyze(initialDescription);
    }
  }, [initialDescription]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAnalyze(inputValue);
  };

  const handleApplyBlueprint = () => {
    if (!result) return;
    onApplyAISuggestions(result.matchedOptionIds);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl p-4 sm:p-5 border border-slate-100 dark:border-slate-800 flex flex-col h-full justify-between transition-all">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-amber-100 dark:bg-amber-950/40 p-1.5 rounded-lg">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 font-display">
              AI Design Assistant
            </h4>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block">
              Describe your dream kitchen to auto-configure estimator
            </span>
          </div>
        </div>

        {/* Input box */}
        <form onSubmit={handleFormSubmit} className="relative mt-2">
          <textarea
            rows={5}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g., I want a bright modern kitchen with white cabinets, quartz counters, and matte black fixtures."
            className="w-full pr-12 pl-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:border-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 resize-none font-sans"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleFormSubmit(e);
              }
            }}
          />
          <button
            type="submit"
            disabled={isAnalyzing || !inputValue.trim()}
            className="absolute right-2 bottom-3.5 p-1.5 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white rounded-md transition-all cursor-pointer shadow-xs focus:outline-hidden"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick Suggestion Chips */}
        {!result && !isAnalyzing && (
          <div className="mt-3.5">
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 block uppercase tracking-wider mb-1.5">
              Click a sample prompt to try:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {samplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setInputValue(prompt);
                    handleAnalyze(prompt);
                  }}
                  className="text-[10px] text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-150 dark:border-slate-800 px-2.5 py-1 rounded-full transition-colors cursor-pointer text-left"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {isAnalyzing && (
          <div className="mt-6 flex flex-col items-center justify-center py-6 text-center animate-fade-in">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full border-2 border-amber-200 animate-ping" />
              <div className="absolute inset-0 rounded-full border-t-2 border-amber-500 animate-spin" />
            </div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-3.5">
              Analyzing style semantics...
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-1">
              Matching materials, layouts & budget tiers
            </span>
          </div>
        )}

        {/* AI Classification Result Box */}
        {result && !isAnalyzing && (
          <div className="mt-4 bg-white dark:bg-slate-800 border border-amber-100 dark:border-amber-950/50 rounded-lg p-3 sm:p-4 shadow-xs animate-fade-in text-xs space-y-2.5 sm:space-y-3.5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Style Profile Matching</span>
              </div>
              <button
                onClick={() => {
                  setResult(null);
                  setInputValue("");
                }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-0.5"
                title="Reset AI search"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-2 sm:p-2.5 rounded-md">
                <span className="text-[9px] text-slate-400 dark:text-slate-500 block uppercase font-bold mb-0.5">
                  Classified Style
                </span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {result.style}
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-2 sm:p-2.5 rounded-md">
                <span className="text-[9px] text-slate-400 dark:text-slate-500 block uppercase font-bold mb-0.5">
                  Budget Level
                </span>
                <span className="text-xs font-bold text-amber-500 tracking-wider">
                  {result.budgetTier}{" "}
                  <span className="text-[9px] font-normal text-slate-400 dark:text-slate-500">
                    ({result.budgetTier === "$" ? "Budget" : result.budgetTier === "$$" ? "Moderate" : result.budgetTier === "$$$" ? "Premium" : "Luxury"})
                  </span>
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[9px] text-slate-400 dark:text-slate-500 block uppercase font-bold">
                Suggested Materials
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0" />
                  <span className="leading-tight"><span className="font-medium">Cabinets:</span> {result.suggestedMaterials.cabinets || "Shaker Style"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0" />
                  <span className="leading-tight"><span className="font-medium">Counters:</span> {result.suggestedMaterials.countertops || "Quartz"}</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50/50 dark:bg-amber-950/10 border-l-2 border-amber-400 p-2 text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed rounded-r-md">
              {result.explanation}
            </div>

            <button
              onClick={handleApplyBlueprint}
              className="w-full flex items-center justify-center gap-1.5 py-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-xs rounded-md shadow-xs transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Apply AI Blueprint to Estimator
            </button>
          </div>
        )}
      </div>

      <div className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-4 pt-3 border-t border-slate-150 dark:border-slate-800">
        <AlertCircle className="w-3 h-3 shrink-0" />
        <span>Values are preliminary and intended for structural planning.</span>
      </div>
    </div>
  );
}
