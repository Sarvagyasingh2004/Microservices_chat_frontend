import Link from "next/link";
import React from "react";
import StatusScreen from "@/components/StatusScreen";

export default function NotFound() {
  return (
    <StatusScreen
      code="404"
      title="That page does not exist."
      body="The link may be out of date, or the conversation it pointed at was removed."
      action={
        <Link
          href="/chat"
          className="ring-focus inline-flex items-center rounded-control bg-mint-400 px-5 py-3 text-[14.5px] font-semibold text-ink-950 transition-all hover:bg-mint-300 active:scale-[0.985]"
        >
          Back to conversations
        </Link>
      }
    />
  );
}
