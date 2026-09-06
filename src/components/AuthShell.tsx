"use client";

import React from "react";
import { Wordmark } from "./Brand";

const AuthShell = ({
  display,
  title,
  subtitle,
  children,
  footnote,
  headerSlot,
}: {
  display: React.ReactNode;
  title: string;
  subtitle: React.ReactNode;
  children: React.ReactNode;
  footnote?: React.ReactNode;
  headerSlot?: React.ReactNode;
}) => {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-ink-950">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[30%] top-[2%] h-[300px] w-[300px] rounded-full bg-mint-500/12 blur-[90px] lg:-left-[14%] lg:top-[6%] lg:h-[560px] lg:w-[560px] lg:blur-[150px] lg:bg-mint-500/14" />
        <div className="absolute -right-[25%] top-[38%] h-[300px] w-[300px] rounded-full bg-mint-400/14 blur-[90px] lg:right-[2%] lg:top-[26%] lg:h-[520px] lg:w-[520px] lg:blur-[120px] lg:bg-mint-400/20" />
        <div className="absolute bottom-[-12%] left-[10%] h-[240px] w-[240px] rounded-full bg-teal-400/8 blur-[100px] lg:bottom-[-18%] lg:left-auto lg:right-[24%] lg:h-[420px] lg:w-[420px] lg:blur-[130px] lg:bg-teal-400/12" />
      </div>

      <div className="relative flex min-h-dvh flex-col px-5 py-7 sm:px-10 lg:px-14 lg:py-9">
        <Wordmark className="fade" />

        <div className="mx-auto flex w-full max-w-[1180px] flex-1 items-center">
          <div className="grid w-full items-center gap-9 py-8 lg:grid-cols-[1fr_minmax(0,430px)] lg:gap-16 lg:py-10">
            <h1
              className="rise text-[clamp(32px,8.5vw,42px)] font-medium leading-[1.06] tracking-[-0.03em] text-fog-50 lg:text-[clamp(46px,5.6vw,76px)] lg:leading-[1.04] lg:tracking-[-0.035em]"
              style={{ "--d": "60ms" } as React.CSSProperties}
            >
              {display}
            </h1>

            <div
              className="rise w-full rounded-panel border border-white/12 bg-white/5.5 p-6 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur-2xl sm:p-8 lg:p-9"
              style={{ "--d": "160ms" } as React.CSSProperties}
            >
              {headerSlot}
              <h2 className="text-[22px] font-medium leading-tight tracking-[-0.02em] text-fog-50 sm:text-[26px]">
                {title}
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-fog-400 sm:text-[14.5px]">
                {subtitle}
              </p>

              <div className="mt-7 sm:mt-8">{children}</div>

              {footnote && (
                <p className="mt-6 text-[13px] leading-relaxed text-fog-500 sm:mt-7">
                  {footnote}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthShell;
