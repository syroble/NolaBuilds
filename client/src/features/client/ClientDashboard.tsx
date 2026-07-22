import React, { useState, useEffect } from "react";
import { 
  Home, 
  MapPin, 
  Calendar, 
  Layers, 
  Wrench, 
  ExternalLink, 
  Sparkles, 
  CheckCircle, 
  FileText, 
  Download, 
  ArrowRight,
  Maximize2,
  X,
  AlertCircle,
  Ruler,
  Palette,
  Compass,
  Coins,
  Hammer,
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { SavedEstimate } from "../../types";

interface ClientDashboardProps {
  user: { id?: string; name: string; email: string } | null;
  leadData: any;
  savedEstimates: SavedEstimate[];
  onNavigate: (route: string) => void;
  onSelectEstimate: (estimate: SavedEstimate) => void;
  onConvertEstimateToProject: (estimate: SavedEstimate) => void;
}

export default function ClientDashboard({
  user,
  leadData,
  savedEstimates,
  onNavigate,
  onSelectEstimate,
  onConvertEstimateToProject
}: ClientDashboardProps) {

  // State hooks for "Quick Project Details" form modal
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [isFirstView, setIsFirstView] = useState(() => {
    return localStorage.getItem("nola_builts_first_time_client_view") === "true";
  });
  
  // Page 1: Space & Scope (Spatial Calibration)
  const [isIndoor, setIsIndoor] = useState<boolean>(true);
  const [spaceType, setSpaceType] = useState("Kitchen");
  const [width, setWidth] = useState(12);
  const [length, setLength] = useState(10);
  const [layoutShape, setLayoutShape] = useState("Standard Layout");

  // Page 2: Style & Material Intent (Aesthetic Anchoring)
  const [materialTier, setMaterialTier] = useState<"Budget" | "Mid-Grade" | "Luxury">("Mid-Grade");
  const [aestheticStyle, setAestheticStyle] = useState("Modern Minimalist");

  // Page 3: Project Logistics & Reality Check (Project Logistics)
  const [timeline, setTimeline] = useState("Immediate (1-3 months)");
  const [budget, setBudget] = useState("$25k - $50k");
  const [unlistedNotes, setUnlistedNotes] = useState("");

  // Populate form with collected activation info
  useEffect(() => {
    if (leadData) {
      if (leadData.renovationInterests && leadData.renovationInterests.length > 0) {
        const interests = leadData.renovationInterests.map((i: string) => i.toLowerCase());
        const hasOutdoor = interests.some((i: string) => i.includes("exterior") || i.includes("deck") || i.includes("landscaping"));
        const hasIndoor = interests.some((i: string) => i.includes("kitchen") || i.includes("bathroom") || i.includes("flooring") || i.includes("painting") || i.includes("carpentry") || i.includes("restoration"));
        if (hasOutdoor && !hasIndoor) {
          setIsIndoor(false);
          setSpaceType("Deck");
        } else {
          setIsIndoor(true);
          if (interests.some((i: string) => i.includes("kitchen"))) setSpaceType("Kitchen");
          else if (interests.some((i: string) => i.includes("bathroom"))) setSpaceType("Bathroom");
          else setSpaceType("Kitchen");
        }

        if (interests.some((i: string) => i.includes("historic") || i.includes("restoration"))) {
          setAestheticStyle("Classic Historic");
        }
      }

      if (leadData.budgetRange) {
        const b = leadData.budgetRange.toLowerCase();
        if (b.includes("15,000") || b.includes("10k") || b.includes("20k") || b.includes("thrifty")) {
          setMaterialTier("Budget");
          setBudget("$10k - $25k");
        } else if (b.includes("45,000") || b.includes("35k") || b.includes("60k") || b.includes("intermediate")) {
          setMaterialTier("Mid-Grade");
          setBudget("$25k - $50k");
        } else if (b.includes("85,000") || b.includes("75k") || b.includes("100k") || b.includes("premium")) {
          setMaterialTier("Luxury");
          setBudget("$50k - $100k");
        } else if (b.includes("150,000") || b.includes("125k") || b.includes("luxury")) {
          setMaterialTier("Luxury");
          setBudget("$100k+");
        }
      }

      if (leadData.timeline) {
        const t = leadData.timeline.toLowerCase();
        if (t.includes("immediate") || t.includes("1-3")) setTimeline("Immediate (1-3 months)");
        else if (t.includes("3-6")) setTimeline("Medium-term (3-6 months)");
        else if (t.includes("6+")) setTimeline("Flexible (6+ months)");
      }

      if (leadData.description) {
        setUnlistedNotes(leadData.description);
      }
    }
  }, [leadData]);

  // Retrieve or fallback property info
  const streetAddress = leadData?.address || "1428 Coliseum St, New Orleans, LA 70130";
  const neighborhood = leadData?.neighborhood || "";
  const yearBuilt = leadData?.yearBuilt ? `${leadData.yearBuilt}` : "1894";
  const ownershipStatus = leadData?.ownershipStatus || "Primary Residence (Owner)";
  const squareFootage = leadData?.propertySize ? `${new Intl.NumberFormat().format(Number(leadData.propertySize))} sq ft` : "3,450 sq ft";
  const propertyPhoto = leadData?.image || "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=600&q=80";

  // Active projects in construction (mock realistic progress trackers)
  const isDemoUser = user?.id === "user_client_1" || user?.email === "homeowner@nolabuilts.com";

  const activeProjects = isDemoUser ? [
    {
      id: "proj_active_1",
      name: "Master Bath Spa Remodel",
      phase: "Framing & Rough Plumbing",
      compDate: "Aug 12, 2026",
      progress: 35,
      color: "bg-blue-500"
    },
    {
      id: "proj_active_2",
      name: "Lower Parlor Heartwood Floors",
      phase: "Laying Subfloor",
      compDate: "July 28, 2026",
      progress: 60,
      color: "bg-emerald-500"
    }
  ] : [];

  // Past/completed projects (historical mock data)
  const pastProjects = isDemoUser ? [
    {
      id: "proj_past_1",
      name: "Greek Revival Front Balcony Restoration",
      completedDate: "Oct 15, 2025",
      finalCost: "$28,400",
      invoiceName: "Balcony_Final_Invoice_1015.pdf",
      warrantyName: "10_Year_Timber_Warranty.pdf"
    },
    {
      id: "proj_past_2",
      name: "Historic Cypress Siding Renovation",
      completedDate: "May 22, 2024",
      finalCost: "$16,200",
      invoiceName: "Siding_Invoice_Final.pdf",
      warrantyName: "5_Year_Siding_Warranty.pdf"
    }
  ] : [];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleCreateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!spaceType) {
      alert("Please select a room or space type.");
      return;
    }
    
    const description = `${aestheticStyle} style. Width: ${width}ft, Length: ${length}ft, Layout: ${layoutShape}. Material tier preference: ${materialTier}. Target timeline: ${timeline}. Target budget: ${budget}.`;

    // Save details in localStorage
    localStorage.setItem(
      "nola_builts_new_project_details",
      JSON.stringify({
        timeline,
        budget,
        isIndoor,
        spaceType,
        width,
        length,
        layoutShape,
        materialTier,
        aestheticStyle,
        unlistedNotes,
        description
      })
    );
    setShowNewProjectModal(false);
    onNavigate("/estimator");
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">Client Portal</span>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-950 dark:text-white">
            Welcome Back, {user?.name || "Client"}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Property Management &amp; Custom Cost Planning Suite
          </p>
        </div>

        <div className="relative">
          <button
            id="client-new-project-btn"
            onClick={() => {
              if (isFirstView) {
                localStorage.setItem("nola_builts_first_time_client_view", "false");
                setIsFirstView(false);
              }
              setModalStep(1);
              setShowNewProjectModal(true);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer hover:translate-y-[-1px] ${
              isFirstView 
                ? "ring-4 ring-blue-500 ring-offset-2 dark:ring-offset-slate-950 animate-[pulse_1.5s_infinite] shadow-[0_0_25px_rgba(59,130,246,0.95)] scale-105 z-30" 
                : ""
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>+ New Project</span>
          </button>
        </div>
      </div>

      {/* PROPERTY HEADER CARD (Split-Layout) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Column: House Image & Basic Stats Overlay */}
        <div className="md:col-span-4 relative h-60 md:h-auto min-h-[220px]">
          <img
            src={propertyPhoto}
            alt="New Orleans Residence"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=600&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent flex flex-col justify-end p-5 text-white">
            <span className="text-[10px] bg-blue-600 text-white font-black px-2 py-0.5 rounded-sm uppercase tracking-wider w-fit mb-2">
              {neighborhood} Residence
            </span>
            <p className="text-sm font-bold truncate">{streetAddress}</p>
            <p className="text-[10px] text-slate-300 mt-1">New Orleans, LA</p>
          </div>
        </div>

        {/* Middle Column: Property Specs Detail */}
        <div className="md:col-span-5 p-6 space-y-4 flex flex-col justify-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Property Specifications
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 block">Year Built</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-250 font-display flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-500" />
                {yearBuilt}
              </span>
            </div>
            
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 block">Property Size</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-250 font-display flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-500" />
                {squareFootage}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 block">Status</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-250 font-display flex items-center gap-1.5">
                <Home className="w-4 h-4 text-blue-500" />
                {ownershipStatus}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 block">Zone Code</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-250 font-mono flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-500" />
                HU-RD2
              </span>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/30 p-3 rounded-xl text-[11px] text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800">
            <span className="font-bold text-slate-700 dark:text-slate-300">Historical Note:</span> Subject to Commission review for street-facing modifications. In-house draftsmen pre-screen layout specs.
          </div>

          {leadData?.renovationInterests && leadData.renovationInterests.length > 0 && (
            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Renovation Interests</span>
              <div className="flex flex-wrap gap-1.5">
                {leadData.renovationInterests.map((interest: string) => (
                  <span key={interest} className="text-[9px] bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100/50 dark:border-blue-900/30 text-blue-700 dark:text-blue-300 font-bold px-2 py-0.5 rounded-md">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Embedded Map Card */}
        <div className="md:col-span-3 p-5 bg-slate-50 dark:bg-slate-950/40 border-l border-slate-200 dark:border-slate-800/80 flex flex-col justify-center items-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
            {/* Minimal GPS/Radar Grid background design */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent" />
            <div className="w-full h-full border border-slate-500/20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]" />
          </div>

          <div className="text-center space-y-2 relative z-10">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto shadow-md">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">GPS Coordinates</span>
              <span className="text-[10px] text-slate-400 font-mono block">29.9312° N, 90.0788° W</span>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(streetAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <span>View On Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>

      {/* ESTIMATIONS & ACTIVE PROJECTS TABS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COMPONENT: SAVED ESTIMATIONS TABLE (8 columns) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-150 dark:border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
                  My Cost Estimations &amp; Drafts
                </h2>
                <p className="text-[10px] text-slate-400">
                  Custom configurations compiled using our interactive project cost ledger.
                </p>
              </div>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-1 font-bold text-slate-500 rounded-md">
                {savedEstimates.length} Saved
              </span>
            </div>

            {savedEstimates.length === 0 ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-950 text-slate-400 dark:text-slate-600 rounded-xl flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">No Draft Configurations Yet</p>
                  <p className="text-[10px] text-slate-400 max-w-xs mx-auto mt-0.5">
                    Utilize our dynamic cost engine to test design materials, compare trade rates, and blueprint your rooms.
                  </p>
                </div>
                <button
                  onClick={() => setShowNewProjectModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-all inline-flex items-center gap-1.5"
                >
                  <span>Build First Estimate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800/80 text-[10px] uppercase font-bold text-slate-400">
                      <th className="pb-3 pr-2">Configuration</th>
                      <th className="pb-3 pr-2">Room Type</th>
                      <th className="pb-3 pr-2">Date Saved</th>
                      <th className="pb-3 pr-2 text-right">Estimate Range</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-xs">
                    {savedEstimates.map((est) => {
                      // Guessing room type (defaults to Kitchen if not found)
                      const isBath = est.name.toLowerCase().includes("bath");
                      const isDeck = est.name.toLowerCase().includes("deck");
                      const isLiving = est.name.toLowerCase().includes("living") || est.name.toLowerCase().includes("parlor");
                      const roomLabel = isBath ? "Bathroom" : isDeck ? "Outdoor Deck" : isLiving ? "Living Space" : "Kitchen";

                      const minEst = Math.round(est.totalCost * 0.9);
                      const maxEst = Math.round(est.totalCost * 1.1);

                      return (
                        <tr key={est.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 group">
                          <td className="py-3.5 pr-2 font-bold text-slate-800 dark:text-slate-250">
                            {est.name}
                          </td>
                          <td className="py-3.5 pr-2 text-slate-500 dark:text-slate-400">
                            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold rounded">
                              {roomLabel}
                            </span>
                          </td>
                          <td className="py-3.5 pr-2 text-slate-400 dark:text-slate-500">
                            {est.date.split(",")[0]}
                          </td>
                          <td className="py-3.5 pr-2 text-right font-bold text-blue-600 dark:text-blue-400 font-mono">
                            {formatCurrency(minEst)} – {formatCurrency(maxEst)}
                          </td>
                          <td className="py-3.5 text-right space-x-1">
                            <button
                              onClick={() => onSelectEstimate(est)}
                              className="px-2.5 py-1 text-[10px] font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-350 rounded-lg transition-all"
                            >
                              View / Edit
                            </button>
                            <button
                              onClick={() => onConvertEstimateToProject(est)}
                              className="px-2.5 py-1 text-[10px] font-bold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg transition-all"
                            >
                              Submit
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {savedEstimates.length > 0 && (
            <p className="text-[10px] text-slate-400 italic mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
              * Submit configurations to NOLA BUILDS staff to initialize official architectural permits and project contracts.
            </p>
          )}

        </div>

        {/* RIGHT COMPONENT: CURRENT ACTIVE PROJECTS (4 columns) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-150 dark:border-slate-800 pb-3 mb-4">
              <div>
                <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
                  Active Construction
                </h2>
                <p className="text-[10px] text-slate-400">
                  Real-time status updates from our job site team.
                </p>
              </div>
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="space-y-5">
              {activeProjects.length === 0 ? (
                <div className="p-4 bg-slate-50/50 dark:bg-slate-950/10 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-center py-8">
                  <Wrench className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-400">No Active Projects</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                    Your active builds will appear here once construction begins.
                  </p>
                </div>
              ) : (
                activeProjects.map((proj) => (
                  <div key={proj.id} className="p-4 bg-slate-50 dark:bg-slate-950/20 rounded-xl border border-slate-100 dark:border-slate-800/80 space-y-2.5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{proj.name}</h4>
                        <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold mt-0.5">{proj.phase}</p>
                      </div>
                      <span className="text-[9px] text-slate-400 font-bold font-mono">ETA: {proj.compDate}</span>
                    </div>

                    {/* Progress Gauge */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-bold text-slate-400">
                        <span>Phase Progress</span>
                        <span>{proj.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${proj.color} rounded-full`} style={{ width: `${proj.progress}%` }} />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 text-[10px] text-slate-500">
            <Wrench className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Need site inspection? Text foreman at (504) 555-0145</span>
          </div>

        </div>

      </div>

      {/* PAST COMPLETED PROJECTS SECTION */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="border-b border-slate-150 dark:border-slate-800 pb-3">
          <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
            Completed Builds &amp; Archives
          </h2>
          <p className="text-[10px] text-slate-400">
            Historical ledger and essential warranty documentation for your residence.
          </p>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800/80 text-[10px] uppercase font-bold text-slate-400">
                <th className="pb-3 pr-2">Project Name</th>
                <th className="pb-3 pr-2">Date Completed</th>
                <th className="pb-3 pr-2">Final Cost</th>
                <th className="pb-3 pr-2 text-right">Access Files &amp; Certificates</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-xs">
              {pastProjects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400">
                    <CheckCircle className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-400">No Completed Projects Yet</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                      Your completed build history, warranties, and final files will be archived here.
                    </p>
                  </td>
                </tr>
              ) : (
                pastProjects.map((past) => (
                  <tr key={past.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                    <td className="py-3.5 pr-2 font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{past.name}</span>
                    </td>
                    <td className="py-3.5 pr-2 text-slate-500 dark:text-slate-400">
                      {past.completedDate}
                    </td>
                    <td className="py-3.5 pr-2 font-mono font-bold text-slate-700 dark:text-slate-300">
                      {past.finalCost}
                    </td>
                    <td className="py-3.5 text-right space-x-2">
                      <button
                        onClick={() => alert(`Downloading ${past.invoiceName}...`)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-350 rounded-lg transition-all"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download Invoices</span>
                      </button>
                      <button
                        onClick={() => alert(`Opening warranty certificate: ${past.warrantyName}`)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg transition-all"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>View Warranty</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* GORGEOUS 3-PAGE PROJECT SETUP QUESTIONNAIRE */}
      {showNewProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs" 
            onClick={() => setShowNewProjectModal(false)} 
          />
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative z-10 animate-scale-up max-h-[92vh] flex flex-col">
            <button
              onClick={() => setShowNewProjectModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* STEP STATUS DOTS HEADER */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-pulse" />
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                    Step {modalStep} of 3
                  </span>
                </div>
                <h3 className="text-sm font-black font-display text-slate-950 dark:text-white">
                  {modalStep === 1 && "Spatial Calibration"}
                  {modalStep === 2 && "Aesthetic Anchoring"}
                  {modalStep === 3 && "Project Logistics"}
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className={`h-1.5 rounded-full transition-all duration-350 ${modalStep >= 1 ? "bg-blue-600" : "bg-slate-100 dark:bg-slate-800"}`} />
                <div className={`h-1.5 rounded-full transition-all duration-350 ${modalStep >= 2 ? "bg-blue-600" : "bg-slate-100 dark:bg-slate-800"}`} />
                <div className={`h-1.5 rounded-full transition-all duration-350 ${modalStep >= 3 ? "bg-blue-600" : "bg-slate-100 dark:bg-slate-800"}`} />
              </div>
            </div>

            <div className="overflow-y-auto pr-1 flex-1 space-y-6">
              {/* PAGE 1: SPACE & SCOPE (SPATIAL CALIBRATION) */}
              {modalStep === 1 && (
                <div className="space-y-5 animate-fade-in">
                  <div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-blue-500 shrink-0" />
                      <span>The Space &amp; Scope</span>
                    </h4>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      Calibrate the physical layout and boundaries so the baseline estimating engine can run correct trade math.
                    </p>
                  </div>

                  {/* Environment Selector */}
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase font-black tracking-wider text-slate-450 dark:text-slate-500">
                      Remodel Environment
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsIndoor(true);
                          setSpaceType("Kitchen");
                        }}
                        className={`py-3 px-4 rounded-xl text-xs font-black tracking-tight border transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                          isIndoor
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                            : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-slate-600 dark:text-slate-400 hover:bg-slate-100/50"
                        }`}
                      >
                        <Home className="w-4 h-4" />
                        <span>Indoor Remodel</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsIndoor(false);
                          setSpaceType("Deck");
                        }}
                        className={`py-3 px-4 rounded-xl text-xs font-black tracking-tight border transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                          !isIndoor
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                            : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-slate-600 dark:text-slate-400 hover:bg-slate-100/50"
                        }`}
                      >
                        <Compass className="w-4 h-4" />
                        <span>Outdoor Remodel</span>
                      </button>
                    </div>
                  </div>

                  {/* Room type dropdown */}
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase font-black tracking-wider text-slate-450 dark:text-slate-500">
                      Select {isIndoor ? "Indoor Room" : "Outdoor Space"}
                    </label>
                    <select
                      value={spaceType}
                      onChange={(e) => setSpaceType(e.target.value)}
                      className="w-full text-xs font-bold px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                    >
                      {isIndoor ? (
                        <>
                          <option value="Kitchen">Kitchen</option>
                          <option value="Bathroom">Bathroom</option>
                          <option value="Bedroom">Bedroom</option>
                          <option value="Living Room">Living Room</option>
                          <option value="Basement">Basement</option>
                          <option value="Attic">Attic</option>
                          <option value="Garage">Garage</option>
                          <option value="Sunroom">Sunroom</option>
                          <option value="Laundry Room">Laundry Room</option>
                          <option value="Mudroom">Mudroom</option>
                        </>
                      ) : (
                        <>
                          <option value="Deck">Deck</option>
                          <option value="Roofs">Roofs</option>
                          <option value="Landscaping">Landscaping</option>
                          <option value="Driveway">Driveway</option>
                        </>
                      )}
                    </select>
                  </div>

                  {/* Dimensions input boxes (Indoor only) */}
                  {isIndoor && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-[10px] uppercase font-black tracking-wider text-slate-450 dark:text-slate-500">
                          Room Width (Feet)
                        </label>
                        <input
                          type="number"
                          min={4}
                          max={100}
                          value={width}
                          onChange={(e) => setWidth(Math.max(4, parseInt(e.target.value) || 0))}
                          className="w-full text-xs font-bold font-mono px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-[10px] uppercase font-black tracking-wider text-slate-450 dark:text-slate-500">
                          Room Length (Feet)
                        </label>
                        <input
                          type="number"
                          min={4}
                          max={100}
                          value={length}
                          onChange={(e) => setLength(Math.max(4, parseInt(e.target.value) || 0))}
                          className="w-full text-xs font-bold font-mono px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* PAGE 2: STYLE & MATERIAL INTENT (AESTHETIC ANCHORING) */}
              {modalStep === 2 && (
                <div className="space-y-5 animate-fade-in">
                  <div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <Palette className="w-4 h-4 text-blue-500 shrink-0" />
                      <span>Style &amp; Material Intent</span>
                    </h4>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      Anchor the visual expectations so the estimator selects correct component material grades automatically.
                    </p>
                  </div>

                  {/* Material Tier Choices */}
                  <div className="space-y-2.5">
                    <label className="block text-[10px] uppercase font-black tracking-wider text-slate-450 dark:text-slate-500">
                      Material Quality Tier
                    </label>
                    <div className="space-y-3">
                      {[
                        {
                          id: "Budget",
                          name: "Economy Tier",
                          desc: "Cost-focused standard materials. High efficiency, stock cabinetry, and clean laminate or vinyl finishes.",
                          badge: "$"
                        },
                        {
                          id: "Mid-Grade",
                          name: "Balanced Mid-Grade",
                          desc: "Our most popular selection. Professional quartz, durable engineered hardwoods, and premium designer paints.",
                          badge: "$$"
                        },
                        {
                          id: "Luxury",
                          name: "Grand Luxury Spec",
                          desc: "Custom bespoke millwork, natural marble slabs, smart fixtures, and historic-grade materials.",
                          badge: "$$$$"
                        }
                      ].map((tier) => (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => setMaterialTier(tier.id as any)}
                          className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                            materialTier === tier.id
                              ? "bg-blue-500/5 dark:bg-blue-500/10 border-blue-500 shadow-sm"
                              : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:bg-slate-100/50"
                          }`}
                        >
                          <div className={`mt-0.5 px-2 py-0.5 rounded font-mono font-black text-xs ${
                            materialTier === tier.id
                              ? "bg-blue-500 text-white"
                              : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                          }`}>
                            {tier.badge}
                          </div>
                          <div>
                            <span className="font-bold text-xs text-slate-900 dark:text-white block">
                              {tier.name}
                            </span>
                            <span className="text-[10px] text-slate-450 dark:text-slate-500 leading-normal block mt-0.5">
                              {tier.desc}
                            </span>
                          </div>
                          {materialTier === tier.id && (
                            <div className="ml-auto p-1 bg-blue-500 text-white rounded-full">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Aesthetic style choices */}
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase font-black tracking-wider text-slate-450 dark:text-slate-500">
                      Preferred Design Direction
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { name: "Modern Minimalist", label: "Modern Minimalist" },
                        { name: "Classic Historic", label: "Classic Historic" },
                        { name: "Rustic Farmhouse", label: "Rustic Farmhouse" },
                        { name: "Industrial Tech-Forward", label: "Industrial Tech" }
                      ].map((style) => (
                        <button
                          key={style.name}
                          type="button"
                          onClick={() => setAestheticStyle(style.name)}
                          className={`p-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                            aestheticStyle === style.name
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-slate-600 dark:text-slate-400 hover:bg-slate-100/50"
                          }`}
                        >
                          {style.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 3: PROJECT LOGISTICS & REALITY CHECK (PROJECT LOGISTICS) */}
              {modalStep === 3 && (
                <div className="space-y-5 animate-fade-in">
                  <div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <Coins className="w-4 h-4 text-blue-500 shrink-0" />
                      <span>Project Logistics &amp; Reality Check</span>
                    </h4>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      Set timeline pacing and financial boundary scopes to guide structural permits and AI design recommendations.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase font-black tracking-wider text-slate-450 dark:text-slate-500">
                        Target Timeline
                      </label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full text-xs font-bold px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                      >
                        <option value="Immediate (1-3 months)">Immediate (1-3 months)</option>
                        <option value="Medium-term (3-6 months)">Medium-term (3-6 months)</option>
                        <option value="Flexible (6+ months)">Flexible (6+ months)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase font-black tracking-wider text-slate-450 dark:text-slate-500">
                        Ideal Remodel Budget
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full text-xs font-bold px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                      >
                        <option value="$10k - $25k">$10k - $25k</option>
                        <option value="$25k - $50k">$25k - $50k</option>
                        <option value="$50k - $100k">$50k - $100k</option>
                        <option value="$100k+">$100k+</option>
                      </select>
                    </div>
                  </div>

                  {/* Section for special requests / preference notes */}
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase font-black tracking-wider text-slate-450 dark:text-slate-500">
                      Unlisted Materials, Special Requests or Preferences
                    </label>
                    <textarea
                      rows={4}
                      value={unlistedNotes}
                      onChange={(e) => setUnlistedNotes(e.target.value)}
                      placeholder="e.g. Please note we have a historical fireplace facade that must be preserved. Preference for unlisted copper plumbing or specific custom tile vendors..."
                      className="w-full text-xs px-3.5 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
                    />
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 block">
                      * These notes carry directly into your active cost compilation sheet.
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* ACTION BUTTONS FOOTER */}
            <div className="flex items-center justify-between pt-5 mt-4 border-t border-slate-150 dark:border-slate-800">
              <div>
                {modalStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setModalStep((prev) => prev - 1)}
                    className="flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors py-2 px-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowNewProjectModal(false)}
                    className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-350 transition-colors py-2 px-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>

              <div>
                {modalStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (modalStep === 1 && !spaceType) {
                        alert("Please select a room or space type.");
                        return;
                      }
                      setModalStep((prev) => prev + 1);
                    }}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md py-2.5 px-4 cursor-pointer"
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleCreateProjectSubmit}
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black tracking-tight transition-all shadow-md py-2.5 px-5 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                    <span>Configure Estimator</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
