import React from "react";
import { Wordmark } from "./Brand";

const StatusScreen = ({
  code,
  title,
  body,
  action,
}: {
  code: string;
  title: string;
  body: string;
  action: React.ReactNode;
}) => {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-ink-950">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[28%] top-[6%] h-[300px] w-[300px] rounded-full bg-mint-500/12 blur-[90px] lg:-left-[10%] lg:top-[10%] lg:h-[520px] lg:w-[520px] lg:blur-[150px]" />
        <div className="absolute bottom-[-14%] right-[-20%] h-[260px] w-[260px] rounded-full bg-teal-400/10 blur-[100px] lg:bottom-[-20%] lg:right-[10%] lg:h-[420px] lg:w-[420px] lg:blur-[140px]" />
      </div>

      <div className="relative flex min-h-dvh flex-col px-5 py-7 sm:px-10 lg:px-14 lg:py-9">
        <Wordmark className="fade" />

        <div className="mx-auto flex w-full max-w-[1180px] flex-1 items-center">
          <div className="max-w-[46ch]">
            <p
              className="rise font-mono text-[13px] text-mint-400"
              style={{ "--d": "40ms" } as React.CSSProperties}
            >
              {code}
            </p>
            <h1
              className="rise mt-4 text-[clamp(38px,5vw,64px)] font-medium leading-[1.05] tracking-[-0.035em] text-fog-50"
              style={{ "--d": "100ms" } as React.CSSProperties}
            >
              {title}
            </h1>
            <p
              className="rise mt-5 text-[15px] leading-relaxed text-fog-400"
              style={{ "--d": "170ms" } as React.CSSProperties}
            >
              {body}
            </p>
            <div
              className="rise mt-8"
              style={{ "--d": "240ms" } as React.CSSProperties}
            >
              {action}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StatusScreen;
