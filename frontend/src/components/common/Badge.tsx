// src/components/common/Badge.tsx
import { clsx } from "clsx";

interface BadgeProps {
  variant?: "primary" | "success" | "warning" | "error" | "info";
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  variant = "primary",
  children,
  className,
}: BadgeProps) {
  const variants = {
    primary: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
    info: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={clsx(
        "px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
