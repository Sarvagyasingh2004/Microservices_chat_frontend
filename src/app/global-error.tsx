"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090b",
          color: "#fafafa",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: "42ch" }}>
          <p style={{ color: "#3ddc97", fontSize: "13px", margin: 0 }}>
            {error.digest ? `Error ${error.digest}` : "Error"}
          </p>
          <h1
            style={{
              fontSize: "38px",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              fontWeight: 500,
              margin: "14px 0 0",
            }}
          >
            Skein failed to start.
          </h1>
          <p
            style={{
              color: "#a1a1aa",
              fontSize: "15px",
              lineHeight: 1.6,
              margin: "18px 0 28px",
            }}
          >
            The application shell itself could not render. Reloading may help.
          </p>
          <button
            onClick={reset}
            style={{
              background: "#3ddc97",
              color: "#09090b",
              border: "none",
              borderRadius: "10px",
              padding: "12px 20px",
              fontSize: "14.5px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
