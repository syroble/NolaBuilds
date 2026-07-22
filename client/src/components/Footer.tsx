import React from "react";
import nolaBuildsLogo from "../../assets/nolabuilds.avif";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
  MessageSquare,
  Lock
} from "lucide-react";

interface FooterProps {
  onNavigate: (route: string) => void;
  onContactClick: () => void;
  onScrollToSection: (id: string) => void;
}

export default function Footer({
  onNavigate,
  onContactClick,
  onScrollToSection
}: FooterProps) {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-2.5 font-display text-lg font-black tracking-tight text-blue-500">
            <img
              src={nolaBuildsLogo}
              alt="NOLA BUILDS"
              className="w-12 h-12 rounded-xl object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="hidden md:inline">NOLA BUILDS</span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            Premium residential construction, commercial remodeling, and collaborative multi-room estimation. Built locally with Charlottesville, VA and neighboring counties pride.
          </p>
          <div className="space-y-2 pt-1 text-slate-400 text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>1040 Magazine St, Charlottesville, VA</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>(504) 555-0145</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>contact@nolabuilts.com</span>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-3 pt-3">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-slate-800 hover:bg-blue-600 rounded-xl text-slate-400 hover:text-white transition-all duration-200 cursor-pointer flex items-center justify-center" 
              title="Follow us on Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-slate-800 hover:bg-blue-600 rounded-xl text-slate-400 hover:text-white transition-all duration-200 cursor-pointer flex items-center justify-center" 
              title="Follow us on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-slate-800 hover:bg-blue-600 rounded-xl text-slate-400 hover:text-white transition-all duration-200 cursor-pointer flex items-center justify-center" 
              title="Connect with us on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Navigations</h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li>
              <button onClick={() => onScrollToSection("who-we-are")} className="hover:text-white transition-colors cursor-pointer">
                Who We Are
              </button>
            </li>
            <li>
              <button onClick={() => onScrollToSection("home-renovations")} className="hover:text-white transition-colors cursor-pointer">
                Home Renovations
              </button>
            </li>
            <li>
              <button onClick={() => onScrollToSection("commercial-projects")} className="hover:text-white transition-colors cursor-pointer">
                Commercial Projects
              </button>
            </li>
            <li>
              <button onClick={() => onScrollToSection("new-constructions")} className="hover:text-white transition-colors cursor-pointer">
                New Constructions
              </button>
            </li>
            <li>
              <button onClick={onContactClick} className="hover:text-blue-400 text-blue-500 font-bold transition-colors cursor-pointer flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                <span>Ask a Question</span>
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Portals</h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li>
              <button onClick={() => onNavigate("/login")} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                <Lock className="w-3 h-3 text-slate-500" />
                <span>Client Login</span>
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("/login?role=staff")} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                <Lock className="w-3 h-3 text-slate-500" />
                <span>Staff Login</span>
              </button>
            </li>
            <li>
              <span className="text-[10px] text-slate-500 italic block mt-1">Careers (Opening soon!)</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
        <span>&copy; {new Date().getFullYear()} NOLA BUILDS LLC. All rights reserved.</span>
        <div className="flex gap-4 items-center">
          <button onClick={onContactClick} className="hover:text-slate-400 text-blue-400 font-medium cursor-pointer transition-colors">
            Ask a Question / Contact Us
          </button>
          <span>&bull;</span>
          <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
          <span>&bull;</span>
          <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
          <span>&bull;</span>
          <span className="hover:text-slate-400 cursor-pointer">Lic. #5048924</span>
        </div>
      </div>
    </footer>
  );
}
