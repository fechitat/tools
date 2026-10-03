import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-bold tracking-wide transition-all rounded-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-95 cursor-pointer font-sans";

  const variants = {
    primary: "bg-[#D21034] hover:bg-[#A60C28] text-white shadow-xs border border-transparent",
    secondary: "bg-[#0b1220] hover:bg-[#101a2c] text-white shadow-xs border border-white/10",
    outline: "border border-[#d8d0ba] hover:border-[#181410] bg-white text-[#181410] shadow-2xs",
    ghost: "hover:bg-black/5 text-[#181410]",
    danger: "bg-[#D21034] hover:bg-[#A60C28] text-white shadow-xs",
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({ children, className, hoverable = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-md border border-[#d8d0ba]/80 p-6 shadow-xs",
        hoverable && "hover:shadow-md hover:border-[#181410]/40 transition-all",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "red" | "dark" | "gray" | "blue";
}

export function Badge({ children, className, variant = "red", ...props }: BadgeProps) {
  const variants = {
    red: "bg-[#FEE2E2] text-[#A60C28] border-[#FECACA]",
    dark: "bg-[#0b1220] text-white border-transparent",
    gray: "bg-black/5 text-[#5b5648] border-[#d8d0ba]/60",
    blue: "bg-[#EFF6FF] text-[#0033A0] border-[#BFDBFE]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-mono font-bold tracking-wider uppercase border",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
