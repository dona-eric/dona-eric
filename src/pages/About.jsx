import React, { useEffect, useRef, useState } from "react";

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

const STATS = [
  { value: "5", suffix: "+", label: "MODÈLES EN PROD", note: "Live & monitored" },
  { value: "90", suffix: "%", label: "PRÉCISION MOYENNE", note: "Across ML projects" },
  { value: "3", suffix: "", label: "PAYS TOUCHÉS", note: "BJ · FR · CA" },
  { value: "6", suffix: "+", label: "PROJETS LIVRÉS", note: "Data → Deploy" },
];

const VALUES = [
  {
    tag: "01", color: "#00d4ff",
    title: "Livraison garantie",
    desc: "Pas de réunions infinies. Un cahier des charges, un délai, un système qui tourne. Je livre en semaines, pas en trimestres.",
    proof: "→ 12+ projets livrés · 0 POC abandonné"
  },
  {
    tag: "02", color: "#ec4899",
    title: "Production-first",
    desc: "Chaque ligne de code est pensée pour le cloud, le monitoring et le scaling dès le départ — pas retrofittée après coup.",
    proof: "→ Docker · MLflow · CI/CD · GCP / AWS"
  },
  {
    tag: "03", color: "#a855f7",
    title: "Interlocuteur unique",
    desc: "Data, ML, déploiement, agents IA — je gère l'ensemble de la chaîne. Vous parlez à une seule personne, vous recevez un système complet.",
    proof: "→ Du notebook au endpoint en production"
  },
];

const EXPERIENCES = [
  {
    role: "Data Scientist",
    type: "Partial time",
    company: "Sirius Club Association",
    location: "Presential",
    period: "04-06 Octobre 2025",
    accent: "#00d4ff",
    status: "done",
    tasks: [
      {tag: "Data Architecture", desc: "Collecte des données sur la qualité de l'air en Amérique du Nord, les données météorologiques et spatiales depuis les plateformes de la NASA"},
      {tag: "Pipeline ML", desc: "Construction de pipeline d'ingestion, traitement des données via FastAPI pour la modélisation prédictive"},
      {tag: "Modelisation", desc: "Développement de modèle XGBOOST avec 80% de précision sur 110 votes contre RandomForest avec 95% de précision et un risque d'overfitting"}
    ]
  },
  {
    role: "AI & Data Engineer",
    type: "Part-time",
    company: "Datum Africa",
    location: "Remote",
    period: "Sept 2025 – Présent",
    accent: "#ec4899",
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
    accent: "#a855f7",
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
    accent: "#10b981",
    status: "done",
    tasks: [
      { tag: "Forecasting", desc: "Direction d'un projet de prédiction du rendement du riz via Unsupervised Learning & Time Series." },
      { tag: "Instruction", desc: "Formation de 20 étudiants internationaux sur les concepts ML et l'implémentation Python." },
    ],
  },
];

function ExperienceCard({ exp, delay, isLast }) {
  const ref = useScrollFade(delay);
  return (
    <div ref={ref} style={{ display: "flex", gap: 24, position: "relative" }}>
      {!isLast && (
        <div style={{
          position: "absolute", left: 19, top: 44,
          width: 2, bottom: -24,
          background: `linear-gradient(180deg, ${exp.accent}60, transparent)`
        }} />
      )}

      <div style={{ flexShrink: 0, paddingTop: 4 }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          border: `2px solid ${exp.accent}50`,
          background: "rgba(255,255,255,0.02)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 0 16px ${exp.accent}30`
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: exp.accent,
            boxShadow: `0 0 10px ${exp.accent}`,
            animation: exp.status === "current" ? "pulseDot 2s ease infinite" : "none"
          }} />
        </div>
      </div>

      <div className="glass" style={{
        flex: 1, paddingBottom: 36,
        padding: "24px",
        position: "relative", overflow: "hidden",
        marginBottom: 32
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${exp.accent}, transparent)`
        }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#ffffff", fontFamily: "'Space Grotesk', sans-serif" }}>{exp.role}</h3>
              <span style={{
                padding: "4px 10px", borderRadius: 4, fontSize: 11,
                fontFamily: "'Inter', sans-serif", fontWeight: 600, color: exp.accent,
                background: exp.accent + "15", border: `1px solid ${exp.accent}30`,
                letterSpacing: "0.05em", textTransform: "uppercase"
              }}>{exp.type}</span>
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, color: exp.accent, marginBottom: 4 }}>
              {exp.company}
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>
              📍 {exp.location}
            </div>
          </div>
          <div style={{
            fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600,
            color: "#64748b", whiteSpace: "nowrap"
          }}>{exp.period}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {exp.tasks.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{
                padding: "4px 8px", borderRadius: 4, fontSize: 10,
                fontFamily: "'Inter', sans-serif", fontWeight: 600, color: exp.accent,
                background: exp.accent + "10", border: `1px solid ${exp.accent}20`,
                flexShrink: 0, marginTop: 2, letterSpacing: "0.06em", textTransform: "uppercase"
              }}>{t.tag}</span>
              <span style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6 }}>{t.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const bioRef = useScrollFade(0);

  return (
    <main style={{ padding: "100px 24px", fontFamily: "'Inter', sans-serif", color: "#e2e8f0", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        
        {/* Title */}
        <div style={{ marginBottom: 80, textAlign: "center" }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
            color: "#00d4ff", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16
          }}>
            // profile.load()
          </div>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 800,
            color: "#ffffff", letterSpacing: "-0.02em", marginBottom: 24
          }}>
            Dona Éric KOULODJI
          </h1>
          <p style={{ maxWidth: 700, margin: "0 auto", color: "#94a3b8", fontSize: 18, lineHeight: 1.8 }}>
            Je prends votre problème métier et je livre un{" "}
            <strong style={{ color: "#ffffff" }}>système IA opérationnel</strong> — agent autonome,
            modèle ML en prod, ou pipeline RAG clé-en-main. Formé en physique, je modélise
            rigoureusement avant de coder. Résultat :{" "}
            <strong style={{ color: "#00d4ff" }}>des solutions qui scalent, pas des POC qui dorment.</strong>
          </p>
        </div>

        {/* Stats */}
        <div style={{ marginBottom: 100 }}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20
          }}>
            {STATS.map((s, i) => {
              const ref = useScrollFade(i * 0.1);
              return (
                <div key={i} ref={ref} className="glass" style={{
                  padding: "32px 24px", textAlign: "center",
                  position: "relative", overflow: "hidden"
                }}>
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 2,
                    background: "linear-gradient(90deg, transparent, #00d4ff, transparent)"
                  }} />
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 48, fontWeight: 800, color: "#00d4ff", lineHeight: 1
                  }}>
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: 13, color: "#e2e8f0", marginTop: 12, fontWeight: 600, letterSpacing: "0.05em" }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 6, fontWeight: 500 }}>{s.note}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bio / Timeline */}
        <div ref={bioRef} style={{
          marginBottom: 100, display: "grid", gridTemplateColumns: "1fr", gap: 40
        }}>
          <div className="glass" style={{ padding: "40px", position: "relative" }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: "linear-gradient(90deg, transparent, #ec4899, transparent)"
            }} />
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600,
              color: "#ec4899", letterSpacing: "0.15em", marginBottom: 32, textTransform: "uppercase"
            }}>
              // formations.md
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {[
                { year: "Currently →", label: "Machine Learning Engineer", detail: "MLOps · LLM · Systèmes scalables" },
                { year: "Janv-Mai 2025", label: "Data Science Applied certifed", detail: "World Quant University (Data Science · Python · ML · Stats)" },
                { year: "Avr-Sept 2024", label: "Data Science Certified", detail: "Analyse de données • Python • Machine Learning • LLMs "},
                { year: "2020-2024", label: "Licence Physique Fondamentale", detail: "Université d'Abomey-Calavi • Base mathématique & modélisation" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 24, position: "relative" }}>
                  {i < 3 && (
                    <div style={{
                      position: "absolute", left: 136, top: 24, width: 2, height: "calc(100% + 8px)",
                      background: "rgba(236, 72, 153, 0.2)"
                    }} />
                  )}
                  <div style={{
                    width: 100, flexShrink: 0, fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 14, fontWeight: 600, color: "#ec4899", paddingTop: 2, textAlign: "right"
                  }}>{item.year}</div>
                  <div style={{
                    width: 12, height: 12, borderRadius: "50%", background: "#ec4899",
                    flexShrink: 0, marginTop: 6, boxShadow: "0 0 12px rgba(236, 72, 153, 0.6)"
                  }} />
                  <div>
                    <div style={{ fontWeight: 700, color: "#ffffff", fontSize: 16, marginBottom: 6, fontFamily: "'Space Grotesk', sans-serif" }}>{item.label}</div>
                    <div style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6 }}>{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experiences */}
        <div style={{ marginBottom: 120 }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
            color: "#a855f7", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16
          }}>
            // experience.professional[]
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800,
            color: "#ffffff", letterSpacing: "-0.02em", marginBottom: 48
          }}>
            Expériences Professionnelles
          </h2>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {EXPERIENCES.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} delay={i * 0.15} isLast={i === EXPERIENCES.length - 1} />
            ))}
          </div>
        </div>

        {/* Values */}
        <div style={{ marginBottom: 80 }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
            color: "#00d4ff", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16
          }}>
            // values.core
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800,
            color: "#ffffff", letterSpacing: "-0.02em", marginBottom: 48
          }}>
            Pourquoi travailler <span className="gradient-text">avec moi ?</span>
          </h2>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24
          }}>
            {VALUES.map((v, i) => {
              const ref = useScrollFade(i * 0.15);
              return (
                <div key={i} ref={ref} className="glass" style={{
                  padding: "40px 32px", position: "relative", overflow: "hidden",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = `rgba(255, 255, 255, 0.2)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--glass-border)";
                }}
                >
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 3,
                    background: `linear-gradient(90deg, transparent, ${v.color}, transparent)`
                  }} />
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: 48,
                    fontWeight: 800, color: v.color, opacity: 0.1,
                    position: "absolute", top: 16, right: 24
                  }}>{v.tag}</div>
                  <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: "#ffffff", marginBottom: 16
                  }}>{v.title}</h3>
                  <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.8, marginBottom: 24 }}>{v.desc}</p>
                  <div style={{
                    fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600,
                    color: v.color, letterSpacing: "0.05em", background: `${v.color}10`,
                    padding: "8px 12px", borderRadius: 6, display: "inline-block"
                  }}>{v.proof}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}