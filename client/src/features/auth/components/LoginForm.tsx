import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { Lock, Mail } from "lucide-react";

interface LoginFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  errorMessage: string | null;
  activeTab: "client" | "staff";
  onFillCredentials: () => void;
}

export default function LoginForm({
  onSubmit,
  isLoading,
  errorMessage,
  activeTab,
  onFillCredentials
}: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      email: activeTab === "client" ? "homeowner@nolabuilts.com" : "estimator.louis@nolabuilts.com",
      password: activeTab === "client" ? "client123" : "staff123"
    }
  });

  // React to tab switching and load pre-configured defaults
  React.useEffect(() => {
    if (activeTab === "client") {
      setValue("email", "homeowner@nolabuilts.com");
      setValue("password", "client123");
    } else {
      setValue("email", "estimator.louis@nolabuilts.com");
      setValue("password", "staff123");
    }
  }, [activeTab, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
      {errorMessage && (
        <div className="p-3.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-150 dark:border-rose-900/40 rounded-xl text-rose-600 dark:text-rose-400 text-xs font-semibold leading-relaxed flex items-start gap-2">
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="relative">
        <Mail className="absolute top-10.5 left-4 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
        <div className="pl-1">
          <Input
            label="Email Address"
            type="email"
            placeholder="your-email@example.com"
            className="pl-10"
            error={errors.email?.message}
            {...register("email", { 
              required: "Email address is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address"
              }
            })}
          />
        </div>
      </div>

      <div className="relative">
        <Lock className="absolute top-10.5 left-4 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
        <div className="pl-1">
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            className="pl-10"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 5,
                message: "Password must be at least 5 characters"
              }
            })}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900 cursor-pointer"
          />
          <label htmlFor="remember-me" className="text-xs text-slate-500 dark:text-slate-400 cursor-pointer select-none">
            Remember choice
          </label>
        </div>

        <button
          type="button"
          onClick={onFillCredentials}
          className="text-xs font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400 cursor-pointer"
        >
          Load Defaults
        </button>
      </div>

      <Button
        type="submit"
        className="w-full py-3 text-sm font-bold mt-2"
        loading={isLoading}
      >
        Sign In to Portal
      </Button>
    </form>
  );
}
