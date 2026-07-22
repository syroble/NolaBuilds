import React, { useState } from "react";
import nolaBuildsLogo from "../../assets/nolabuilds.avif";
import { 
  LogOut, 
  ShieldCheck,
  ChevronDown,
  Bell,
  Settings,
  Sparkles
} from "lucide-react";

interface ClientNavBarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  user: { name: string; email: string; role: string } | null;
  onLogout: () => void;
  onTriggerAIAssistant: () => void;
  unreadNotificationsCount: number;
}

export default function ClientNavBar({
  currentRoute,
  onNavigate,
  user,
  onLogout,
  onTriggerAIAssistant,
  unreadNotificationsCount
}: ClientNavBarProps) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleNavClick = (route: string) => {
    onNavigate(route);
    setProfileDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    onLogout();
    setProfileDropdownOpen(false);
  };

  if (!user) return null;

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LEFT SECTION: LOGO & NAV */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNavClick("/dashboard")}
              className="flex items-center gap-2.5 font-display text-lg font-black tracking-tight text-blue-600 dark:text-blue-500 cursor-pointer"
            >
              <img
                src={nolaBuildsLogo}
                alt="NOLA BUILDS"
                className="w-12 h-12 rounded-xl object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="hidden md:inline">NOLA BUILDS</span>
            </button>
          </div>

          {/* RIGHT SECTION: ACTIONS & USER PROFILE */}
          <div className="flex items-center gap-2">
            
            {/* AI Assistant Button */}
            <button
              onClick={onTriggerAIAssistant}
              className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:hover:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-xl text-xs font-bold transition-all border border-emerald-100 dark:border-emerald-950/30 cursor-pointer"
              title="Trigger AI Design Assistant overlay"
            >
              <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span className="hidden md:inline">AI Assistant</span>
            </button>

            {/* Profile Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-1.5 p-1.5 pl-3 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl transition-all cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs uppercase">
                  {user.name.substring(0, 2)}
                </div>
                <span className="hidden md:inline max-w-[100px] truncate">{user.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {profileDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setProfileDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2.5 w-56 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-20 transition-all text-xs">
                    <div className="px-4 py-3 border-b border-slate-150 dark:border-slate-800/80">
                      <p className="font-bold text-slate-800 dark:text-slate-250 truncate">{user.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                      <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold rounded-md text-[9px] uppercase tracking-wider">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Client Portal</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleNavClick("/notifications")}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 flex items-center justify-between cursor-pointer font-medium"
                    >
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-slate-400" />
                        <span>Notifications</span>
                      </div>
                      {unreadNotificationsCount > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-black text-white">
                          {unreadNotificationsCount}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => handleNavClick("/profile")}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      <span>Account Settings</span>
                    </button>

                    <button
                      onClick={handleLogoutClick}
                      className="w-full text-left px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800 cursor-pointer font-bold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
