import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ShieldCheck, LogOut, ChevronDown, User, Sparkles, Bell, Settings } from "lucide-react";
import nolaBuildsLogo from "../../assets/nolabuilds.avif";
import AdminNavBar from "../components/AdminNavBar";

interface AdminPortalLayoutProps {
  user: any;
  onLogout: () => void;
  onNavigate: (path: string) => void;
  toastMessage?: string | null;
  unreadCount?: number;
}

export default function AdminPortalLayout({
  user,
  onLogout,
  onNavigate,
  toastMessage,
  unreadCount = 0,
}: AdminPortalLayoutProps) {
  const location = useLocation();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-850 dark:text-slate-100 transition-colors duration-355 flex flex-col">
      {/* PERSISTENT ADMIN HEADER BAR */}
      <AdminNavBar
        user={user}
        onLogout={onLogout}
        onNavigate={onNavigate}
        unreadCount={unreadCount}
      />

      {/* FLOATING TOAST NOTIFICATION POPUP */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs px-4 py-2.5 rounded-xl shadow-lg animate-fade-in flex items-center gap-2.5 font-bold border border-slate-850 dark:border-slate-200 no-print">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MAIN CONTAINER FOR ADMIN CHILD WORKSPACES */}
      <main className="flex-1 pb-16">
        <Outlet />
      </main>

      {/* ADMIN EXCLUSIVE CONFIDENTIALITY FOOTER */}
      <footer className="py-6 border-t border-slate-200 dark:border-slate-800 text-center text-[10px] text-slate-400 dark:text-slate-500 shrink-0 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <span className="font-extrabold uppercase text-rose-600 dark:text-rose-400 tracking-wider">CONFIDENTIAL INTERNAL USE ONLY</span>
            <span className="text-slate-300 dark:text-slate-800">|</span>
            <span>&copy; 2026 NOLA BUILDS Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-3 font-mono">
            <span>Access level: Staff Administrator</span>
            <span className="text-slate-300 dark:text-slate-800">|</span>
            <span>ERP Engine v4.2.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
