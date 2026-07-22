import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sparkles, X } from "lucide-react";
import ClientNavBar from "../components/ClientNavBar";
import AIDesignAssistant from "../features/client/AIDesignAssistant";
import { SavedEstimate } from "../types";

interface ClientPortalLayoutProps {
  user: any;
  onLogout: () => void;
  unreadCount: number;
  aiAssistantOpen: boolean;
  setAiAssistantOpen: (open: boolean) => void;
  toastMessage: string | null;
  setLoadedEstimate: React.Dispatch<React.SetStateAction<SavedEstimate | null>>;
  triggerToast: (msg: string) => void;
  onNavigate: (path: string) => void;
}

export default function ClientPortalLayout({
  user,
  onLogout,
  unreadCount,
  aiAssistantOpen,
  setAiAssistantOpen,
  toastMessage,
  setLoadedEstimate,
  triggerToast,
  onNavigate,
}: ClientPortalLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-850 dark:text-slate-100 transition-colors duration-355 flex flex-col">
      {/* PERSISTENT HEADER NAVIGATION BAR */}
      <ClientNavBar
        currentRoute={location.pathname}
        onNavigate={onNavigate}
        user={user}
        onLogout={onLogout}
        onTriggerAIAssistant={() => setAiAssistantOpen(!aiAssistantOpen)}
        unreadNotificationsCount={unreadCount}
      />

      {/* FLOATING TOAST NOTIFICATION POPUP */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs px-4 py-2.5 rounded-xl shadow-lg animate-fade-in flex items-center gap-2.5 font-bold border border-slate-850 dark:border-slate-200 no-print">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* AI ASSISTANT SLIDING SIDEBAR OVERLAY */}
      {aiAssistantOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden no-print">
          <div 
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity" 
            onClick={() => setAiAssistantOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-2xl h-full relative">
              <button
                onClick={() => setAiAssistantOpen(false)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-755 dark:hover:text-slate-200 rounded-lg cursor-pointer transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex-1 overflow-y-auto pr-1">
                <div className="pb-4 mb-4 border-b border-slate-150 dark:border-slate-800/60 mt-2">
                  <h2 className="text-base font-black font-display tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>AI Assistant Blueprint Specialist</span>
                  </h2>
                  <p className="text-[10px] text-slate-400">
                    Describe your dream room concept and style presets to automatically configure materials.
                  </p>
                </div>

                <AIDesignAssistant
                  onApplyAISuggestions={(matchedOptionIds) => {
                    triggerToast("Applying materials style layout to Cost Estimator!");
                    setLoadedEstimate((prev) => prev ? {
                      ...prev,
                      selections: { ...prev.selections, ...matchedOptionIds }
                    } : {
                      id: "draft_" + Date.now(),
                      name: "AI Generated Layout",
                      date: new Date().toLocaleDateString(),
                      selections: matchedOptionIds,
                      totalCost: 0,
                      notes: "AI recommended custom specifications",
                      selectedServices: []
                    });
                    
                    if (location.pathname !== "/estimator") {
                      onNavigate("/estimator");
                    }
                    setAiAssistantOpen(false);
                  }}
                  initialDescription={user?.leadData?.description}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT REGION FOR CHILD ROUTES */}
      <main className="flex-1 pb-12">
        <Outlet />
      </main>

      {/* FOOTER METRICS AND TRADEMARKS */}
      <footer className="py-6 border-t border-slate-200 dark:border-slate-800 text-center text-[10px] text-slate-400 dark:text-slate-500 shrink-0 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div>
            <span>&copy; 2026 NOLA BUILDS Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold">Preliminary Licensing Worksheet</span>
            <span className="text-slate-300 dark:text-slate-800">|</span>
            <span>Local trade rates subject to historic review board standards.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
