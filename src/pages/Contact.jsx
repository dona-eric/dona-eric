import React, { useState, useEffect, useRef } from "react";

// ─── Minimal animation helpers (no framer-motion dependency assumed) ─────────
const useFadeIn = (delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`;
    const t = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 50);
    return () => clearTimeout(t);
  }, [delay]);
  return ref;
};

// ─── Typewriter effect ───────────────────────────────────────────────────────
function Typewriter({ text, speed = 40 }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const id = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return (
    <span>
      {displayed}
      <span style={{ animation: "blink 1s step-end infinite", color: "#00d4ff" }}>|</span>
    </span>
  );
}

// ─── Terminal-style status badge ─────────────────────────────────────────────
function StatusBadge() {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "6px 16px", borderRadius: 4,
      background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.25)",
      fontSize: 12, fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      color: "#00d4ff", letterSpacing: "0.05em"
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: "50%", background: "#22c55e",
        boxShadow: "0 0 6px #22c55e",
        animation: "pulse 2s ease infinite"
      }} />
      AVAILABLE_FOR_HIRE :: STATUS=OPEN
    </div>
  );
}

// ─── Metric card ─────────────────────────────────────────────────────────────
function MetricCard({ label, value, sub, delay }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} style={{
      padding: "20px 24px",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 8, position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)"
      }} />
      <div style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 28,
        fontWeight: 700, color: "#00d4ff", lineHeight: 1
      }}>{value}</div>
      <div style={{ fontSize: 11, color: "#64748b", marginTop: 6, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

// ─── Input component ─────────────────────────────────────────────────────────
function Field({ label, name, type = "text", value, onChange, placeholder, multiline }) {
  const [focused, setFocused] = useState(false);
  const base = {
    width: "100%", padding: "14px 16px 14px 42px",
    background: focused ? "rgba(0,212,255,0.05)" : "rgba(255,255,255,0.03)",
    border: `1px solid ${focused ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.1)"}`,
    borderRadius: 6, color: "#e2e8f0",
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: 14,
    outline: "none", resize: "none", transition: "all 0.2s ease",
    boxSizing: "border-box"
  };
  return (
    <div style={{ position: "relative" }}>
      <label style={{
        display: "block", marginBottom: 8, fontSize: 11,
        fontFamily: "monospace", color: "#64748b",
        textTransform: "uppercase", letterSpacing: "0.12em"
      }}>
        <span style={{ color: "#00d4ff" }}>// </span>{label}
      </label>
      <div style={{ position: "relative" }}>
        <span style={{
          position: "absolute", left: 14, top: 15,
          fontSize: 13, color: focused ? "#00d4ff" : "#475569",
          fontFamily: "monospace", transition: "color 0.2s", pointerEvents: "none"
        }}>›</span>
        {multiline ? (
          <textarea
            name={name} value={value} onChange={onChange}
            placeholder={placeholder} rows={5}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={base}
          />
        ) : (
          <input
            name={name} type={type} value={value} onChange={onChange}
            placeholder={placeholder}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={base}
          />
        )}
      </div>
    </div>
  );
}

// ─── Main contact page ───────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null); // null | sending | success | error | missing | invalid

  const heroRef = useFadeIn(0.1);
  const formRef = useFadeIn(0.3);
  const infoRef = useFadeIn(0.4);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setStatus("missing"); return; }
    if (!validateEmail(form.email)) { setStatus("invalid"); return; }
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xovkejww", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { Accept: "application/json", "Content-Type": "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus(null), 6000);
      } else setStatus("error");
    } catch { setStatus("error"); }
  };

  const contactInfo = [
    { label: "location", value: "Abomey-Calavi, Bénin 🌍", icon: "📍" },
    { label: "email", value: "donaerickoulodji@gmail.com", href: "mailto:donaerickoulodji@gmail.com", icon: "✉" },
    { label: "phone", value: "+229 01 41 73 02 40", href: "tel:+2290141730240", icon: "☎" },
    { label: "response_time", value: "< 24h guaranteed", icon: "⚡" },
    { label: "availability", value: "Mon – Sun · All TZ", icon: "🕐" },
    { label: "languages", value: "English · Français", icon: "🌐" },
  ];

  const expertise = ["Data Science", "Machine Learning", "Deep Learning", "MLOps", "Statistical Modeling", "Data Viz"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060a0f; }
        ::placeholder { color: #334155; font-family: 'JetBrains Mono', monospace; font-size: 13px; }
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 6px #22c55e; } 50% { box-shadow: 0 0 14px #22c55e; } }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes gridFloat {
          0%, 100% { opacity: 0.03; } 50% { opacity: 0.07; }
        }
        .submit-btn:hover { background: linear-gradient(135deg, #0891b2, #0369a1) !important; transform: translateY(-1px); box-shadow: 0 8px 32px rgba(0,212,255,0.25) !important; }
        .submit-btn:active { transform: translateY(0); }
        .info-item:hover .info-value { color: #00d4ff !important; }
        a { text-decoration: none; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "#060a0f",
        color: "#e2e8f0",
        fontFamily: "'Space Grotesk', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* ── Grid background ── */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          animation: "gridFloat 8s ease infinite"
        }} />

        {/* ── Glow blobs ── */}
        <div style={{
          position: "fixed", top: "-10%", right: "-5%",
          width: 600, height: 600,
          background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0
        }} />
        <div style={{
          position: "fixed", bottom: "10%", left: "-10%",
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0
        }} />

        {/* ── Content ── */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "80px 24px 120px" }}>

          {/* ── HERO ── */}
          <div ref={heroRef} style={{ marginBottom: 72 }}>
            <StatusBadge />

            <div style={{ marginTop: 32, marginBottom: 16 }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                color: "#475569", letterSpacing: "0.15em", textTransform: "uppercase",
                marginBottom: 16
              }}>
                contact.init() → awaiting_connection
              </div>
              <h1 style={{
                fontSize: "clamp(40px, 7vw, 76px)",
                fontWeight: 700, lineHeight: 1.05,
                color: "#f8fafc", letterSpacing: "-0.03em"
              }}>
                <Typewriter text="Let's Build" speed={55} />
                <br />
                <span style={{
                  background: "linear-gradient(135deg, #00d4ff 0%, #6366f1 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                }}>Something Intelligent.</span>
              </h1>
            </div>

            <p style={{
              maxWidth: 580, color: "#94a3b8", fontSize: 17, lineHeight: 1.75,
              marginBottom: 36
            }}>
              Data Scientist & ML Engineer in training — Physics BSc backbone,
              driven by rigorous modeling and scalable AI systems.
              Open to freelance missions, contracts, and research collaborations.
            </p>

            {/* Expertise tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {expertise.map((tag) => (
                <span key={tag} style={{
                  padding: "5px 14px", borderRadius: 3,
                  background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)",
                  fontSize: 12, fontFamily: "monospace", color: "#818cf8",
                  letterSpacing: "0.05em"
                }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* ── METRICS ── */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12, marginBottom: 72
          }}>
            <MetricCard label="Projects Delivered" value="12+" sub="Diverse domains" delay={0.2} />
            <MetricCard label="Response Time" value="<24h" sub="Guaranteed" delay={0.3} />
            <MetricCard label="Stack Depth" value="Full" sub="Data → Deploy" delay={0.4} />
            <MetricCard label="Open to" value="Remote" sub="All time zones" delay={0.5} />
          </div>

          {/* ── FORM + INFO ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: 32, alignItems: "start"
          }}
            className="contact-grid"
          >

            {/* ── FORM ── */}
            <div ref={formRef} style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12, padding: "40px 40px",
              position: "relative", overflow: "hidden"
            }}>
              {/* Top accent line */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: "linear-gradient(90deg, transparent, #00d4ff, #6366f1, transparent)"
              }} />

              {/* Form header */}
              <div style={{ marginBottom: 32 }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                  color: "#00d4ff", letterSpacing: "0.15em", marginBottom: 8
                }}>
                  POST /api/contact → HTTP 200
                </div>
                <h2 style={{ fontSize: 24, fontWeight: 600, color: "#f1f5f9" }}>
                  Initiate Collaboration
                </h2>
                <p style={{ color: "#64748b", fontSize: 14, marginTop: 6, fontFamily: "monospace" }}>
                  /* All fields required unless marked optional */
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <Field label="your_name" name="name" value={form.name} onChange={handleChange} placeholder="Doe John" />
                  <Field label="email_address" name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@company.com" />
                </div>
                <Field label="subject — optional" name="subject" value={form.subject} onChange={handleChange} placeholder="ML model audit / Data pipeline / Consulting..." />
                <Field label="message" name="message" value={form.message} onChange={handleChange}
                  placeholder={`# Describe your project\n# What data do you have?\n# Expected outcomes?`}
                  multiline />

                {/* Status messages */}
                {status === "missing" && (
                  <div style={{ padding: "12px 16px", borderRadius: 6, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", fontFamily: "monospace", fontSize: 13, color: "#f87171" }}>
                    ✗ ValidationError: all required fields must be populated
                  </div>
                )}
                {status === "invalid" && (
                  <div style={{ padding: "12px 16px", borderRadius: 6, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", fontFamily: "monospace", fontSize: 13, color: "#f87171" }}>
                    ✗ InvalidEmail: format must match /\S+@\S+\.\S+/
                  </div>
                )}
                {status === "success" && (
                  <div style={{ padding: "16px 20px", borderRadius: 6, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)" }}>
                    <div style={{ fontFamily: "monospace", fontSize: 13, color: "#4ade80", marginBottom: 4 }}>
                      ✓ 200 OK — Message queued successfully
                    </div>
                    <div style={{ fontSize: 12, color: "#86efac", fontFamily: "monospace" }}>
                      Expected response within 24h. Thank you!
                    </div>
                  </div>
                )}
                {status === "error" && (
                  <div style={{ padding: "12px 16px", borderRadius: 6, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", fontFamily: "monospace", fontSize: 13, color: "#f87171" }}>
                    ✗ 500 ServerError — Try again or email directly
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="submit-btn"
                  style={{
                    padding: "16px 28px",
                    background: "linear-gradient(135deg, #0e7490, #4338ca)",
                    border: "none", borderRadius: 6,
                    color: "#f0f9ff", fontSize: 14, fontWeight: 600,
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: "0.05em", cursor: status === "sending" ? "not-allowed" : "pointer",
                    opacity: status === "sending" ? 0.7 : 1,
                    transition: "all 0.25s ease",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    boxShadow: "0 4px 20px rgba(0,212,255,0.12)"
                  }}
                >
                  {status === "sending" ? (
                    <>
                      <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span>
                      Transmitting...
                    </>
                  ) : (
                    <>
                      send_message() →
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* ── INFO PANEL ── */}
            <div ref={infoRef} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Contact data */}
              <div style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12, padding: "32px 28px", position: "relative", overflow: "hidden"
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: "linear-gradient(90deg, transparent, #6366f1, transparent)"
                }} />
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                  color: "#6366f1", letterSpacing: "0.15em", marginBottom: 20
                }}>
                  contact.json
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {contactInfo.map((item) => (
                    <div key={item.label} className="info-item" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 16 }}>
                      <div style={{ fontSize: 11, fontFamily: "monospace", color: "#475569", marginBottom: 4, letterSpacing: "0.1em" }}>
                        <span style={{ color: "#6366f1" }}>&quot;</span>{item.label}<span style={{ color: "#6366f1" }}>&quot;</span>:
                      </div>
                      {item.href ? (
                        <a href={item.href} style={{ color: "#94a3b8", fontSize: 13, fontFamily: "monospace" }} className="info-value">
                          {item.icon} {item.value}
                        </a>
                      ) : (
                        <div className="info-value" style={{ color: "#94a3b8", fontSize: 13, fontFamily: "monospace", transition: "color 0.2s" }}>
                          {item.icon} {item.value}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mission statement */}
              <div style={{
                background: "rgba(0,212,255,0.04)",
                border: "1px solid rgba(0,212,255,0.15)",
                borderRadius: 12, padding: "24px 28px"
              }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                  color: "#00d4ff", letterSpacing: "0.15em", marginBottom: 14
                }}>
                  // mission.md
                </div>
                <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.8, fontFamily: "monospace" }}>
                  Physics-trained precision applied to data. From exploratory analysis to production ML systems — I bridge the gap between raw data and intelligent decisions.
                </p>
                <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["#Freelance", "#Contract", "#Research", "#Remote"].map((t) => (
                    <span key={t} style={{
                      fontSize: 11, fontFamily: "monospace", color: "#00d4ff",
                      background: "rgba(0,212,255,0.08)", padding: "3px 10px",
                      borderRadius: 3, border: "1px solid rgba(0,212,255,0.2)"
                    }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12, padding: "20px 28px",
                display: "flex", gap: 12
              }}>
                {[
                  { label: "GitHub", href: "https://github.com/dona-eric", short: "GH" },
                  { label: "LinkedIn", href: "https://linkedin.com/in/dona-erick", short: "LI" },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                    flex: 1, padding: "12px", borderRadius: 6, textAlign: "center",
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
                    fontFamily: "monospace", fontSize: 12, color: "#64748b",
                    transition: "all 0.2s ease"
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)"; e.currentTarget.style.color = "#00d4ff"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#64748b"; }}
                  >
                    <div style={{ fontSize: 18, marginBottom: 4 }}>{s.short === "GH" ? "⬡" : "◈"}</div>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Responsive styles injected */}
      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}