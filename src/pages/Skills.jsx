import React, { useEffect, useRef, useState } from "react";

const useScrollFade = (delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
};

function SkillPill({ name, color }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        padding: "10px 16px", borderRadius: 6,
        background: hov ? color + "15" : color + "08",
        border: `1px solid ${hov ? color + "50" : color + "20"}`,
        transition: "all 0.2s ease", cursor: "default"
      }}
    >
      <span style={{
        width: 6, height: 6, borderRadius: "50%",
        background: color, display: "inline-block",
        boxShadow: `0 0 8px ${color}`
      }} />
      <span style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 500,
        fontSize: 13, color: "#e2e8f0"
      }}>{name}</span>
    </div>
  );
}

function CertCard({ cert, delay }) {
  const ref = useScrollFade(delay);
  return (
    <div ref={ref} className="glass" style={{
      padding: "24px", position: "relative", overflow: "hidden",
      transition: "all 0.3s ease"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.borderColor = `${cert.color}60`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
    }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)`
      }} />
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600,
        color: cert.color, letterSpacing: "0.15em", marginBottom: 12, textTransform: "uppercase"
      }}>{cert.tag}</div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: "#ffffff", marginBottom: 6, fontFamily: "'Space Grotesk', sans-serif" }}>
        {cert.title}
      </h3>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#94a3b8", marginBottom: 12 }}>
        {cert.institution}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#64748b", fontWeight: 500 }}>{cert.field}</span>
        <span style={{
          fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: cert.color,
          background: cert.color + "15", padding: "4px 10px", borderRadius: 4,
          border: `1px solid ${cert.color}30`
        }}>{cert.year}</span>
      </div>
    </div>
  );
}

function StatCard({ v, l, c, note, delay }) {
  const ref = useScrollFade(delay);
  return (
    <div ref={ref} className="glass" style={{
      padding: "24px 16px", textAlign: "center",
      position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${c}, transparent)`
      }} />
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 42, fontWeight: 800, color: c, lineHeight: 1, marginBottom: 12
      }}>{v}</div>
      <div style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 600, letterSpacing: "0.05em" }}>{l}</div>
      <div style={{ fontSize: 11, color: "#64748b", marginTop: 6, fontFamily: "'Inter', sans-serif" }}>{note}</div>
    </div>
  );
}

const SKILL_COLS = [
  {
    tag: "// ml_core", title: "ML & Deep Learning", accent: "#00d4ff",
    skills: ["Scikit-Learn · XGBoost", "PyTorch", "TensorFlow / Keras", "Time Series", "Computer Vision (YOLO, SAM)"],
  },
  {
    tag: "// llm_genai", title: "LLM & GenAI", accent: "#a855f7",
    skills: ["Fine-tuning (Llama 3)", "RAG · ChromaDB", "LangChain · LlamaIndex", "Prompt Engineering", "Groq · HuggingFace"],
  },
  {
    tag: "// mlops_deploy", title: "MLOps & Infra", accent: "#10b981",
    skills: ["Docker · Kubernetes", "MLflow", "FastAPI · REST APIs", "CI/CD (GitHub Actions)", "GCP · AWS · Vercel"],
  },
  {
    tag: "// data_eng", title: "Data & Analytics", accent: "#f59e0b",
    skills: ["Python · Pandas · NumPy", "SQL · PostgreSQL", "Plotly · Streamlit", "Airflow · Spark", "A/B Testing"],
  },
];

const CERTS = [
  { tag: "education", title: "Licence en Physique", institution: "Université d'Abomey-Calavi", field: "Physique théorique", year: "2025", color: "#6366f1" },
  { tag: "certification", title: "Machine Learning Specialization", institution: "Coursera", field: "Supervised & Unsupervised ML", year: "2024", color: "#00d4ff" },
  { tag: "certification", title: "Deep Learning Specialization", institution: "DeepLearning.AI", field: "CNN · RNN · NLP", year: "2024", color: "#a855f7" },
  { tag: "certification", title: "Data Science Professional", institution: "Coursera", field: "Advanced Analytics", year: "2025", color: "#10b981" },
  { tag: "certification", title: "Create LLMs Application", institution: "NVIDIA", field: "LLMs · Prompt Design", year: "2025", color: "#10b981" },
  { tag: "certification", title: "Build RAG Agentic", institution: "NVIDIA", field: "Agentic RAG · Vector Search", year: "2026", color: "#a855f7" },
];

const TOOLS = [
  "Python", "PyTorch", "TensorFlow", "Scikit-Learn",
  "LangChain", "LlamaIndex", "FastAPI", "Streamlit",
  "Docker", "MLflow", "Airflow", "PostgreSQL", "Apache Spark",
  "Git", "Linux", "GCP", "HuggingFace", "React / Next.js",
];

const STATS = [
  { v: "5+",   l: "SYSTÈMES IA LIVRÉS",     c: "#00d4ff", note: "En prod, pas en notebook" },
  { v: "90%",  l: "PRÉCISION MOYENNE",    c: "#a855f7", note: "Sur projets réels" },
  { v: "<48h", l: "DÉMARRAGE PROJET",        c: "#10b981", note: "Après premier contact" },
  { v: "4",    l: "DOMAINES MAÎTRISÉS",      c: "#f59e0b", note: "ML · LLM · MLOps · Data" },
];

export default function Skills() {
  const toolsRef = useScrollFade(0);
  const ctaRef   = useScrollFade(0);

  return (
    <main style={{ padding: "100px 24px", fontFamily: "'Inter', sans-serif", color: "#e2e8f0", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        
        {/* HERO */}
        <div style={{ marginBottom: 100, textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "8px 20px", borderRadius: "30px", marginBottom: 24,
            background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.3)",
            fontSize: 11, fontWeight: 600, color: "#00d4ff", letterSpacing: "0.08em"
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%", background: "#00d4ff",
              boxShadow: "0 0 10px #00d4ff", display: "inline-block"
            }} />
            STACK.SCAN() → PRÊT À LIVRER
          </div>

          <h1 style={{
            fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 800,
            lineHeight: 1.1, letterSpacing: "-0.02em",
            color: "#ffffff", marginBottom: 24, fontFamily: "'Space Grotesk', sans-serif"
          }}>
            L'arsenal qui livre.<br />
            <span className="gradient-text">Pas des slides.</span>
          </h1>

          <p style={{ maxWidth: 640, margin: "0 auto", color: "#94a3b8", fontSize: 17, lineHeight: 1.8 }}>
            Chaque outil listé ici a servi à{" "}
            <strong style={{ color: "#ffffff" }}>livrer un système en production</strong> —
            pas à remplir un CV. Du pipeline de données jusqu'à l'agent IA déployé sur le cloud,{" "}
            <strong style={{ color: "#00d4ff" }}>de bout en bout.</strong>
          </p>
        </div>

        {/* STACK */}
        <div style={{ marginBottom: 100 }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
            color: "#00d4ff", letterSpacing: "0.15em", marginBottom: 16, textTransform: "uppercase"
          }}>
            // stack.je_livre_avec[]
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800,
            color: "#ffffff", marginBottom: 40, letterSpacing: "-0.02em", fontFamily: "'Space Grotesk', sans-serif"
          }}>
            Ce avec quoi je livre
          </h2>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24
          }}>
            {SKILL_COLS.map((col, ci) => (
              <div key={ci} className="glass" style={{
                padding: "32px 24px", position: "relative", overflow: "hidden"
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, transparent, ${col.accent}, transparent)`
                }} />
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600,
                  color: col.accent, letterSpacing: "0.15em", marginBottom: 16, textTransform: "uppercase"
                }}>{col.tag}</div>
                <h3 style={{
                  fontSize: 20, fontWeight: 700, color: "#ffffff",
                  marginBottom: 24, fontFamily: "'Space Grotesk', sans-serif"
                }}>{col.title}</h3>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {col.skills.map((name, si) => (
                    <SkillPill key={si} name={name} color={col.accent} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TOOLS */}
        <div ref={toolsRef} style={{ marginBottom: 100 }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
            color: "#a855f7", letterSpacing: "0.15em", marginBottom: 16, textTransform: "uppercase"
          }}>
            // tools.daily_use[]
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800,
            color: "#ffffff", marginBottom: 32, letterSpacing: "-0.02em", fontFamily: "'Space Grotesk', sans-serif"
          }}>Outils quotidiens</h2>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {TOOLS.map((t, i) => (
              <span key={i} style={{
                padding: "8px 20px", borderRadius: 6,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
                fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500,
                color: "#94a3b8", cursor: "default", transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 212, 255, 0.4)";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.color = "#94a3b8";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              >{t}</span>
            ))}
          </div>
        </div>

        {/* CERTS */}
        <div style={{ marginBottom: 100 }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
            color: "#10b981", letterSpacing: "0.15em", marginBottom: 16, textTransform: "uppercase"
          }}>
            // education.certifications[]
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800,
            color: "#ffffff", marginBottom: 40, letterSpacing: "-0.02em", fontFamily: "'Space Grotesk', sans-serif"
          }}>Formation & Certifications</h2>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20
          }}>
            {CERTS.map((c, i) => <CertCard key={i} cert={c} delay={i * 0.1} />)}
          </div>
        </div>

        {/* STATS */}
        <div style={{ marginBottom: 100 }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
            color: "#f59e0b", letterSpacing: "0.15em", marginBottom: 24, textTransform: "uppercase"
          }}>
            // metrics.pourquoi_moi[]
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20
          }}>
            {STATS.map((s, i) => <StatCard key={i} {...s} delay={i * 0.1} />)}
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="glass" style={{
          textAlign: "center", padding: "64px 24px", position: "relative", overflow: "hidden"
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 3,
            background: "linear-gradient(90deg, transparent, #00d4ff, #ec4899, transparent)"
          }} />

          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "8px 20px", borderRadius: "30px", marginBottom: 32,
            background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)",
            fontSize: 12, fontWeight: 600, color: "#f59e0b", letterSpacing: "0.08em"
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%", background: "#f59e0b",
              boxShadow: "0 0 10px #f59e0b", display: "inline-block"
            }} />
            1 SLOT DISPONIBLE · DÉMARRAGE SOUS 48H
          </div>

          <h2 style={{
            fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800,
            color: "#ffffff", marginBottom: 16, letterSpacing: "-0.02em", fontFamily: "'Space Grotesk', sans-serif"
          }}>
            Vous avez le problème.<br />
            <span className="gradient-text">J'ai le système.</span>
          </h2>

          <p style={{ color: "#94a3b8", fontSize: 15, marginBottom: 40 }}>
            Réponse sous 24h · Devis gratuit · Zéro engagement
          </p>

          <div style={{
            display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 40
          }}>
            <a href="https://wa.me/+2290151344289" target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "14px 32px", borderRadius: "8px",
                background: "#00d4ff", color: "#0f172a",
                fontSize: 15, fontWeight: 600, textDecoration: "none",
                transition: "all 0.3s ease", boxShadow: "0 4px 20px rgba(0, 212, 255, 0.2)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.background = "#00b8e6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "#00d4ff";
              }}
            >
              Démarrer mon projet →
            </a>
            <a href="mailto:donaerickoulodji@gmail.com"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "14px 32px", borderRadius: "8px", background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.1)", color: "#f8fafc",
                fontSize: 15, fontWeight: 500, textDecoration: "none", transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
              }}
            >
              ✉ Poser une question
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}