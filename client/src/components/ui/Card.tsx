import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  padded?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export default function Card({
  children,
  hoverEffect = false,
  padded = true,
  className = "",
  ...props
}: CardProps) {
  const baseStyles = "bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl shadow-xs transition-all duration-300";
  const hoverStyles = hoverEffect ? "hover:shadow-md hover:border-slate-200 dark:hover:border-slate-700 hover:-translate-y-[2px]" : "";
  const paddingStyles = padded ? "p-6" : "";

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${paddingStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
