import React, { useEffect, useRef, useState } from "react";

// ─── Fade-in hook ─────────────────────────────────────────────────────────────
const useFadeIn = (delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`;
    const t = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 60);
    return () => clearTimeout(t);
  }, [delay]);
  return ref;
};

// ─── Typewriter multi-roles ────────────────────────────────────────────────────
function RoleTypewriter() {
  const roles = [
    "Data Scientist",
    "ML Engineer",
    "AI Systems Builder",
    "MLOps Practitioner",
    "Physics-Trained Mind",
  ];
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  return (
    <span>
      <span style={{
        background: "linear-gradient(135deg, #00d4ff 0%, #6366f1 100%)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
      }}>{displayed}</span>
      <span style={{ color: "#00d4ff", animation: "blink 1s step-end infinite" }}>|</span>
    </span>
  );
}

// ─── Terminal boot lines ───────────────────────────────────────────────────────
function TerminalBoot() {
  const lines = [
    { text: "$ python init_profile.py --name='Dona Éric KOULODJI'", delay: 0 },
    { text: "> Loading expertise: ML, LLM, MLOps, Computer Vision...", delay: 0.6 },
    { text: "> Physics BSc backbone detected ✓", delay: 1.1 },
    { text: "> Status: AVAILABLE_FOR_HIRE :: open=True", delay: 1.6 },
  ];
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    lines.forEach((l, i) => {
      setTimeout(() => setVisible(i + 1), l.delay * 1000 + 500);
    });
  }, []);

  return (
    <div style={{
      background: "rgba(0,0,0,0.6)", border: "1px solid rgba(0,212,255,0.2)",
      borderRadius: 8, padding: "16px 20px", fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12, lineHeight: 2, minHeight: 108
    }}>
      {lines.slice(0, visible).map((l, i) => (
        <div key={i} style={{
          color: l.text.startsWith("$") ? "#00d4ff" :
                 l.text.includes("✓") ? "#22c55e" :
                 l.text.includes("AVAILABLE") ? "#f59e0b" : "#94a3b8"
        }}>{l.text}</div>
      ))}
      {visible < lines.length && (
        <span style={{ color: "#475569" }}>
          <span style={{ animation: "blink 1s step-end infinite" }}>▊</span>
        </span>
      )}
    </div>
  );
}

// ─── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ value, label, note, color = "#00d4ff", delay }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} style={{
      padding: "20px 16px", textAlign: "center",
      background: "rgba(255,255,255,0.03)",
      border: `1px solid rgba(255,255,255,0.08)`,
      borderRadius: 8, position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`
      }} />
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 32, fontWeight: 700, color, lineHeight: 1, marginBottom: 8
      }}>{value}</div>
      <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500, marginBottom: 4 }}>{label}</div>
      {note && <div style={{ fontSize: 11, color: "#475569", fontFamily: "monospace" }}>{note}</div>}
    </div>
  );
}

// ─── Social link button ────────────────────────────────────────────────────────
function SocialBtn({ href, label, icon }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: 44, height: 44, borderRadius: 6,
        background: hov ? "rgba(0,212,255,0.1)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${hov ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.1)"}`,
        color: hov ? "#00d4ff" : "#64748b",
        fontSize: 18, transition: "all 0.2s ease",
        fontFamily: "monospace", textDecoration: "none"
      }}
      aria-label={label}
    >{icon}</a>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const badgeRef  = useFadeIn(0.1);
  const nameRef   = useFadeIn(0.3);
  const roleRef   = useFadeIn(0.5);
  const descRef   = useFadeIn(0.7);
  const termRef   = useFadeIn(0.9);
  const ctaRef    = useFadeIn(1.1);
  const socialRef = useFadeIn(1.3);
  const statsRef  = useFadeIn(1.5);
  const photoRef  = useFadeIn(0.4);

  const stats = [
    { value: "5+",     label: "Modèles en production", note: "Live & monitored",    color: "#00d4ff" },
    { value: "90%",    label: "Précision moyenne",      note: "Across ML projects", color: "#a78bfa" },
    { value: "3",      label: "Pays touchés",           note: "BJ · FR · CA",       color: "#22c55e" },
    { value: "<24h",   label: "Réponse garantie",       note: "Mon – Sun",           color: "#f59e0b" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060a0f; }
        @keyframes blink    { 50% { opacity: 0; } }
        @keyframes gridFloat{ 0%,100%{opacity:.03}50%{opacity:.07} }
        @keyframes pulseDot { 0%,100%{box-shadow:0 0 6px #22c55e}50%{box-shadow:0 0 16px #22c55e} }
        @keyframes orbit    { from{transform:rotate(0deg) translateX(220px) rotate(0deg)} to{transform:rotate(360deg) translateX(220px) rotate(-360deg)} }
        @keyframes orbit2   { from{transform:rotate(120deg) translateX(240px) rotate(-120deg)} to{transform:rotate(480deg) translateX(240px) rotate(-480deg)} }
        @keyframes orbit3   { from{transform:rotate(240deg) translateX(200px) rotate(-240deg)} to{transform:rotate(600deg) translateX(200px) rotate(-600deg)} }
        @keyframes photoGlow{ 0%,100%{box-shadow:0 0 40px rgba(0,212,255,0.15),0 0 80px rgba(99,102,241,0.1)} 50%{box-shadow:0 0 60px rgba(0,212,255,0.25),0 0 120px rgba(99,102,241,0.2)} }
        @keyframes scrollBob{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
        .btn-primary:hover  { background:linear-gradient(135deg,#0891b2,#4338ca)!important; transform:translateY(-2px); box-shadow:0 12px 32px rgba(0,212,255,0.25)!important; }
        .btn-secondary:hover{ border-color:rgba(0,212,255,0.4)!important; color:#00d4ff!important; transform:translateY(-2px); }
        a { text-decoration: none; }
        @media (max-width:900px) {
          .hero-grid { grid-template-columns:1fr!important; }
          .photo-col  { order:-1; }
          .stats-grid { grid-template-columns:repeat(2,1fr)!important; }
        }
      `}</style>

      <div style={{
        minHeight: "100vh", background: "#060a0f",
        color: "#e2e8f0", fontFamily: "'Space Grotesk', sans-serif",
        position: "relative", overflow: "hidden"
      }}>

        {/* ── Grid ── */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.035) 1px, transparent 1px)`,
          backgroundSize: "48px 48px", animation: "gridFloat 8s ease infinite"
        }} />

        {/* ── Glow blobs ── */}
        <div style={{
          position: "fixed", top: "5%", right: "0%", width: 700, height: 700,
          background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0
        }} />
        <div style={{
          position: "fixed", bottom: "0%", left: "-10%", width: 600, height: 600,
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0
        }} />

        {/* ══════ MAIN CONTENT ══════ */}
        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: 1160, margin: "0 auto",
          padding: "90px 24px 80px",
          minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center"
        }}>

          <div className="hero-grid" style={{
            display: "grid", gridTemplateColumns: "1fr 420px",
            gap: 64, alignItems: "center"
          }}>

            {/* ── LEFT COLUMN ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

              {/* Status badge */}
              <div ref={badgeRef} style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "7px 18px", borderRadius: 4, width: "fit-content",
                background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.25)",
                fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                color: "#00d4ff", letterSpacing: "0.05em"
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: "50%", background: "#22c55e",
                  animation: "pulseDot 2s ease infinite", display: "inline-block"
                }} />
                AVAILABLE_FOR_HIRE :: status=open · location=Bénin
              </div>

              {/* Name */}
              <div ref={nameRef}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                  color: "#475569", letterSpacing: "0.15em", marginBottom: 12
                }}>
                  <span style={{ color: "#6366f1" }}>// </span>profile.init()
                </div>
                <h1 style={{
                  fontSize: "clamp(48px, 8vw, 92px)", fontWeight: 700,
                  lineHeight: 1.02, letterSpacing: "-0.03em", color: "#f8fafc"
                }}>
                  Dona Éric<br />
                  <span style={{
                    background: "linear-gradient(135deg, #00d4ff 0%, #6366f1 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                  }}>KOULODJI</span>
                </h1>
              </div>

              {/* Animated role */}
              <div ref={roleRef} style={{
                fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 600,
                fontFamily: "'JetBrains Mono', monospace", minHeight: 44
              }}>
                <RoleTypewriter />
              </div>

              {/* Description */}
              <p ref={descRef} style={{
                color: "#94a3b8", fontSize: 17, lineHeight: 1.8, maxWidth: 560
              }}>
                Je conçois et déploie des{" "}
                <strong style={{ color: "#e2e8f0" }}>systèmes d'intelligence artificielle</strong>{" "}
                qui répondent à des besoins métier concrets — de l'exploration des données
                jusqu'au déploiement en production. Formé en physique, converti en data.
              </p>

              {/* Terminal boot */}
              <div ref={termRef} style={{ maxWidth: 560 }}>
                <TerminalBoot />
              </div>

              {/* CTA Buttons */}
              <div ref={ctaRef} style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                <a href="/projects" className="btn-primary" style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "14px 28px", borderRadius: 6,
                  background: "linear-gradient(135deg, #0e7490, #4338ca)",
                  color: "#f0f9ff", fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14, fontWeight: 600, letterSpacing: "0.05em",
                  transition: "all 0.25s ease",
                  boxShadow: "0 4px 20px rgba(0,212,255,0.12)"
                }}>
                  view_projects() →
                </a>
                <a href="/cv.pdf" target="_blank" rel="noopener noreferrer"
                  className="btn-secondary" style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "14px 28px", borderRadius: 6,
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 14, fontWeight: 500, letterSpacing: "0.05em",
                    transition: "all 0.25s ease"
                  }}>
                  ↓ download_resume.pdf
                </a>
              </div>

              {/* Social links */}
              <div ref={socialRef} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{
                  fontFamily: "monospace", fontSize: 11, color: "#334155",
                  letterSpacing: "0.1em"
                }}>// socials</span>
                <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.1)" }} />
                <SocialBtn href="https://github.com/dona-eric" label="GitHub" icon="⌥" />
                <SocialBtn href="https://linkedin.com/in/dona-erick" label="LinkedIn" icon="◈" />
                <SocialBtn href="https://twitter.com/ericschrodinger" label="Twitter/X" icon="✕" />
              </div>
            </div>

            {/* ── RIGHT COLUMN : Photo ── */}
            <div ref={photoRef} className="photo-col" style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: 28
            }}>

              {/* Photo frame */}
              <div style={{ position: "relative", width: 340, height: 340 }}>

                {/* Orbit dots */}
                {[
                  { anim: "orbit 12s linear infinite", color: "#00d4ff" },
                  { anim: "orbit2 16s linear infinite", color: "#a78bfa" },
                  { anim: "orbit3 10s linear infinite", color: "#22c55e" },
                ].map((o, i) => (
                  <div key={i} style={{
                    position: "absolute", top: "50%", left: "50%",
                    width: 8, height: 8, borderRadius: "50%",
                    background: o.color, boxShadow: `0 0 10px ${o.color}`,
                    animation: o.anim, transformOrigin: "0 0",
                    marginLeft: -4, marginTop: -4
                  }} />
                ))}

                {/* Ring borders */}
                <div style={{
                  position: "absolute", inset: -16,
                  borderRadius: "50%", border: "1px solid rgba(0,212,255,0.12)"
                }} />
                <div style={{
                  position: "absolute", inset: -32,
                  borderRadius: "50%", border: "1px dashed rgba(99,102,241,0.1)"
                }} />

                {/* Photo circle */}
                <div style={{
                  width: 340, height: 340, borderRadius: "50%",
                  background: "linear-gradient(135deg, #0e7490 0%, #4338ca 100%)",
                  padding: 3, animation: "photoGlow 4s ease infinite"
                }}>
                  <div style={{
                    width: "100%", height: "100%", borderRadius: "50%",
                    background: "#0a0e17", padding: 6, overflow: "hidden"
                  }}>
                    <img
                      src="/eric.jpg"
                      alt="Dona Éric KOULODJI"
                      style={{
                        width: "100%", height: "100%",
                        borderRadius: "50%", objectFit: "cover",
                        filter: "grayscale(20%) contrast(1.05)"
                      }}
                    />
                  </div>
                </div>

                {/* Status badge flottant */}
                <div style={{
                  position: "absolute", bottom: -14, left: "50%",
                  transform: "translateX(-50%)",
                  padding: "8px 20px", borderRadius: 4,
                  background: "rgba(6,10,15,0.95)",
                  border: "1px solid rgba(34,197,94,0.4)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12, color: "#22c55e",
                  whiteSpace: "nowrap", letterSpacing: "0.05em",
                  boxShadow: "0 4px 20px rgba(34,197,94,0.15)"
                }}>
                  <span style={{
                    display: "inline-block", width: 6, height: 6,
                    borderRadius: "50%", background: "#22c55e",
                    marginRight: 8, verticalAlign: "middle",
                    animation: "pulseDot 2s ease infinite"
                  }} />
                  Disponible immédiatement
                </div>
              </div>

              {/* Tech stack pills */}
              <div style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "monospace", fontSize: 11, color: "#334155",
                  letterSpacing: "0.12em", marginBottom: 12
                }}>// current_stack</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                  {["Python", "PyTorch", "FastAPI", "Docker", "LangChain", "MLflow"].map(t => (
                    <span key={t} style={{
                      padding: "4px 12px", borderRadius: 3,
                      background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)",
                      fontSize: 11, fontFamily: "monospace", color: "#818cf8"
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ══════ STATS ══════ */}
          <div ref={statsRef} style={{ marginTop: 80 }}>
            <div style={{
              width: "100%", height: 1, marginBottom: 40,
              background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)"
            }} />
            <div className="stats-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16
            }}>
              {stats.map((s, i) => (
                <StatCard key={i} {...s} delay={1.5 + i * 0.1} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div style={{
          position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          animation: "scrollBob 2s ease infinite"
        }}>
          <span style={{ fontFamily: "monospace", fontSize: 10, color: "#334155", letterSpacing: "0.1em" }}>scroll</span>
          <div style={{
            width: 20, height: 34, border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 10, display: "flex", justifyContent: "center", paddingTop: 6
          }}>
            <div style={{
              width: 2, height: 8, borderRadius: 2,
              background: "linear-gradient(180deg, #00d4ff, #6366f1)"
            }} />
          </div>
        </div>

        {/* Footer line */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "20px", textAlign: "center",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#334155"
        }}>
          dona-erick.koulodji © {new Date().getFullYear()} · Data Science & ML Engineering · Abomey-Calavi, Bénin
        </div>
      </div>
    </>
  );
}