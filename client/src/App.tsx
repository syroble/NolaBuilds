import React, { useState, useEffect } from "react";
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Navigate, 
  useNavigate, 
  useLocation 
} from "react-router-dom";
import { 
  QueryClient, 
  QueryClientProvider 
} from "@tanstack/react-query";
import { 
  ArrowLeft, 
  Sparkles, 
  X 
} from "lucide-react";

import { SavedEstimate } from "./types";
import AIDesignAssistant from "./features/client/AIDesignAssistant";
import nolaBuildsLogo from "../assets/nolabuilds.avif";

// Import Pages & Features
import LandingPage from "./pages/LandingPage";
import ClientPortalLayout from "./pages/ClientPortalLayout";
import AdminPortalLayout from "./pages/AdminPortalLayout";
import LoginPage from "./features/auth/LoginPage";
import SignupPage from "./features/auth/SignupPage";
import ClientNavBar from "./components/ClientNavBar";
import ClientDashboard from "./features/client/ClientDashboard";
import ModularEstimator from "./features/client/ModularEstimator";
import ClientNotifications, { NotificationItem } from "./features/client/ClientNotifications";
import ClientProfile from "./features/client/ClientProfile";
import AdminDashboard from "./features/admin/AdminDashboard";
import AdminProjectPage from "./features/admin/AdminProjectPage";

// Import hooks
import { useAuth } from "./features/auth/hooks/useAuth";
import { useClientData } from "./features/client/hooks/useClientData";

// Initialize TanStack Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 30,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading, logout, updateProfile } = useAuth();
  const { estimates, saveEstimate, deleteEstimate } = useClientData();

  // Active loaded estimate being viewed/edited in Modular Estimator
  const [loadedEstimate, setLoadedEstimate] = useState<SavedEstimate | null>(null);

  // Active selected admin project ID for detail view
  const [selectedAdminProjectId, setSelectedAdminProjectId] = useState<string>("proj_1");

  const [darkMode, setDarkMode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  // 1. Toast notifier
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // 2. Persistent Notifications List (Managed locally for alerts visual, can also be expanded)
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const stored = localStorage.getItem("nola_builts_notifications");
      if (stored) return JSON.parse(stored);
    } catch {}
    return [
      {
        id: "notif_1",
        type: "milestone",
        title: "Siding Replaced & Sanded",
        message: "The primary exterior cedar cladding has passed construction inspection. Our carpentry team will begin prime painting tomorrow.",
        date: "Today at 10:45 AM",
        isRead: false,
        projectName: "Lower Parlor Heartwood Floors"
      },
      {
        id: "notif_2",
        type: "action",
        title: "Material Specification Required",
        message: "Please launch your custom Cost Estimator spec and choose the premium lumber materials for the rear outdoor deck.",
        date: "Yesterday at 3:15 PM",
        isRead: false,
        projectName: "Outdoor Deck Project"
      },
      {
        id: "notif_3",
        type: "update",
        title: "Building Permit Approved",
        message: "Sewer & structural engineering building permits have been successfully approved by the local municipal office.",
        date: "July 12, 2026",
        isRead: true,
        projectName: "Master Bath Spa Remodel"
      },
      {
        id: "notif_admin_1",
        type: "action",
        title: "New Architectural Inquiry",
        message: "High-value lead Penelope Cruz submitted a cedar siding exterior cladding inquiry. Ready for contact assignment.",
        date: "Today at 8:30 AM",
        isRead: false,
        projectName: "Belmont Cedar Shingle Wrap",
        isAdminNotification: true
      },
      {
        id: "notif_admin_2",
        type: "milestone",
        title: "Change Order Approved",
        message: "William Faulkner approved change order 'Reinforce sub-floor joists for structural bookcase loads' ($3,200). Woodshop has been alerted.",
        date: "Yesterday at 4:15 PM",
        isRead: false,
        projectName: "Faulkner Carriage House",
        isAdminNotification: true
      }
    ];
  });

  // Sync notifications to localStorage
  useEffect(() => {
    localStorage.setItem("nola_builts_notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Dark Mode Setup
  useEffect(() => {
    const saved = localStorage.getItem("kitchen_dark_mode");
    const isDark = saved !== null
      ? saved === "true"
      : false;
    
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("kitchen_dark_mode", String(newMode));
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Auth / Profile Callbacks
  const handleLogout = () => {
    logout();
    triggerToast("Signed out of Client Portal.");
    navigate("/");
  };

  const handleUpdateUser = (updatedUser: { name: string; email: string; role: string }) => {
    updateProfile(updatedUser);
    triggerToast("Profile information updated on server.");
  };

  // Estimate saving callbacks
  const handleSaveEstimate = async (
    name: string,
    roomType: string,
    selections: Record<string, string>,
    totalCost: number,
    services: string[],
    notes?: string
  ) => {
    try {
      const payload = {
        name,
        selections,
        totalCost,
        notes: notes || `${roomType} specification plan`,
        selectedServices: services
      };
      const created = await saveEstimate(payload);
      setLoadedEstimate(created);
      triggerToast(`Estimate "${name}" saved to cloud workspace!`);
    } catch (err) {
      console.error(err);
      triggerToast("Failed to save estimate to server.");
    }
  };

  const handleSelectEstimateFromDashboard = (est: SavedEstimate) => {
    setLoadedEstimate(est);
    navigate("/estimator");
  };

  const handleConvertEstimateToProject = (est: SavedEstimate) => {
    if (confirm(`Do you want to submit "${est.name}" to NOLA BUILDS engineering division to request material ordering permits & on-site scheduling?`)) {
      triggerToast("Spec submitted successfully! Checked by staff within 2 hours.");
      const newNotif: NotificationItem = {
        id: "notif_" + Date.now(),
        type: "milestone",
        title: "Specification Under Review",
        message: `Your draft "${est.name}" was successfully received and is undergoing municipal zoning screening.`,
        date: "Just now",
        isRead: false,
        projectName: est.name
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }
  };

  // Notification action handlers
  const filteredNotifications = notifications.filter((n) => {
    const isStaff = user?.role === "staff";
    const isDemoUser = user?.id === "user_client_1" || 
                       user?.email === "homeowner@nolabuilts.com" || 
                       user?.id === "user_staff_1" || 
                       user?.email === "estimator.louis@nolabuilts.com";
    const isMockNotification = n.id.startsWith("notif_");
    if (isMockNotification && !isDemoUser) {
      return false;
    }
    return isStaff ? !!n.isAdminNotification : !n.isAdminNotification;
  });

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => {
      const isStaff = user?.role === "staff";
      const matches = isStaff ? !!n.isAdminNotification : !n.isAdminNotification;
      return matches ? { ...n, isRead: true } : n;
    }));
    triggerToast("All alerts marked as read");
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    triggerToast("Alert cleared");
  };

  const unreadCount = filteredNotifications.filter((n) => !n.isRead).length;

  // Custom route checker for authentication protection
  const isAuthRoute = ["/login", "/signup", "/"].includes(location.pathname);
  
  if (isLoading && !isAuthRoute) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <img
            src={nolaBuildsLogo}
            alt="NOLA BUILDS"
            className="w-16 h-16 rounded-2xl animate-pulse"
            referrerPolicy="no-referrer"
          />
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-bounce" />
          </div>
          <span className="text-xs font-bold text-slate-500 tracking-wider uppercase animate-pulse">Loading Workspace...</span>
        </div>
      </div>
    );
  }
  
  if (!user && !isAuthRoute) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative font-sans transition-colors duration-300">
        <div className="absolute top-6 left-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 font-display text-2xl font-black tracking-tight text-blue-600 dark:text-blue-500 mb-2 cursor-pointer"
          >
            <img
              src={nolaBuildsLogo}
              alt="NOLA BUILDS"
              className="w-12 h-12 rounded-xl object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="hidden md:inline">NOLA BUILDS</span>
          </button>
          <h2 className="text-xl font-bold font-display tracking-tight text-slate-900 dark:text-slate-100">
            Client Portal Protected
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-sm mx-auto">
            This collaborative workspace, custom material configurator, and dynamic cost engine is restricted to authenticated clients or staff.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-slate-900 py-8 px-6 sm:px-10 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl space-y-5 text-center">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 text-xs rounded-xl flex items-start gap-3 border border-blue-150 dark:border-blue-950/40 text-left">
              <Sparkles className="w-5 h-5 shrink-0 mt-0.5 text-blue-500" />
              <div>
                <span className="font-bold block text-slate-800 dark:text-slate-200">Unlock Workspace Features:</span>
                <span className="block mt-0.5 text-slate-500 dark:text-slate-400">Configure full-scale kitchens, bathroom suites, and decks, track active construction phase progress bars, and sign off on change orders.</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => navigate("/login")}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
              >
                <span>Sign In to Client Portal</span>
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 text-sm font-bold rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 transition-colors cursor-pointer"
              >
                <span>Register &amp; Create Project Lead</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60">
              <button
                onClick={() => navigate("/login?role=staff")}
                className="text-xs font-semibold text-slate-450 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 transition-colors cursor-pointer"
              >
                Are you NOLA BUILDS staff? Sign in here
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Pages */}
      <Route 
        path="/" 
        element={
          <LandingPage 
            onNavigate={(p) => navigate(p)} 
            darkMode={darkMode} 
            onToggleDarkMode={toggleDarkMode}
            user={user}
            onLogout={handleLogout}
          />
        } 
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Portal Views wrapped with ClientPortalLayout */}
      <Route
        element={
          user?.role !== "staff" ? (
            <ClientPortalLayout
              user={user}
              onLogout={handleLogout}
              unreadCount={unreadCount}
              aiAssistantOpen={aiAssistantOpen}
              setAiAssistantOpen={setAiAssistantOpen}
              toastMessage={toastMessage}
              setLoadedEstimate={setLoadedEstimate}
              triggerToast={triggerToast}
              onNavigate={(p) => navigate(p)}
            />
          ) : (
            <Navigate to="/admin" replace />
          )
        }
      >
        {/* Protected Client Views */}
        <Route 
          path="/dashboard" 
          element={
            <ClientDashboard
              user={user}
              leadData={user?.leadData}
              savedEstimates={estimates}
              onNavigate={(p) => navigate(p)}
              onSelectEstimate={handleSelectEstimateFromDashboard}
              onConvertEstimateToProject={handleConvertEstimateToProject}
            />
          } 
        />
        <Route 
          path="/estimator" 
          element={
            <ModularEstimator
              user={user}
              onSaveEstimate={handleSaveEstimate}
              initialEstimateToLoad={loadedEstimate}
              onClearLoadedEstimate={() => setLoadedEstimate(null)}
              triggerToast={triggerToast}
              onNavigate={(p) => navigate(p)}
              onTriggerAIAssistant={() => setAiAssistantOpen(true)}
            />
          } 
        />
        <Route 
          path="/notifications" 
          element={
            <ClientNotifications
              notifications={filteredNotifications}
              onMarkAllAsRead={handleMarkAllNotificationsRead}
              onMarkAsRead={handleMarkNotificationRead}
              onDeleteNotification={handleDeleteNotification}
              onNavigate={(p) => navigate(p)}
              user={user}
            />
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ClientProfile
              user={user}
              leadData={user?.leadData}
              triggerToast={triggerToast}
              onUpdateUser={handleUpdateUser}
            />
          } 
        />
      </Route>

      {/* Protected Staff Admin Views wrapped with AdminPortalLayout */}
      <Route
        element={
          user?.role === "staff" ? (
            <AdminPortalLayout
              user={user}
              onLogout={handleLogout}
              onNavigate={(p) => navigate(p)}
              toastMessage={toastMessage}
              unreadCount={unreadCount}
            />
          ) : (
            <Navigate to="/dashboard" replace />
          )
        }
      >
        <Route 
          path="/admin" 
          element={
            <AdminDashboard
              onNavigate={(p) => navigate(p)}
              onSelectProject={(projectId) => {
                setSelectedAdminProjectId(projectId);
                navigate("/admin-project");
              }}
            />
          } 
        />
        <Route 
          path="/admin-project" 
          element={
            <AdminProjectPage
              projectId={selectedAdminProjectId}
              onBackToDashboard={() => navigate("/admin")}
            />
          } 
        />
        <Route 
          path="/admin/notifications" 
          element={
            <ClientNotifications
              notifications={filteredNotifications}
              onMarkAllAsRead={handleMarkAllNotificationsRead}
              onMarkAsRead={handleMarkNotificationRead}
              onDeleteNotification={handleDeleteNotification}
              onNavigate={(p) => navigate(p)}
              user={user}
            />
          } 
        />
        <Route 
          path="/admin/profile" 
          element={
            <ClientProfile
              user={user}
              leadData={user?.leadData}
              triggerToast={triggerToast}
              onUpdateUser={handleUpdateUser}
            />
          } 
        />
      </Route>

      {/* Fallback routing protection redirector */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
