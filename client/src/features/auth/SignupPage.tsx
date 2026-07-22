import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import nolaBuildsLogo from "../../../assets/nolabuilds.avif";
import { useAuth } from "./hooks/useAuth";
import SignupForm from "./components/SignupForm";
import {
  ArrowLeft,
  CheckCircle,
  Sparkles
} from "lucide-react";

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, isSigningUp, signupError, user } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // If already logged in, redirect
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (signupError) {
      setErrorMsg(signupError);
    }
  }, [signupError]);

  const handleSignupSubmit = async (data: any) => {
    setErrorMsg(null);
    try {
      // Form budget text representation
      const formattedBudget = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
      }).format(Number(data.budgetRange));

      const fullName = `${data.firstName} ${data.lastName}`.trim();

      const payload = {
        name: fullName,
        email: data.email,
        password: data.password,
        address: data.address,
        timeline: data.timeline,
        budgetRange: `${formattedBudget} - ${new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0
        }).format(Number(data.budgetRange) * 1.5)}`,
        description: data.projectDescription,
        ownershipStatus: data.ownershipStatus,
        neighborhood: data.neighborhood,
        yearBuilt: data.yearBuilt,
        propertySize: data.propertySize,
        image: data.image,
        renovationInterests: data.renovationInterests
      };

      await signup(payload);
      localStorage.setItem("nola_builts_first_time_client_view", "true");
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || "Signup failed. Please try again.");
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

      <div className="sm:mx-auto sm:w-full sm:max-w-lg text-center">
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
          Activate Your Client Workspace
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-sm mx-auto">
          Create an account and register your property lead to get customized material layouts and instant cost estimations.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 sm:px-10 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl space-y-6">
          
          <SignupForm
            onSubmit={handleSignupSubmit}
            isLoading={isSigningUp}
            errorMessage={errorMsg}
          />

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 text-left">
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-[10px] text-slate-700 dark:text-slate-300 block">Workspace Configurator</span>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 block">Compare custom quartz, oak layouts, or tiling costs.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-[10px] text-slate-700 dark:text-slate-300 block">AI Blueprint Assistant</span>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 block">Input raw notes and map instantly to materials.</span>
              </div>
            </div>
          </div>

          <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800/60">
            <p className="text-xs text-slate-400">
              Already have a workspace?{" "}
              <button
                onClick={() => navigate("/login")}
                className="font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400 cursor-pointer"
              >
                Sign In to Portal
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
