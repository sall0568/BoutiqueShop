import { ReactNode } from "react";
import { clsx } from "clsx";
import {
  AlertCircle,
  CheckCircle,
  InfoIcon,
  AlertTriangle,
} from "lucide-react";

interface AlertProps {
  variant?: "success" | "error" | "info" | "warning";
  children: ReactNode;
  className?: string;
}

interface AlertDescriptionProps {
  children: ReactNode;
  className?: string;
}

const alertStyles = {
  success: "bg-green-50 text-green-800 border-green-200",
  error: "bg-red-50 text-red-800 border-red-200",
  info: "bg-blue-50 text-blue-800 border-blue-200",
  warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
};

const iconComponents = {
  success: <CheckCircle className="text-green-600" size={20} />,
  error: <AlertCircle className="text-red-600" size={20} />,
  info: <InfoIcon className="text-blue-600" size={20} />,
  warning: <AlertTriangle className="text-yellow-600" size={20} />,
};

export function Alert({ variant = "info", children, className }: AlertProps) {
  return (
    <div
      className={clsx(
        "flex items-gap gap-3 p-4 border rounded-lg",
        alertStyles[variant],
        className
      )}
    >
      {iconComponents[variant]}
      {children}
    </div>
  );
}

export function AlertDescription({
  children,
  className,
}: AlertDescriptionProps) {
  return <div className={clsx("text-sm", className)}>{children}</div>;
}
