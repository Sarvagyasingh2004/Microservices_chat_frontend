"use client";

import React, { useEffect } from "react";
import StatusScreen from "@/components/StatusScreen";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusScreen
      code={error.digest ? `Error ${error.digest}` : "Error"}
      title="Something broke on our side."
      body="This screen failed to render. Trying again often clears it. If it keeps happening, the backend services may not be running."
      action={
        <button
          onClick={reset}
          className="ring-focus inline-flex items-center rounded-control bg-mint-400 px-5 py-3 text-[14.5px] font-semibold text-ink-950 transition-all hover:bg-mint-300 active:scale-[0.985]"
        >
          Try again
        </button>
      }
    />
  );
}
