import React, { useState } from "react";
import nolaBuildsLogo from "../../assets/nolabuilds.avif";
import { ShieldCheck, Bell, Settings, LogOut, ChevronDown } from "lucide-react";

interface AdminNavBarProps {
  user: { name: string; email: string; role: string } | null;
  onLogout: () => void;
  onNavigate: (path: string) => void;
  unreadCount?: number;
}

export default function AdminNavBar({
  user,
  onLogout,
  onNavigate,
  unreadCount = 0
}: AdminNavBarProps) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  if (!user) return null;

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LEFT SECTION: BRANDING & ROLE CHIP */}
          <div className="flex items-center gap-4">
            <div
              onClick={() => onNavigate("/admin")}
              className="flex items-center gap-2.5 font-display text-lg font-black tracking-tight text-blue-600 dark:text-blue-500 select-none cursor-pointer"
            >
              <img
                src={nolaBuildsLogo}
                alt="NOLA BUILDS"
                className="w-12 h-12 rounded-xl object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="font-display hidden md:inline">NOLA BUILDS</span>
            </div>

            {/* Administrative Chip Badge */}
            <div
              onClick={() => onNavigate("/admin")}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 rounded-lg text-[10px] font-black uppercase tracking-wider border border-rose-100 dark:border-rose-950/30 cursor-pointer hover:bg-rose-100 dark:hover:bg-rose-950/40 transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Operations Center</span>
            </div>
          </div>

          {/* RIGHT SECTION: ACTIONS & USER PROFILE */}
          <div className="flex items-center gap-3">
            
            {/* Profile Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-1.5 p-1.5 pl-3 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl transition-all cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                <div className="w-6 h-6 rounded-lg bg-rose-100 dark:bg-rose-950/40 text-rose-650 dark:text-rose-400 flex items-center justify-center font-bold text-xs uppercase relative">
                  {user.name.substring(0, 2)}
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
                  )}
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
                      <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 font-bold rounded-md text-[9px] uppercase tracking-wider">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Staff Administrator</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onNavigate("/admin/notifications");
                      }}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-all border-b border-slate-100 dark:border-slate-800/60 font-medium"
                    >
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-slate-400" />
                        <span>Notifications</span>
                      </div>
                      {unreadCount > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[9px] font-black text-white">
                          {unreadCount}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onNavigate("/admin/profile");
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-all font-medium"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      <span>Account Settings</span>
                    </button>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer transition-all border-t border-slate-150 dark:border-slate-800/80 mt-1 font-bold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
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
