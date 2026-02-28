import React, { useEffect, useState } from "react";

const BOOT_LINES = [
  { text: "$ initializing portfolio.exe...", delay: 500,    color: "#00d4ff" },
  { text: "> loading modules: ML · LLM · MLOps", delay: 400,  color: "#94a3b8" },
  { text: "> connecting to data layer...",       delay: 800,  color: "#94a3b8" },
  { text: "> profile: DONA_ERIC_KOULODJI",       delay: 1200, color: "#a78bfa" },
  { text: "> status: AVAILABLE_FOR_HIRE",        delay: 1600, color: "#22c55e" },
];

export default function PageLoader() {
  const [lines, setLines]       = useState([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone]         = useState(false);

  // Boot lines sequence
  useEffect(() => {
    BOOT_LINES.forEach((l, i) => {
      setTimeout(() => {
        setLines(prev => [...prev, l]);
      }, l.delay);
    });
  }, []);

  // Progress bar
  useEffect(() => {
    const start = Date.now();
    const duration = 2200;
    const raf = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(raf);
      else setTimeout(() => setDone(true), 200);
    };
    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@600;700&display=swap');
        @keyframes gridFloat  { 0%,100%{opacity:.025} 50%{opacity:.055} }
        @keyframes pulseDot   { 0%,100%{box-shadow:0 0 6px #22c55e} 50%{box-shadow:0 0 16px #22c55e} }
        @keyframes fadeInLine { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scanline   { 0%{top:-4px} 100%{top:100%} }
        @keyframes blink      { 50%{opacity:0} }
        @keyframes progressGlow {
          0%,100% { box-shadow: 0 0 8px rgba(0,212,255,0.4); }
          50%     { box-shadow: 0 0 20px rgba(0,212,255,0.7); }
        }
        .loader-line { animation: fadeInLine 0.35s ease forwards; }
      `}</style>

      <div style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#060a0f",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        fontFamily: "'JetBrains Mono', monospace",
        overflow: "hidden"
      }}>

        {/* ── Grid background ── */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.035) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          animation: "gridFloat 8s ease infinite"
        }} />

        {/* ── Scanline effect ── */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: 2, pointerEvents: "none",
          background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.12), transparent)",
          animation: "scanline 3s linear infinite"
        }} />

        {/* ── Glow blobs ── */}
        <div style={{
          position: "absolute", top: "20%", right: "10%",
          width: 400, height: 400, pointerEvents: "none",
          background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)"
        }} />
        <div style={{
          position: "absolute", bottom: "15%", left: "5%",
          width: 350, height: 350, pointerEvents: "none",
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)"
        }} />

        {/* ── Main content ── */}
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480, padding: "0 24px" }}>

          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(36px, 8vw, 56px)", fontWeight: 700,
              letterSpacing: "-0.03em", lineHeight: 1
            }}>
              <span style={{ color: "#334155" }}>{"<"}</span>
              <span style={{
                background: "linear-gradient(135deg, #00d4ff 0%, #6366f1 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>DEK</span>
              <span style={{ color: "#334155" }}>{" />"}</span>
            </div>
            <div style={{
              fontSize: 11, color: "#334155",
              letterSpacing: "0.18em", marginTop: 10, textTransform: "uppercase"
            }}>
              Data Science · ML Engineering
            </div>
          </div>

          {/* Terminal box */}
          <div style={{
            background: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(0,212,255,0.18)",
            borderRadius: 8, overflow: "hidden", marginBottom: 28
          }}>
            {/* Terminal header */}
            <div style={{
              padding: "8px 14px",
              background: "rgba(255,255,255,0.03)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", gap: 6
            }}>
              {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.7 }} />
              ))}
              <span style={{ marginLeft: 8, fontSize: 10, color: "#334155", letterSpacing: "0.1em" }}>
                portfolio — bash
              </span>
            </div>

            {/* Terminal body */}
            <div style={{ padding: "16px 18px", minHeight: 120 }}>
              {lines.map((l, i) => (
                <div key={i} className="loader-line" style={{
                  fontSize: 12, color: l.color,
                  lineHeight: 2, letterSpacing: "0.03em"
                }}>{l.text}</div>
              ))}
              {/* Blinking cursor */}
              {!done && (
                <span style={{
                  fontSize: 13, color: "#00d4ff",
                  animation: "blink 1s step-end infinite"
                }}>▊</span>
              )}
              {done && (
                <div className="loader-line" style={{
                  fontSize: 12, color: "#22c55e",
                  lineHeight: 2, letterSpacing: "0.03em"
                }}>
                  ✓ Ready. Welcome.
                </div>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom: 20 }}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              marginBottom: 8, fontSize: 10, color: "#334155", letterSpacing: "0.12em"
            }}>
              <span>LOADING</span>
              <span style={{ color: progress === 100 ? "#22c55e" : "#00d4ff" }}>{progress}%</span>
            </div>
            <div style={{
              height: 3, background: "rgba(255,255,255,0.06)",
              borderRadius: 2, overflow: "hidden"
            }}>
              <div style={{
                height: "100%", borderRadius: 2,
                width: progress + "%",
                background: progress === 100
                  ? "linear-gradient(90deg, #22c55e88, #22c55e)"
                  : "linear-gradient(90deg, #00d4ff88, #00d4ff)",
                transition: "width 0.1s linear, background 0.5s ease",
                animation: "progressGlow 1.5s ease infinite"
              }} />
            </div>
          </div>

          {/* Availability indicator */}
          <div style={{ textAlign: "center" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 10, color: "#22c55e", letterSpacing: "0.1em"
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: "50%", background: "#22c55e",
                display: "inline-block", animation: "pulseDot 5s ease infinite"
              }} />
              AVAILABLE_FOR_HIRE :: status=open
            </div>
          </div>
        </div>
      </div>
    </>
  );
}