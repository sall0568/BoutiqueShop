import { ReactNode } from "react";
import { clsx } from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
  noBorder?: boolean;
}

export default function Card({
  children,
  className,
  noPadding = false,
  noBorder = false,
}: CardProps) {
  return (
    <div
      className={clsx(
        "bg-white rounded-lg shadow-sm",
        !noBorder && "border border-gray-200",
        !noPadding && "p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
