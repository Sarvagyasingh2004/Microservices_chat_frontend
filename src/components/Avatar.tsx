import React from "react";

const initialsOf = (name?: string | null) => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "?";
};

const SIZES = {
  sm: { box: "h-9 w-9", text: "text-[12px]", dot: "h-2.5 w-2.5" },
  md: { box: "h-11 w-11", text: "text-[14px]", dot: "h-3 w-3" },
  lg: { box: "h-12 w-12", text: "text-[15px]", dot: "h-3 w-3" },
};

const Avatar = ({
  name,
  size = "md",
  online,
  ringClass = "ring-ink-900",
}: {
  name?: string | null;
  size?: keyof typeof SIZES;
  online?: boolean;
  ringClass?: string;
}) => {
  const s = SIZES[size];

  return (
    <div className="relative shrink-0">
      <div
        className={`${s.box} flex items-center justify-center rounded-full bg-ink-700 ${s.text} font-medium text-fog-200 select-none`}
        aria-hidden
      >
        {initialsOf(name)}
      </div>
      {online !== undefined && online && (
        <span
          className={`absolute -bottom-0.5 -right-0.5 ${s.dot} rounded-full bg-mint-400 ring-2 ${ringClass}`}
          aria-label="Online"
        />
      )}
    </div>
  );
};

export default Avatar;
