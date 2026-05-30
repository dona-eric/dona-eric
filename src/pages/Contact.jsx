import React, { useState, useEffect, useRef } from "react";

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

function SocialBtn({ href, label, icon, color="#00d4ff" }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      aria-label={label}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "8px 16px", borderRadius: 6, textDecoration: "none",
        background: hov ? `${color}15` : "rgba(255,255,255,0.03)",
        border: `1px solid ${hov ? `${color}50` : "rgba(255,255,255,0.1)"}`,
        color: hov ? color : "#94a3b8", fontFamily: "'Inter', sans-serif",
        fontSize: 13, fontWeight: 500, transition: "all 0.2s ease", whiteSpace: "nowrap"
      }}>
      <span style={{ fontSize: 16, lineHeight: 1 }}>{icon}</span>
      <span>{label}</span>
    </a>
  );
}

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

function MetricCard({ label, value, sub, delay }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className="glass" style={{
      padding: "24px 20px", position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)"
      }} />
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif", fontSize: 36,
        fontWeight: 800, color: "#00d4ff", lineHeight: 1, marginBottom: 8
      }}>{value}</div>
      <div style={{ fontSize: 12, color: "#e2e8f0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: "#64748b", marginTop: 4, fontFamily: "'Inter', sans-serif" }}>{sub}</div>}
    </div>
  );
}

function Field({ label, name, type = "text", value, onChange, placeholder, multiline }) {
  const [focused, setFocused] = useState(false);
  const base = {
    width: "100%", padding: "14px 16px 14px 42px",
    background: focused ? "rgba(0,212,255,0.05)" : "rgba(255,255,255,0.02)",
    border: `1px solid ${focused ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.1)"}`,
    borderRadius: 8, color: "#ffffff",
    fontFamily: "'Inter', sans-serif", fontSize: 15,
    outline: "none", resize: "none", transition: "all 0.2s ease", boxSizing: "border-box"
  };
  return (
    <div style={{ position: "relative" }}>
      <label style={{
        display: "block", marginBottom: 8, fontSize: 12,
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#94a3b8",
        textTransform: "uppercase", letterSpacing: "0.1em"
      }}>
        <span style={{ color: "#00d4ff" }}>// </span>{label}
      </label>
      <div style={{ position: "relative" }}>
        <span style={{
          position: "absolute", left: 16, top: 15,
          fontSize: 14, color: focused ? "#00d4ff" : "#64748b",
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

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null); 

  const heroRef = useFadeIn(0.1);
  const formRef = useFadeIn(0.3);
  const infoRef = useFadeIn(0.4);
  const socialRef = useFadeIn(0.5); 
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
  ];

  const expertise = ["Data Science", "Machine Learning", "Deep Learning", "MLOps", "Statistical Modeling", "Data Viz"];

  return (
    <>
      <style>{`
        ::placeholder { color: #475569; font-family: 'Inter', sans-serif; font-size: 14px; }
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .info-value-link:hover { color: #00d4ff !important; }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <main style={{ padding: "100px 24px", fontFamily: "'Inter', sans-serif", color: "#e2e8f0", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* HERO */}
          <div ref={heroRef} style={{ marginBottom: 80, textAlign: "center" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "8px 20px", borderRadius: "30px", marginBottom: 24,
              background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.3)",
              fontSize: 12, fontWeight: 600, color: "#00d4ff", letterSpacing: "0.08em"
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%", background: "#22c55e",
                boxShadow: "0 0 10px #22c55e", display: "inline-block", animation: "pulse 2s ease infinite"
              }} />
              AVAILABLE_FOR_HIRE :: STATUS=OPEN
            </div>

            <div style={{ marginBottom: 24 }}>
              <h1 style={{
                fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 800, lineHeight: 1.1,
                color: "#ffffff", letterSpacing: "-0.02em", fontFamily: "'Space Grotesk', sans-serif"
              }}>
                <Typewriter text="Construisons quelque chose" speed={40} />
                <br />
                <span className="gradient-text">d'intelligent.</span>
              </h1>
            </div>

            <p style={{
              maxWidth: 640, margin: "0 auto", color: "#94a3b8", fontSize: 17, lineHeight: 1.8, marginBottom: 40
            }}>
              Data Scientist & ML Engineer. Formé en physique, je modélise rigoureusement avant de coder. 
              Disponible pour des missions freelance, contrats et collaborations de recherche.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
              {expertise.map((tag) => (
                <span key={tag} style={{
                  padding: "6px 16px", borderRadius: 4, background: "rgba(168, 85, 247, 0.1)", border: "1px solid rgba(168, 85, 247, 0.25)",
                  fontSize: 13, fontFamily: "'Inter', sans-serif", fontWeight: 500, color: "#a855f7"
                }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* METRICS */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20, marginBottom: 100
          }}>
            <MetricCard label="Projets Livrés" value="08+" sub="Domaines variés" delay={0.2} />
            <MetricCard label="Temps de réponse" value="<24h" sub="Garanti" delay={0.3} />
            <MetricCard label="Expertise" value="Full" sub="Data → Deploy" delay={0.4} />
            <MetricCard label="Disponibilité" value="Remote" sub="Tous fuseaux horaires" delay={0.5} />
          </div>

          {/* FORM + INFO */}
          <div className="contact-grid" style={{
            display: "grid", gridTemplateColumns: "1fr 400px", gap: 40, alignItems: "start"
          }}>
            
            {/* FORM */}
            <div ref={formRef} className="glass" style={{ padding: "48px 40px", position: "relative" }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: "linear-gradient(90deg, transparent, #00d4ff, #ec4899, transparent)"
              }} />

              <div style={{ marginBottom: 40 }}>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
                  color: "#00d4ff", letterSpacing: "0.15em", marginBottom: 12, textTransform: "uppercase"
                }}>
                  POST /api/contact → HTTP 200
                </div>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: "#ffffff", fontFamily: "'Space Grotesk', sans-serif", marginBottom: 8 }}>
                  Démarrer la collaboration
                </h2>
                <p style={{ color: "#64748b", fontSize: 14 }}>
                  Tous les champs sont requis sauf mention contraire.
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
                  <Field label="Votre Nom" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" />
                  <Field label="Adresse Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@entreprise.com" />
                </div>
                <Field label="Sujet (Optionnel)" name="subject" value={form.subject} onChange={handleChange} placeholder="Audit de modèle ML / Pipeline Data..." />
                <Field label="Message" name="message" value={form.message} onChange={handleChange}
                  placeholder="Décrivez votre projet. Quelles données avez-vous ? Quels sont les résultats attendus ?" multiline />

                {/* Status Messages */}
                {status === "missing" && (
                  <div style={{ padding: "16px", borderRadius: 8, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", fontSize: 14, fontWeight: 500 }}>
                    ✗ Erreur de validation : tous les champs requis doivent être remplis.
                  </div>
                )}
                {status === "invalid" && (
                  <div style={{ padding: "16px", borderRadius: 8, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", fontSize: 14, fontWeight: 500 }}>
                    ✗ Erreur d'email : le format est invalide.
                  </div>
                )}
                {status === "success" && (
                  <div style={{ padding: "20px", borderRadius: 8, background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
                    <div style={{ color: "#34d399", fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
                      ✓ 200 OK — Message envoyé avec succès
                    </div>
                    <div style={{ color: "#a7f3d0", fontSize: 13 }}>
                      Je vous réponds sous 24h. Merci !
                    </div>
                  </div>
                )}
                {status === "error" && (
                  <div style={{ padding: "16px", borderRadius: 8, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", fontSize: 14, fontWeight: 500 }}>
                    ✗ Erreur Serveur 500 — Veuillez réessayer ou m'envoyer un email directement.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    padding: "18px 32px", background: "linear-gradient(135deg, #00d4ff, #4338ca)",
                    border: "none", borderRadius: 8, color: "#ffffff", fontSize: 16, fontWeight: 600,
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    opacity: status === "sending" ? 0.7 : 1, transition: "all 0.3s ease",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
                    boxShadow: "0 4px 20px rgba(0,212,255,0.2)", marginTop: 8
                  }}
                  onMouseEnter={(e) => { if (status !== "sending") e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { if (status !== "sending") e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  {status === "sending" ? (
                    <>
                      <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span>
                      Transmission...
                    </>
                  ) : (
                    <>Envoyer le message →</>
                  )}
                </button>
              </form>
            </div>

            {/* INFO PANEL */}
            <div ref={infoRef} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              <div className="glass" style={{ padding: "32px", position: "relative" }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: "linear-gradient(90deg, transparent, #a855f7, transparent)"
                }} />
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
                  color: "#a855f7", letterSpacing: "0.15em", marginBottom: 24, textTransform: "uppercase"
                }}>
                  contact.json
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {contactInfo.map((item) => (
                    <div key={item.label} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 16 }}>
                      <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {item.label}
                      </div>
                      {item.href ? (
                        <a href={item.href} className="info-value-link" style={{ color: "#e2e8f0", fontSize: 15, fontWeight: 500, textDecoration: "none", transition: "color 0.2s ease" }}>
                          {item.icon} <span style={{ marginLeft: 8 }}>{item.value}</span>
                        </a>
                      ) : (
                        <div style={{ color: "#e2e8f0", fontSize: 15, fontWeight: 500 }}>
                          {item.icon} <span style={{ marginLeft: 8 }}>{item.value}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                background: "rgba(0, 212, 255, 0.05)", border: "1px solid rgba(0, 212, 255, 0.15)",
                borderRadius: 12, padding: "32px"
              }}>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
                  color: "#00d4ff", letterSpacing: "0.15em", marginBottom: 16, textTransform: "uppercase"
                }}>
                  // mission.md
                </div>
                <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.8, marginBottom: 20 }}>
                  Une rigueur issue de la physique appliquée aux données. De l'analyse exploratoire aux systèmes ML en production — je comble le fossé entre la donnée brute et les décisions intelligentes.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["#Freelance", "#Contract", "#Research", "#Remote"].map((t) => (
                    <span key={t} style={{
                      fontSize: 12, fontWeight: 600, color: "#00d4ff",
                      background: "rgba(0,212,255,0.1)", padding: "4px 12px",
                      borderRadius: 4, border: "1px solid rgba(0,212,255,0.2)"
                    }}>{t}</span>
                  ))}
                </div>
              </div>

              <div ref={socialRef} style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <SocialBtn href="https://github.com/dona-eric" label="GitHub" color="#00d4ff"
                  icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>}
                />
                <SocialBtn href="https://linkedin.com/in/dona-erick" label="LinkedIn" color="#a855f7"
                  icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>}
                />
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}