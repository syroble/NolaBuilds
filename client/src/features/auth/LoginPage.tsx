import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import nolaBuildsLogo from "../../../assets/nolabuilds.avif";
import { useAuth } from "./hooks/useAuth";
import LoginForm from "./components/LoginForm";
import {
  ShieldCheck,
  User,
  ArrowLeft
} from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const isStaffView = params.get("role") === "staff";
  const { login, isLoggingIn, loginError, user, loginWithGoogle, isLoggingInWithGoogle, googleLoginError } = useAuth();

  const [activeTab, setActiveTab] = useState<'client' | 'staff'>(isStaffView ? 'staff' : 'client');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(isStaffView ? 'staff' : 'client');
    setErrorMsg(null);
  }, [isStaffView]);

  // If already logged in, redirect
  useEffect(() => {
    if (user) {
      if (user.role === "staff") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [user, navigate]);

  // Load custom login errors from useAuth mutation state
  useEffect(() => {
    if (loginError) {
      setErrorMsg(loginError);
    }
  }, [loginError]);

  useEffect(() => {
    if (googleLoginError) {
      setErrorMsg(googleLoginError);
    }
  }, [googleLoginError]);

  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    try {
      const loggedInUser = await loginWithGoogle();
      if (loggedInUser.role === "staff") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Google Sign-In failed. Please make sure popup windows are enabled and try again.");
    }
  };

  const handleLoginSubmit = async (data: any) => {
    setErrorMsg(null);
    try {
      // Map form fields properly
      const payload = {
        email: data.email,
        password: data.password
      };
      
      const loggedInUser = await login(payload);
      if (loggedInUser.role === "staff") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || "Invalid credentials. Please verify your entries.");
    }
  };

  const handleFillDefaults = () => {
    setErrorMsg(null);
    const formElement = document.querySelector("form") as HTMLFormElement | null;
    if (formElement) {
      const emailInput = formElement.querySelector('input[name="email"]') as HTMLInputElement | null;
      const passInput = formElement.querySelector('input[name="password"]') as HTMLInputElement | null;
      if (emailInput && passInput) {
        if (activeTab === "client") {
          emailInput.value = "homeowner@nolabuilts.com";
          passInput.value = "client123";
        } else {
          emailInput.value = "estimator.louis@nolabuilts.com";
          passInput.value = "staff123";
        }
        // Force React Hook Form to pick up inputs by triggering input events
        emailInput.dispatchEvent(new Event("input", { bubbles: true }));
        passInput.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative font-sans transition-colors duration-300">
      
      {/* Absolute top home/back button */}
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
            className="w-12 h-12 rounded-xl object-contain pt-[2px]"
            referrerPolicy="no-referrer"
          />
          <span className="hidden md:inline">NOLA BUILDS</span>
        </button>
        <h2 className="text-xl font-bold font-display tracking-tight text-slate-900 dark:text-slate-100">
          {activeTab === "staff" ? "Staff Portal Login" : "Client Portal Login"}
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
          {activeTab === "staff"
            ? "Access the operations center, manage leads, and update project estimates."
            : "Access your interactive estimates, active blueprints, and project leads."}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 sm:px-10 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl space-y-6">
          
          <LoginForm
            onSubmit={handleLoginSubmit}
            isLoading={isLoggingIn}
            errorMessage={errorMsg}
            activeTab={activeTab}
            onFillCredentials={handleFillDefaults}
          />

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-900 px-2 text-slate-400 dark:text-slate-500 font-bold tracking-wider">
                Or
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoggingIn || isLoggingInWithGoogle}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 text-xs font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{isLoggingInWithGoogle ? "Signing with Google..." : "Sign in with Google"}</span>
          </button>

          <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800/60 space-y-3">
            {activeTab === "staff" ? (
              <p className="text-xs text-slate-400">
                Are you a client?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400 cursor-pointer"
                >
                  Go to Client Portal
                </button>
              </p>
            ) : (
              <>
                <p className="text-xs text-slate-400">
                  Don't have a workspace?{" "}
                  <button
                    onClick={() => navigate("/signup")}
                    className="font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400 cursor-pointer"
                  >
                    Register property lead
                  </button>
                </p>
                <div className="pt-1 text-xs text-slate-450 dark:text-slate-500">
                  Are you staff?{" "}
                  <button
                    onClick={() => navigate("/login?role=staff")}
                    className="font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400 cursor-pointer"
                  >
                    Staff Login
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
