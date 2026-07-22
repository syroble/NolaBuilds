import React, { useState } from "react";
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  FileText, 
  ArrowRight,
  Info,
  Sparkles,
  Trash2
} from "lucide-react";

export interface NotificationItem {
  id: string;
  type: "milestone" | "update" | "action";
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  projectName?: string;
}

interface ClientNotificationsProps {
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onMarkAsRead: (id: string) => void;
  onDeleteNotification: (id: string) => void;
  onNavigate: (route: string) => void;
  user?: { name: string; email: string; role: string } | null;
}

export default function ClientNotifications({
  notifications,
  onMarkAllAsRead,
  onMarkAsRead,
  onDeleteNotification,
  onNavigate,
  user
}: ClientNotificationsProps) {
  
  const [filterType, setFilterType] = useState<"all" | "unread" | "action">("all");

  const filteredNotifications = notifications.filter((notif) => {
    if (filterType === "unread") return !notif.isRead;
    if (filterType === "action") return notif.type === "action";
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "milestone":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case "action":
        return <AlertTriangle className="w-5 h-5 text-amber-500 animate-pulse" />;
      case "update":
      default:
        return <FileText className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case "milestone":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-100 dark:border-emerald-950/40";
      case "action":
        return "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 border-amber-100 dark:border-amber-950/40";
      case "update":
      default:
        return "bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 border-blue-100 dark:border-blue-950/40";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in font-sans">
      
      {/* HEADER ROW */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5 mb-6">
         <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">
            {user?.role === "staff" ? "Operations Dispatch" : "Communication Hub"}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-950 dark:text-white flex items-center gap-2.5">
            <Bell className="w-7 h-7 text-blue-500 shrink-0" />
            <span>{user?.role === "staff" ? "Staff Operations Center" : "Client Notifications Center"}</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {user?.role === "staff"
              ? "Real-time construction operations, high-value inquiries, change order status, and permit updates."
              : "Real-time milestone tracking, required sign-offs, and design revisions for your property."}
          </p>
        </div>

        {/* Mark All As Read Button */}
        {notifications.some(n => !n.isRead) && (
          <button
            onClick={onMarkAllAsRead}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* FILTER BUTTONS ROW */}
      <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800/60 pb-3">
        {[
          { id: "all", name: `All Alerts (${notifications.length})` },
          { id: "unread", name: `Unread (${notifications.filter(n => !n.isRead).length})` },
          { id: "action", name: `Action Required (${notifications.filter(n => n.type === "action").length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterType === tab.id
                ? "bg-blue-600 text-white"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 bg-slate-100/60 dark:bg-slate-900"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* NOTIFICATIONS FEED LIST */}
      {filteredNotifications.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-16 text-center space-y-4">
          <div className="w-14 h-14 bg-slate-50 dark:bg-slate-950 text-slate-300 dark:text-slate-750 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-350">Your Feed is Fully Caught Up</p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
              Whenever a milestone passes site inspection, a material cost shift occurs, or structural permits are finalized, you will find active logs here.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotifications.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all relative overflow-hidden flex flex-col sm:flex-row justify-between items-start gap-4 ${
                item.isRead
                  ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                  : "bg-blue-50/15 dark:bg-blue-950/5 border-blue-250 dark:border-blue-900/40 ring-1 ring-blue-500/5 shadow-xs"
              }`}
            >
              {/* Unread dot decoration */}
              {!item.isRead && (
                <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />
              )}

              {/* Icon & Message details */}
              <div className="flex gap-4 items-start flex-1">
                <div className="p-2.5 bg-slate-100 dark:bg-slate-850 rounded-xl shrink-0 mt-0.5">
                  {getIcon(item.type)}
                </div>
                
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-slate-950 dark:text-white font-display">
                      {item.title}
                    </span>
                    
                    <span className={`px-2 py-0.5 rounded-md border text-[9px] font-black uppercase tracking-wider ${getBadgeStyle(item.type)}`}>
                      {item.type === "action" ? "Action Required" : item.type === "milestone" ? "Milestone" : "Update"}
                    </span>
                    
                    {item.projectName && (
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
                        &bull; {item.projectName}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                    {item.message}
                  </p>

                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold pt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>

              {/* Action utilities right column */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2.5 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold sm:hidden">Options:</span>
                <div className="flex items-center gap-2 ml-auto">
                  
                  {/* Action button if needed */}
                  {item.type === "action" && (
                    <button
                      onClick={() => {
                        onNavigate(user?.role === "staff" ? "/admin" : "/estimator");
                      }}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-lg transition-all"
                    >
                      {user?.role === "staff" ? "Manage Operations" : "Sign Off / Review"}
                    </button>
                  )}

                  {!item.isRead && (
                    <button
                      onClick={() => onMarkAsRead(item.id)}
                      className="px-2.5 py-1.5 text-[10px] font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-350 rounded-lg transition-all"
                      title="Mark as Read"
                    >
                      Mark read
                    </button>
                  )}

                  <button
                    onClick={() => onDeleteNotification(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all"
                    title="Delete notification"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* FOOTER TIP */}
      <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-950/20 rounded-2xl border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 leading-relaxed flex items-start gap-3">
        <Info className="w-4.5 h-4.5 text-blue-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-750 dark:text-slate-300 block mb-0.5">Automated SMS Sync:</span>
          We sync all urgent approvals to your phone number on file. To toggle off text notifications, please visit your account dashboard in <button onClick={() => onNavigate("/profile")} className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Profile Settings</button>.
        </div>
      </div>

    </div>
  );
}
