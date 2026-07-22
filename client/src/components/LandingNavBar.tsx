import React, { useState } from "react";
import nolaBuildsLogo from "../../assets/nolabuilds.avif";
import { ArrowRight, Menu, X } from "lucide-react";

interface LandingNavBarProps {
  onNavigate: (route: string) => void;
  user: { name: string; email: string; role: string } | null;
  onLogout: () => void;
  onScrollToSection: (id: string) => void;
}

export default function LandingNavBar({
  onNavigate,
  user,
  onLogout,
  onScrollToSection
}: LandingNavBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogoClick = () => {
    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onNavigate("/");
    }
  };

  return (
    <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Left-aligned Nav */}
        <div className="flex items-center gap-8">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 font-display text-lg font-black tracking-tight text-blue-600 dark:text-blue-500 cursor-pointer"
          >
            <img
              src={nolaBuildsLogo}
              alt="NOLA BUILDS"
              className="w-12 h-12 rounded-xl object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="font-display hidden md:inline">NOLA BUILDS</span>
          </button>
          
          <nav className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => onScrollToSection("who-we-are")}
              className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              Who We Are
            </button>
            <button
              onClick={() => onScrollToSection("home-renovations")}
              className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              Home Renovations
            </button>
            <button
              onClick={() => onScrollToSection("commercial-projects")}
              className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              Commercial Projects
            </button>
            <button
              onClick={() => onScrollToSection("new-constructions")}
              className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              New Constructions
            </button>
          </nav>
        </div>

        {/* Right-aligned Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs font-bold block text-slate-800 dark:text-slate-200">{user.name}</span>
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold tracking-wider">{user.role}</span>
                </div>
                <button
                  onClick={() => onNavigate(user.role === "staff" ? "/admin" : "/estimator")}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-all cursor-pointer shadow-xs"
                >
                  {user.role === "staff" ? "Operations Center" : "Enter Estimator"}
                </button>
                <button
                  onClick={onLogout}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-lg transition-all cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => onNavigate("/login")}
                  className="px-3.5 py-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-bold text-xs rounded-lg cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => onNavigate("/signup")}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>

          {/* Hamburger Button for viewports < lg */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 shadow-lg">
          <div className="px-4 pt-3 pb-5 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block px-2 mb-1">Navigation</span>
            <button
              onClick={() => {
                onScrollToSection("who-we-are");
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-lg transition-all block cursor-pointer"
            >
              Who We Are
            </button>
            <button
              onClick={() => {
                onScrollToSection("home-renovations");
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-lg transition-all block cursor-pointer"
            >
              Home Renovations
            </button>
            <button
              onClick={() => {
                onScrollToSection("commercial-projects");
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-lg transition-all block cursor-pointer"
            >
              Commercial Projects
            </button>
            <button
              onClick={() => {
                onScrollToSection("new-constructions");
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-lg transition-all block cursor-pointer"
            >
              New Constructions
            </button>
            
            <div className="border-t border-slate-200 dark:border-slate-800 my-2 pt-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block px-2 mb-2">Workspace Portals</span>
              {user ? (
                <div className="space-y-2">
                  <div className="px-3 py-1">
                    <span className="text-xs font-bold block text-slate-800 dark:text-slate-200">{user.name}</span>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold tracking-wider">{user.role}</span>
                  </div>
                  <button
                    onClick={() => {
                      onNavigate(user.role === "staff" ? "/admin" : "/estimator");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-all cursor-pointer block text-center shadow-xs"
                  >
                    {user.role === "staff" ? "Operations Center" : "Enter Estimator"}
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-lg transition-all cursor-pointer block text-center"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 px-2">
                  <button
                    onClick={() => {
                      onNavigate("/login");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-2 text-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-bold text-xs rounded-lg hover:bg-slate-50 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 cursor-pointer"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      onNavigate("/signup");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg text-center shadow-xs cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
