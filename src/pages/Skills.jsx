import React, { useEffect, useRef, useState } from "react";

// ─── Hooks ────────────────────────────────────────────────────────────────────
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

const useScrollFade = (delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
};

// ─── Skill Pill — remplace SkillBar, zéro % ────────────────────────────────
function SkillPill({ name, color }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "8px 14px", borderRadius: 4,
        background: hov ? color + "18" : color + "0a",
        border: `1px solid ${hov ? color + "55" : color + "25"}`,
        transition: "all 0.2s ease", cursor: "default"
      }}
    >
      <span style={{
        width: 5, height: 5, borderRadius: "50%",
        background: color, display: "inline-block",
        boxShadow: `0 0 5px ${color}`
      }} />
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12, color: "#cbd5e1"
      }}>{name}</span>
    </div>
  );
}

// ─── Cert Card ────────────────────────────────────────────────────────────────
function CertCard({ cert, delay }) {
  const ref = useScrollFade(delay);
  const [hov, setHov] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "24px 28px",
        background: hov ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hov ? cert.color + "50" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 10, transition: "all 0.3s ease",
        transform: hov ? "translateY(-3px)" : "none",
        position: "relative", overflow: "hidden"
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)`,
        opacity: hov ? 1 : 0.3, transition: "opacity 0.3s"
      }} />
      <div style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
        color: cert.color, letterSpacing: "0.12em", marginBottom: 10
      }}>{cert.tag}</div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9", marginBottom: 4 }}>
        {cert.title}
      </h3>
      <div style={{ fontFamily: "monospace", fontSize: 12, color: "#64748b", marginBottom: 6 }}>
        {cert.institution}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "monospace", fontSize: 11, color: "#475569" }}>{cert.field}</span>
        <span style={{
          fontFamily: "monospace", fontSize: 10, color: cert.color,
          background: cert.color + "15", padding: "2px 8px", borderRadius: 3,
          border: `1px solid ${cert.color}30`
        }}>{cert.year}</span>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ v, l, c, note, delay }) {
  const ref = useScrollFade(delay);
  return (
    <div ref={ref} style={{
      padding: "20px 16px", textAlign: "center",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 8, position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${c}, transparent)`
      }} />
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 36, fontWeight: 700, color: c, lineHeight: 1
      }}>{v}</div>
      <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 8, fontWeight: 500 }}>{l}</div>
      <div style={{ fontSize: 10, color: "#475569", marginTop: 4, fontFamily: "monospace" }}>{note}</div>
    </div>
  );
}

// ─── Données ──────────────────────────────────────────────────────────────────
const SKILL_COLS = [
  {
    tag: "// ml_core",
    title: "ML & Deep Learning",
    accent: "#00d4ff",
    skills: [
      "Scikit-Learn · XGBoost · LightGBM",
      "PyTorch",
      "TensorFlow / Keras",
      "Time Series (Prophet, ARIMA)",
      "Computer Vision (YOLO, SAM)",
    ],
  },
  {
    tag: "// llm_genai",
    title: "LLM & GenAI",
    accent: "#a78bfa",
    skills: [
      "Fine-tuning (Llama 3, Mistral, Phi)",
      "RAG · ChromaDB · Pinecone",
      "LangChain · LlamaIndex",
      "Prompt Engineering",
      "Groq · HuggingFace Hub",
    ],
  },
  {
    tag: "// mlops_deploy",
    title: "MLOps & Infra",
    accent: "#22c55e",
    skills: [
      "Docker · Kubernetes",
      "MLflow · Experiment Tracking",
      "FastAPI · REST APIs",
      "CI/CD (GitHub Actions)",
      "GCP · AWS · Vercel",
    ],
  },
  {
    tag: "// data_eng",
    title: "Data & Analytics",
    accent: "#f59e0b",
    skills: [
      "Python · Pandas · NumPy",
      "SQL · PostgreSQL",
      "Plotly · Streamlit · Dash",
      "Airflow · Spark",
      "Statistical Modeling · A/B Testing",
    ],
  },
];

const CERTS = [
  {
    tag: "// education",
    title: "Licence en Physique",
    institution: "Université d'Abomey-Calavi",
    field: "Physique théorique & Mathématiques",
    year: "2025",
    color: "#6366f1",
  },
  {
    tag: "// certification",
    title: "Machine Learning Specialization",
    institution: "DeepLearning.AI / Coursera",
    field: "Andrew Ng · Supervised & Unsupervised ML",
    year: "2024",
    color: "#00d4ff",
  },
  {
    tag: "// certification",
    title: "Deep Learning Specialization",
    institution: "DeepLearning.AI",
    field: "CNN · RNN · NLP · Deployment",
    year: "2024",
    color: "#a78bfa",
  },
  {
    tag: "// certification",
    title: "Data Science Professional",
    institution: "Coursera",
    field: "Advanced Analytics & Feature Engineering",
    year: "Décembre 2025",
    color: "#22c55e",
  },
  {
    tag: "// certification",
    title: "Create LLMs Application with Prompt Engineering",
    institution: "NVIDIA",
    field: "LLMs · Prompt Design · Production Apps",
    year: "Novembre 2025",
    color: "#22c55e",
  },
  {
    tag: "// certification",
    title: "Build RAG Agentic",
    institution: "NVIDIA",
    field: "Agentic RAG · Vector Search · Pipelines",
    year: "Janvier 2026",
    color: "#a78bfa",
  },
];

const TOOLS = [
  "Python", "PyTorch", "TensorFlow", "Scikit-Learn",
  "LangChain", "LlamaIndex", "FastAPI", "Streamlit",
  "Docker", "MLflow", "Airflow", "PostgreSQL", "Apache Spark",
  "Git", "Linux", "GCP", "HuggingFace", "React / Next.js",
];

// Stats repositionnées pour convaincre, pas juste informer
const STATS = [
  { v: "5+",   l: "Systèmes IA livrés",     c: "#00d4ff", note: "En prod, pas en notebook" },
  { v: "90%",  l: "Précision moyenne ML",    c: "#a78bfa", note: "Sur projets réels" },
  { v: "<48h", l: "Démarrage projet",        c: "#22c55e", note: "Après premier contact" },
  { v: "4",    l: "Domaines maîtrisés",      c: "#f59e0b", note: "ML · LLM · MLOps · Data" },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Skills() {
  const heroRef  = useFadeIn(0.1);
  const toolsRef = useScrollFade(0);
  const ctaRef   = useScrollFade(0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060a0f; }
        @keyframes gridFloat { 0%,100%{opacity:.03} 50%{opacity:.07} }
        @keyframes pulseDot  { 0%,100%{box-shadow:0 0 6px #22c55e} 50%{box-shadow:0 0 14px #22c55e} }
        .tool-pill:hover  { border-color:rgba(0,212,255,0.3)!important; color:#00d4ff!important; }
        .btn-primary:hover  { background:linear-gradient(135deg,#0891b2,#4338ca)!important; transform:translateY(-2px); box-shadow:0 12px 32px rgba(0,212,255,0.25)!important; }
        .btn-secondary:hover{ border-color:rgba(0,212,255,0.4)!important; color:#00d4ff!important; transform:translateY(-2px); }
        .btn-primary, .btn-secondary { transition: all 0.25s ease; }
        a { text-decoration: none; }

        @media (max-width: 900px) {
          .skills-grid { grid-template-columns: 1fr 1fr !important; }
          .certs-grid  { grid-template-columns: 1fr !important; }
          .stats-grid  { grid-template-columns: repeat(2,1fr) !important; }
          .cta-btns    { flex-direction: column !important; align-items: stretch !important; }
        }
        @media (max-width: 560px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{
        minHeight: "100vh", background: "#060a0f",
        color: "#e2e8f0", fontFamily: "'Space Grotesk', sans-serif",
        position: "relative", overflow: "hidden"
      }}>

        {/* ── Fond grille ── */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.035) 1px, transparent 1px)`,
          backgroundSize: "48px 48px", animation: "gridFloat 8s ease infinite"
        }} />
        <div style={{
          position: "fixed", top: "-5%", right: "-5%", width: 600, height: 600,
          background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0
        }} />
        <div style={{
          position: "fixed", bottom: "5%", left: "-10%", width: 500, height: 500,
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0
        }} />

        <div style={{
          position: "relative", zIndex: 1, maxWidth: 1160,
          margin: "0 auto", padding: "80px 24px 120px"
        }}>

          {/* ══════════════════════════════════════ */}
          {/* HERO                                   */}
          {/* ══════════════════════════════════════ */}
          <div ref={heroRef} style={{ marginBottom: 88 }}>

            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 16px", borderRadius: 4, marginBottom: 32,
              background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.25)",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
              color: "#00d4ff", letterSpacing: "0.05em"
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: "50%", background: "#22c55e",
                animation: "pulseDot 2s ease infinite", display: "inline-block"
              }} />
              stack.scan() → prêt_à_livrer
            </div>

            {/* Titre impactant */}
            <h1 style={{
              fontSize: "clamp(40px, 7vw, 78px)", fontWeight: 700,
              lineHeight: 1.05, letterSpacing: "-0.03em",
              color: "#f8fafc", marginBottom: 20
            }}>
              L'arsenal qui livre.<br />
              <span style={{
                background: "linear-gradient(135deg, #00d4ff 0%, #6366f1 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>Pas des slides.</span>
            </h1>

            <p style={{ maxWidth: 560, color: "#94a3b8", fontSize: 16, lineHeight: 1.85 }}>
              Chaque outil listé ici a servi à{" "}
              <strong style={{ color: "#e2e8f0" }}>livrer un système en production</strong> —
              pas à remplir un CV. Du pipeline de données jusqu'à l'agent IA déployé sur le cloud,{" "}
              <strong style={{ color: "#00d4ff" }}>de bout en bout.</strong>
            </p>
          </div>

          {/* ══════════════════════════════════════ */}
          {/* STACK — PILLS (plus de barres %)       */}
          {/* ══════════════════════════════════════ */}
          <div style={{ marginBottom: 88 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              color: "#475569", letterSpacing: "0.15em", marginBottom: 8
            }}>
              <span style={{ color: "#00d4ff" }}>// </span>stack.je_livre_avec[]
            </div>
            <h2 style={{
              fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 700,
              color: "#f1f5f9", marginBottom: 6, letterSpacing: "-0.02em"
            }}>
              Ce avec quoi je livre
            </h2>
            <p style={{
              fontFamily: "monospace", fontSize: 12, color: "#475569",
              marginBottom: 40, fontStyle: "italic"
            }}>
              /* Utilisé en production — pas en tutoriel */
            </p>

            <div className="skills-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20
            }}>
              {SKILL_COLS.map((col, ci) => (
                <div key={ci} style={{
                  padding: "28px 22px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 10, position: "relative"
                }}>
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 2,
                    background: `linear-gradient(90deg, transparent, ${col.accent}, transparent)`
                  }} />
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                    color: col.accent, letterSpacing: "0.14em", marginBottom: 10
                  }}>{col.tag}</div>
                  <h3 style={{
                    fontSize: 14, fontWeight: 700, color: "#f1f5f9",
                    marginBottom: 20, fontFamily: "'Space Grotesk', sans-serif"
                  }}>{col.title}</h3>

                  {/* Pills — remplace les barres avec % */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {col.skills.map((name, si) => (
                      <SkillPill key={si} name={name} color={col.accent} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ══════════════════════════════════════ */}
          {/* OUTILS QUOTIDIENS                      */}
          {/* ══════════════════════════════════════ */}
          <div ref={toolsRef} style={{ marginBottom: 88 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              color: "#475569", letterSpacing: "0.15em", marginBottom: 8
            }}>
              <span style={{ color: "#00d4ff" }}>// </span>tools.daily_use[]
            </div>
            <h2 style={{
              fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 700,
              color: "#f1f5f9", marginBottom: 28, letterSpacing: "-0.02em"
            }}>Outils quotidiens</h2>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {TOOLS.map((t, i) => (
                <span key={i} className="tool-pill" style={{
                  padding: "6px 16px", borderRadius: 4,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                  color: "#94a3b8", letterSpacing: "0.04em",
                  transition: "all 0.2s", cursor: "default"
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* ══════════════════════════════════════ */}
          {/* CERTIFICATIONS                         */}
          {/* ══════════════════════════════════════ */}
          <div style={{ marginBottom: 88 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              color: "#475569", letterSpacing: "0.15em", marginBottom: 8
            }}>
              <span style={{ color: "#00d4ff" }}>// </span>education.certifications[]
            </div>
            <h2 style={{
              fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 700,
              color: "#f1f5f9", marginBottom: 32, letterSpacing: "-0.02em"
            }}>Formation & Certifications</h2>

            <div className="certs-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16
            }}>
              {CERTS.map((c, i) => <CertCard key={i} cert={c} delay={i * 0.1} />)}
            </div>
          </div>

          {/* ══════════════════════════════════════ */}
          {/* STATS — orientées décision client      */}
          {/* ══════════════════════════════════════ */}
          <div style={{ marginBottom: 88 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              color: "#475569", letterSpacing: "0.15em", marginBottom: 32
            }}>
              <span style={{ color: "#00d4ff" }}>// </span>metrics.pourquoi_moi[]
            </div>
            <div className="stats-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16
            }}>
              {STATS.map((s, i) => <StatCard key={i} {...s} delay={i * 0.1} />)}
            </div>
          </div>

          {/* ══════════════════════════════════════ */}
          {/* CTA — direct, avec urgence             */}
          {/* ══════════════════════════════════════ */}
          <div ref={ctaRef} style={{
            textAlign: "center", padding: "64px 24px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16, position: "relative", overflow: "hidden"
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: "linear-gradient(90deg, transparent, #00d4ff, #6366f1, transparent)"
            }} />

            {/* Badge urgence */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 16px", borderRadius: 4, marginBottom: 28,
              background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              color: "#f59e0b", letterSpacing: "0.06em"
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%", background: "#f59e0b",
                display: "inline-block", animation: "pulseDot 2s ease infinite"
              }} />
              1 slot disponible · Démarrage sous 48h
            </div>

            <h2 style={{
              fontSize: "clamp(22px, 3.5vw, 42px)", fontWeight: 700,
              color: "#f1f5f9", marginBottom: 12, letterSpacing: "-0.02em"
            }}>
              Vous avez le problème.<br />
              <span style={{
                background: "linear-gradient(135deg, #00d4ff, #6366f1)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>J'ai le système.</span>
            </h2>

            <p style={{
              color: "#64748b", fontFamily: "monospace", fontSize: 13, marginBottom: 40
            }}>
              /* Réponse sous 24h · Devis gratuit · Zéro engagement */
            </p>

            {/* Deux boutons — action principale + alternative */}
            <div className="cta-btns" style={{
              display: "flex", gap: 14, justifyContent: "center",
              flexWrap: "wrap", marginBottom: 36
            }}>
              <a
                href="https://wa.me/+2290151344289"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "15px 32px", borderRadius: 6,
                  background: "linear-gradient(135deg, #0e7490, #4338ca)",
                  color: "#f0f9ff", fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14, fontWeight: 600, letterSpacing: "0.05em",
                  boxShadow: "0 4px 20px rgba(0,212,255,0.12)"
                }}
              >
                Démarrer mon projet →
              </a>
              <a
                href="mailto:donaerickoulodji@gmail.com"
                className="btn-secondary"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "15px 28px", borderRadius: 6,
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14, fontWeight: 500, letterSpacing: "0.05em"
                }}
              >
                ✉ Poser une question
              </a>
            </div>

            {/* Garanties inline */}
            <div style={{
              display: "flex", flexWrap: "wrap", gap: 20,
              justifyContent: "center"
            }}>
              {[
                "Réponse sous 24h",
                "Livraison en semaines",
                "Code documenté",
                "Remote · Freelance · Contract",
              ].map((g) => (
                <span key={g} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11, color: "#475569",
                  display: "flex", alignItems: "center", gap: 6
                }}>
                  <span style={{ color: "#22c55e", fontSize: 13 }}>✓</span> {g}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}