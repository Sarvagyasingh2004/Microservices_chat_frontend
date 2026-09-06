import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-ink-950">
      <span
        className="h-6 w-6 animate-spin rounded-full border-2 border-ink-700 border-t-mint-400"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

export default Loading;
