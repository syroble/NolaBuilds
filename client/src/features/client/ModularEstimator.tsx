import React, { useState, useEffect } from "react";
import { 
  FolderHeart, 
  Droplets, 
  Layers, 
  Grid, 
  Wrench, 
  RotateCcw, 
  Sparkles, 
  Plus, 
  FileText, 
  ArrowLeft,
  X,
  PlusCircle,
  HelpCircle,
  ClipboardList,
  FileSignature,
  Check
} from "lucide-react";
import { ROOM_DATA, calculateRoomCosts } from "../../data/roomData";
import { EstimatorControls, CostBreakdown, ConfigurationActions } from "./EstimatorModules";
import { SavedEstimate } from "../../types";
import AIDesignAssistant from "./AIDesignAssistant";

// Dynamic icon map for room tabs
const TabIconMap: Record<string, React.ComponentType<any>> = {
  "Kitchen": FolderHeart,
  "Bathroom": Droplets,
  "Living Space": Layers,
  "Outdoor Deck": Grid
};

interface ModularEstimatorProps {
  user: { name: string; email: string } | null;
  onSaveEstimate: (name: string, roomType: string, selections: Record<string, string>, totalCost: number, services: string[], notes?: string) => void;
  initialEstimateToLoad: SavedEstimate | null;
  onClearLoadedEstimate: () => void;
  triggerToast: (msg: string) => void;
  onNavigate: (route: string) => void;
  onTriggerAIAssistant: () => void;
}

export default function ModularEstimator({
  user,
  onSaveEstimate,
  initialEstimateToLoad,
  onClearLoadedEstimate,
  triggerToast,
  onNavigate,
  onTriggerAIAssistant
}: ModularEstimatorProps) {
  
  // 1. Detect which room type to initialize
  const getInitialRoomType = () => {
    try {
      const stored = localStorage.getItem("nola_builts_new_project_details");
      if (stored) {
        const details = JSON.parse(stored);
        if (details && details.spaceType) {
          return details.spaceType;
        }
      }
    } catch (e) {
      console.error(e);
    }

    if (initialEstimateToLoad) {
      const lower = initialEstimateToLoad.name.toLowerCase();
      if (lower.includes("bath")) return "Bathroom";
      if (lower.includes("deck")) return "Outdoor Deck";
      if (lower.includes("living") || lower.includes("parlor")) return "Living Space";
    }
    return "Kitchen";
  };

  const [activeRoomType, setActiveRoomType] = useState<string>(getInitialRoomType());
  const currentRoomDef = ROOM_DATA[activeRoomType] || ROOM_DATA["Kitchen"];

  const [newProjectDetails, setNewProjectDetails] = useState<{
    timeline: string;
    budget: string;
    isIndoor: boolean;
    spaceType: string;
    description: string;
    width: number;
    length: number;
    layoutShape: string;
    materialTier: string;
    aestheticStyle: string;
    unlistedNotes: string;
  } | null>(() => {
    try {
      const stored = localStorage.getItem("nola_builts_new_project_details");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // 2. Initialize Selections State
  const [selections, setSelections] = useState<Record<string, string>>(() => {
    if (initialEstimateToLoad) {
      return { ...initialEstimateToLoad.selections };
    }
    try {
      const stored = localStorage.getItem("nola_builts_new_project_details");
      if (stored) {
        const details = JSON.parse(stored);
        if (details && details.materialTier) {
          const s: Record<string, string> = {};
          if (details.materialTier === "Budget") {
            currentRoomDef.categories.forEach((cat) => {
              const nonKeep = cat.options.filter(
                (o) =>
                  o.id !== "keep-existing" &&
                  o.id !== "none" &&
                  o.id !== "no-builtins" &&
                  o.id !== "no-amenities" &&
                  o.id !== "refinish-vanity"
              );
              const chosen = nonKeep.length > 0 ? nonKeep[0] : cat.options[0];
              s[cat.id] = chosen.id;
            });
            return s;
          } else if (details.materialTier === "Luxury") {
            currentRoomDef.categories.forEach((cat) => {
              const premiumOpt = cat.options.find((o) => o.isPremium) || cat.options[cat.options.length - 1];
              s[cat.id] = premiumOpt.id;
            });
            return s;
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
    return { ...currentRoomDef.defaultSelections };
  });

  // Track additional services
  const [selectedServices, setSelectedServices] = useState<string[]>(() => {
    if (initialEstimateToLoad?.selectedServices) {
      return [...initialEstimateToLoad.selectedServices];
    }
    return ["demolition"];
  });

  const [currentQualityTier, setCurrentQualityTier] = useState<"Budget" | "Mid-Grade" | "Luxury">(() => {
    try {
      const stored = localStorage.getItem("nola_builts_new_project_details");
      if (stored) {
        const details = JSON.parse(stored);
        if (details && details.materialTier) {
          return details.materialTier as "Budget" | "Mid-Grade" | "Luxury";
        }
      }
    } catch {}
    return "Mid-Grade";
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("nola_builts_new_project_details");
      if (stored) {
        const details = JSON.parse(stored);
        if (details && details.materialTier) {
          setCurrentQualityTier(details.materialTier as "Budget" | "Mid-Grade" | "Luxury");
        }
      }
    } catch {}
  }, [newProjectDetails]);

  const [activeCategoryId, setActiveCategoryId] = useState<string>("");
  const [lastChangedCategory, setLastChangedCategory] = useState<string | null>(null);

  // Save Modal States
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [estimateDraftName, setEstimateDraftName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [estimatorNotes, setEstimatorNotes] = useState(() => {
    if (initialEstimateToLoad?.notes) {
      return initialEstimateToLoad.notes;
    }
    try {
      const stored = localStorage.getItem("nola_builts_new_project_details");
      if (stored) {
        const details = JSON.parse(stored);
        if (details && details.unlistedNotes) {
          return details.unlistedNotes;
        }
      }
    } catch {}
    return "";
  });

  // Sync state if initialEstimateToLoad changes (e.g., loaded from dashboard)
  useEffect(() => {
    if (initialEstimateToLoad) {
      const detectedRoom = getInitialRoomType();
      setActiveRoomType(detectedRoom);
      setSelections({ ...initialEstimateToLoad.selections });
      if (initialEstimateToLoad.selectedServices) {
        setSelectedServices([...initialEstimateToLoad.selectedServices]);
      }
      setEstimatorNotes(initialEstimateToLoad.notes || "");
      triggerToast(`Loaded configuration: "${initialEstimateToLoad.name}"`);
    }
  }, [initialEstimateToLoad]);

  // Sync default state when switching room types (unless we are loading an estimate)
  const handleRoomTypeChange = (roomType: string) => {
    setActiveRoomType(roomType);
    const def = ROOM_DATA[roomType] || ROOM_DATA["Kitchen"];
    setSelections({ ...def.defaultSelections });
    // Keep demolition as standard
    setSelectedServices(["demolition"]);
    setEstimatorNotes("");
    // Trigger reset of active categories
    setActiveCategoryId(def.categories[0]?.id || "");
    onClearLoadedEstimate();
    triggerToast(`Configurator shifted to: ${roomType}`);
  };

  // Set initial category id when activeRoomType changes
  useEffect(() => {
    if (currentRoomDef.categories.length > 0) {
      setActiveCategoryId(currentRoomDef.categories[0].id);
    }
  }, [activeRoomType]);

  const handleOptionSelect = (catId: string, optId: string, isPremiumOption?: boolean) => {
    setSelections((prev) => ({
      ...prev,
      [catId]: optId,
    }));
    
    setLastChangedCategory(catId);
    setTimeout(() => {
      setLastChangedCategory(null);
    }, 1000);
  };

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // Quick Preset Templates to help homeowners
  const loadBudgetPreset = () => {
    const firstOpt = currentRoomDef.categories.map((cat) => {
      // Pick the cheapest option (usually index 0 or index 1 if keep is index 0)
      const nonKeep = cat.options.filter(o => o.id !== "keep-existing" && o.id !== "none" && o.id !== "no-builtins" && o.id !== "no-amenities" && o.id !== "refinish-vanity");
      const chosen = nonKeep.length > 0 ? nonKeep[0] : cat.options[0];
      return { catId: cat.id, optId: chosen.id };
    });

    const newSelections: Record<string, string> = {};
    firstOpt.forEach(o => { newSelections[o.catId] = o.optId; });
    setSelections(newSelections);
    setSelectedServices(["demolition"]);
    setCurrentQualityTier("Budget");
    triggerToast(`Loaded Smart Budget Preset`);
  };

  const loadMidRangePreset = () => {
    // Standard default selection
    setSelections({ ...currentRoomDef.defaultSelections });
    setSelectedServices(["demolition"]);
    setCurrentQualityTier("Mid-Grade");
    triggerToast(`Loaded Balanced Mid-Range Preset`);
  };

  const loadLuxuryPreset = () => {
    const premiumSelections: Record<string, string> = {};
    currentRoomDef.categories.forEach((cat) => {
      const premiumOpt = cat.options.find(o => o.isPremium) || cat.options[cat.options.length - 1];
      premiumSelections[cat.id] = premiumOpt.id;
    });
    setSelections(premiumSelections);
    setSelectedServices(["demolition", "permit_fees", "architect_design"]);
    setCurrentQualityTier("Luxury");
    triggerToast(`Loaded Grand Luxury Preset`);
  };

  const handleResetAll = () => {
    if (confirm(`Reset configuration to default ${activeRoomType} selections?`)) {
      setSelections({ ...currentRoomDef.defaultSelections });
      setSelectedServices(["demolition"]);
      setCurrentQualityTier("Mid-Grade");
      onClearLoadedEstimate();
      triggerToast("Selections reset to default");
    }
  };

  // Cost Compilation
  const metrics = calculateRoomCosts(activeRoomType, selections, selectedServices);

  // Slider scaling
  const sliderPercentage = Math.min(
    100,
    Math.max(0, ((metrics.total - 6000) / 70000) * 100)
  );

  const logisticsDays = Math.min(3, Math.max(1, Math.floor(metrics.duration * 0.15)));
  const demoInstallDays = Math.max(3, metrics.duration - logisticsDays - 2);
  const finishingDays = Math.max(1, metrics.duration - logisticsDays - demoInstallDays);

  const logisticsPct = Math.round((logisticsDays / metrics.duration) * 100) || 20;
  const demoInstallPct = Math.round((demoInstallDays / metrics.duration) * 100) || 60;
  const finishingPct = Math.round((finishingDays / metrics.duration) * 100) || 20;

  // Actions
  const handleOpenSaveModal = () => {
    setEstimateDraftName(initialEstimateToLoad?.name || `${activeRoomType} Remodel Plan ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}`);
    setIsSaveModalOpen(true);
  };

  const handleSaveDraftSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!estimateDraftName.trim()) return;

    setIsSaving(true);
    setTimeout(() => {
      onSaveEstimate(
        estimateDraftName.trim(),
        activeRoomType,
        selections,
        metrics.total,
        selectedServices,
        estimatorNotes
      );
      setIsSaving(false);
      setIsSaveModalOpen(false);
      triggerToast("Draft Saved! Review inside your Client Dashboard.");
    }, 700);
  };

  const handlePrintSpecs = () => {
    window.print();
  };

  const handleSubmitToStaff = () => {
    if (confirm(`Are you ready to submit your active "${initialEstimateToLoad?.name || activeRoomType + ' Spec'}" configuration to NOLA BUILDS engineering staff for custom blueprinting & local site licensing?`)) {
      triggerToast("Submitted successfully! Our Garden District foreman will text you inside 2 hours.");
      onNavigate("/dashboard");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5 mb-6">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">Interactive Workspace</span>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-950 dark:text-white flex items-center gap-2">
            <span>{activeRoomType} Cost Estimator</span>
            {initialEstimateToLoad && (
              <span className="text-xs bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-bold px-2.5 py-1 rounded-lg border border-amber-200/40 font-sans">
                Active Draft: {initialEstimateToLoad.name}
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Build live price breakdowns based on custom trade formulas, high-durability materials, and New Orleans labor indexes.
          </p>
        </div>

        {/* Preset configuration buttons */}
        <div className="flex items-center gap-2 flex-wrap no-print">
          <button
            onClick={loadBudgetPreset}
            className={`px-3 py-1.5 text-[11px] font-black rounded-lg cursor-pointer transition-all flex items-center gap-1 ${
              currentQualityTier === "Budget"
                ? "bg-green-600 hover:bg-green-700 text-white shadow-xs border border-green-600"
                : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-350 border border-transparent"
            }`}
          >
            {currentQualityTier === "Budget" && <Check className="w-3 h-3 shrink-0" />}
            <span>$ Economy</span>
          </button>
          <button
            onClick={loadMidRangePreset}
            className={`px-3 py-1.5 text-[11px] font-black rounded-lg cursor-pointer transition-all flex items-center gap-1 ${
              currentQualityTier === "Mid-Grade"
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-xs border border-blue-600"
                : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-350 border border-transparent"
            }`}
          >
            {currentQualityTier === "Mid-Grade" && <Check className="w-3 h-3 shrink-0" />}
            <span>$$ Mid-Range</span>
          </button>
          <button
            onClick={loadLuxuryPreset}
            className={`px-3 py-1.5 text-[11px] font-black rounded-lg cursor-pointer transition-all flex items-center gap-1 ${
              currentQualityTier === "Luxury"
                ? "bg-amber-500 hover:bg-amber-600 text-white shadow-xs border border-amber-500"
                : "bg-amber-50/40 hover:bg-amber-100/60 dark:bg-amber-950/10 dark:hover:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-200/20"
            }`}
          >
            {currentQualityTier === "Luxury" && <Check className="w-3 h-3 shrink-0" />}
            <span>$$$$ Luxury</span>
          </button>
          <button
            onClick={handleResetAll}
            className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-500 rounded-lg cursor-pointer transition-colors"
            title="Reset to Default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* DYNAMIC CALIBRATION STATUS CARD */}
      {newProjectDetails && (
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-slate-900/60 dark:to-slate-950/60 border border-blue-150 dark:border-blue-900/30 rounded-2xl p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in no-print">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-blue-600/10 text-blue-600 dark:text-blue-400 rounded-xl shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Spatial &amp; Aesthetic Calibration Active
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 max-w-xl">
                Estimator is dynamically configured based on your <strong>{newProjectDetails.width}' &times; {newProjectDetails.length}' ({newProjectDetails.width * newProjectDetails.length} sq ft)</strong> spatial envelope, <strong>{newProjectDetails.layoutShape}</strong> layout, and <strong>{newProjectDetails.materialTier}</strong> materials tier.
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="text-[9px] bg-white dark:bg-slate-850 px-2 py-0.5 rounded-md font-bold text-slate-600 dark:text-slate-350 border border-slate-150 dark:border-slate-800">
                  Style: {newProjectDetails.aestheticStyle}
                </span>
                <span className="text-[9px] bg-white dark:bg-slate-850 px-2 py-0.5 rounded-md font-bold text-slate-600 dark:text-slate-350 border border-slate-150 dark:border-slate-800">
                  Timeline: {newProjectDetails.timeline}
                </span>
                <span className="text-[9px] bg-white dark:bg-slate-850 px-2 py-0.5 rounded-md font-bold text-slate-600 dark:text-slate-350 border border-slate-150 dark:border-slate-800">
                  Target Budget: {newProjectDetails.budget}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("nola_builts_new_project_details");
              setNewProjectDetails(null);
              setCurrentQualityTier("Mid-Grade");
              triggerToast("Reset workspace calibration to global standard templates.");
            }}
            className="self-start md:self-center text-[10px] font-bold text-slate-500 hover:text-slate-750 dark:hover:text-slate-200 px-2.5 py-1.5 border border-slate-200 dark:border-slate-800 rounded-lg bg-white/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-850 transition-all cursor-pointer"
          >
            Clear Calibration
          </button>
        </div>
      )}

      {/* TWO-COLUMN GRID WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Estimator selectors and materials (7 of 12 columns) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          
          {/* Controls Subcomponent */}
          <EstimatorControls
            categories={currentRoomDef.categories}
            selections={selections}
            activeCategoryId={activeCategoryId}
            onSelectCategory={setActiveCategoryId}
            onSelectOption={handleOptionSelect}
            lastChangedCategory={lastChangedCategory}
          />

          {/* ITEMIZED TRACKER COST SHEET WITH TALLIED TOTAL */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-150 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-lg">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-850 dark:text-slate-200">
                    Itemized Cost Tracker Sheet
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Live compiled invoice structure for your current {activeRoomType} selections.
                  </p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-[320px] overflow-y-auto pr-1">
              {currentRoomDef.categories.map((cat) => {
                const selectedOptionId = selections[cat.id];
                const option = cat.options.find((opt) => opt.id === selectedOptionId);
                if (!option) return null;
                const itemTotal = option.materialCost + option.laborCost + option.overhead;
                return (
                  <div key={cat.id} className="py-2.5 flex items-start justify-between gap-4 text-xs">
                    <div className="min-w-0">
                      <span className="font-bold text-slate-850 dark:text-slate-200 block truncate">
                        {cat.name}
                      </span>
                      <span className="text-[10px] text-slate-450 dark:text-slate-500 block truncate">
                        {option.name}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200 block">
                        ${itemTotal.toLocaleString()}
                      </span>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500">
                        M: ${option.materialCost.toLocaleString()} | L: ${option.laborCost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* TALLIED ITEM TOTAL */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/20 p-3 rounded-xl border border-dashed border-slate-150 dark:border-slate-850">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 block">
                  Tallied Selections Total
                </span>
                <span className="text-[9px] text-slate-400 dark:text-slate-550">
                  Subtotal of all selected components
                </span>
              </div>
              <div className="text-right">
                <span className="text-lg sm:text-xl font-black font-mono text-blue-600 dark:text-blue-400">
                  ${(currentRoomDef.categories.reduce((acc, cat) => {
                    const selectedOptionId = selections[cat.id];
                    const option = cat.options.find((opt) => opt.id === selectedOptionId);
                    return acc + (option ? option.materialCost + option.laborCost + option.overhead : 0);
                  }, 0)).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* ADDED NOTES SECTION FOR SPECIAL REQUESTS & UNLISTED MATERIALS */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-150 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-lg">
                  <FileSignature className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-850 dark:text-slate-200">
                    Added Project Notes &amp; Preferences
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Specify special layout instructions, preferred brands, custom color schemes, or unlisted materials.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <textarea
                value={estimatorNotes}
                onChange={(e) => setEstimatorNotes(e.target.value)}
                placeholder="e.g. Please preserve the historic brick chimney in the back corner. Would love to request solid brass faucets if possible, and select Sherwin Williams 'Alabaster' for trim paint..."
                rows={4}
                className="w-full px-3.5 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-650 resize-none"
              />
              <div className="flex justify-between items-center mt-2 text-[9px] text-slate-400 dark:text-slate-500 px-0.5">
                <span>Notes will automatically be attached to saved drafts &amp; permit requests.</span>
                <span>{estimatorNotes.length} characters</span>
              </div>
            </div>
          </div>

          {/* ADDITIONAL SERVICES SELECTOR SECTION */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="border-b border-slate-150 dark:border-slate-800 pb-3 mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Additional Upgrades &amp; Licensing Services
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Include mandatory site preparation, waste removal, and professional permitting as needed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {[
                { id: "demolition", name: "Demolition & Haul", desc: "Safe disposal of debris.", cost: 1250 },
                { id: "permit_fees", name: "Local Building Permits", desc: "Sewer & building licensing.", cost: 1150 },
                { id: "architect_design", name: "3D Custom Architect Plans", desc: "Spatial modeling renders.", cost: 1400 }
              ].map((serv) => {
                const isChecked = selectedServices.includes(serv.id);
                return (
                  <button
                    key={serv.id}
                    onClick={() => handleServiceToggle(serv.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isChecked
                        ? "bg-blue-50/20 dark:bg-blue-950/10 border-blue-500/50"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <div>
                      <span className="font-bold text-xs text-slate-800 dark:text-slate-200 block">
                        {serv.name}
                      </span>
                      <span className="text-[9px] text-slate-400 block mt-0.5 leading-tight">
                        {serv.desc}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3.5 pt-2 border-t border-slate-100 dark:border-slate-800/60 w-full text-[10px]">
                      <span className={`font-semibold ${isChecked ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`}>
                        {isChecked ? "Selected" : "Add to specs"}
                      </span>
                      <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                        +${serv.cost.toLocaleString()}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action buttons at the bottom of the left column */}
          <ConfigurationActions
            onSaveDraft={handleOpenSaveModal}
            onDownloadPDF={handlePrintSpecs}
            isSaving={isSaving}
          />

        </div>

        {/* Right Column: Interactive Cost Breakdown & Timeline metrics (5 of 12 columns) */}
        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-20 space-y-6">
          
          {/* AI Assistant Component (Only visible in desktop viewports, hidden on mobile/tablet) */}
          <div className="hidden lg:block">
            <AIDesignAssistant
              onApplyAISuggestions={(matchedOptionIds) => {
                triggerToast("Applying materials style layout to Cost Estimator!");
                setSelections((prev) => ({
                  ...prev,
                  ...matchedOptionIds
                }));
              }}
              initialDescription={newProjectDetails?.description}
            />
          </div>

          <CostBreakdown
            metrics={metrics}
            sliderPercentage={sliderPercentage}
            logisticsDays={logisticsDays}
            demoInstallDays={demoInstallDays}
            finishingDays={finishingDays}
            logisticsPct={logisticsPct}
            demoInstallPct={demoInstallPct}
            finishingPct={finishingPct}
          />

          {/* Submit to Nola Button & Disclaimer (Placed below cost breakdown, above need assistance) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs text-center space-y-3.5 no-print">
            <button
              onClick={handleSubmitToStaff}
              className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-black rounded-xl transition-all shadow-md cursor-pointer hover:translate-y-[-1px]"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Submit to NOLA BUILDS</span>
            </button>
            <p className="text-[9px] text-slate-400 dark:text-slate-500 leading-normal text-left">
              * NOLA BUILDS reserves the absolute right to accept, put on hold, or reject any submitted project proposal based on zoning codes, engineering scope, scheduled capacity, or historical preservation board mandates.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/20 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 leading-relaxed no-print">
            <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Need assistance?
            </span>
            Click on the <strong className="text-emerald-600 dark:text-emerald-400">AI Assistant</strong> shortcut in the header to tell our design model what style you want. It will automatically load the best premium materials.
          </div>
        </div>

      </div>

      {/* SAVE SPECIFICATIONS DRAFT MODAL */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={() => setIsSaveModalOpen(false)} />
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative z-10 animate-scale-up">
            <button
              onClick={() => setIsSaveModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold font-display text-slate-950 dark:text-white">
              Save Configuration Spec
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Provide a name to save this custom {activeRoomType} blueprint draft.
            </p>

            <form onSubmit={handleSaveDraftSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Configuration Name
                </label>
                <input
                  type="text"
                  required
                  placeholder={`e.g., Master ${activeRoomType} Renovation`}
                  value={estimateDraftName}
                  onChange={(e) => setEstimateDraftName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400 font-bold"
                />
              </div>

              <div className="p-3.5 bg-blue-50/40 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 text-[10px] rounded-xl flex gap-2.5 border border-blue-150/30">
                <FileText className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  This draft will record all active material selections, total cost ranges, and additional service integrations inside your durable dashboard histories.
                </span>
              </div>

              <div className="flex gap-2.5 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsSaveModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  {isSaving ? "Saving draft..." : "Confirm Save Spec"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
