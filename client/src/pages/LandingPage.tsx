import React, { useState } from "react";
import nolaBuildsLogo from "../../assets/nolabuilds.avif";
import Footer from "../components/Footer";
import LandingNavBar from "../components/LandingNavBar";
import {
  ArrowRight,
  CheckCircle,
  Home,
  Users,
  Briefcase,
  Layers,
  Compass,
  Phone,
  Mail,
  MapPin,
  Lock,
  User,
  SunMedium,
  Moon,
  Sparkles,
  Menu,
  X,
  Star,
  HelpCircle,
  MessageSquare,
  Send,
  Instagram,
  Facebook,
  Linkedin
} from "lucide-react";

interface LandingPageProps {
  onNavigate: (route: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  user: { name: string; email: string; role: string } | null;
  onLogout: () => void;
}

const FAQ_ITEMS = [
  {
    q: "What construction services does NOLA BUILDS provide?",
    a: "We are full-service licensed general contractors specializing in premium residential custom builds, whole-house historical renovations, light commercial remodeling, commercial shell build-outs, adaptive reuse, and luxury kitchen and bathroom design across Charlottesville, VA and neighboring counties."
  },
  {
    q: "How does the real-time cost estimator work?",
    a: "Our interactive digital planner calculates dynamic cost models based on material selection, room footprints, and target layouts. You can save, export, or submit your design configuration directly to our engineering division to begin site-specific blueprint reviews and architectural licensing approvals."
  },
  {
    q: "Are you experienced with historic Charlottesville, VA and neighboring counties preservation codes?",
    a: "Yes! We work directly with the Historic District Landmarks Commission (HDLC) and regional zoning boards to preserve local architectural character. We integrate modern structural reinforcements while respecting original craftsmanship, heart pine timber framing, and exterior styling."
  },
  {
    q: "How long does it take to start construction after estimation?",
    a: "After you submit your preliminary estimator details, we review your proposal and schedule a local site inspection. Standard permit acquisition typically takes 2 to 4 weeks depending on the parish, with custom material ordering starting immediately upon contract finalization."
  },
  {
    q: "Can I customize materials outside the current estimator options?",
    a: "Absolutely! You can use our AI Design Assistant inside the Client Workspace to write custom descriptions or specific ideas. Our system matches your custom design prompts to specific high-grade options and updates your estimates automatically."
  }
];

export default function LandingPage({
  onNavigate,
  darkMode,
  onToggleDarkMode,
  user,
  onLogout
}: LandingPageProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactQuestion, setContactQuestion] = useState("");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactQuestion) return;
    setContactFormSubmitted(true);
    // Automatically reset after 3 seconds or when modal is closed
    setTimeout(() => {
      setContactFormSubmitted(false);
      setIsContactPopupOpen(false);
      setContactName("");
      setContactEmail("");
      setContactPhone("");
      setContactQuestion("");
    }, 3000);
  };

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300">
      
      {/* STICKY NAVBAR */}
      <LandingNavBar
        onNavigate={onNavigate}
        user={user}
        onLogout={onLogout}
        onScrollToSection={handleScroll}
      />

      {/* SECTION 1: SCROLLING JUMBOTRON (HERO) */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80"
            alt="Luxurious Kitchen Design"
            className="w-full h-full object-cover object-center opacity-25"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1615529182906-134d77411d1a?auto=format&fit=crop&w=800&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Virginia's Premier Custom Builders &amp; Designers</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight font-display">
              Crafting Premium Spaces, <br />
              <span className="text-blue-500">Built to Last.</span>
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
              From majestic residential kitchen overhauls to tailored commercial spaces, we combine unmatched local craftsmanship with interactive design planning to turn your dream vision into real-time visual estimates.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onNavigate("/signup")}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-900/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Estimate Your Kitchen Renovation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScroll("who-we-are")}
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-sm rounded-xl transition-all cursor-pointer border border-slate-700 text-center"
              >
                Explore Our Work
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:block">
            <div className="bg-slate-950/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest block mb-1">Instant Interactive Estimate</span>
              <h3 className="text-lg font-bold font-display text-white mb-4">Why use our calculator?</h3>
              <div className="space-y-4 text-xs">
                <div className="flex gap-3">
                  <div className="p-1 bg-blue-500/20 rounded-md text-blue-400 shrink-0 h-7 w-7 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-100 block">Real-time Material Selections</span>
                    <span className="text-slate-400 block mt-0.5">Toggle cabinet materials, countertops, plumbing, and fixtures with up-to-date pricing.</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="p-1 bg-blue-500/20 rounded-md text-blue-400 shrink-0 h-7 w-7 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-100 block">AI-Powered Blueprinting</span>
                    <span className="text-slate-400 block mt-0.5">Describe your aesthetic needs and let our smart designer summarize costs &amp; timeline immediately.</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="p-1 bg-blue-500/20 rounded-md text-blue-400 shrink-0 h-7 w-7 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-100 block">Flexible Saved Blueprints</span>
                    <span className="text-slate-400 block mt-0.5">Save multiple project configurations directly to your profile and export PDF drafts instantly.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHO WE ARE (2 Columns) */}
      <section id="who-we-are" className="py-20 md:py-24 border-b border-slate-150 dark:border-slate-900 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
            <img
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
              alt="Beautiful residential kitchen remodel project by NOLA BUILDS"
              className="rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 object-cover w-full h-[400px]"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1615529182906-134d77411d1a?auto=format&fit=crop&w=800&q=80";
              }}
            />
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white rounded-xl p-5 shadow-lg hidden sm:block">
              <span className="text-3xl font-black block leading-none font-mono">10+</span>
              <span className="text-[10px] uppercase font-bold tracking-widest mt-1 block">Years Community Service</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">Who We Are</span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-display">
              NOLA BUILDS: Crafting Trust, Community, and Uncompromised Quality.
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              We are general contractors deeply rooted in Charlottesville, VA and neighboring counties, passionate about local preservation, resilience, and beautiful architectural renovations. Our mission is to combine honest, certified construction management with premium interior styling to build spaces that enrich our clients' daily lives.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Whether working with private homeowners to restore vintage Virginian kitchens or constructing modern commercial retail fronts from the ground up, our team prioritizes safety, budget transparency, and timely schedules.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Fully Licensed &amp; Insured</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Local Materials &amp; Trades</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Transparent LED Pricing</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>AI Collaborative Blueprints</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2.5: PARTNERS (Minimal Logo Grid) */}
      <section className="py-16 bg-white dark:bg-slate-950/80 border-b border-slate-150 dark:border-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-6">Our Trusted Partners &amp; Architectural Suppliers</span>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center justify-items-center opacity-45 dark:opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            <div className="font-semibold text-xs text-slate-500 font-mono select-none">NOLA ARCHITECTS</div>
            <div className="font-semibold text-xs text-slate-500 font-mono select-none">CRESCENT STONE CO.</div>
            <div className="font-semibold text-xs text-slate-500 font-mono select-none">BAYOU WOODS HARDWOOD</div>
            <div className="font-semibold text-xs text-slate-500 font-mono select-none">GULF COAST HARDWARE</div>
            <div className="font-semibold text-xs text-slate-500 font-mono select-none hidden lg:block">RIVERBEND SUPPLY</div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOME RENOVATIONS (2 Columns) */}
      <section id="home-renovations" className="py-20 md:py-24 bg-slate-100/50 dark:bg-slate-900/30 border-b border-slate-150 dark:border-slate-900 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"
              alt="Newly renovated open concept home design"
              className="rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 object-cover w-full h-[400px]"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1615529182906-134d77411d1a?auto=format&fit=crop&w=800&q=80";
              }}
            />
          </div>

          <div className="lg:col-span-6 space-y-6 lg:order-1">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">Home Renovations</span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-display">
              Bespoke Residential Overhauls &amp; Structural Preservation.
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              We specialize in deep architectural makeovers that maximize the layout efficiency, structural robustness, and aesthetic warmth of historical and modern homes alike. Our turnkey residential services cover:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200 text-xs block mb-1">Indoor Refinements</span>
                <ul className="space-y-1.5 text-slate-400 text-[11px]">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Custom Luxury Kitchens
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Spa-quality Bathrooms &amp; Tiles
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Living Spaces &amp; Hardwood Floors
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Master Bedrooms &amp; Built-in Closets
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200 text-xs block mb-1">Outdoor &amp; Additions</span>
                <ul className="space-y-1.5 text-slate-400 text-[11px]">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Architectural Decks &amp; Trellises
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Covered Patios &amp; Concrete Pavers
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Southern Style Front Porches
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Historical Balcony Restoration
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate("/signup")}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Launch Interactive Room &amp; Cost Planner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: COMMERCIAL PROJECTS (Centered Layout) */}
      <section id="commercial-projects" className="py-20 md:py-24 border-b border-slate-150 dark:border-slate-900 scroll-mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">Commercial Projects</span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-display">
            Adaptive Reuse, Professional Offices, and Retail Construction.
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            NOLA BUILDS provides heavy-duty, commercial remodeling, shell build-outs, adaptive reuse, and aesthetic restaurant/retail interior styling designed to optimize foot traffic, safety, and operational workflow.
          </p>
          
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 max-h-[380px] w-full mt-4">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
              alt="Stylish modern commercial office space"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1615529182906-134d77411d1a?auto=format&fit=crop&w=800&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6 text-left">
              <div>
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest block">Featured Office Redesign</span>
                <p className="text-xs text-white/90 font-medium max-w-md mt-1">
                  Co-working layout optimization focusing on acoustic insulation, integrated lighting, and natural wood accents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: NEW CONSTRUCTIONS (Centered/Split layout) */}
      <section id="new-constructions" className="py-20 md:py-24 bg-slate-100/50 dark:bg-slate-900/30 border-b border-slate-150 dark:border-slate-900 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">New Custom Builds</span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-display mt-2">
              Building From the Ground Up. Custom Designs on Your Terms.
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-4">
              Our residential new builds incorporate energy-efficient envelopes, flood-resilient foundation frameworks, and custom architectural layouts designed uniquely for the Gulf Coast's tropical climate.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-3">
              We work with fully transparent milestones, giving you complete flexibility to collaborate with our trusted in-house draftsmen or seamlessly tie in your own pre-selected external architects.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="flex gap-2.5 items-start">
                <div className="p-1.5 bg-blue-50 dark:bg-slate-800 rounded-lg text-blue-600 shrink-0 mt-0.5">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200 block">Collaborative Engineering</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">We align engineering schematics and permitting processes early.</span>
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="p-1.5 bg-blue-50 dark:bg-slate-800 rounded-lg text-blue-600 shrink-0 mt-0.5">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200 block">Tailored Blueprints</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Detailed lumber, hardware, and structural selections verified step-by-step.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
              alt="Exterior of custom new modern home design"
              className="rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 object-cover w-full h-[380px]"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1615529182906-134d77411d1a?auto=format&fit=crop&w=800&q=80";
              }}
            />
          </div>

        </div>
      </section>

      {/* SECTION 5.5: TESTIMONIALS */}
      <section className="py-20 md:py-24 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-150 dark:border-slate-900 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-2">Testimonials</span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-display mb-4">
            What Our Charlottesville, VA and Neighboring Counties Clients Say
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 max-w-lg mx-auto mb-12">
            Real feedback from local property owners, commercial entrepreneurs, and historic restoration clients who built with confidence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Card 1 */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed">
                  "NOLA BUILDS transformed our drafty 1890s Garden District kitchen into a contemporary culinary masterpiece while preserving every inch of the original exposed brickwork. The interactive cost planner kept us perfectly on budget!"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center font-bold text-xs text-blue-600 dark:text-blue-400 shrink-0">
                  HT
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-250 block">Helena &amp; Marcus T.</span>
                  <span className="text-[10px] text-slate-450 block">Garden District Remodel</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed">
                  "We hired NOLA BUILDS for our boutique coffee shop's build-out. Their attention to detail, adherence to strict commercial code, and beautiful cypress counter finishes completely exceeded our expectations."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center font-bold text-xs text-indigo-600 dark:text-indigo-400 shrink-0">
                  DL
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-250 block">David L.</span>
                  <span className="text-[10px] text-slate-450 block">Bywater Commercial</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed">
                  "Building a home from the ground up can be incredibly stressful, but the transparent milestone tracking and open communication of the NOLA BUILDS crew gave us peace of mind from slab to shingles."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center font-bold text-xs text-emerald-600 dark:text-emerald-400 shrink-0">
                  SG
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-250 block">Sarah G.</span>
                  <span className="text-[10px] text-slate-450 block">Lakeview Custom Build</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 7: FAQ (Before Footer) */}
      <section id="faq-section" className="py-24 bg-slate-100/50 dark:bg-slate-900/20 border-b border-slate-200 dark:border-slate-800/80 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header area with Contact button */}
          <div className="text-center md:text-left md:flex md:items-center md:justify-between mb-12 gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">Have Questions?</span>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-display">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                Quick answers to common questions about our custom estimation tool, historic preservation, and general contracting workflow.
              </p>
            </div>
            <div className="mt-6 md:mt-0 shrink-0">
              <button
                onClick={() => setIsContactPopupOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-750 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md hover:translate-y-[-1px] active:translate-y-0 transition-all cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Ask a Question</span>
              </button>
            </div>
          </div>

          {/* Accordion Questions */}
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => {
              const isExpanded = expandedFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 rounded-2xl transition-all overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 text-sm sm:text-base transition-colors cursor-pointer"
                  >
                    <span className="pr-4">{item.q}</span>
                    <span className={`text-slate-400 shrink-0 transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                      ▼
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isExpanded ? "max-h-[300px] border-t border-slate-100 dark:border-slate-800/60 p-5 bg-slate-50/50 dark:bg-slate-900/20" : "max-h-0"
                    }`}
                  >
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <Footer
        onNavigate={onNavigate}
        onContactClick={() => setIsContactPopupOpen(true)}
        onScrollToSection={handleScroll}
      />
      
      {/* CONTACT POPUP MODAL */}
      {isContactPopupOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in no-print">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden transform scale-100 transition-all duration-300">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-150 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold font-display text-slate-900 dark:text-slate-100 tracking-tight">
                    Ask a Question
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-450 uppercase font-black tracking-wider">
                    NOLA BUILDS Staff Response System
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsContactPopupOpen(false)}
                className="p-1.5 hover:bg-slate-200/60 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Form or Success State */}
            {contactFormSubmitted ? (
              <div className="p-10 text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-emerald-100 dark:bg-emerald-950/40 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 animate-pulse">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black font-display tracking-tight text-slate-900 dark:text-slate-100">
                  Question Submitted!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                  Thank you for reaching out to NOLA BUILDS. Our Garden District engineering staff has received your question and will respond to <strong className="text-slate-700 dark:text-slate-200">{contactEmail}</strong> within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="p-6 space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Jean Lafitte"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>

                  {/* Phone field (optional) */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                      Phone Number (optional)
                    </label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="e.g. (504) 555-0145"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                {/* Email field */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="e.g. homeowner@nolabuilds.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Question / Message */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                    Your Question / Project Inquiry *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactQuestion}
                    onChange={(e) => setContactQuestion(e.target.value)}
                    placeholder="Describe your construction, estimation, or licensing question here..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                  />
                </div>

                {/* Footer buttons */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsContactPopupOpen(false)}
                    className="px-4 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-750 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Question</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
