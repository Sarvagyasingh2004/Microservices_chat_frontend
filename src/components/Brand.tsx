import { Waypoints } from "lucide-react";
import React from "react";

export const APP_NAME = "Skein";

export const Wordmark = ({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) => {
  const icon = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const text = size === "sm" ? "text-[14px]" : "text-[15px]";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Waypoints className={`${icon} text-mint-400`} strokeWidth={1.75} />
      <span className={`${text} font-medium tracking-tight text-fog-50`}>
        {APP_NAME}
      </span>
    </div>
  );
};
