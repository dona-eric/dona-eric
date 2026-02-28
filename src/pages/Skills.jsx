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
    const t = setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, 60);
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
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
};

// --------- Skill bar -----------------------
function SkillBar({ name, level, color, delay }) {
  const wrapRef = useRef(null);
  const barRef  = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const bar  = barRef.current;
    if (!wrap || !bar) return;
    wrap.style.opacity = "0";
    wrap.style.transition = `opacity 0.5s ease ${delay}s`;
    bar.style.width = "0%";
    bar.style.transition = `width 1.1s cubic-bezier(0.4,0,0.2,1) ${delay + 0.1}s`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        wrap.style.opacity = "1";
        bar.style.width = level + "%";
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    obs.observe(wrap);
    return () => obs.disconnect();
  }, [level, delay]);

  return (
    <div ref={wrapRef} style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#cbd5e1" }}>{name}</span>
        <span style={{ fontFamily: "monospace", fontSize: 11, color: color }}>{level}%</span>
      </div>
      <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
        <div ref={barRef} style={{
          height: "100%", borderRadius: 2,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          boxShadow: `0 0 8px ${color}55`
        }} />
      </div>
    </div>
  );
}

// ─── Cert card ────────────────────────────────────────────────────────────────
function CertCard({ cert, delay }) {
  const ref = useScrollFade(delay);
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: "24px 28px",
        background: hov ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hov ? cert.color + "50" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 10, transition: "all 0.3s ease",
        transform: hov ? "translateY(-3px)" : "none",
        position: "relative", overflow: "hidden"
      }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)`,
        opacity: hov ? 1 : 0.3, transition: "opacity 0.3s"
      }} />
      <div style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
        color: cert.color, letterSpacing: "0.12em", marginBottom: 10
      }}>{cert.tag}</div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9", marginBottom: 4 }}>{cert.title}</h3>
      <div style={{ fontFamily: "monospace", fontSize: 12, color: "#64748b", marginBottom: 6 }}>{cert.institution}</div>
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

// ─── Stat card ────────────────────────────────────────────────────────────────
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

// ─── Data ─────────────────────────────────────────────────────────────────────
const SKILL_COLS = [
  {
    tag: "// ml_core",
    title: "ML & Deep Learning",
    accent: "#00d4ff",
    skills: [
      { name: "Scikit-Learn · XGBoost · LightGBM", level: 90 },
      { name: "PyTorch",                            level: 60},
      { name: "TensorFlow / Keras",                 level: 78 },
      { name: "Time Series (Prophet, ARIMA)",        level: 85 },
      { name: "Computer Vision (YOLO, SAM)",         level: 80 },
    ]
  },
  {
    tag: "// llm_genai",
    title: "LLM & GenAI",
    accent: "#a78bfa",
    skills: [
      { name: "Fine-tuning (Llama 3, Mistral, Phi)", level: 84 },
      { name: "RAG · ChromaDB · Pinecone",           level: 86 },
      { name: "LangChain · LlamaIndex",              level: 87 },
      { name: "Prompt Engineering",                  level: 90 },
      { name: "Groq · HuggingFace Hub",              level: 85 },
    ]
  },
  {
    tag: "// mlops_deploy",
    title: "MLOps & Infra",
    accent: "#22c55e",
    skills: [
      { name: "Docker · Kubernetes",                 level: 76 },
      { name: "MLflow · Experiment Tracking",        level: 80 },
      { name: "FastAPI · REST APIs",                 level: 85 },
      { name: "CI/CD (GitHub Actions)",              level: 74 },
      { name: "GCP · AWS · Vercel",                  level: 72 },
    ]
  },
  {
    tag: "// data_eng",
    title: "Data & Analytics",
    accent: "#f59e0b",
    skills: [
      { name: "Python · Pandas · NumPy",             level: 92 },
      { name: "SQL · PostgreSQL",                    level: 82 },
      { name: "Plotly · Streamlit · Dash",           level: 88 },
      { name: "Airflow · Spark",                     level: 68 },
      { name: "Statistical Modeling · A/B Testing",  level: 83 },
    ]
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
    year: "Novembre 2025",
    color: "#22c55e",
  },

  {
    tag: "// certification",
    title: "Build RAG Agentic",
    institution: "NVIDIA",
    field: "",
    year: "Janvier 2026",
    color: "#a78bfa",
  }
];

const TOOLS = [
  "Python", "PyTorch", "TensorFlow", "Scikit-Learn",
  "LangChain", "LlamaIndex", "FastAPI", "Streamlit",
  "Docker", "MLflow", "Airflow", "PostgreSQL","Apache Spark",
  "Git", "Linux", "GCP", "HuggingFace", "React/ Nextjs"
];

const STATS = [
  { v: "5+",  l: "Modèles en prod",  c: "#00d4ff", note: "Live & monitored"   },
  { v: "90%", l: "Précision moyenne", c: "#a78bfa", note: "Across ML projects" },
  { v: "08+", l: "Étudiants accompagnés",  c: "#22c55e", note: "BJ · FR · Online"   },
  { v: "3",   l: "Pays d'impact",     c: "#f59e0b", note: "BJ · FR · CA"        },
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
        @keyframes gridFloat { 0%,100%{opacity:.03}50%{opacity:.07} }
        @keyframes pulseDot  { 0%,100%{box-shadow:0 0 6px #22c55e}50%{box-shadow:0 0 14px #22c55e} }
        .tool-pill:hover { border-color:rgba(0,212,255,0.3)!important; color:#00d4ff!important; }
        .cta-btn:hover   { background:linear-gradient(135deg,#0891b2,#4338ca)!important; transform:translateY(-2px); box-shadow:0 12px 32px rgba(0,212,255,0.25)!important; }
        .cta-btn { transition: all 0.25s ease; }
        a { text-decoration: none; }
        @media (max-width: 900px) {
          .skills-grid { grid-template-columns: 1fr 1fr !important; }
          .certs-grid  { grid-template-columns: 1fr !important; }
          .stats-grid  { grid-template-columns: repeat(2,1fr) !important; }
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
        {/* Grid bg */}
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

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1160, margin: "0 auto", padding: "80px 24px 120px" }}>

          {/* ══ HERO ══ */}
          <div ref={heroRef} style={{ marginBottom: 80 }}>
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
              skills.scan() → stack_loaded
            </div>

            <h1 style={{
              fontSize: "clamp(40px, 7vw, 78px)", fontWeight: 700,
              lineHeight: 1.05, letterSpacing: "-0.03em",
              color: "#f8fafc", marginBottom: 20
            }}>
              Expertise
              <br />
              <span style={{
                background: "linear-gradient(135deg, #00d4ff 0%, #6366f1 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>Technique.</span>
            </h1>

            <p style={{ maxWidth: 560, color: "#94a3b8", fontSize: 16, lineHeight: 1.85 }}>
              Stack d'un <strong style={{ color: "#e2e8f0" }}>AI Builder</strong> complet —
              de la donnée brute jusqu'au modèle en production,
              avec la rigueur d'un physicien et la praticité d'un ingénieur.
            </p>
          </div>

          {/* ══ SKILL BARS ══ */}
          <div style={{ marginBottom: 88 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              color: "#475569", letterSpacing: "0.15em", marginBottom: 8
            }}>
              <span style={{ color: "#00d4ff" }}>// </span>skills.proficiency[]
            </div>
            <h2 style={{
              fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 700,
              color: "#f1f5f9", marginBottom: 40, letterSpacing: "-0.02em"
            }}>Stack complet</h2>

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
                    marginBottom: 22, fontFamily: "'Space Grotesk', sans-serif"
                  }}>{col.title}</h3>
                  {col.skills.map((s, si) => (
                    <SkillBar
                      key={si} name={s.name} level={s.level}
                      color={col.accent} delay={ci * 0.08 + si * 0.06}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ══ TOOLS ══ */}
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
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                  color: "#94a3b8", letterSpacing: "0.04em",
                  transition: "all 0.2s", cursor: "default"
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* ══ CERTS ══ */}
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

          {/* ══ STATS ══ */}
          <div style={{ marginBottom: 88 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              color: "#475569", letterSpacing: "0.15em", marginBottom: 32
            }}>
              <span style={{ color: "#00d4ff" }}>// </span>metrics.key_numbers
            </div>
            <div className="stats-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16
            }}>
              {STATS.map((s, i) => <StatCard key={i} {...s} delay={i * 0.1} />)}
            </div>
          </div>

          {/* ══ CTA ══ */}
          <div ref={ctaRef} style={{
            textAlign: "center", padding: "56px 24px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16, position: "relative", overflow: "hidden"
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: "linear-gradient(90deg, transparent, #00d4ff, #6366f1, transparent)"
            }} />
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              color: "#475569", letterSpacing: "0.15em", marginBottom: 16
            }}>
              <span style={{ color: "#00d4ff" }}>// </span>skills.apply_to_your_project()
            </div>
            <h2 style={{
              fontSize: "clamp(22px, 3.5vw, 40px)", fontWeight: 700,
              color: "#f1f5f9", marginBottom: 12, letterSpacing: "-0.02em"
            }}>
              Ces compétences pour{" "}
              <span style={{
                background: "linear-gradient(135deg, #00d4ff, #6366f1)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>votre projet ?</span>
            </h2>
            <p style={{ color: "#64748b", fontFamily: "monospace", fontSize: 13, marginBottom: 36 }}>
              /* Discutons — réponse garantie sous 24h */
            </p>
            <a href="/contact" className="cta-btn" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "14px 32px", borderRadius: 6,
              background: "linear-gradient(135deg, #0e7490, #4338ca)",
              color: "#f0f9ff", fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14, fontWeight: 600, letterSpacing: "0.05em",
              boxShadow: "0 4px 20px rgba(0,212,255,0.12)"
            }}>
              initiate_contact() →
            </a>
            <div style={{
              marginTop: 28, display: "inline-flex", alignItems: "center", gap: 10,
              padding: "8px 18px", borderRadius: 4,
              background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)",
              fontFamily: "monospace", fontSize: 11
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: "50%", background: "#22c55e",
                display: "block", animation: "pulseDot 2s ease infinite"
              }} />
              <span style={{ color: "#22c55e" }}>Disponible · Freelance · Contract</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}