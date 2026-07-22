import React, { useState, useMemo } from "react";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  User,
  MapPin,
  Mail,
  Phone,
  FileText,
  Plus,
  Edit3,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Upload,
  Download,
  MessageSquare,
  Wrench,
  ShieldCheck,
  Users,
  Activity,
  ChevronRight,
  Sparkles,
  Printer,
  Archive,
  CloudLightning,
  Sun,
  FileSpreadsheet,
  Check,
  Send,
  CalendarCheck,
  RefreshCw
} from "lucide-react";
import {
  AdminProject,
  CalendarEvent
} from "../../data/adminData";
import { useAdminData } from "./hooks/useAdminData";

interface AdminProjectPageProps {
  projectId: string;
  onBackToDashboard: () => void;
}

export default function AdminProjectPage({ projectId, onBackToDashboard }: AdminProjectPageProps) {
  const {
    projects: dbProjects,
    events: dbEvents,
    updateProject,
    createEvent
  } = useAdminData();

  // Load current projects from state synchronized with DB
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

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

  // Find active project
  const projectIndex = useMemo(() => {
    return projects.findIndex(p => p.id === projectId);
  }, [projects, projectId]);

  const project = useMemo(() => {
    return projects[projectIndex] || projects[0];
  }, [projects, projectIndex]);

  // Sub Tab Navigation within Project Workspace
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<"general" | "scheduling" | "logs" | "finances" | "warranty">("general");

  // Local interaction states
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<Partial<AdminProject>>({});
  
  // Note formulation states
  const [newAMNote, setNewAMNote] = useState("");
  const [isCustomerComm, setIsCustomerComm] = useState(false);

  const [pmLogForm, setPmLogForm] = useState({
    text: "",
    crewCount: 3,
    weather: "Sunny",
    issues: "None",
    safetyNotes: "Safety gear worn, workspace cleaned."
  });

  // Calendly scheduler states
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [calendlyMeetingType, setCalendlyMeetingType] = useState("Consultation");
  const [calendlyDate, setCalendlyDate] = useState("");
  const [calendlyTime, setCalendlyTime] = useState("10:00");
  const [calendlyAssigned, setCalendlyAssigned] = useState("Sarah Connor");

  // Cal Sync states
  const [googleCalSynced, setGoogleCalSynced] = useState(false);
  const [outlookCalSynced, setOutlookCalSynced] = useState(false);

  // Document Upload states
  const [newDocName, setNewDocName] = useState("");
  const [newDocCategory, setNewDocCategory] = useState("Contracts");
  const [dragActive, setDragActive] = useState(false);

  // New Warranty Claim states
  const [newClaimIssue, setNewClaimIssue] = useState("");
  const [newClaimNotes, setNewClaimNotes] = useState("");

  // New Change Order states
  const [newCoTitle, setNewCoTitle] = useState("");
  const [newCoCost, setNewCoCost] = useState(500);

  // Calendar display states
  const [calendarView, setCalendarView] = useState<"month" | "week" | "day" | "agenda">("agenda");

  // Quick helper to write edits back to database
  const updateProjectInState = (updatedProj: AdminProject) => {
    const updatedList = [...projects];
    updatedList[projectIndex] = updatedProj;
    setProjects(updatedList);
    updateProject({ id: updatedProj.id, data: updatedProj });
  };

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-red-500 font-bold">Project Workspace not found.</p>
        <button onClick={onBackToDashboard} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold">
          Return to central workspace
        </button>
      </div>
    );
  }

  // Calculate stats dynamically
  const remainingInvoicesBalance = useMemo(() => {
    const paidSum = project.payments.filter(pay => pay.status === "Paid").reduce((sum, p) => sum + p.amount, 0);
    return Math.max(0, project.contractValue - paidSum);
  }, [project]);

  // Milestone clicking helper (updates both complete status and overall project progress %!)
  const handleToggleMilestone = (milestoneId: string) => {
    const updatedMilestones = project.milestones.map(ms => {
      if (ms.id === milestoneId) {
        const nextState = !ms.completed;
        return {
          ...ms,
          completed: nextState,
          actualDate: nextState ? new Date().toISOString().split("T")[0] : undefined
        };
      }
      return ms;
    });

    // Recalculate progress based on completed milestones
    const completedCount = updatedMilestones.filter(ms => ms.completed).length;
    const computedProgress = Math.round((completedCount / updatedMilestones.length) * 100);

    // Auto update status if milestones are completed
    let finalStage = project.stage;
    if (updatedMilestones.find(ms => ms.name === "Project Completed")?.completed) {
      finalStage = "Completed";
    } else if (updatedMilestones.find(ms => ms.name === "Construction Started")?.completed) {
      finalStage = "Construction";
    }

    const updatedProj: AdminProject = {
      ...project,
      milestones: updatedMilestones,
      progress: computedProgress,
      stage: finalStage,
      status: computedProgress === 100 ? "Completed" : project.status,
      activityFeed: [
        {
          id: "act_" + Date.now(),
          text: `Milestone "${project.milestones.find(m => m.id === milestoneId)?.name}" was updated.`,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
          type: "milestone"
        },
        ...project.activityFeed
      ]
    };

    updateProjectInState(updatedProj);
  };

  // AM Note Submission
  const handleAddAMNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAMNote.trim()) return;

    const newNoteObj = {
      id: "amn_" + Date.now(),
      text: newAMNote,
      author: "Contractor Louis",
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
      isCustomerComm: isCustomerComm
    };

    const updatedProj: AdminProject = {
      ...project,
      amNotes: [newNoteObj, ...project.amNotes],
      activityFeed: [
        { id: "act_" + Date.now(), text: `Account Manager log updated by Louis.`, timestamp: new Date().toISOString().replace("T", " ").substring(0, 16), type: "note" },
        ...project.activityFeed
      ]
    };

    updateProjectInState(updatedProj);
    setNewAMNote("");
    setIsCustomerComm(false);
  };

  // PM Daily Log Submission
  const handleAddPMLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pmLogForm.text.trim()) return;

    const newLogObj = {
      id: "pmn_" + Date.now(),
      text: pmLogForm.text,
      author: "David Vance",
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
      crewCount: pmLogForm.crewCount,
      weather: pmLogForm.weather,
      issues: pmLogForm.issues,
      safetyNotes: pmLogForm.safetyNotes
    };

    const updatedProj: AdminProject = {
      ...project,
      pmNotes: [newLogObj, ...project.pmNotes],
      activityFeed: [
        { id: "act_" + Date.now(), text: `Onsite Daily PM construction log saved.`, timestamp: new Date().toISOString().replace("T", " ").substring(0, 16), type: "progress" },
        ...project.activityFeed
      ]
    };

    updateProjectInState(updatedProj);
    setPmLogForm({
      text: "",
      crewCount: 3,
      weather: "Sunny",
      issues: "None",
      safetyNotes: "Safety gear worn, workspace cleaned."
    });
  };

  // Document Upload simulation
  const handleDocUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;

    const newDocObj = {
      id: "doc_" + Date.now(),
      name: newDocName.endsWith(".pdf") ? newDocName : newDocName + ".pdf",
      category: newDocCategory,
      uploadDate: new Date().toISOString().split("T")[0],
      size: "1.4 MB",
      version: "v1.0"
    };

    const updatedProj: AdminProject = {
      ...project,
      documents: [newDocObj, ...project.documents],
      activityFeed: [
        { id: "act_" + Date.now(), text: `File "${newDocObj.name}" uploaded to ${newDocCategory}.`, timestamp: new Date().toISOString().replace("T", " ").substring(0, 16), type: "document" },
        ...project.activityFeed
      ]
    };

    updateProjectInState(updatedProj);
    setNewDocName("");
  };

  // Change Order action handling
  const handleCreateChangeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoTitle.trim()) return;

    const newCO = {
      id: "co_" + Date.now(),
      title: newCoTitle,
      cost: newCoCost,
      status: "Pending" as const
    };

    const updatedProj: AdminProject = {
      ...project,
      changeOrders: [...project.changeOrders, newCO],
      activityFeed: [
        { id: "act_" + Date.now(), text: `Change Order request generated: "${newCoTitle}".`, timestamp: new Date().toISOString().replace("T", " ").substring(0, 16), type: "contract" },
        ...project.activityFeed
      ]
    };

    updateProjectInState(updatedProj);
    setNewCoTitle("");
    setNewCoCost(500);
  };

  const handleUpdateChangeOrderStatus = (coId: string, status: "Approved" | "Rejected") => {
    const updatedCOs = project.changeOrders.map(co => {
      if (co.id === coId) {
        return { ...co, status };
      }
      return co;
    });

    const targetCo = project.changeOrders.find(c => c.id === coId);
    let finalValue = project.contractValue;
    if (status === "Approved" && targetCo) {
      finalValue += targetCo.cost;
    }

    const updatedProj: AdminProject = {
      ...project,
      changeOrders: updatedCOs,
      contractValue: finalValue,
      activityFeed: [
        { id: "act_" + Date.now(), text: `Change Order "${targetCo?.title}" was ${status}.`, timestamp: new Date().toISOString().replace("T", " ").substring(0, 16), type: "contract" },
        ...project.activityFeed
      ]
    };

    updateProjectInState(updatedProj);
    alert(`Change order "${targetCo?.title}" was ${status}! Contract adjusted by $${targetCo?.cost.toLocaleString()}.`);
  };

  // Warranty Claim entry
  const handleCreateWarrantyClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClaimIssue.trim()) return;

    const newClaim = {
      id: "claim_" + Date.now(),
      issue: newClaimIssue,
      fileDate: new Date().toISOString().split("T")[0],
      status: "Open" as const,
      notes: newClaimNotes
    };

    const updatedProj: AdminProject = {
      ...project,
      warranty: {
        ...project.warranty,
        claims: [...project.warranty.claims, newClaim]
      },
      activityFeed: [
        { id: "act_" + Date.now(), text: `Warranty Claim registered: ${newClaimIssue}`, timestamp: new Date().toISOString().replace("T", " ").substring(0, 16), type: "warranty" },
        ...project.activityFeed
      ]
    };

    updateProjectInState(updatedProj);
    setNewClaimIssue("");
    setNewClaimNotes("");
    alert("Warranty claim registered successfully for dispatch evaluation.");
  };

  // Invoice Payment Status adjustments
  const handleTogglePaymentStatus = (paymentId: string) => {
    const updatedPayments = project.payments.map(p => {
      if (p.id === paymentId) {
        const nextStatus = p.status === "Paid" ? "Pending" : p.status === "Pending" ? "Overdue" : "Paid";
        return { ...p, status: nextStatus as any };
      }
      return p;
    });

    const targetPay = project.payments.find(p => p.id === paymentId);

    const updatedProj: AdminProject = {
      ...project,
      payments: updatedPayments,
      activityFeed: [
        { id: "act_" + Date.now(), text: `Invoice ${targetPay?.invoiceNumber} payment status adjusted.`, timestamp: new Date().toISOString().replace("T", " ").substring(0, 16), type: "payment" },
        ...project.activityFeed
      ]
    };

    updateProjectInState(updatedProj);
  };

  // Calendly Schedule Meeting booking simulator
  const handleCalendlyBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!calendlyDate) {
      alert("Please choose an appointment date");
      return;
    }

    const meetingTitle = `Calendly: ${calendlyMeetingType} - ${project.homeowner}`;
    
    // Create actual calendar event
    const newEvent: CalendarEvent = {
      id: "evt_" + Date.now(),
      title: meetingTitle,
      date: calendlyDate,
      time: calendlyTime,
      assignedEmployee: calendlyAssigned,
      homeowner: project.homeowner,
      location: project.address,
      notes: `Calendly automated booking. Confirmed with AM & PM.`,
      status: "Scheduled",
      type: "Calendly Booking"
    };

    const updatedEvents = [newEvent, ...events];
    setEvents(updatedEvents);
    createEvent(newEvent);

    // Record activity feed
    const updatedProj: AdminProject = {
      ...project,
      activityFeed: [
        { 
          id: "act_" + Date.now(), 
          text: `Calendly scheduled "${calendlyMeetingType}" on ${calendlyDate} at ${calendlyTime}. AM & PM notified.`, 
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 16), 
          type: "system" 
        },
        ...project.activityFeed
      ]
    };
    updateProjectInState(updatedProj);

    setIsCalendlyOpen(false);
    alert(`Meeting Confirmed! Calendly calendar slots updated. Assigned AM/PM alerts successfully triggered.`);
  };

  // Project Editing submit
  const handleOpenEditProject = () => {
    setEditForm({ ...project });
    setIsEditProjectModalOpen(true);
  };

  const handleSaveProjectEdits = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProj: AdminProject = {
      ...project,
      ...editForm,
      activityFeed: [
        { id: "act_" + Date.now(), text: "Project metadata attributes updated by admin.", timestamp: new Date().toISOString().replace("T", " ").substring(0, 16), type: "system" },
        ...project.activityFeed
      ]
    } as AdminProject;

    updateProjectInState(updatedProj);
    setIsEditProjectModalOpen(false);
    alert("Project workspace details updated successfully!");
  };

  // Generate Report simulation
  const handleGenerateReport = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in font-sans">
      
      {/* HEADER BREADCRUMB */}
      <div className="mb-6">
        <button
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-blue-600 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Operations Dashboard</span>
        </button>
      </div>

      {/* PROJECT MAIN HEADER CARD */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 mb-8 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 text-[10px] font-black rounded-md uppercase tracking-wider">
                {project.renovationType}
              </span>
              <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase ${
                project.status === "On Track" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20" :
                project.status === "Delayed" ? "bg-red-50 text-red-700 dark:bg-red-950/20" : "bg-blue-50 text-blue-700 dark:bg-blue-950/20"
              }`}>
                {project.status}
              </span>
              <span className="text-[10px] text-slate-400 font-extrabold font-mono uppercase">
                Stage: {project.stage}
              </span>
            </div>
            
            <h2 className="text-2xl font-black font-display tracking-tight text-slate-900 dark:text-white">
              {project.name}
            </h2>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{project.address}</span>
            </p>
          </div>

          {/* QUICK ACTION BUTTONS */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <button
              onClick={handleOpenEditProject}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-750 transition-colors cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Details</span>
            </button>
            <button
              onClick={handleGenerateReport}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-750 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Worksheet</span>
            </button>
            <button
              onClick={() => {
                setIsCalendlyOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black transition-colors cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Calendly Meeting</span>
            </button>
            <button
              onClick={() => {
                if (confirm("Archive this construction folder? All telemetry records will remain sealed.")) {
                  alert("Project archived successfully.");
                }
              }}
              className="inline-flex items-center justify-center p-2 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-950/30 transition-colors cursor-pointer"
              title="Archive Project"
            >
              <Archive className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* FINANCIAL SUMMARY AND METRIC TILES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-150 dark:border-slate-800/80">
          <div>
            <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Agreed Contract Value</span>
            <p className="text-lg font-black font-display text-slate-900 dark:text-white mt-1">
              ${project.contractValue.toLocaleString()}
            </p>
          </div>
          <div>
            <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Internal Cost Budget</span>
            <p className="text-lg font-black font-display text-slate-900 dark:text-white mt-1">
              ${project.budget.toLocaleString()}
            </p>
          </div>
          <div>
            <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Estimated Timeline</span>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1.5">
              {project.startDate} <span className="text-slate-400 text-[10px] font-normal font-mono">to</span> {project.estimatedCompletion}
            </p>
          </div>
          <div>
            <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Total Progress Index</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${project.progress}%` }} />
              </div>
              <span className="font-mono text-xs font-black text-slate-700 dark:text-slate-200">{project.progress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* WORKSPACE SUB NAV TABS */}
      <div className="flex border-b border-slate-200 dark:border-slate-850/80 mb-6 overflow-x-auto gap-2 py-1 scrollbar-none">
        {[
          { id: "general", label: "Overview & Details", icon: Sparkles },
          { id: "scheduling", label: "Milestones & Calendar", icon: Calendar },
          { id: "logs", label: "Field Logs (AM & PM)", icon: MessageSquare },
          { id: "finances", label: "Change Orders & Invoices", icon: DollarSign },
          { id: "warranty", label: "Docs & Warranties", icon: ShieldCheck }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeWorkspaceTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveWorkspaceTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer border ${
                isActive
                  ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 border-slate-900 dark:border-slate-100 shadow-xs"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 border-transparent hover:bg-slate-100/50 dark:hover:bg-slate-850/40"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ACTIVE SECTION WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COMPONENT COLUMN (TAKES 8 COLS OF 12) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* TAB 1: OVERVIEW & GENERAL DETAILS */}
          {activeWorkspaceTab === "general" && (
            <div className="space-y-8">
              
              {/* SCOPE OF WORK & SUMMARY */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
                <h3 className="text-sm font-black font-display text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <FileText className="w-4.5 h-4.5 text-blue-500" />
                  <span>Comprehensive Scope of Work</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {project.scopeOfWork}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-150 dark:border-slate-800/80">
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Rooms Covered</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.roomsIncluded.map((rm, idx) => (
                        <span key={idx} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-[10px] font-bold">
                          {rm}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Local Permit Status</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-100 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 px-2 py-1 rounded-lg">
                        {project.permitStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* MATERIAL SELECTIONS WORKBOOK */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
                <h3 className="text-sm font-black font-display text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                  Material Selections &amp; Specifications
                </h3>
                <p className="text-[10px] text-slate-400 mb-4">
                  Homeowner design presets agreed under cost estimator specifications.
                </p>

                <div className="space-y-3.5">
                  {project.materialSelections.length === 0 ? (
                    <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl text-center text-slate-400 italic">
                      No custom materials loaded yet. Open Client Cost Estimator to synchronize selections.
                    </div>
                  ) : (
                    project.materialSelections.map((mat, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-50 dark:bg-slate-950/30 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-850 dark:text-slate-200">{mat.item}</p>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">Selection: <strong className="text-slate-500 font-semibold">{mat.selection}</strong></p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-black font-mono text-slate-800 dark:text-slate-200">${mat.cost.toLocaleString()}</p>
                          <span className="text-[9px] font-black uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400 px-1.5 py-0.5 rounded-sm">
                            {mat.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: MILESTONE TIMELINE & CALENDAR SCHEDULING */}
          {activeWorkspaceTab === "scheduling" && (
            <div className="space-y-8">
              
              {/* MILESTONES CHECKLIST WORKSPACE */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-black font-display text-slate-900 dark:text-white uppercase tracking-wider">
                    Milestone Progress Tracking
                  </h3>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 font-black font-mono">
                    Click boxes to complete construction phases
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mb-6 leading-relaxed">
                  Checking these boxes live-updates the overall progress completion percentage and feeds back to client dashboards.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {project.milestones.map((ms) => (
                    <button
                      key={ms.id}
                      onClick={() => handleToggleMilestone(ms.id)}
                      className={`p-3 rounded-2xl border text-left flex items-start gap-3 cursor-pointer transition-all ${
                        ms.completed
                          ? "bg-emerald-500/10 border-emerald-500/30 text-slate-900 dark:text-white"
                          : "bg-slate-50 dark:bg-slate-950/20 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-350"
                      }`}
                    >
                      <div className={`mt-0.5 rounded-full p-0.5 border ${
                        ms.completed 
                          ? "bg-emerald-500 text-white border-emerald-500" 
                          : "border-slate-350 text-transparent"
                      }`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className={`text-xs font-bold leading-tight ${ms.completed ? "line-through text-slate-400 dark:text-slate-500" : ""}`}>
                          {ms.name}
                        </p>
                        <p className="text-[9px] text-slate-400 font-medium font-mono mt-0.5">
                          {ms.completed && ms.actualDate ? `Approved: ${ms.actualDate}` : `Target: ${ms.date}`}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* CALENDAR SCHEDULER WIDGET */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                  <div>
                    <h3 className="text-sm font-black font-display text-slate-900 dark:text-white uppercase tracking-wider">
                      Calendar Scheduling
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">Track spatial inspections, delivery timelines, and design consultations.</p>
                  </div>

                  <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200/50 text-[10px] font-bold">
                    {(["month", "agenda"] as const).map(view => (
                      <button
                        key={view}
                        onClick={() => setCalendarView(view)}
                        className={`px-3 py-1.5 rounded-lg cursor-pointer capitalize transition-all ${
                          calendarView === view 
                            ? "bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs" 
                            : "text-slate-500"
                        }`}
                      >
                        {view}
                      </button>
                    ))}
                  </div>
                </div>

                {/* MONTH VIEW MOCK */}
                {calendarView === "month" ? (
                  <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                    <div className="bg-slate-50 dark:bg-slate-950/40 p-3 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                      <span>July 2026</span>
                      <span className="text-[10px] text-slate-400 font-medium">Virginia Production Schedule</span>
                    </div>
                    <div className="grid grid-cols-7 gap-px bg-slate-200 dark:bg-slate-800 text-center text-[10px] font-bold text-slate-400">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => <div key={d} className="bg-white dark:bg-slate-900 py-2">{d}</div>)}
                      {Array.from({ length: 31 }).map((_, i) => {
                        const dayNum = i + 1;
                        const dayStr = `2026-07-${dayNum.toString().padStart(2, "0")}`;
                        const dayEvents = events.filter(e => e.date === dayStr);
                        return (
                          <div key={i} className="bg-white dark:bg-slate-900 min-h-[50px] p-1 border-t border-r border-slate-100 dark:border-slate-800 text-left relative">
                            <span className="text-[9px] font-mono font-bold text-slate-400">{dayNum}</span>
                            <div className="space-y-0.5 mt-1">
                              {dayEvents.map(e => (
                                <div key={e.id} className="text-[8px] bg-blue-500/10 border-l-2 border-blue-600 text-blue-700 dark:text-blue-300 px-1 truncate font-bold" title={e.title}>
                                  {e.time} {e.title.replace("Initial Consultation - ", "").replace("Sterling Kitchen", "Sterling")}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  // AGENDA VIEW
                  <div className="space-y-3.5">
                    {events.map((evt) => (
                      <div key={evt.id} className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200/50 dark:border-slate-850/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl shrink-0">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-850 dark:text-slate-100">{evt.title}</p>
                            <p className="text-[10px] text-slate-400 font-medium mt-0.5 flex items-center gap-1">
                              <span>Date: <strong>{evt.date}</strong> at <strong>{evt.time}</strong></span>
                              <span>•</span>
                              <span>Staff Assigned: <strong>{evt.assignedEmployee}</strong></span>
                            </p>
                            <p className="text-[10px] text-slate-500 mt-1 max-w-md">{evt.notes}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 shrink-0 md:self-center">
                          <span className="text-[10px] font-black uppercase tracking-wider bg-slate-200/50 dark:bg-slate-800/80 px-2 py-0.5 rounded-md text-slate-500">
                            {evt.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CALENDAR SYNCHRONIZATION BAR */}
                <div className="mt-6 pt-5 border-t border-slate-150 dark:border-slate-800 flex items-center justify-between flex-wrap gap-4">
                  <div className="text-[10px] text-slate-400 font-medium">
                    Central calendar prepared for external provider handshakes.
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setGoogleCalSynced(!googleCalSynced)}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-black border transition-all cursor-pointer ${
                        googleCalSynced
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-850 dark:text-slate-350 dark:border-slate-750"
                      }`}
                    >
                      {googleCalSynced ? "✓ Google Cal Connected" : "Sync Google Calendar"}
                    </button>
                    <button
                      onClick={() => setOutlookCalSynced(!outlookCalSynced)}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-black border transition-all cursor-pointer ${
                        outlookCalSynced
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-850 dark:text-slate-350 dark:border-slate-750"
                      }`}
                    >
                      {outlookCalSynced ? "✓ Outlook Connected" : "Sync Outlook Calendar"}
                    </button>
                  </div>
                </div>
              </div>

              {/* CONSTRUCTION PLANNED VS ACTUAL GANTT SCHEDULE */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
                <h3 className="text-sm font-black font-display text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  Construction Schedule - Planned vs. Actual
                </h3>
                <p className="text-[10px] text-slate-400 mb-6">
                  Weekly benchmark metrics for structural phases and general trades.
                </p>

                <div className="space-y-4">
                  {[
                    { phase: "Demolition & Hauling", planned: "Week 1", actual: "Week 1", status: "On Schedule" },
                    { phase: "Framing & Rough Carpentry", planned: "Week 2 - 3", actual: "Week 2 - 4", status: "1 Week Delay" },
                    { phase: "Electrical & Plumbing Rough-In", planned: "Week 4", actual: "Week 4", status: "On Schedule" },
                    { phase: "Insulation & Drywall", planned: "Week 5", actual: "Pending", status: "Pending" },
                    { phase: "Cabinet Trim & Hardwood Floors", planned: "Week 6 - 7", actual: "Pending", status: "Pending" }
                  ].map((sch, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-3 items-center text-xs font-semibold">
                      <div className="col-span-4 text-slate-700 dark:text-slate-300 truncate">{sch.phase}</div>
                      <div className="col-span-3 text-slate-400 font-mono text-[10px]">Planned: {sch.planned}</div>
                      <div className="col-span-3 text-slate-500 font-mono text-[10px]">Actual: {sch.actual}</div>
                      <div className="col-span-2 text-right">
                        <span className={`px-1.5 py-0.5 text-[9px] font-black rounded-sm uppercase ${
                          sch.status === "On Schedule" ? "bg-emerald-50 text-emerald-700" :
                          sch.status === "Pending" ? "bg-slate-100 text-slate-500" : "bg-red-50 text-red-700"
                        }`}>
                          {sch.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: ACCOUNT & PROJECT MANAGER DAILY NOTES */}
          {activeWorkspaceTab === "logs" && (
            <div className="space-y-8">
              
              {/* ACCOUNT MANAGER DIALOGUE LOG */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
                <h3 className="text-sm font-black font-display text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  Account Manager Notes
                </h3>
                <p className="text-[10px] text-slate-400 mb-6">
                  Customer communication log, design adjustments, and milestone sign-off records.
                </p>

                {/* Submit New Note Form */}
                <form onSubmit={handleAddAMNote} className="mb-6 p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200/50 dark:border-slate-850/60 space-y-3">
                  <textarea
                    required
                    rows={2}
                    placeholder="Write a timestamped log note (e.g. 'Sent design layouts to client. Spoke with homeowner about marble slab sizes...')"
                    value={newAMNote}
                    onChange={(e) => setNewAMNote(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs focus:outline-hidden text-slate-800 dark:text-white"
                  />
                  
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isCustomerComm}
                        onChange={(e) => setIsCustomerComm(e.target.checked)}
                        className="rounded-sm border-slate-350"
                      />
                      <span>Mark as official Customer Communication</span>
                    </label>

                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black flex items-center gap-1 shadow-xs"
                    >
                      <span>Post Note</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>

                {/* AM Notes Timeline */}
                <div className="space-y-4">
                  {project.amNotes.map((note) => (
                    <div key={note.id} className="p-4 bg-slate-50 dark:bg-slate-950/20 border-l-4 border-blue-500 rounded-r-2xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-slate-400">{note.timestamp}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black uppercase text-blue-600 bg-blue-50 dark:bg-blue-950/20 px-2 py-0.5 rounded-md">
                            {note.author}
                          </span>
                          {note.isCustomerComm && (
                            <span className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-md">
                              Customer Msg
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-350 leading-relaxed font-medium">
                        {note.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* PROJECT MANAGER ON-SITE DAILY logs */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
                <h3 className="text-sm font-black font-display text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  Project Manager Daily Construction Logs
                </h3>
                <p className="text-[10px] text-slate-400 mb-6">
                  Jobsite safety indices, labor counts, trade delivery schedules, and weather updates.
                </p>

                {/* Submit New Daily Log Form */}
                <form onSubmit={handleAddPMLog} className="mb-6 p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200/50 dark:border-slate-850/60 space-y-3">
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe daily progress achievements, tasks completed, materials delivered..."
                    value={pmLogForm.text}
                    onChange={(e) => setPmLogForm({ ...pmLogForm, text: e.target.value })}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs focus:outline-hidden text-slate-800 dark:text-white"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Onsite Crew Count</label>
                      <input
                        type="number"
                        required
                        value={pmLogForm.crewCount}
                        onChange={(e) => setPmLogForm({ ...pmLogForm, crewCount: Number(e.target.value) })}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Weather Conditions</label>
                      <input
                        type="text"
                        required
                        placeholder="Sunny, Rain, Humid..."
                        value={pmLogForm.weather}
                        onChange={(e) => setPmLogForm({ ...pmLogForm, weather: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Delay Risks / Active Issues</label>
                      <input
                        type="text"
                        placeholder="None, plumbing delay risk, etc."
                        value={pmLogForm.issues}
                        onChange={(e) => setPmLogForm({ ...pmLogForm, issues: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Safety Protocols Met</label>
                      <input
                        type="text"
                        value={pmLogForm.safetyNotes}
                        onChange={(e) => setPmLogForm({ ...pmLogForm, safetyNotes: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="text-right">
                    <button
                      type="submit"
                      className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-xs cursor-pointer"
                    >
                      Save Daily Field Log
                    </button>
                  </div>
                </form>

                {/* Daily PM Logs list */}
                <div className="space-y-4">
                  {project.pmNotes.length === 0 ? (
                    <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl text-center text-slate-400 italic">
                      No PM field logs recorded yet. Onsite crew will file daily progress logs here.
                    </div>
                  ) : (
                    project.pmNotes.map((log) => (
                      <div key={log.id} className="p-4 bg-slate-50 dark:bg-slate-950/20 border-l-4 border-emerald-500 rounded-r-2xl space-y-2">
                        <div className="flex items-center justify-between flex-wrap gap-2 text-[10px] text-slate-400 font-mono">
                          <span>Log Date: {log.timestamp}</span>
                          <span className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 dark:bg-emerald-950/15 px-2 py-0.5 rounded-md">
                            PM: {log.author}
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                          {log.text}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 text-[9px] font-extrabold text-slate-500 dark:text-slate-400">
                          <div>Crew Size: <span className="text-slate-800 dark:text-slate-250 font-mono">{log.crewCount} trades</span></div>
                          <div>Weather: <span className="text-slate-800 dark:text-slate-250 font-mono">{log.weather}</span></div>
                          <div>Issues: <span className="text-slate-800 dark:text-slate-250 font-mono text-red-500">{log.issues}</span></div>
                          <div className="truncate">Safety: <span className="text-slate-800 dark:text-slate-250 font-mono text-emerald-500">{log.safetyNotes}</span></div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: CHANGE ORDERS & INVOICES */}
          {activeWorkspaceTab === "finances" && (
            <div className="space-y-8">
              
              {/* CHANGE ORDERS DISPATCH */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
                <div className="mb-4">
                  <h3 className="text-sm font-black font-display text-slate-900 dark:text-white uppercase tracking-wider">
                    Change Order Workbook
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Modifications to agreed carpentry specs, hardware upgrades, or additional trade layouts.
                  </p>
                </div>

                {/* Create Change Order form */}
                <form onSubmit={handleCreateChangeOrder} className="mb-6 p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200/50 dark:border-slate-850/60 flex items-end gap-4 flex-wrap">
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Change Item Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Upgrade bathroom faucet fixture array to unlacquered brass"
                      value={newCoTitle}
                      onChange={(e) => setNewCoTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Agreed Cost Add ($)</label>
                    <input
                      type="number"
                      required
                      value={newCoCost}
                      onChange={(e) => setNewCoCost(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black transition-colors shrink-0"
                  >
                    Submit CO
                  </button>
                </form>

                {/* Change Orders List */}
                <div className="space-y-3.5">
                  {project.changeOrders.length === 0 ? (
                    <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl text-center text-slate-400 italic">
                      No active change orders generated for this project.
                    </div>
                  ) : (
                    project.changeOrders.map((co) => (
                      <div key={co.id} className="p-3.5 bg-slate-50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <p className="text-xs font-bold text-slate-850 dark:text-slate-250">{co.title}</p>
                          <p className="text-[10px] font-mono font-bold text-slate-500 mt-0.5">Value: ${co.cost.toLocaleString()}</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 text-[9px] font-black rounded-md uppercase ${
                            co.status === "Approved" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/15" :
                            co.status === "Rejected" ? "bg-red-50 text-red-700 dark:bg-red-950/15" : "bg-amber-50 text-amber-700 dark:bg-amber-950/15"
                          }`}>
                            {co.status}
                          </span>
                          
                          {co.status === "Pending" && (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleUpdateChangeOrderStatus(co.id, "Approved")}
                                className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-[9px] font-black cursor-pointer"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleUpdateChangeOrderStatus(co.id, "Rejected")}
                                className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-[9px] font-black cursor-pointer"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* INVOICES AND PROGRESS DRAW PAYMENTS */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
                <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                  <div>
                    <h3 className="text-sm font-black font-display text-slate-900 dark:text-white uppercase tracking-wider">
                      Invoices &amp; Draw Schedule
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">Track mobilization retainers and county milestone progress check payouts.</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-[9px] font-bold text-slate-400">Backlog Remaining Balance</span>
                    <span className="text-sm font-black font-mono text-slate-800 dark:text-slate-200">
                      ${remainingInvoicesBalance.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {project.payments.map((pay) => (
                    <div key={pay.id} className="p-4 bg-slate-50 dark:bg-slate-950/20 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 font-extrabold">{pay.invoiceNumber}</span>
                          <span className="text-slate-300">|</span>
                          <span className="text-xs font-bold text-slate-850 dark:text-slate-200">{pay.title}</span>
                        </div>
                        <p className="text-[9px] text-slate-400 mt-1 font-mono">
                          Payment Due Target: {pay.dueDate}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs font-black text-slate-850 dark:text-slate-250">
                          ${pay.amount.toLocaleString()}
                        </span>
                        
                        <button
                          onClick={() => handleTogglePaymentStatus(pay.id)}
                          className={`px-2.5 py-1 text-[9px] font-black rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                            pay.status === "Paid" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/15" :
                            pay.status === "Overdue" ? "bg-red-50 text-red-700 dark:bg-red-950/15 animate-pulse" : "bg-amber-50 text-amber-700 dark:bg-amber-950/15"
                          }`}
                        >
                          {pay.status}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: DOCUMENT STORAGE & WARRANTIES */}
          {activeWorkspaceTab === "warranty" && (
            <div className="space-y-8">
              
              {/* DOCUMENT CABINET MANAGER */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
                <h3 className="text-sm font-black font-display text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  Centralized Blueprint &amp; Document Cabinet
                </h3>
                <p className="text-[10px] text-slate-400 mb-6">
                  Vault for zoning approvals, structural blueprints, materials schedules, and inspection tickets.
                </p>

                {/* Upload Doc form */}
                <form onSubmit={handleDocUploadSubmit} className="mb-6 p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200/50 dark:border-slate-850/60 flex items-end gap-4 flex-wrap">
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">File Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rough Wiring Pass Inspector Ticket"
                      value={newDocName}
                      onChange={(e) => setNewDocName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Document Category</label>
                    <select
                      value={newDocCategory}
                      onChange={(e) => setNewDocCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                    >
                      <option value="Contracts">Contracts</option>
                      <option value="Estimates">Estimates</option>
                      <option value="Permits">Permits</option>
                      <option value="Inspection Reports">Inspection Reports</option>
                      <option value="Material Specifications">Material Specs</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black transition-colors"
                  >
                    Upload Document File
                  </button>
                </form>

                {/* Documents List */}
                <div className="space-y-3.5">
                  {project.documents.map((doc) => (
                    <div key={doc.id} className="p-3.5 bg-slate-50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-start gap-2.5">
                        <div className="p-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 rounded-lg">
                          <FileSpreadsheet className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-850 dark:text-slate-200">{doc.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                            Category: <strong>{doc.category}</strong> • Size: {doc.size} • Version: {doc.version}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => alert(`Simulating file download of "${doc.name}"`)}
                          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-850 rounded-lg text-slate-400 hover:text-slate-700 transition-all cursor-pointer"
                          title="Download Document"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WARRANTY AND CLAIMS */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
                <div className="mb-4">
                  <h3 className="text-sm font-black font-display text-slate-900 dark:text-white uppercase tracking-wider">
                    Warranty coverage &amp; Post-Handover Claims
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Structure logs and craftsmanship labor coverage certificates.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 rounded-2xl mb-6 text-xs font-bold space-y-2 text-slate-600 dark:text-slate-350">
                  <p>Structural Protection: <strong className="text-slate-900 dark:text-white">{project.warranty.coverage}</strong></p>
                  <p>Labor Protection: <strong className="text-slate-900 dark:text-white">{project.warranty.laborWarranty}</strong></p>
                  <p>Coverage Term: <strong className="text-slate-900 dark:text-white">{project.warranty.startDate} to {project.warranty.expirationDate}</strong></p>
                  {project.warranty.manufacturerWarranties.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/50">
                      <span className="block text-[9px] uppercase tracking-wider text-slate-400 mb-1.5">Manufacturer Component Safeguards</span>
                      <ul className="list-disc list-inside space-y-1 font-medium text-[10px] text-slate-500">
                        {project.warranty.manufacturerWarranties.map((mfg, idx) => (
                          <li key={idx}>{mfg}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* File Warranty Claim form */}
                <form onSubmit={handleCreateWarrantyClaim} className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200/50 dark:border-slate-850/60 space-y-3">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400">File Post-Handover Warranty Claim</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1">Issue Claim Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rear deck board alignment adjust"
                        value={newClaimIssue}
                        onChange={(e) => setNewClaimIssue(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1">Detailed Description</label>
                      <input
                        type="text"
                        placeholder="Explain cosmetic or structural concern..."
                        value={newClaimNotes}
                        onChange={(e) => setNewClaimNotes(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black transition-colors"
                    >
                      File Warranty Claim
                    </button>
                  </div>
                </form>

                {/* Warranty Claims list */}
                <div className="space-y-3 pt-4">
                  {project.warranty.claims.map((cl) => (
                    <div key={cl.id} className="p-3 bg-slate-50 dark:bg-slate-950/20 border border-slate-250 dark:border-slate-800 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{cl.issue}</p>
                        <p className="text-[9px] text-slate-400 mt-1 font-mono">Date Filed: {cl.fileDate} • Notes: {cl.notes}</p>
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-wider bg-amber-50 text-amber-700 dark:bg-amber-950/20 px-2 py-0.5 rounded-md">
                        {cl.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* RIGHT METADATA PANEL (TAKES 4 COLS OF 12) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* CLIENT INFRASTRUCTURE */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400" />
              <span>Client Contacts Dossier</span>
            </h4>

            <div className="space-y-4 text-xs font-bold text-slate-700 dark:text-slate-300">
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-normal">Homeowner Partner</span>
                <p className="text-sm font-black text-slate-900 dark:text-white mt-0.5">{project.homeowner}</p>
              </div>
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-850">
                <div className="flex items-center gap-2 font-mono">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{project.phone}</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{project.email}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-850">
                <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-normal">Preferred Contact Method</span>
                <p className="mt-0.5 text-slate-900 dark:text-white">{project.preferredContact}</p>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-850">
                <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-normal">Emergency Check Contact</span>
                <p className="mt-0.5 text-slate-500 font-medium leading-tight">{project.emergencyContact}</p>
              </div>
            </div>
          </div>

          {/* PROJECT TEAM ASSIGNMENTS */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-400" />
              <span>Assigned Trades &amp; Managers</span>
            </h4>

            <div className="space-y-4 text-xs font-bold text-slate-700 dark:text-slate-300">
              <div className="flex justify-between items-center">
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-normal">Account Manager</span>
                  <p className="mt-0.5 text-slate-900 dark:text-white">{project.accountManager}</p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2.5 border-t border-slate-100 dark:border-slate-850">
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-normal">Project Manager</span>
                  <p className="mt-0.5 text-slate-900 dark:text-white">{project.projectManager}</p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2.5 border-t border-slate-100 dark:border-slate-850">
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-normal">Field Superintendent</span>
                  <p className="mt-0.5 text-slate-900 dark:text-white">{project.superintendent}</p>
                </div>
              </div>
              
              {project.crew.length > 0 && (
                <div className="pt-2.5 border-t border-slate-100 dark:border-slate-850">
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-normal mb-1.5">Carpentry Crew</span>
                  <div className="flex flex-wrap gap-1">
                    {project.crew.map((member, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-slate-50 border border-slate-200 text-[10px] text-slate-600 rounded-md">
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.subcontractors.length > 0 && (
                <div className="pt-2.5 border-t border-slate-100 dark:border-slate-850">
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-normal mb-1.5">Contracted Trades</span>
                  <div className="flex flex-wrap gap-1">
                    {project.subcontractors.map((sub, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-slate-50 border border-slate-200 text-[10px] text-slate-600 rounded-md">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ACTIVE PROJECT NOTIFICATIONS ALERTS */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3.5 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>Project Dispatch Warnings</span>
            </h4>

            <div className="space-y-3">
              {[
                { type: "Meeting", text: "Upcoming Materials Consultation on July 22", level: "info" },
                { type: "Delivery", text: "Cypress Lumber Delivery due July 24 at 08:30", level: "info" },
                { type: "Permit", text: "Electrical Rough-in county inspection July 20", level: "warning" },
                { type: "Invoice", text: "Milestone Draw Pending Sign-off Review", level: "warning" }
              ].map((notif, idx) => (
                <div key={idx} className={`p-3 rounded-xl border text-[11px] leading-tight font-semibold flex items-start gap-2 ${
                  notif.level === "warning"
                    ? "bg-amber-50 text-amber-800 border-amber-200/50"
                    : "bg-blue-50 text-blue-850 border-blue-200/50"
                }`}>
                  <span className="mt-0.5 font-bold uppercase tracking-wider text-[8px] px-1 bg-current/15 rounded-xs shrink-0">{notif.type}</span>
                  <span>{notif.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CHRONOLOGICAL PROJECT ACTIVITY FEED */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-slate-400" />
              <span>Operations Log Registry</span>
            </h4>

            <div className="space-y-4">
              {project.activityFeed.map((act) => (
                <div key={act.id} className="relative pl-5 pb-1 border-l border-slate-150 last:border-transparent">
                  <div className="absolute left-[-4.5px] top-[4px] w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <p className="text-[11px] text-slate-600 dark:text-slate-350 font-medium leading-tight">
                    {act.text}
                  </p>
                  <span className="text-[8px] font-mono font-bold text-slate-400 mt-0.5 block">
                    {act.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* EDIT PROJECT METADATA MODAL */}
      {isEditProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-150 dark:border-slate-800">
              <h3 className="text-sm font-black font-display text-slate-950 dark:text-white uppercase tracking-wider">
                Edit Renovation Project Folder
              </h3>
              <button 
                onClick={() => setIsEditProjectModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSaveProjectEdits} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name || ""}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Homeowner</label>
                <input
                  type="text"
                  required
                  value={editForm.homeowner || ""}
                  onChange={(e) => setEditForm({ ...editForm, homeowner: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Property Location Address</label>
                <input
                  type="text"
                  required
                  value={editForm.address || ""}
                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Contract Value ($)</label>
                  <input
                    type="number"
                    required
                    value={editForm.contractValue || 0}
                    onChange={(e) => setEditForm({ ...editForm, contractValue: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Internal Cost Budget ($)</label>
                  <input
                    type="number"
                    required
                    value={editForm.budget || 0}
                    onChange={(e) => setEditForm({ ...editForm, budget: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Account Manager</label>
                  <input
                    type="text"
                    required
                    value={editForm.accountManager || ""}
                    onChange={(e) => setEditForm({ ...editForm, accountManager: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Project Manager</label>
                  <input
                    type="text"
                    required
                    value={editForm.projectManager || ""}
                    onChange={(e) => setEditForm({ ...editForm, projectManager: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Project Status</label>
                  <select
                    value={editForm.status || "On Track"}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="On Track">On Track</option>
                    <option value="Delayed">Delayed</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Project Stage</label>
                  <select
                    value={editForm.stage || "Construction"}
                    onChange={(e) => setEditForm({ ...editForm, stage: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="Consultation">Consultation</option>
                    <option value="Material Selection">Material Selection</option>
                    <option value="Estimating">Estimating</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Contract Signed">Contract Signed</option>
                    <option value="Permits">Permits</option>
                    <option value="Scheduling">Scheduling</option>
                    <option value="Demolition">Demolition</option>
                    <option value="Construction">Construction</option>
                    <option value="Final Walkthrough">Final Walkthrough</option>
                    <option value="Completed">Completed</option>
                    <option value="Warranty">Warranty</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditProjectModalOpen(false)}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-755 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-xs"
                >
                  Save Project Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CALENDLY SCHEDULER OVERLAY MODAL */}
      {isCalendlyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl text-center relative overflow-hidden">
            {/* Embedded simulation banner */}
            <div className="bg-slate-100 dark:bg-slate-950 py-1 px-4 border-b border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase text-blue-600 tracking-wider flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Calendly Integration Widget</span>
            </div>

            <div className="my-6">
              <h3 className="text-sm font-black font-display text-slate-950 dark:text-white uppercase tracking-wider mb-2">
                Book with NOLA BUILDS Scheduling Engine
              </h3>
              <p className="text-[10px] text-slate-400 max-w-xs mx-auto">
                Select a preset meeting type to dispatch on-site measuring, design reviews, or final walks.
              </p>
            </div>

            <form onSubmit={handleCalendlyBook} className="space-y-4 text-left">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Meeting Type</label>
                <select
                  value={calendlyMeetingType}
                  onChange={(e) => setCalendlyMeetingType(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                >
                  <option value="Consultation">Consultation (60 min)</option>
                  <option value="Design Review">Design Review (90 min)</option>
                  <option value="Estimate Review">Estimate Review (45 min)</option>
                  <option value="Material Selection">Material Selection (120 min)</option>
                  <option value="Site Visit">Site Visit (60 min)</option>
                  <option value="Weekly Progress Meeting">Weekly Progress Meeting (30 min)</option>
                  <option value="Final Walkthrough">Final Walkthrough (60 min)</option>
                  <option value="Warranty Visit">Warranty Visit (45 min)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Appointment Date</label>
                  <input
                    type="date"
                    required
                    value={calendlyDate}
                    onChange={(e) => setCalendlyDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Start Time Slot</label>
                  <input
                    type="time"
                    required
                    value={calendlyTime}
                    onChange={(e) => setCalendlyTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Assigned Organizer</label>
                <select
                  value={calendlyAssigned}
                  onChange={(e) => setCalendlyAssigned(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
                >
                  <option value="Sarah Connor">Sarah Connor (Account Manager)</option>
                  <option value="David Vance">David Vance (Project Manager)</option>
                  <option value="Louis Ducreux">Louis Ducreux (Salesperson)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCalendlyOpen(false)}
                  className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-xs text-center cursor-pointer"
                >
                  Complete Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
