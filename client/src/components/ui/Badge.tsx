import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "error" | "info" | "neutral" | "premium";
  children?: React.ReactNode;
  className?: string;
}

export default function Badge({
  children,
  variant = "neutral",
  className = "",
  ...props
}: BadgeProps) {
  const baseStyles = "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full transition-colors";

  const variants = {
    neutral: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200/50 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/30",
    warning: "bg-amber-50 text-amber-700 border border-amber-200/50 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/30",
    error: "bg-rose-50 text-rose-700 border border-rose-200/50 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/30",
    info: "bg-blue-50 text-blue-700 border border-blue-200/50 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/30",
    premium: "bg-purple-50 text-purple-700 border border-purple-200/50 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-900/30"
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
