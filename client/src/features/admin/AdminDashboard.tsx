import React, { useState, useMemo } from "react";
import {
  DollarSign,
  TrendingUp,
  UserCheck,
  FileText,
  Users,
  Percent,
  Briefcase,
  Layers,
  Calendar,
  Search,
  Filter,
  Plus,
  Trash,
  Edit,
  Clock,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  Activity,
  Building,
  Wrench,
  ShieldCheck,
  BarChart3,
  ExternalLink,
  Sparkles,
  Phone,
  Mail,
  ChevronDown
} from "lucide-react";
import {
  AdminLead,
  AdminProject,
  CalendarEvent
} from "../../data/adminData";
import { useAdminData } from "./hooks/useAdminData";

interface AdminDashboardProps {
  onNavigate: (route: string) => void;
  onSelectProject: (projectId: string) => void;
}

export default function AdminDashboard({ onNavigate, onSelectProject }: AdminDashboardProps) {
  // Tabs State
  const [activeTab, setActiveTab] = useState<"sales" | "projects">("sales");

  const {
    leads: dbLeads,
    projects: dbProjects,
    events: dbEvents,
    createLead,
    updateLead,
    deleteLead,
    createProject,
    createEvent
  } = useAdminData();

  // Persistent States
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  React.useEffect(() => {
    if (dbLeads && dbLeads.length > 0) {
      setLeads(dbLeads);
    }
  }, [dbLeads]);

  React.useEffect(() => {
    if (dbProjects && dbProjects.length > 0) {
      setProjects(dbProjects);
    }
  }, [dbProjects]);

  React.useEffect(() => {
    if (dbEvents && dbEvents.length > 0) {
      setEvents(dbEvents);
    }
  }, [dbEvents]);

  // Admin AI Assistant States
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState<{
    text: string;
    actionLabel?: string;
  } | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiSubmit = (queryText: string) => {
    if (!queryText.trim()) return;
    setIsAiLoading(true);
    setAiResponse(null);

    setTimeout(() => {
      const text = queryText.toLowerCase();
      let resText = "";
      let actionName = "";

      if (text.includes("summarize") || text.includes("pipeline") || text.includes("report")) {
        actionName = "Analyzing pipeline & contract revenues...";
        resText = `Here is your operations summary as of July 17, 2026:
• **Total Sales Contracts:** $${projects.reduce((sum, p) => sum + p.contractValue, 0).toLocaleString()} across active construction projects.
• **Weighted Pipeline Value:** $${Math.round(leads.reduce((sum, l) => sum + (l.estimatedValue * (l.probability / 100)), 0)).toLocaleString()} from high-potential inquiries.
• **Top Sales Leads:** Penelope Cruz ($58k, Belmont Siding), Audrey Hepburn ($55k, Bath Remodel), Jane Austen ($65k, Kitchen Remodel).
• **Operations Status:** 1 project currently flagged as "Delayed" due to recent precipitation delays. All others are marked "On Track".`;
      } 
      else if (text.includes("delay") || text.includes("delayed") || text.includes("weather")) {
        actionName = "Switching view to Project Schedule & filtering by 'Delayed' status...";
        setActiveTab("projects");
        setStatusFilter("Delayed");
        setGlobalSearch("");
        resText = `Updated dashboard filters to isolate delayed projects.
• Found 1 delayed project: **Belmont Cedar Shingle Wrap** (Penelope Cruz).
• **Root Cause:** Heavy precipitation on July 14-16 delayed scaffolding inspection.
• **Recovery Plan:** Jerry Myers is conducting scaffolding safety alignment checks. Work is scheduled to resume on Monday, July 20.`;
      }
      else if (text.includes("sales") || text.includes("leads") || text.includes("lead list")) {
        actionName = "Opening Sales tab & showing all active leads...";
        setActiveTab("sales");
        setStatusFilter("All");
        setGlobalSearch("");
        resText = `Dashboard view switched to Sales & Leads. Displaying all active inquiries (${leads.length} total) with contact logs and close probabilities.`;
      }
      else if (text.includes("faulkner") || text.includes("william")) {
        actionName = "Searching lead logs and project notes for 'Faulkner'...";
        setGlobalSearch("Faulkner");
        resText = `Located **William Faulkner** (Faulkner Historic Carriage House Remodel) at 512 Park Street.
• **Stage:** Construction (40% completed).
• **Next Event:** Design Review on July 19 at 11:00 AM (Assigned: Louis Ducreux) to finalize structural bookcase framing alignment.
• **Recent Note:** William Faulkner approved framing layout. Heart pine custom board delivery scheduled.`;
      }
      else if (text.includes("hemingway") || text.includes("ernest") || text.includes("create lead")) {
        actionName = "Creating custom sales lead record for 'Ernest Hemingway'...";
        
        // Add the lead if not already added
        const hasHemingway = leads.some(l => l.homeowner.includes("Hemingway"));
        let updatedLeadsList = [...leads];
        
        if (!hasHemingway) {
          const newLead: AdminLead = {
            id: "lead_hemingway_" + Date.now(),
            homeowner: "Ernest Hemingway",
            phone: "(305) 555-7012",
            email: "e.hemingway@keywest.com",
            address: "904 Key West St, Charlottesville, VA 22902",
            leadSource: "Referral Partner",
            renovationInterest: "Deck",
            assignedSalesperson: "Louis Ducreux",
            lastContact: "2026-07-17",
            nextFollowUp: "2026-07-21",
            estimatedValue: 45000,
            probability: 90,
            stage: "New Lead",
            expectedCloseDate: "2026-08-15"
          };
          updatedLeadsList = [newLead, ...leads];
          setLeads(updatedLeadsList);
          createLead(newLead);
        }
        
        setActiveTab("sales");
        setStatusFilter("All");
        setGlobalSearch("Hemingway");
        
        resText = `Successfully registered a new lead for **Ernest Hemingway**:
• **Renovation:** Cypress Deck & Outdoor Dining space.
• **Estimated Contract Value:** $45,000.
• **Probability:** 90% (Hot Lead).
• **Assigned Salesperson:** Louis Ducreux.
• **Dashboard action:** Filtered the leads table below to show your newly created entry.`;
      }
      else if (text.includes("milestone") || text.includes("draft") || text.includes("update")) {
        actionName = "Drafting Client Progress Email...";
        resText = `Generated a custom progress communication draft ready for sending:

--------------------------------------------------
**SUBJECT: NOLA BUILDS Progress Report - Faulkner Historic Carriage House**

Dear Mr. Faulkner,

I am writing to share that the timber rafters stabilization and the library bookcase sub-floor framing reinforcements have successfully passed the Albemarle County structural inspections. 

Our master carpenter David Vance is preparing the climate-controlled storage room to receive the reclaimed heart pine wide-plank flooring tomorrow. We are perfectly on track for completion on or before September 20th.

Warm regards,
Louis Ducreux, Senior Account Lead
--------------------------------------------------`;
      }
      else if (text.includes("invoice") || text.includes("penelope") || text.includes("cruz")) {
        actionName = "Drafting Penelope Cruz weather update...";
        resText = `Generated a weather delay update communication:

--------------------------------------------------
**SUBJECT: Siding Scaffolding Safety Review - Belmont Cedar Wrap**

Hi Penelope,

I hope you are having a wonderful week! Just a brief update: while the heavy rains on July 14-16 paused active shingle wrap assembly, our superintendent Jerry Myers kept the home fully sealed under double-weighted commercial weather barriers. 

We are completing scaffolding steel checks tomorrow to guarantee OSHA safety clearance. Full siding application will resume bright and early Monday morning.

Sincerely,
Sarah Connor, Project Specialist
--------------------------------------------------`;
      }
      else if (text.includes("clear") || text.includes("reset")) {
        actionName = "Resetting active filters...";
        setGlobalSearch("");
        setRenovationFilter("All");
        setStatusFilter("All");
        resText = "Dashboard search terms, filters, and stages have been restored to default list parameters.";
      }
      else {
        actionName = "Consulting renovation knowledge database...";
        resText = `I have analyzed your search for "${queryText}". 
• Try asking specific commands:
  - **"Summarize active pipeline"** to calculate total revenues & active contract estimates.
  - **"Show delayed projects"** to filter the schedule by weather delays.
  - **"Draft milestone update for Faulkner"** to generate client emails.
  - **"Create lead Ernest Hemingway"** to instantly insert a hot lead.
  - **"Show all leads"** to reset views.`;
      }

      setAiResponse({
        text: resText,
        actionLabel: actionName
      });
      setIsAiLoading(false);
    }, 800);
  };

  // Search & Filtering States
  const [globalSearch, setGlobalSearch] = useState("");
  const [renovationFilter, setRenovationFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Lead Modal States
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<AdminLead | null>(null);
  const [leadForm, setLeadForm] = useState<Partial<AdminLead>>({
    homeowner: "",
    phone: "",
    email: "",
    address: "",
    leadSource: "Google Search",
    renovationInterest: "Kitchen Remodel",
    assignedSalesperson: "Sarah Connor",
    estimatedValue: 50000,
    probability: 50,
    stage: "New Lead",
    expectedCloseDate: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split("T")[0],
    lastContact: new Date().toISOString().split("T")[0],
    nextFollowUp: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString().split("T")[0]
  });

  // Convert Lead to Project Modal States
  const [convertingLead, setConvertingLead] = useState<AdminLead | null>(null);
  const [conversionForm, setConversionForm] = useState({
    projectName: "",
    contractValue: 50000,
    budget: 45000,
    startDate: new Date().toISOString().split("T")[0],
    estimatedCompletion: new Date(Date.now() + 60 * 24 * 3600 * 1000).toISOString().split("T")[0],
    accountManager: "Sarah Connor",
    projectManager: "David Vance"
  });

  // Schedule Consultation Modal States
  const [schedulingLead, setSchedulingLead] = useState<AdminLead | null>(null);
  const [consultationForm, setConsultationForm] = useState({
    title: "Initial Consultation",
    date: new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString().split("T")[0],
    time: "10:00",
    assignedEmployee: "Sarah Connor",
    notes: "Review spatial constraints and budget tiers."
  });

  // KPI Calculations - Sales Tab
  const salesKPIs = useMemo(() => {
    const totalSales = projects.reduce((sum, p) => sum + p.contractValue, 0);
    const potentialSales = leads.reduce((sum, l) => sum + (l.estimatedValue * (l.probability / 100)), 0);
    const activeLeadsCount = leads.filter(l => l.stage !== "Contract Pending").length;
    const signedContractsCount = projects.filter(p => p.stage !== "Consultation").length;
    
    // Conversion rate: projects completed or construction / (total leads + projects)
    const totalInquired = leads.length + projects.length;
    const conversionRate = totalInquired > 0 ? Math.round((projects.length / totalInquired) * 100) : 0;
    
    const avgRenovationValue = projects.length > 0 ? Math.round(totalSales / projects.length) : 0;
    
    // Revenue estimates
    const revenueThisQuarter = Math.round(totalSales * 0.45);
    const revenueThisYear = Math.round(totalSales * 0.85);

    return {
      totalSales,
      potentialSales,
      activeLeadsCount,
      signedContractsCount,
      conversionRate,
      avgRenovationValue,
      revenueThisQuarter,
      revenueThisYear
    };
  }, [leads, projects]);

  // KPI Calculations - Projects Tab
  const projectKPIs = useMemo(() => {
    const active = projects.filter(p => p.status === "On Track" || p.status === "Delayed").length;
    const waiting = projects.filter(p => p.stage === "Contract Signed" || p.stage === "Permits" || p.stage === "Scheduling").length;
    const completed = projects.filter(p => p.stage === "Completed").length;
    const delayed = projects.filter(p => p.status === "Delayed").length;
    
    const avgProgress = projects.length > 0 
      ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length) 
      : 0;

    const totalActiveContractValue = projects
      .filter(p => p.stage !== "Completed")
      .reduce((sum, p) => sum + p.contractValue, 0);

    return {
      active,
      waiting,
      completed,
      delayed,
      avgProgress,
      totalActiveContractValue
    };
  }, [projects]);

  // Handle Search & Filter - Leads and Sales
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchesSearch = 
        l.homeowner.toLowerCase().includes(globalSearch.toLowerCase()) ||
        l.address.toLowerCase().includes(globalSearch.toLowerCase()) ||
        l.renovationInterest.toLowerCase().includes(globalSearch.toLowerCase());
      
      const matchesRenovation = renovationFilter === "All" || l.renovationInterest.includes(renovationFilter);
      const matchesStage = statusFilter === "All" || l.stage === statusFilter;

      return matchesSearch && matchesRenovation && matchesStage;
    });
  }, [leads, globalSearch, renovationFilter, statusFilter]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = 
        p.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
        p.homeowner.toLowerCase().includes(globalSearch.toLowerCase()) ||
        p.address.toLowerCase().includes(globalSearch.toLowerCase());
      
      const matchesRenovation = renovationFilter === "All" || p.renovationType === renovationFilter;
      const matchesStatus = statusFilter === "All" || p.status === statusFilter || p.stage === statusFilter;

      return matchesSearch && matchesRenovation && matchesStatus;
    });
  }, [projects, globalSearch, renovationFilter, statusFilter]);

  // Lead CRUD Actions
  const handleOpenAddLead = () => {
    setEditingLead(null);
    setLeadForm({
      homeowner: "",
      phone: "",
      email: "",
      address: "",
      leadSource: "Google Search",
      renovationInterest: "Kitchen Remodel",
      assignedSalesperson: "Sarah Connor",
      estimatedValue: 50000,
      probability: 50,
      stage: "New Lead",
      expectedCloseDate: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split("T")[0],
      lastContact: new Date().toISOString().split("T")[0],
      nextFollowUp: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString().split("T")[0]
    });
    setIsLeadModalOpen(true);
  };

  const handleOpenEditLead = (lead: AdminLead) => {
    setEditingLead(lead);
    setLeadForm({ ...lead });
    setIsLeadModalOpen(true);
  };

  const handleSaveLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLead) {
      // Edit mode
      const updated = leads.map(l => l.id === editingLead.id ? { ...l, ...leadForm } as AdminLead : l);
      setLeads(updated);
      updateLead({ id: editingLead.id, data: leadForm });
    } else {
      // Create mode
      const newLead: AdminLead = {
        id: "lead_" + Date.now(),
        ...leadForm
      } as AdminLead;
      const updated = [newLead, ...leads];
      setLeads(updated);
      createLead(newLead);
    }
    setIsLeadModalOpen(false);
    setEditingLead(null);
  };

  const handleDeleteLead = (id: string) => {
    if (confirm("Are you sure you want to archive/delete this project lead?")) {
      const updated = leads.filter(l => l.id !== id);
      setLeads(updated);
      deleteLead(id);
    }
  };

  // Convert Lead to Project Flow
  const handleOpenConversion = (lead: AdminLead) => {
    setConvertingLead(lead);
    setConversionForm({
      projectName: `${lead.renovationInterest.replace("Remodel", "").replace("Renovation", "").trim()} on ${lead.address.split(",")[0]}`,
      contractValue: lead.estimatedValue,
      budget: Math.round(lead.estimatedValue * 0.9),
      startDate: new Date().toISOString().split("T")[0],
      estimatedCompletion: new Date(Date.now() + 90 * 24 * 3600 * 1000).toISOString().split("T")[0],
      accountManager: lead.assignedSalesperson || "Sarah Connor",
      projectManager: "David Vance"
    });
  };

  const handleConfirmConversion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!convertingLead) return;

    // Create New Project object
    const newProject: AdminProject = {
      id: "proj_" + Date.now(),
      name: conversionForm.projectName,
      homeowner: convertingLead.homeowner,
      address: convertingLead.address,
      phone: convertingLead.phone,
      email: convertingLead.email,
      preferredContact: "Email",
      emergencyContact: "None Listed",
      renovationType: convertingLead.renovationInterest,
      stage: "Contract Signed",
      status: "On Track",
      progress: 10,
      contractValue: conversionForm.contractValue,
      budget: conversionForm.budget,
      startDate: conversionForm.startDate,
      estimatedCompletion: conversionForm.estimatedCompletion,
      accountManager: conversionForm.accountManager,
      projectManager: conversionForm.projectManager,
      superintendent: "Jerry Myers",
      crew: [],
      subcontractors: [],
      scopeOfWork: `${convertingLead.renovationInterest} requested for property at ${convertingLead.address}. Base pricing estimated from lead qualification inputs.`,
      roomsIncluded: [convertingLead.renovationInterest.replace("Remodel", "").replace("Renovation", "").trim()],
      permitStatus: "Pending Approval",
      materialSelections: [],
      changeOrders: [],
      milestones: [
        { id: "ms_1", name: "Lead Created", date: convertingLead.lastContact, completed: true, actualDate: convertingLead.lastContact },
        { id: "ms_2", name: "Contract Signed", date: conversionForm.startDate, completed: true, actualDate: conversionForm.startDate },
        { id: "ms_3", name: "Construction Started", date: conversionForm.startDate, completed: false }
      ],
      amNotes: [
        { id: "amn_1", text: `Lead converted to contract. Total Contract Value agreed at $${conversionForm.contractValue.toLocaleString()}.`, author: conversionForm.accountManager, timestamp: new Date().toISOString().replace("T", " ").substring(0, 16) }
      ],
      pmNotes: [],
      contracts: [
        { id: "con_1", title: `Contract Agreement - ${convertingLead.homeowner}.pdf`, type: "Signed Contract", url: "#", uploadDate: conversionForm.startDate, version: "v1.0" }
      ],
      payments: [
        { id: "pay_1", title: "Contract Signing Retainer Deposit (30%)", invoiceNumber: "INV-26-" + Math.floor(Math.random() * 500 + 100), amount: Math.round(conversionForm.contractValue * 0.3), dueDate: conversionForm.startDate, status: "Pending" }
      ],
      warranty: {
        coverage: "2-Year Craftsmanship Labor, standard OEM item limits.",
        startDate: conversionForm.estimatedCompletion,
        expirationDate: new Date(Date.now() + 365 * 2 * 24 * 3600 * 1000).toISOString().split("T")[0],
        laborWarranty: "2-Year Craftsmanship Labor Warranty",
        manufacturerWarranties: [],
        claims: []
      },
      documents: [],
      activityFeed: [
        { id: "act_1", text: `Lead converted to active construction agreement. AM assigned: ${conversionForm.accountManager}.`, timestamp: new Date().toISOString().replace("T", " ").substring(0, 16), type: "system" }
      ]
    };

    // Remove from leads, add to projects
    const updatedLeads = leads.filter(l => l.id !== convertingLead.id);
    const updatedProjects = [newProject, ...projects];

    setLeads(updatedLeads);
    deleteLead(convertingLead.id);
    
    setProjects(updatedProjects);
    createProject(newProject);

    setConvertingLead(null);
    alert(`Successfully activated project and created schedule for ${convertingLead.homeowner}!`);
  };

  // Schedule Consultation Flow
  const handleOpenScheduling = (lead: AdminLead) => {
    setSchedulingLead(lead);
    setConsultationForm({
      title: `Consultation - ${lead.homeowner}`,
      date: new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString().split("T")[0],
      time: "10:00",
      assignedEmployee: lead.assignedSalesperson || "Sarah Connor",
      notes: `On-site assessment for ${lead.renovationInterest} at ${lead.address.split(",")[0]}.`
    });
  };

  const handleConfirmScheduling = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schedulingLead) return;

    // Create Calendar Event
    const newEvent: CalendarEvent = {
      id: "evt_" + Date.now(),
      title: consultationForm.title,
      date: consultationForm.date,
      time: consultationForm.time,
      assignedEmployee: consultationForm.assignedEmployee,
      homeowner: schedulingLead.homeowner,
      location: schedulingLead.address,
      notes: consultationForm.notes,
      status: "Scheduled",
      type: "Initial Consultation"
    };

    // Update Lead stage
    const updatedLeads = leads.map(l => 
      l.id === schedulingLead.id 
        ? { ...l, stage: "Consultation Scheduled" as const, nextFollowUp: consultationForm.date } 
        : l
    );

    const updatedEvents = [newEvent, ...events];

    setLeads(updatedLeads);
    updateLead({ id: schedulingLead.id, data: { stage: "Consultation Scheduled" as const, nextFollowUp: consultationForm.date } });

    setEvents(updatedEvents);
    createEvent(newEvent);

    setSchedulingLead(null);
    alert(`Consultation scheduled for ${schedulingLead.homeowner} and recorded on central calendar!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in font-sans">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-[10px] font-black rounded-md uppercase tracking-wider">
              Operations Center
            </span>
            <span className="text-[10px] text-slate-400 font-bold font-mono">v4.2.0</span>
          </div>
          <h1 className="text-3xl font-black font-display tracking-tight text-slate-900 dark:text-white">
            Renovation Management System
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Lead pipelines, sales conversion funnels, job schedules, and client communication metrics for Virginia's premier residential builder.
          </p>
        </div>
        
        {/* Toggle between tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200/40 dark:border-slate-800/80 shrink-0">
          <button
            onClick={() => setActiveTab("sales")}
            className={`flex items-center gap-2 py-2 px-5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === "sales"
                ? "bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-md border border-slate-200/40 dark:border-slate-700/50"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
            }`}
          >
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span>Sales &amp; Leads</span>
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 py-2 px-5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === "projects"
                ? "bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-md border border-slate-200/40 dark:border-slate-700/50"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
            }`}
          >
            <Building className="w-4 h-4 text-emerald-500" />
            <span>Project Schedule</span>
          </button>
        </div>
      </div>

      {/* COGNITIVE OPERATIONS CO-PILOT (AI ASSISTANT) */}
      <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 mb-8 border border-slate-800 shadow-xl relative overflow-hidden">
        {/* Subtle background glow decorative lines */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/30">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-200 font-display">
                  Operations Intelligence Copilot
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Natural language controller for contract analysis, lead registrations, and progress updates.
                </p>
              </div>
            </div>
            
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/80 rounded-md border border-slate-700/50 text-[9px] font-bold text-slate-400">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              <span>ALBEMARLE CONTEXT LOADED</span>
            </div>
          </div>

          {/* Prompt input bar */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleAiSubmit(aiQuery);
            }}
            className="flex items-center gap-2 bg-slate-950/60 p-1.5 rounded-2xl border border-slate-850"
          >
            <input
              type="text"
              placeholder="Ask Copilot: 'Show delayed projects', 'Summarize pipeline', 'Draft Faulkner update', 'Create lead Ernest Hemingway'..."
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              className="flex-1 bg-transparent border-0 outline-hidden text-xs text-white placeholder-slate-500 font-medium px-3 py-1.5"
            />
            <button
              type="submit"
              disabled={isAiLoading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              {isAiLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                  <span>Execute</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Suggested Actions Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
            <span className="text-slate-500 font-bold shrink-0 mr-1 font-mono">SUGGESTIONS:</span>
            {[
              "Summarize active pipeline",
              "Show delayed projects",
              "Draft update for Penelope Cruz",
              "Create lead Ernest Hemingway",
              "Clear filters"
            ].map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => {
                  setAiQuery(suggestion);
                  handleAiSubmit(suggestion);
                }}
                className="px-2.5 py-1 bg-slate-800/40 hover:bg-slate-800 border border-slate-750 hover:border-slate-650 rounded-lg text-slate-300 hover:text-white transition-all cursor-pointer font-semibold"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Response Box */}
          {(isAiLoading || aiResponse) && (
            <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-850/80 text-xs leading-relaxed animate-fade-in space-y-2">
              {isAiLoading ? (
                <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span>Copilot is parsing telemetry, pipeline matrices and notes...</span>
                </div>
              ) : (
                <>
                  {aiResponse?.actionLabel && (
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-950/50 text-blue-400 font-bold font-mono text-[10px] rounded border border-blue-900/30">
                      <Sparkles className="w-3 h-3" />
                      <span>{aiResponse.actionLabel}</span>
                    </div>
                  )}
                  
                  <div className="text-slate-200 whitespace-pre-line font-mono text-[11px] leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-850">
                    {aiResponse?.text}
                  </div>
                  
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[9px] text-slate-500 font-bold font-mono">COPILOT REPORT SECURE &bull; LOCAL DATABASE STATE SYNCED</span>
                    <button
                      type="button"
                      onClick={() => {
                        if (aiResponse) {
                          navigator.clipboard.writeText(aiResponse.text);
                          alert("Draft response copied to system clipboard!");
                        }
                      }}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[9px] font-bold uppercase tracking-wider cursor-pointer border border-slate-700"
                    >
                      Copy Draft
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* SEARCH AND FILTERS PANEL */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:flex-1">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search by homeowner name, property address, project interest, materials..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 font-medium"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto shrink-0 pb-1 md:pb-0">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span>Filters:</span>
            </div>
            
            <select
              value={renovationFilter}
              onChange={(e) => setRenovationFilter(e.target.value)}
              className="text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-700 dark:text-slate-300 font-semibold focus:outline-hidden cursor-pointer"
            >
              <option value="All">All Renovation Types</option>
              <option value="Kitchen Remodel">Kitchen Remodels</option>
              <option value="Bathroom Remodel">Bathroom Remodels</option>
              <option value="Basement Finishing">Basement Finishing</option>
              <option value="Whole Home Renovation">Whole Home Renovations</option>
              <option value="Deck">Decks &amp; Patios</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-700 dark:text-slate-300 font-semibold focus:outline-hidden cursor-pointer"
            >
              <option value="All">All Stages / Statuses</option>
              {activeTab === "sales" ? (
                <>
                  <option value="New Lead">New Leads</option>
                  <option value="Consultation Scheduled">Consultations Scheduled</option>
                  <option value="Estimate Sent">Estimates Sent</option>
                  <option value="Follow-up">Follow-ups</option>
                  <option value="Negotiation">Negotiations</option>
                  <option value="Contract Pending">Contracts Pending</option>
                </>
              ) : (
                <>
                  <option value="On Track">On Track</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Construction">Construction Stage</option>
                  <option value="Permits">Permits Stage</option>
                  <option value="Contract Signed">Contract Signed Stage</option>
                </>
              )}
            </select>

            <button
              onClick={() => {
                setGlobalSearch("");
                setRenovationFilter("All");
                setStatusFilter("All");
              }}
              className="text-[10px] text-slate-400 hover:text-blue-500 font-bold uppercase tracking-wider px-2 py-1 cursor-pointer transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* SALES & LEADS TAB */}
      {activeTab === "sales" && (
        <div className="space-y-8">
          
          {/* KPI GRID */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Total Contract Sales</span>
                <div className="p-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black font-display text-slate-950 dark:text-white">
                ${salesKPIs.totalSales.toLocaleString()}
              </p>
              <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                <span className="text-emerald-500 font-bold font-mono">▲ +12.4%</span> vs last quarter
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Weighted Pipeline</span>
                <div className="p-2 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-xl">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black font-display text-slate-950 dark:text-white">
                ${Math.round(salesKPIs.potentialSales).toLocaleString()}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                Qualified interest adjusted by probability
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Active Leads / Conv.</span>
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <Percent className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-black font-display text-slate-950 dark:text-white">
                  {salesKPIs.conversionRate}%
                </p>
                <span className="text-[11px] text-slate-400 font-bold font-mono">
                  ({salesKPIs.activeLeadsCount} active)
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                From initial request to signed contract
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Avg Job Ticket</span>
                <div className="p-2 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-xl">
                  <Briefcase className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black font-display text-slate-950 dark:text-white">
                ${salesKPIs.avgRenovationValue.toLocaleString()}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                Average contract across residential works
              </p>
            </div>
          </div>

          {/* ACTIVE QUALIFIED LEADS TABLE */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="px-6 py-5 border-b border-slate-150 dark:border-slate-800 flex items-center justify-between flex-wrap gap-4 bg-slate-50/50 dark:bg-slate-950/10">
              <div>
                <h3 className="text-sm font-black font-display text-slate-900 dark:text-white">
                  Renovation Leads Inbox
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Interested homeowners awaiting project scoping, measurements, or initial scheduling.
                </p>
              </div>
              <button
                onClick={handleOpenAddLead}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Lead</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950/30 text-slate-400 text-[10px] font-black uppercase tracking-wider border-b border-slate-150 dark:border-slate-800">
                    <th className="px-6 py-3">Homeowner</th>
                    <th className="px-6 py-3">Contact Details</th>
                    <th className="px-6 py-3">Property Location</th>
                    <th className="px-6 py-3">Renovation Interest</th>
                    <th className="px-6 py-3">Estimated Value</th>
                    <th className="px-6 py-3">Sales Stage</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150 dark:divide-slate-800">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-slate-400 font-semibold italic">
                        No leads matched current search and filtering parameters.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/30 transition-all">
                        <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">
                          {lead.homeowner}
                          <span className="block text-[9px] text-slate-400 font-normal mt-0.5">
                            Source: <strong className="font-semibold text-slate-500">{lead.leadSource}</strong>
                          </span>
                        </td>
                        <td className="px-6 py-4 space-y-0.5">
                          <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                            <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{lead.phone}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                            <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{lead.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 max-w-[180px] truncate text-slate-600 dark:text-slate-350 font-medium">
                          <div className="flex items-start gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                            <span className="leading-tight">{lead.address}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold rounded-md text-[10px]">
                            {lead.renovationInterest}
                          </span>
                          <span className="block text-[9px] text-slate-400 mt-1 font-medium">
                            AM: {lead.assignedSalesperson}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            ${lead.estimatedValue.toLocaleString()}
                          </span>
                          <span className="block text-[9px] text-slate-400 font-mono mt-0.5">
                            Prob: {lead.probability}%
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                            lead.stage === "New Lead" ? "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30" :
                            lead.stage === "Consultation Scheduled" ? "bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 border border-blue-150 dark:border-blue-900/30" :
                            lead.stage === "Estimate Sent" ? "bg-purple-50 text-purple-700 dark:bg-purple-950/20 dark:text-purple-400 border border-purple-150 dark:border-purple-900/30" :
                            "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-150 dark:border-emerald-900/30"
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            <span>{lead.stage}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenScheduling(lead)}
                              className="px-2 py-1 bg-slate-50 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-blue-950/30 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md text-[10px] font-black border border-slate-200 dark:border-slate-700 hover:border-blue-200 transition-all cursor-pointer"
                              title="Schedule Onsite Consultation"
                            >
                              Consult
                            </button>
                            <button
                              onClick={() => handleOpenConversion(lead)}
                              className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-[10px] font-black transition-all cursor-pointer"
                              title="Convert lead into an active project"
                            >
                              Contract Project
                            </button>
                            <button
                              onClick={() => handleOpenEditLead(lead)}
                              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md text-slate-400 hover:text-slate-600"
                              title="Edit Lead Details"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md text-slate-400 hover:text-red-500"
                              title="Archive Lead"
                            >
                              <Trash className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* POTENTIAL SALES & PIPELINE PIPELINE TABLE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
              <div className="mb-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Potential Contract Closings</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">High probability lead projections scheduled to close this month.</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-950/30 text-slate-400 text-[9px] font-black uppercase tracking-wider border-b border-slate-150 dark:border-slate-800">
                      <th className="py-2.5 px-3">Homeowner</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Est. Value</th>
                      <th className="py-2.5 px-3">Probability</th>
                      <th className="py-2.5 px-3">Expected Close</th>
                      <th className="py-2.5 px-3">Stage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {leads.filter(l => l.probability >= 50).map(l => (
                      <tr key={l.id} className="hover:bg-slate-50/20">
                        <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-200">{l.homeowner}</td>
                        <td className="py-3 px-3 text-slate-500">{l.renovationInterest}</td>
                        <td className="py-3 px-3 font-mono font-bold">${l.estimatedValue.toLocaleString()}</td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-12 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-blue-600 h-full rounded-full" style={{ width: `${l.probability}%` }} />
                            </div>
                            <span className="font-mono text-[10px] font-bold text-slate-500">{l.probability}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-400">{l.expectedCloseDate}</td>
                        <td className="py-3 px-3">
                          <span className="text-[9px] font-black uppercase bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md">
                            {l.stage}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PIPELINE FUNNEL CHART */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">Pipeline Funnel Stage Conversion</h4>
                <p className="text-[10px] text-slate-500 mb-4 leading-relaxed">Overall count of residential leads at each sales stage.</p>
              </div>

              {/* Hand-Crafted SVG Funnel */}
              <div className="space-y-3.5 my-4">
                {[
                  { stage: "New Lead", count: leads.filter(l => l.stage === "New Lead").length, width: "100%", color: "bg-blue-600" },
                  { stage: "Consultation Scheduled", count: leads.filter(l => l.stage === "Consultation Scheduled").length, width: "85%", color: "bg-indigo-500" },
                  { stage: "Estimate Sent", count: leads.filter(l => l.stage === "Estimate Sent").length, width: "70%", color: "bg-purple-500" },
                  { stage: "Follow-up / Negotiation", count: leads.filter(l => l.stage === "Follow-up" || l.stage === "Negotiation").length, width: "50%", color: "bg-pink-500" },
                  { stage: "Contract Pending", count: leads.filter(l => l.stage === "Contract Pending").length, width: "30%", color: "bg-emerald-500" }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-600 dark:text-slate-350">
                      <span>{item.stage}</span>
                      <span className="font-mono text-slate-400">{item.count} inquiries</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-950/80 h-3.5 rounded-lg overflow-hidden flex">
                      <div className={`${item.color} h-full rounded-lg transition-all duration-500`} style={{ width: item.width }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-[10px] bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-850/60 mt-1">
                <span className="font-bold block text-slate-700 dark:text-slate-300">Operations Specialist Note:</span>
                <span className="text-slate-400">Ensure any Contract Pending leads are followed up within 24 hours to transition them to Project Schedule.</span>
              </div>
            </div>
          </div>

          {/* COMPREHENSIVE SALES ANALYTICS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">Requested Renovation Types</h4>
              <p className="text-[10px] text-slate-500 mb-4">Breakdown of custom work requested by local Albemarle county homeowners.</p>
              
              <div className="grid grid-cols-2 gap-4 items-center">
                {/* SVG Pie Chart */}
                <div className="flex justify-center">
                  <svg width="120" height="120" viewBox="0 0 32 32" className="transform -rotate-90">
                    <circle r="16" cx="16" cy="16" fill="transparent" stroke="#2563eb" strokeWidth="32" strokeDasharray="35 100" />
                    <circle r="16" cx="16" cy="16" fill="transparent" stroke="#10b981" strokeWidth="32" strokeDasharray="25 100" strokeDashoffset="-35" />
                    <circle r="16" cx="16" cy="16" fill="transparent" stroke="#f59e0b" strokeWidth="32" strokeDasharray="20 100" strokeDashoffset="-60" />
                    <circle r="16" cx="16" cy="16" fill="transparent" stroke="#a855f7" strokeWidth="32" strokeDasharray="20 100" strokeDashoffset="-80" />
                  </svg>
                </div>
                
                <div className="space-y-1.5 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                    <span>Kitchen Remodels (35%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>Bathroom Suite (25%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                    <span>Basement finishing (20%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
                    <span>Decks / Patios (20%)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">Lead Referral Source Channel</h4>
              <p className="text-[10px] text-slate-500 mb-4">Where potential Virginia renovators find our carpentry design work.</p>
              
              <div className="space-y-3.5">
                {[
                  { source: "Google Local Search Listing", percent: 45, count: "12 inquiries", color: "bg-blue-600" },
                  { source: "Customer Word of Mouth Referrals", percent: 30, count: "8 inquiries", color: "bg-emerald-500" },
                  { source: "Instagram Portfolio Postings", percent: 15, count: "4 inquiries", color: "bg-purple-500" },
                  { source: "Onsite Neighborhood Yard Signs", percent: 10, count: "2 inquiries", color: "bg-amber-500" }
                ].map((src, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-600 dark:text-slate-350">
                      <span>{src.source}</span>
                      <span className="font-mono text-slate-400">{src.percent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-950/80 h-2.5 rounded-full overflow-hidden">
                      <div className={`${src.color} h-full rounded-full`} style={{ width: `${src.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* PROJECTS SCHEDULE TAB */}
      {activeTab === "projects" && (
        <div className="space-y-8">
          
          {/* KPI GRID */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Active Construction Jobs</span>
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <Building className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black font-display text-slate-950 dark:text-white">
                {projectKPIs.active}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                Remodels actively in production phases
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Contracts Awaiting Start</span>
                <div className="p-2 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-xl">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black font-display text-slate-950 dark:text-white">
                {projectKPIs.waiting}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                Permits filed, drafting design schematics
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Active Contract Backlog</span>
                <div className="p-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black font-display text-slate-950 dark:text-white">
                ${projectKPIs.totalActiveContractValue.toLocaleString()}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                Committed value of non-completed backlog
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Overall Progress Index</span>
                <div className="p-2 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-xl">
                  <Activity className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black font-display text-slate-950 dark:text-white">
                {projectKPIs.avgProgress}%
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                Average milestones completed across jobs
              </p>
            </div>
          </div>

          {/* ACTIVE REMODELS TABLE */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="px-6 py-5 border-b border-slate-150 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/10">
              <div>
                <h3 className="text-sm font-black font-display text-slate-900 dark:text-white">
                  Current Renovation Production Schedule
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Select a project card to launch the comprehensive jobsite control center.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950/30 text-slate-400 text-[10px] font-black uppercase tracking-wider border-b border-slate-150 dark:border-slate-800">
                    <th className="px-6 py-3">Project Title &amp; Address</th>
                    <th className="px-6 py-3">Homeowner</th>
                    <th className="px-6 py-3">Renovation Type</th>
                    <th className="px-6 py-3">Milestone Phase</th>
                    <th className="px-6 py-3">Completion Status</th>
                    <th className="px-6 py-3">Contract Value</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150 dark:divide-slate-800">
                  {filteredProjects.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-slate-400 font-semibold italic">
                        No projects matched current search parameters.
                      </td>
                    </tr>
                  ) : (
                    filteredProjects.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/30 transition-all">
                        <td className="px-6 py-4">
                          <button
                            onClick={() => onSelectProject(p.id)}
                            className="text-slate-900 dark:text-slate-100 font-bold hover:text-blue-600 dark:hover:text-blue-400 text-left transition-colors font-display block"
                          >
                            {p.name}
                          </button>
                          <span className="text-[9px] text-slate-400 font-medium block mt-0.5 max-w-[200px] truncate">
                            {p.address}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">
                          {p.homeowner}
                          <span className="block text-[9px] text-slate-400 font-normal mt-0.5">PM: {p.projectManager}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-md text-[10px] border border-slate-200/50 dark:border-slate-700/50">
                            {p.renovationType}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[10px] font-extrabold text-slate-700 dark:text-slate-300">
                            {p.stage}
                          </span>
                          <span className="block text-[9px] text-slate-400 mt-0.5 font-medium">Est. End: {p.estimatedCompletion}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 justify-between">
                              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-black ${
                                p.status === "On Track" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20" :
                                p.status === "Delayed" ? "bg-red-50 text-red-700 dark:bg-red-950/20" :
                                "bg-blue-50 text-blue-700 dark:bg-blue-950/20"
                              }`}>
                                <span className="w-1 h-1 rounded-full bg-current" />
                                {p.status}
                              </span>
                              <span className="font-mono text-[9px] font-bold text-slate-400">{p.progress}%</span>
                            </div>
                            <div className="w-24 bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  p.status === "On Track" ? "bg-emerald-500" :
                                  p.status === "Delayed" ? "bg-red-500" : "bg-blue-500"
                                }`} 
                                style={{ width: `${p.progress}%` }} 
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono font-bold text-slate-800 dark:text-slate-200">
                          ${p.contractValue.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => onSelectProject(p.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 hover:text-slate-900 rounded-md text-[10px] font-black border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                          >
                            <span>Open Project</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECONDARY SCHEDULE VIEWS (ACCEPTED NOT STARTED & COMPLETED) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* ACCEPTED NOT STARTED */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
              <div className="mb-4">
                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[9px] font-black rounded-md uppercase tracking-wider border border-amber-200/20">
                  Awaiting Mobilization
                </span>
                <h4 className="text-sm font-black font-display text-slate-900 dark:text-white mt-1.5">
                  Signed Contracts Pending Construction
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Approved scope packages waiting on building permit approval or site scheduling slots.
                </p>
              </div>

              <div className="space-y-3.5">
                {projects.filter(p => p.progress <= 15).map(p => (
                  <div key={p.id} className="p-3.5 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200/50 dark:border-slate-850/60 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-850 dark:text-slate-200">{p.name}</p>
                      <div className="flex items-center gap-3 mt-1 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                        <span>AM: {p.accountManager}</span>
                        <span>•</span>
                        <span>PM: {p.projectManager}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onSelectProject(p.id)}
                      className="p-2 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-750 hover:bg-slate-50 text-slate-500 rounded-xl transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* COMPLETED JOBS */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
              <div className="mb-4">
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-black rounded-md uppercase tracking-wider border border-emerald-200/20">
                  Production Achieved
                </span>
                <h4 className="text-sm font-black font-display text-slate-900 dark:text-white mt-1.5">
                  Completed Renovations &amp; Warranties
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Archived historic residential work, actively covered under structural warranty terms.
                </p>
              </div>

              <div className="space-y-3.5">
                {projects.filter(p => p.stage === "Completed").map(p => (
                  <div key={p.id} className="p-3.5 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200/50 dark:border-slate-850/60 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-850 dark:text-slate-200">{p.name}</p>
                      <div className="flex items-center gap-3 mt-1 text-[9px] text-slate-400 font-medium">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Completed</span>
                        <span>•</span>
                        <span className="font-bold text-slate-500">Value: ${p.contractValue.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 dark:bg-emerald-950/15 dark:text-emerald-400 px-2 py-0.5 rounded-md font-bold">
                        ★ 5/5
                      </span>
                      <button
                        onClick={() => onSelectProject(p.id)}
                        className="p-2 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-750 hover:bg-slate-50 text-slate-500 rounded-xl transition-all cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* LEAD CREATION / EDITING MODAL */}
      {isLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-150 dark:border-slate-800">
              <h3 className="text-sm font-black font-display text-slate-950 dark:text-white uppercase tracking-wider">
                {editingLead ? "Edit Lead Dossier" : "Register Qualified Renovation Inquiry"}
              </h3>
              <button 
                onClick={() => setIsLeadModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSaveLead} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Homeowner Name</label>
                  <input
                    type="text"
                    required
                    value={leadForm.homeowner || ""}
                    onChange={(e) => setLeadForm({ ...leadForm, homeowner: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Assigned Representative</label>
                  <select
                    value={leadForm.assignedSalesperson || "Sarah Connor"}
                    onChange={(e) => setLeadForm({ ...leadForm, assignedSalesperson: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="Sarah Connor">Sarah Connor</option>
                    <option value="Louis Ducreux">Louis Ducreux</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Primary Phone</label>
                  <input
                    type="text"
                    required
                    placeholder="(434) 555-0100"
                    value={leadForm.phone || ""}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="homeowner@gmail.com"
                    value={leadForm.email || ""}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Property Location Address</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 100 Main St, Charlottesville, VA"
                  value={leadForm.address || ""}
                  onChange={(e) => setLeadForm({ ...leadForm, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Renovation Interest</label>
                  <select
                    value={leadForm.renovationInterest || "Kitchen Remodel"}
                    onChange={(e) => setLeadForm({ ...leadForm, renovationInterest: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white cursor-pointer"
                  >
                    <option value="Kitchen Remodel">Kitchen Remodel</option>
                    <option value="Bathroom Remodel">Bathroom Remodel</option>
                    <option value="Basement Finishing">Basement Finishing</option>
                    <option value="Whole Home Renovation">Whole Home Renovation</option>
                    <option value="Deck">Deck &amp; Patio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Inquiry Source</label>
                  <select
                    value={leadForm.leadSource || "Google Search"}
                    onChange={(e) => setLeadForm({ ...leadForm, leadSource: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="Google Search">Google Search</option>
                    <option value="Customer Referral">Customer Referral</option>
                    <option value="Instagram Ad">Instagram Ad</option>
                    <option value="Signage on Site">Signage on Site</option>
                    <option value="Architect Referral">Architect Referral</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Estimated Value</label>
                  <input
                    type="number"
                    required
                    value={leadForm.estimatedValue || 50000}
                    onChange={(e) => setLeadForm({ ...leadForm, estimatedValue: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Probability (%)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="100"
                    value={leadForm.probability || 50}
                    onChange={(e) => setLeadForm({ ...leadForm, probability: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Inquiry Stage</label>
                  <select
                    value={leadForm.stage || "New Lead"}
                    onChange={(e) => setLeadForm({ ...leadForm, stage: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white cursor-pointer"
                  >
                    <option value="New Lead">New Lead</option>
                    <option value="Consultation Scheduled">Consultation Scheduled</option>
                    <option value="Estimate Sent">Estimate Sent</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Contract Pending">Contract Pending</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setIsLeadModalOpen(false)}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-755 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-xs transition-colors"
                >
                  Save Lead Dossier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SCHEDULE CONSULTATION MODAL */}
      {schedulingLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-sm font-black font-display text-slate-950 dark:text-white uppercase tracking-wider mb-2">
              Schedule Consultation
            </h3>
            <p className="text-[10px] text-slate-400 mb-4 leading-relaxed">
              Book the formal on-site spatial measurement mapping and aesthetic anchoring review for <strong>{schedulingLead.homeowner}</strong>.
            </p>

            <form onSubmit={handleConfirmScheduling} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Appointment Title</label>
                <input
                  type="text"
                  required
                  value={consultationForm.title}
                  onChange={(e) => setConsultationForm({ ...consultationForm, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={consultationForm.date}
                    onChange={(e) => setConsultationForm({ ...consultationForm, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Time</label>
                  <input
                    type="time"
                    required
                    value={consultationForm.time}
                    onChange={(e) => setConsultationForm({ ...consultationForm, time: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Assigned Representative</label>
                <select
                  value={consultationForm.assignedEmployee}
                  onChange={(e) => setConsultationForm({ ...consultationForm, assignedEmployee: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                >
                  <option value="Sarah Connor">Sarah Connor (Sales Manager)</option>
                  <option value="Louis Ducreux">Louis Ducreux (Lead Estimator)</option>
                  <option value="David Vance">David Vance (Project Manager)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Appointment Scope Notes</label>
                <textarea
                  value={consultationForm.notes}
                  rows={3}
                  onChange={(e) => setConsultationForm({ ...consultationForm, notes: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setSchedulingLead(null)}
                  className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-xs"
                >
                  Confirm Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONVERT LEAD TO PROJECT MODAL */}
      {convertingLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-sm font-black font-display text-slate-950 dark:text-white uppercase tracking-wider mb-2">
              Convert Lead into Active Contract Project
            </h3>
            <p className="text-[10px] text-slate-400 mb-4 leading-relaxed">
              This initiates mobilization scheduling, material order queues, and launches the client's homebuilder checklist for <strong>{convertingLead.homeowner}</strong>.
            </p>

            <form onSubmit={handleConfirmConversion} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Project Name (Title)</label>
                <input
                  type="text"
                  required
                  value={conversionForm.projectName}
                  onChange={(e) => setConversionForm({ ...conversionForm, projectName: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Contract Agreed Value ($)</label>
                  <input
                    type="number"
                    required
                    value={conversionForm.contractValue}
                    onChange={(e) => setConversionForm({ ...conversionForm, contractValue: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Internal Cost Budget ($)</label>
                  <input
                    type="number"
                    required
                    value={conversionForm.budget}
                    onChange={(e) => setConversionForm({ ...conversionForm, budget: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Scheduled Start Date</label>
                  <input
                    type="date"
                    required
                    value={conversionForm.startDate}
                    onChange={(e) => setConversionForm({ ...conversionForm, startDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Est. Completion Date</label>
                  <input
                    type="date"
                    required
                    value={conversionForm.estimatedCompletion}
                    onChange={(e) => setConversionForm({ ...conversionForm, estimatedCompletion: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Account Manager</label>
                  <select
                    value={conversionForm.accountManager}
                    onChange={(e) => setConversionForm({ ...conversionForm, accountManager: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="Sarah Connor">Sarah Connor</option>
                    <option value="Louis Ducreux">Louis Ducreux</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Project Manager</label>
                  <select
                    value={conversionForm.projectManager}
                    onChange={(e) => setConversionForm({ ...conversionForm, projectManager: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="David Vance">David Vance</option>
                    <option value="Sarah Connor">Sarah Connor</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setConvertingLead(null)}
                  className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-xs"
                >
                  Activate Project Backlog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
