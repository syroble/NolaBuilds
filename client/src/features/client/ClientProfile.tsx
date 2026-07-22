import React, { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  ShieldCheck, 
  CheckCircle, 
  QrCode, 
  Copy, 
  RefreshCw, 
  AlertTriangle,
  Info,
  Check
} from "lucide-react";

interface ClientProfileProps {
  user: { id?: string; name: string; email: string; role: string } | null;
  leadData: { address: string } | null;
  triggerToast: (msg: string) => void;
  onUpdateUser: (updatedUser: { name: string; email: string; role: string }) => void;
}

export default function ClientProfile({
  user,
  leadData,
  triggerToast,
  onUpdateUser
}: ClientProfileProps) {

  // 1. Profile States
  const [fullName, setFullName] = useState(user?.name || "");
  const [emailAddress, setEmailAddress] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(
    user?.id === "user_client_1" || user?.email === "homeowner@nolabuilts.com"
      ? "(504) 555-8291"
      : ""
  );

  useEffect(() => {
    if (user) {
      setFullName(user.name || "");
      setEmailAddress(user.email || "");
      if (user.id === "user_client_1" || user.email === "homeowner@nolabuilts.com") {
        setPhoneNumber("(504) 555-8291");
      }
    }
  }, [user]);
  const [comPreferenceSMS, setComPreferenceSMS] = useState(true);
  const [comPreferenceEmail, setComPreferenceEmail] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // 2. Security / Password States
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // 3. MFA States
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [mfaSecret] = useState("NOLA-BUILTS-MFA-SECRET-2026");
  const [isCopied, setIsCopied] = useState(false);
  const [mfaVerificationCode, setMfaVerificationCode] = useState("");
  const [mfaSetupCompleted, setMfaSetupCompleted] = useState(false);

  // Handlers
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !emailAddress.trim()) {
      triggerToast("Name and email are required.");
      return;
    }

    setIsSavingProfile(true);
    setTimeout(() => {
      onUpdateUser({
        name: fullName.trim(),
        email: emailAddress.trim(),
        role: user?.role || "client"
      });
      setIsSavingProfile(false);
      triggerToast("Profile details updated successfully!");
    }, 600);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    if (!oldPassword) {
      setPasswordError("Please specify your current account password.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match. Please verify.");
      return;
    }

    setIsUpdatingPassword(true);
    setTimeout(() => {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsUpdatingPassword(false);
      triggerToast("Security password updated successfully!");
    }, 800);
  };

  const handleCopySecret = () => {
    navigator.clipboard.writeText(mfaSecret);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    triggerToast("Backup secret key copied!");
  };

  const handleVerifyMfaCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (mfaVerificationCode.length !== 6) {
      triggerToast("Verification code must be exactly 6 digits.");
      return;
    }

    triggerToast("MFA validation succeeded!");
    setMfaSetupCompleted(true);
  };

  const handleToggleMfa = () => {
    if (mfaEnabled) {
      // Turn off
      setMfaEnabled(false);
      setMfaSetupCompleted(false);
      setMfaVerificationCode("");
      triggerToast("MFA deactivated.");
    } else {
      // Start setup
      setMfaEnabled(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-fade-in font-sans space-y-8">
      
      {/* HEADER ROW */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5 mb-6">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">Account Control</span>
        <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-950 dark:text-white flex items-center gap-2.5">
          <ShieldCheck className="w-7 h-7 text-blue-500 shrink-0" />
          <span>Profile &amp; Security Settings</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Configure contact references, update password keys, and fortify your account using Multi-Factor Authentication.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COMPONENT: PROFILE DETAILS (7 columns) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* PROFILE DETAILS CARD */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="border-b border-slate-150 dark:border-slate-800 pb-3 mb-5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
                <User className="w-4 h-4 text-blue-500" />
                <span>Contact Details</span>
              </h3>
              <p className="text-[10px] text-slate-400">
                Update primary contact details used by our carpentry &amp; engineering crews.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <User className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Primary Phone
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400 font-bold"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="email"
                    required
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400 font-bold"
                  />
                </div>
              </div>

              {/* COMMUNICATION PREFERENCES SECTION */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Notification Prefs
                </h4>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-350 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={comPreferenceSMS}
                      onChange={(e) => setComPreferenceSMS(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 dark:border-slate-800 text-blue-600 focus:ring-blue-500"
                    />
                    <span>SMS text alerts for urgent trade approvals</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-350 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={comPreferenceEmail}
                      onChange={(e) => setComPreferenceEmail(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 dark:border-slate-800 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Monthly email invoice statements</span>
                  </label>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all"
                >
                  {isSavingProfile ? "Updating Details..." : "Save Contact Info"}
                </button>
              </div>
            </form>
          </div>

          {/* PASSWORD MANAGEMENT CARD */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="border-b border-slate-150 dark:border-slate-800 pb-3 mb-5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-500" />
                <span>Security &amp; Password Management</span>
              </h3>
              <p className="text-[10px] text-slate-400">
                Ensure a rugged security footprint by updating account entry keys regularly.
              </p>
            </div>

            {passwordError && (
              <div className="mb-4 p-3.5 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs rounded-xl flex items-start gap-2.5 border border-red-150 dark:border-red-950/40">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                <span>{passwordError}</span>
              </div>
            )}

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Old Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="password"
                    required
                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="password"
                      required
                      placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="password"
                      required
                      placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isUpdatingPassword}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all"
                >
                  {isUpdatingPassword ? "Updating Password..." : "Lock New Key"}
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* RIGHT COMPONENT: MULTI-FACTOR AUTHENTICATION (5 columns) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-150 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Multi-Factor Auth (MFA)</span>
            </h3>
            <p className="text-[10px] text-slate-400">
              Fortify your project vault using standard mobile authenticator devices.
            </p>
          </div>

          {/* Toggle Block */}
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/20 rounded-xl border border-slate-150 dark:border-slate-800/80">
            <div>
              <span className="font-bold text-xs text-slate-800 dark:text-slate-250 block">Authenticator App Code</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Toggle to configure or disable MFA protection.</span>
            </div>
            
            {/* Custom Sliding Toggle */}
            <button
              onClick={handleToggleMfa}
              className={`w-11 h-6 rounded-full transition-all flex items-center p-0.5 cursor-pointer ${
                mfaEnabled ? "bg-emerald-500 justify-end" : "bg-slate-200 dark:bg-slate-800 justify-start"
              }`}
            >
              <div className="w-5 h-5 bg-white rounded-full shadow-xs" />
            </button>
          </div>

          {/* Setup Instructions Block (Rendered if toggle enabled but not completed) */}
          {mfaEnabled && !mfaSetupCompleted && (
            <div className="space-y-4 animate-scale-up pt-2">
              
              <div className="p-3 bg-blue-50/20 dark:bg-blue-950/15 border border-blue-150/40 text-[10px] text-blue-700 dark:text-blue-400 rounded-xl">
                <span>Scan the QR code below using Google Authenticator, Authy, or your built-in password generator.</span>
              </div>

              {/* CSS Vector-based QR Code Mockup (Looks incredibly authentic!) */}
              <div className="w-44 h-44 bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded-xl p-3 flex flex-col justify-between mx-auto relative group shadow-sm">
                {/* Visual grid mockup of a real QR code */}
                <div className="flex-1 grid grid-cols-5 grid-rows-5 gap-1.5 p-1 relative">
                  {/* Top-Left Finder */}
                  <div className="col-span-2 row-span-2 bg-slate-900 dark:bg-white rounded-sm p-1">
                    <div className="w-full h-full bg-white dark:bg-slate-950 p-1 rounded-xs">
                      <div className="w-full h-full bg-slate-900 dark:bg-white rounded-2xs" />
                    </div>
                  </div>
                  {/* Top-Right Finder */}
                  <div className="col-start-4 col-span-2 row-span-2 bg-slate-900 dark:bg-white rounded-sm p-1">
                    <div className="w-full h-full bg-white dark:bg-slate-950 p-1 rounded-xs">
                      <div className="w-full h-full bg-slate-900 dark:bg-white rounded-2xs" />
                    </div>
                  </div>
                  {/* Bottom-Left Finder */}
                  <div className="col-span-2 row-start-4 row-span-2 bg-slate-900 dark:bg-white rounded-sm p-1">
                    <div className="w-full h-full bg-white dark:bg-slate-950 p-1 rounded-xs">
                      <div className="w-full h-full bg-slate-900 dark:bg-white rounded-2xs" />
                    </div>
                  </div>
                  
                  {/* Random pixels */}
                  <div className="col-start-3 row-start-1 bg-slate-900 dark:bg-white rounded-2xs" />
                  <div className="col-start-3 row-start-3 bg-slate-900 dark:bg-white rounded-2xs" />
                  <div className="col-start-4 row-start-3 bg-slate-900 dark:bg-white rounded-2xs animate-pulse" />
                  <div className="col-start-5 row-start-3 bg-slate-900 dark:bg-white rounded-2xs" />
                  <div className="col-start-3 row-start-4 bg-slate-900 dark:bg-white rounded-2xs" />
                  <div className="col-start-3 row-start-5 bg-slate-900 dark:bg-white rounded-2xs" />
                  <div className="col-start-4 row-start-4 bg-slate-900 dark:bg-white rounded-2xs" />
                </div>
                
                <span className="text-[8px] font-mono font-bold text-center text-slate-400 uppercase tracking-widest mt-2 block">
                  Scan QR Code
                </span>
              </div>

              {/* Secret Backup Key Input */}
              <div className="space-y-1.5">
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  Or input secret backup key:
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-350 border border-slate-200 dark:border-slate-800 rounded-xl truncate">
                    {mfaSecret}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopySecret}
                    className="p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 text-slate-500 rounded-xl cursor-pointer"
                    title="Copy Backup Key"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Verification Code Form */}
              <form onSubmit={handleVerifyMfaCode} className="space-y-3 pt-2">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Input 6-Digit App Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="e.g. 104829"
                    value={mfaVerificationCode}
                    onChange={(e) => setMfaVerificationCode(e.target.value.replace(/\D/g, ""))}
                    className="w-full text-center tracking-widest font-mono text-sm py-2 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 font-bold"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                >
                  Confirm &amp; Enable MFA
                </button>
              </form>

            </div>
          )}

          {/* Finished Confirmation State */}
          {mfaEnabled && mfaSetupCompleted && (
            <div className="p-4 bg-emerald-50/20 dark:bg-emerald-950/10 border border-emerald-150/40 text-emerald-700 dark:text-emerald-400 rounded-xl flex gap-3 items-start animate-scale-up">
              <CheckCircle className="w-5 h-5 shrink-0 text-emerald-500 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold text-xs block text-slate-800 dark:text-slate-200">MFA Setup Secured</span>
                <span className="text-[10px] text-slate-500 block">Your login &amp; pricing modifications are successfully armored. backup key has been registered.</span>
              </div>
            </div>
          )}

          {/* Info Banner */}
          <div className="pt-2 text-[10px] text-slate-400 flex gap-2 leading-relaxed">
            <Info className="w-4.5 h-4.5 text-slate-300 shrink-0 mt-0.5" />
            <span>MFA is highly recommended for clients managing historical renovations or custom billing milestones to prevent unauthorized account manipulation.</span>
          </div>

        </div>

      </div>

    </div>
  );
}
