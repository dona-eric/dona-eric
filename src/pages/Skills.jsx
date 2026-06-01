import React, { useEffect, useRef, useState } from "react";
import "../styles/Skills.css";

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
      className="skills-pill"
      style={{
        background: hov ? color + "15" : color + "08",
        border: `1px solid ${hov ? color + "50" : color + "20"}`,
      }}
    >
      <span className="skills-pill-dot" style={{
        background: color,
        boxShadow: `0 0 8px ${color}`
      }} />
      <span className="skills-pill-name">{name}</span>
    </div>
  );
}

function CertCard({ cert, delay }) {
  const ref = useScrollFade(delay);
  return (
    <div ref={ref} className="glass skills-cert-card"
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.borderColor = `${cert.color}60`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
    }}
    >
      <div className="skills-cert-gradient" style={{
        background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)`
      }} />
      <div className="skills-cert-tag" style={{ color: cert.color }}>{cert.tag}</div>
      <h3 className="skills-cert-title">{cert.title}</h3>
      <div className="skills-cert-inst">{cert.institution}</div>
      <div className="skills-cert-footer">
        <span className="skills-cert-field">{cert.field}</span>
        <span className="skills-cert-year" style={{
          color: cert.color, background: cert.color + "15", border: `1px solid ${cert.color}30`
        }}>{cert.year}</span>
      </div>
    </div>
  );
}

function StatCard({ v, l, c, note, delay }) {
  const ref = useScrollFade(delay);
  return (
    <div ref={ref} className="glass skills-stat-card">
      <div className="skills-stat-gradient" style={{
        background: `linear-gradient(90deg, transparent, ${c}, transparent)`
      }} />
      <div className="skills-stat-value" style={{ color: c }}>{v}</div>
      <div className="skills-stat-label">{l}</div>
      <div className="skills-stat-note">{note}</div>
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
    <main className="skills-main">
      <div className="skills-container">
        
        {/* HERO */}
        <div className="skills-hero">
          <div className="skills-badge">
            <span className="skills-badge-dot" />
            STACK.SCAN() → PRÊT À LIVRER
          </div>

          <h1 className="skills-title">
            L'arsenal qui livre.<br />
            <span className="gradient-text">Pas des slides.</span>
          </h1>

          <p className="skills-description">
            Chaque outil listé ici a servi à{" "}
            <strong>livrer un système en production</strong> —
            pas à remplir un CV. Du pipeline de données jusqu'à l'agent IA déployé sur le cloud,{" "}
            <strong className="accent">de bout en bout.</strong>
          </p>
        </div>

        {/* STACK */}
        <div className="skills-section">
          <div className="skills-subtitle skills-subtitle-blue">
            // stack.je_livre_avec[]
          </div>
          <h2 className="skills-section-title">
            Ce avec quoi je livre
          </h2>

          <div className="skills-stack-grid">
            {SKILL_COLS.map((col, ci) => (
              <div key={ci} className="glass skills-col-card">
                <div className="skills-col-gradient" style={{
                  background: `linear-gradient(90deg, transparent, ${col.accent}, transparent)`
                }} />
                <div className="skills-col-tag" style={{ color: col.accent }}>{col.tag}</div>
                <h3 className="skills-col-title">{col.title}</h3>

                <div className="skills-pill-list">
                  {col.skills.map((name, si) => (
                    <SkillPill key={si} name={name} color={col.accent} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TOOLS */}
        <div ref={toolsRef} className="skills-section">
          <div className="skills-subtitle skills-subtitle-purple">
            // tools.daily_use[]
          </div>
          <h2 className="skills-section-title skills-section-title-tools">Outils quotidiens</h2>

          <div className="skills-tools-list">
            {TOOLS.map((t, i) => (
              <span key={i} className="skills-tool-tag">{t}</span>
            ))}
          </div>
        </div>

        {/* CERTS */}
        <div className="skills-section">
          <div className="skills-subtitle skills-subtitle-green">
            // education.certifications[]
          </div>
          <h2 className="skills-section-title">Formation & Certifications</h2>

          <div className="skills-certs-grid">
            {CERTS.map((c, i) => <CertCard key={i} cert={c} delay={i * 0.1} />)}
          </div>
        </div>

        {/* STATS */}
        <div className="skills-section">
          <div className="skills-subtitle skills-subtitle-orange">
            // metrics.pourquoi_moi[]
          </div>
          <div className="skills-stats-grid">
            {STATS.map((s, i) => <StatCard key={i} {...s} delay={i * 0.1} />)}
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="glass skills-cta">
          <div className="skills-cta-gradient" />

          <div className="skills-cta-badge">
            <span className="skills-cta-badge-dot" />
            1 SLOT DISPONIBLE · DÉMARRAGE SOUS 48H
          </div>

          <h2 className="skills-cta-title">
            Vous avez le problème.<br />
            <span className="gradient-text">J'ai le système.</span>
          </h2>

          <p className="skills-cta-desc">
            Réponse sous 24h · Devis gratuit · Zéro engagement
          </p>

          <div className="skills-cta-actions">
            <a href="https://wa.me/+2290151344289" target="_blank" rel="noopener noreferrer"
              className="skills-cta-primary"
            >
              Démarrer mon projet →
            </a>
            <a href="mailto:donaerickoulodji@gmail.com"
              className="skills-cta-secondary"
            >
              ✉ Poser une question
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}