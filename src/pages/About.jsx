import { desc } from "framer-motion/client";
import React, { useEffect, useRef, useState } from "react";

// ─── Fade-in hook ─────────────────────────────────────────────────────────────
const useFadeIn = (delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`;
    const t = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 60);
    return () => clearTimeout(t);
  }, [delay]);
  return ref;
};

// ─── Intersection observer fade ───────────────────────────────────────────────
const useScrollFade = (delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
    el.style.transition = `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
};

// ─── Counter animation ────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num = parseFloat(target);
        const isFloat = target.includes(".");
        const duration = 1400;
        const steps = 50;
        let step = 0;
        const id = setInterval(() => {
          step++;
          const progress = step / steps;
          const ease = 1 - Math.pow(1 - progress, 3);
          const current = isFloat
            ? (num * ease).toFixed(1)
            : Math.round(num * ease);
          setVal(current);
          if (step >= steps) clearInterval(id);
        }, duration / steps);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── Skill bar ─────────────────────────────────────────────────────────────────
function SkillBar({ name, level, category, delay }) {
  const ref = useScrollFade(delay);
  const barRef = useRef(null);
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    el.style.width = "0%";
    el.style.transition = "width 1.2s cubic-bezier(0.4,0,0.2,1)";
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => { el.style.width = level + "%"; }, delay * 1000 + 200);
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [level, delay]);

  const categoryColor = {
    ml: "#00d4ff",
    ops: "#22c55e",
    data: "#a78bfa",
    llm: "#f59e0b",
  }[category] || "#00d4ff";

  return (
    <div ref={ref} style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: categoryColor, display: "inline-block",
            boxShadow: `0 0 6px ${categoryColor}`
          }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#cbd5e1" }}>{name}</span>
        </div>
        <span style={{ fontFamily: "monospace", fontSize: 11, color: categoryColor }}>{level}%</span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
        <div ref={barRef} style={{
          height: "100%",
          background: `linear-gradient(90deg, ${categoryColor}88, ${categoryColor})`,
          borderRadius: 2,
          boxShadow: `0 0 8px ${categoryColor}55`
        }} />
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SKILLS = [
  { name: "Fine-tuning LLM (Llama 3, Mistral, Phi-3)", level: 50, category: "llm" },
  { name: "RAG & Vector Databases (Chroma, Pinecone)", level: 60, category: "llm" },
  { name: "Computer Vision (YOLO, SAM)", level: 40, category: "ml" },
  { name: "Time Series & Predictive Modeling", level: 60, category: "ml" },
  { name: "Prompt Engineering & Agentic Systems", level: 80, category: "llm" },
  { name: "MLOps (Docker, MLflow, FastAPI, CI/CD)", level: 79, category: "ops" },
  { name: "Data Pipelines (Airflow, Spark, Kubernetes)", level: 65, category: "ops" },
  { name: "Cloud Deployment (GCP, AWS, Vercel)", level: 45, category: "ops" },
  { name: "LangChain · LlamaIndex · Hugging Face", level: 86, category: "llm" },
];

const STATS = [
  { value: "4", suffix: "+", label: "Modèles en production", note: "Live & monitored" },
  { value: "90", suffix: "%", label: "Précision moyenne", note: "Across ML projects" },
  { value: "3", suffix: "", label: "Pays touchés", note: "BJ · FR · CA" },
  { value: "12", suffix: "+", label: "Projets livrés", note: "Data → Deploy" },
];

const VALUES = [
  {
    tag: "01",
    title: "Excellence technique",
    desc: "Je ne livre que des systèmes robustes, monitorés, et qui tiennent en production — pas des POC oubliés dans un notebook.",
    color: "#00d4ff",
  },
  {
    tag: "02",
    title: "Impact réel",
    desc: "Des solutions utilisées tous les jours par de vraies personnes. Chaque modèle doit répondre à un problème métier concret.",
    color: "#a78bfa",
  },
  {
    tag: "03",
    title: "Partage & Écosystème",
    desc: "Formations, mentorat, open-source : je contribue activement à construire l'écosystème IA africain.",
    color: "#22c55e",
  },
];

const LEGEND = [
  { color: "#00d4ff", label: "Machine Learning" },
  { color: "#f59e0b", label: "LLM / GenAI" },
  { color: "#22c55e", label: "MLOps" },
  { color: "#a78bfa", label: "Data" },
];

const EXPERIENCES = [
  {
    role: "Data Scientist",
    type: "Partial time",
    company: "Sirius Club Association",
    location: "Presential",
    period: "04-06 Octobre 2025",
    accent: "#00d4fa",
    status: "done",
    tasks: [
    {tag: "Data Architecture", desc: "Collecte des données sur la qualité de l'air en Amérique du Nord, les données météorologiques et spatiales depuis les plateformes de la NASA"},
      {tag: "Pipeline ML", desc: "Construction de pipeline d'ingestion, traitement des données via FastAPI pour la modélisation prédictive"},
      {tag: "Modelisation", desc: "Développement de modèle XGBOOST avec 80% de précision sur 110 votes contre RandomForest avec 95% de précision et un risque d'overfitting avec ce dernier pour prédire la qualité d'air et déterminer l'indice de la qualité d'air que nous consommons."}
    ]
  },

  {
    role: "AI & Data Engineer",
    type: "Part-time",
    company: "Datum Africa",
    location: "Remote",
    period: "Sept 2025 – Présent",
    accent: "#00d4ff",
    status: "current",
    tasks: [
      { tag: "Architecture", desc: "Conception de modèles de base de données robustes (UML) pour des systèmes de données scalables." },
      { tag: "Pipelines", desc: "Construction de pipelines de collecte pour langues africaines (Igbo, Hausa) via PySpark & FastAPI." },
    ],
  },
  {
    role: "Data Developer",
    type: "Volunteering",
    company: "Centre National d'Études Spatiales — CNES",
    location: "Remote · France",
    period: "Juil 2025 – Oct 2025",
    accent: "#a78bfa",
    status: "done",
    tasks: [
      { tag: "Automation", desc: "Pipelines automatisés garantissant la qualité de datasets satellites à grande échelle (> 10 Go)." },
      { tag: "Optimization", desc: "Traitement et optimisation de données spatiales pour applications machine learning." },
    ],
  },
  {
    role: "Presenter & Technical Mentor",
    type: "Speaker",
    company: "DSA 2025 Summer School",
    location: "Nigeria",
    period: "2025",
    accent: "#22c55e",
    status: "done",
    tasks: [
      { tag: "Forecasting", desc: "Direction d'un projet de prédiction du rendement du riz via Unsupervised Learning & Time Series." },
      { tag: "Instruction", desc: "Formation de 20 étudiants internationaux sur les concepts ML et l'implémentation Python." },
    ],
  },
];

// ─── Experience Card ──────────────────────────────────────────────────────────
function ExperienceCard({ exp, delay, isLast }) {
  const ref = useScrollFade(delay);
  return (
    <div ref={ref} style={{ display: "flex", gap: 24, position: "relative" }}>
      {/* Timeline vertical line */}
      {!isLast && (
        <div style={{
          position: "absolute", left: 19, top: 44,
          width: 1, bottom: -24,
          background: `linear-gradient(180deg, ${exp.accent}40, transparent)`
        }} />
      )}

      {/* Timeline dot */}
      <div style={{ flexShrink: 0, paddingTop: 4 }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          border: `2px solid ${exp.accent}50`,
          background: exp.accent + "10",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 0 16px ${exp.accent}20`
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: exp.accent,
            boxShadow: `0 0 8px ${exp.accent}`,
            animation: exp.status === "current" ? "pulseDot 2s ease infinite" : "none"
          }} />
        </div>
      </div>

      {/* Content */}
      <div style={{
        flex: 1, paddingBottom: 36,
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${exp.accent}25`,
        borderRadius: 10, padding: "22px 24px",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${exp.accent}, transparent)`
        }} />

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9" }}>{exp.role}</h3>
              <span style={{
                padding: "2px 8px", borderRadius: 3, fontSize: 10,
                fontFamily: "monospace", color: exp.accent,
                background: exp.accent + "15", border: `1px solid ${exp.accent}30`,
                letterSpacing: "0.08em"
              }}>{exp.type}</span>
              {exp.status === "current" && (
                <span style={{
                  padding: "2px 8px", borderRadius: 3, fontSize: 10,
                  fontFamily: "monospace", color: "#22c55e",
                  background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)",
                  display: "flex", alignItems: "center", gap: 4
                }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulseDot 2s ease infinite" }} />
                  En cours
                </span>
              )}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: exp.accent, marginBottom: 2 }}>
              {exp.company}
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: "#475569" }}>
              📍 {exp.location}
            </div>
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            color: "#475569", whiteSpace: "nowrap"
          }}>{exp.period}</div>
        </div>

        {/* Tasks */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {exp.tasks.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{
                padding: "2px 8px", borderRadius: 3, fontSize: 10,
                fontFamily: "monospace", color: exp.accent,
                background: exp.accent + "0d", border: `1px solid ${exp.accent}20`,
                flexShrink: 0, marginTop: 1, letterSpacing: "0.06em"
              }}>{t.tag}</span>
              <span style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65 }}>{t.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function About() {
  const heroRef = useFadeIn(0.1);
  const bioRef = useScrollFade(0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060a0f; }
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes gridFloat { 0%,100% { opacity:0.03; } 50% { opacity:0.07; } }
        @keyframes floatY { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-12px); } }
        @keyframes pulseDot { 0%,100% { box-shadow:0 0 6px #22c55e; } 50% { box-shadow:0 0 14px #22c55e; } }
        .value-card:hover { border-color: rgba(255,255,255,0.15) !important; transform: translateY(-4px); }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,212,255,0.25) !important; }
        .cta-btn:active { transform: translateY(0); }
        a { text-decoration: none; color: inherit; }
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{
        minHeight: "100vh", background: "#060a0f",
        color: "#e2e8f0", fontFamily: "'Space Grotesk', sans-serif",
        position: "relative", overflow: "hidden"
      }}>

        {/* ── Grid bg ── */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px", animation: "gridFloat 8s ease infinite"
        }} />

        {/* ── Glow blobs ── */}
        <div style={{
          position: "fixed", top: "-10%", right: "-5%",
          width: 600, height: 600,
          background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0
        }} />
        <div style={{
          position: "fixed", bottom: "5%", left: "-10%",
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "80px 24px 120px" }}>

          {/* ══════════════ HERO ══════════════ */}
          <div ref={heroRef} style={{ marginBottom: 100 }}>

            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 16px", borderRadius: 4,
              background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.25)",
              fontSize: 12, fontFamily: "'JetBrains Mono', monospace",
              color: "#00d4ff", letterSpacing: "0.05em", marginBottom: 32
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: "50%", background: "#22c55e",
                boxShadow: "0 0 6px #22c55e", animation: "pulseDot 2s ease infinite"
              }} />
              profile.load() → DONA_ERIC_KOULODJI
            </div>

            {/* Name */}
            <h1 style={{
              fontSize: "clamp(44px, 8vw, 88px)", fontWeight: 700,
              lineHeight: 1.05, letterSpacing: "-0.03em", color: "#f8fafc",
              marginBottom: 16
            }}>
              Dona Éric<br />
              <span style={{
                background: "linear-gradient(135deg, #00d4ff 0%, #6366f1 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>KOULODJI</span>
            </h1>

            {/* Role */}
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 15,
              color: "#64748b", marginBottom: 28
            }}>
              <span style={{ color: "#6366f1" }}>role</span>
              {" :: "}
              <span style={{ color: "#00d4ff" }}>Data Scientist</span>
              {" → "}
              <span style={{ color: "#a78bfa" }}>ML Engineer</span>
              {" "}
              <span style={{ color: "#475569" }}>// Physics BSc backbone</span>
            </div>

            {/* Divider */}
            <div style={{
              width: 80, height: 2,
              background: "linear-gradient(90deg, #00d4ff, #6366f1)",
              marginBottom: 28, borderRadius: 2
            }} />

            <p style={{
              maxWidth: 620, color: "#94a3b8", fontSize: 17,
              lineHeight: 1.8, marginBottom: 36
            }}>
              Je transforme des <strong style={{ color: "#e2e8f0" }}>données brutes</strong> en{" "}
              <strong style={{ color: "#e2e8f0" }}>décisions intelligentes</strong>. Formé en physique,
              reconverti en data, passionné par les systèmes ML qui tiennent en production —
              pas juste dans un Jupyter Notebook.
            </p>

            {/* Availability tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["#Freelance", "#Contract", "#Remote", "#BéninBased", "#OpenToWork"].map(tag => (
                <span key={tag} style={{
                  padding: "5px 14px", borderRadius: 3,
                  background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)",
                  fontSize: 12, fontFamily: "monospace", color: "#00d4ff", letterSpacing: "0.05em"
                }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* ══════════════ STATS ══════════════ */}
          <div style={{ marginBottom: 100 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              color: "#475569", letterSpacing: "0.15em", textTransform: "uppercase",
              marginBottom: 24
            }}>
              <span style={{ color: "#00d4ff" }}>// </span>metrics.json
            </div>

            <div className="stats-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16
            }}>
              {STATS.map((s, i) => {
                const ref = useScrollFade(i * 0.1);
                return (
                  <div key={i} ref={ref} style={{
                    padding: "24px 20px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 8, position: "relative", overflow: "hidden",
                    textAlign: "center"
                  }}>
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: 2,
                      background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)"
                    }} />
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 40, fontWeight: 700, color: "#00d4ff", lineHeight: 1
                    }}>
                      <AnimatedCounter target={s.value} suffix={s.suffix} />
                    </div>
                    <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 8, fontWeight: 500 }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: "#475569", marginTop: 4, fontFamily: "monospace" }}>{s.note}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ══════════════ BIO / PARCOURS ══════════════ */}
          <div ref={bioRef} style={{
            marginBottom: 100,
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32,
            alignItems: "start"
          }} className="skills-grid">

            {/* Left: story */}
            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12, padding: "36px 32px", position: "relative"
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: "linear-gradient(90deg, transparent, #6366f1, transparent)"
              }} />
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                color: "#6366f1", letterSpacing: "0.15em", marginBottom: 24
              }}>
                // carreer_formations.md
              </div>

              {[
                { year: "Currently →", label: "Machine Learning Engineer", detail: "MLOps · LLM · Systèmes scalables · Ingénieur cible" },
                { year: "Janv-Mai 2025", label: "Data Science Applied certifed at World Quant University", detail: "Data Science · Python · ML · Stats • Computer Vision" },
                { year: "Avr-Sept 2024", label: "Data Science Certified", detail: "Analyse de données • Python • Machine Learning • LLMs "},
                { year: "2020-2024", label: "Licence Physique Fondamentale", detail: "Université d'Abomey-Calavi • Base mathématique & modélisation" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", gap: 20, marginBottom: 28, position: "relative"
                }}>
                  {/* Timeline line */}
                  {i < 3 && (
                    <div style={{
                      position: "absolute", left: 32, top: 28,
                      width: 1, height: "calc(100% + 4px)",
                      background: "rgba(0,212,255,0.15)"
                    }} />
                  )}
                  <div style={{
                    width: 64, flexShrink: 0,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11, color: "#00d4ff", paddingTop: 4, textAlign: "right"
                  }}>{item.year}</div>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: "#00d4ff", flexShrink: 0, marginTop: 6,
                    boxShadow: "0 0 8px rgba(0,212,255,0.6)"
                  }} />
                  <div>
                    <div style={{ fontWeight: 600, color: "#f1f5f9", fontSize: 14, marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 12, color: "#64748b" }}>{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: stack */}
            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12, padding: "36px 32px", position: "relative"
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: "linear-gradient(90deg, transparent, #00d4ff, transparent)"
              }} />
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                color: "#00d4ff", letterSpacing: "0.15em", marginBottom: 20
              }}>
                // stack.expertise[]
              </div>

              {/* Legend */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
                {LEGEND.map(l => (
                  <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: l.color, display: "inline-block" }} />
                    <span style={{ fontSize: 11, fontFamily: "monospace", color: "#64748b" }}>{l.label}</span>
                  </div>
                ))}
              </div>

              {SKILLS.map((s, i) => (
                <SkillBar key={i} name={s.name} level={s.level} category={s.category} delay={i * 0.06} />
              ))}
            </div>
          </div>

          {/* ══════════════ EXPERIENCES ══════════════ */}
          <div style={{ marginBottom: 100 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              color: "#475569", letterSpacing: "0.15em", marginBottom: 8
            }}>
              <span style={{ color: "#00d4ff" }}>// </span>experience.professional[]
            </div>
            <h2 style={{
              fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700,
              color: "#f1f5f9", marginBottom: 12, letterSpacing: "-0.02em"
            }}>
              Expériences Professionnelles
            </h2>
            <p style={{ fontFamily: "monospace", fontSize: 13, color: "#475569", marginBottom: 48 }}>
              /* Postes · Missions internationales · Impact terrain */
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {EXPERIENCES.map((exp, i) => (
                <ExperienceCard
                  key={i}
                  exp={exp}
                  delay={i * 0.12}
                  isLast={i === EXPERIENCES.length - 1}
                />
              ))}
            </div>
          </div>

          {/* ══════════════ VALUES ══════════════ */}
          <div style={{ marginBottom: 100 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              color: "#475569", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8
            }}>
              <span style={{ color: "#00d4ff" }}>// </span>values.core
            </div>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700,
              color: "#f1f5f9", marginBottom: 48, letterSpacing: "-0.02em"
            }}>
              Ce qui me drive
            </h2>

            <div className="values-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20
            }}>
              {VALUES.map((v, i) => {
                const ref = useScrollFade(i * 0.15);
                return (
                  <div key={i} ref={ref} className="value-card" style={{
                    padding: "32px 28px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 12, transition: "all 0.3s ease",
                    position: "relative", overflow: "hidden"
                  }}>
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: 2,
                      background: `linear-gradient(90deg, transparent, ${v.color}, transparent)`
                    }} />
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 32,
                      fontWeight: 700, color: v.color, opacity: 0.15,
                      position: "absolute", top: 16, right: 20
                    }}>{v.tag}</div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                      color: v.color, letterSpacing: "0.12em", marginBottom: 16
                    }}>
                      [{v.tag}]
                    </div>
                    <h3 style={{
                      fontSize: 18, fontWeight: 600, color: "#f1f5f9", marginBottom: 14
                    }}>{v.title}</h3>
                    <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.75 }}>{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ══════════════ CTA ══════════════ */}
          <div style={{
            textAlign: "center", padding: "72px 24px",
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
              color: "#475569", letterSpacing: "0.15em", marginBottom: 20
            }}>
              <span style={{ color: "#00d4ff" }}>// </span>ready_to_collaborate()
            </div>
            <h2 style={{
              fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 700,
              color: "#f1f5f9", marginBottom: 16, letterSpacing: "-0.02em"
            }}>
              Prêt à travailler avec quelqu'un<br />
              qui <span style={{
                background: "linear-gradient(135deg, #00d4ff, #6366f1)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>livre vraiment</span> ?
            </h2>
            <p style={{ color: "#64748b", fontSize: 15, fontFamily: "monospace", marginBottom: 40 }}>
              /* Pas de POC. Des solutions en production. */
            </p>
            <a href="/contact" className="cta-btn" style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              padding: "16px 36px",
              background: "linear-gradient(135deg, #0e7490, #4338ca)",
              borderRadius: 6, color: "#f0f9ff",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14, fontWeight: 600, letterSpacing: "0.05em",
              transition: "all 0.25s ease",
              boxShadow: "0 4px 20px rgba(0,212,255,0.12)"
            }}>
              initiate_contact() →
            </a>
          </div>

        </div>
      </div>
    </>
  );
}