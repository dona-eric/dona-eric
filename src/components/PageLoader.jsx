import React from "react";

/* Inline loading state used while a page fetches its data. */
export default function PageLoader({ label = "Mesure en cours" }) {
  return (
    <div
      role="status"
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "1px solid var(--q-line-strong)",
          borderTopColor: "var(--q-accent)",
          animation: "q-spin 0.9s linear infinite",
        }}
      />
      <span className="q-label">{label}…</span>
    </div>
  );
}
