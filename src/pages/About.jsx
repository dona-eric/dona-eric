import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import Desktop from "../components/os/Desktop";
import "../styles/About.css";

import { useScrollFade } from "../hooks/useAnimations";

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
  { value: "5", suffix: "+", label: "SYSTÈMES EN PROD", note: "Déployés & Monitorés" },
  { value: "06", suffix: "+", label: "ÉLÈVES FORMÉS", note: "MLAcademy Cohorte #1" },
  { value: "3", suffix: "", label: "PAYS TOUCHÉS", note: "Bénin · Burkina-Faso · Sénégal" },
  { value: "100", suffix: "%", label: "FOCUS PRODUCTION", note: "Zéro POC abandonné" },
];

const VALUES = [
  {
    tag: "01", color: "var(--neon-cyan)",
    title: "Livraison garantie",
    desc: "Pas de réunions infinies. Un cahier des charges, un délai, un système qui tourne. Je livre en semaines, pas en trimestres.",
    proof: "→ 06+ projets livrés · 0 POC abandonné"
  },
  {
    tag: "02", color: "var(--neon-pink)",
    title: "Production-first",
    desc: "Chaque ligne de code est pensée pour le cloud, le monitoring et le scaling dès le départ — pas retrofittée après coup.",
    proof: "→ Docker · MLflow · CI/CD · GCP / AWS"
  },
  {
    tag: "03", color: "var(--neon-purple)",
    title: "Interlocuteur unique",
    desc: "Data, ML, déploiement, agents IA — je gère l'ensemble de la chaîne. Vous parlez à une seule personne, vous recevez un système complet.",
    proof: "→ Du notebook au endpoint en production"
  },
];

const EXPERIENCES = [
  {
    role: "Data Scientist",
    type: "Temps partiel",
    company: "Sirius Club Association",
    location: "Présentiel",
    period: "04-06 Octobre 2025",
    accent: "var(--neon-cyan)",
    status: "done",
    tasks: [
      {tag: "Architecture Data", desc: "Collecte des données sur la qualité de l'air en Amérique du Nord, les données météorologiques et spatiales depuis les plateformes de la NASA"},
      {tag: "Pipeline ML", desc: "Construction de pipeline d'ingestion, traitement des données via FastAPI pour la modélisation prédictive"},
      {tag: "Modélisation", desc: "Développement de modèle XGBOOST avec 80% de précision sur 110 votes contre RandomForest avec 95% de précision et un risque d'overfitting"}
    ]
  },
  {
    role: "AI & Data Engineer",
    type: "Temps partiel",
    company: "Datum Africa",
    location: "À distance",
    period: "Sept 2025 – Présent",
    accent: "var(--neon-pink)",
    status: "current",
    tasks: [
      { tag: "Architecture", desc: "Conception de modèles de base de données robustes (UML) pour des systèmes de données scalables." },
      { tag: "Pipelines", desc: "Construction de pipelines de collecte pour langues africaines (Igbo, Hausa) via PySpark & FastAPI." },
    ],
  },
  {
    role: "Data Developer",
    type: "Bénévole",
    company: "Centre National d'Études Spatiales — CNES",
    location: "À distance · France",
    period: "Juil 2025 – Oct 2025",
    accent: "var(--neon-purple)",
    status: "done",
    tasks: [
      { tag: "Automatisation", desc: "Pipelines automatisés garantissant la qualité de datasets satellites à grande échelle (> 10 Go)." },
      { tag: "Optimisation", desc: "Traitement et optimisation de données spatiales pour applications machine learning." },
    ],
  },
  {
    role: "Intervenant & Mentor Technique",
    type: "Intervenant",
    company: "DSA 2025 Summer School",
    location: "Nigeria",
    period: "2025",
    accent: "var(--neon-green)",
    status: "done",
    tasks: [
      { tag: "Prédiction", desc: "Direction d'un projet de prédiction du rendement du riz via Unsupervised Learning & Time Series." },
      { tag: "Formation", desc: "Formation de 20 étudiants internationaux sur les concepts ML et l'implémentation Python." },
    ],
  },
];

function ExperienceCard({ exp, delay, isLast }) {
  const ref = useScrollFade(delay);
  return (
    <div ref={ref} className="about-exp-item">
      {!isLast && (
        <div className="about-exp-line" style={{ background: `linear-gradient(180deg, ${exp.accent}40, transparent)` }} />
      )}

      <div className="about-exp-icon-container">
        <div className="about-exp-icon-border" style={{ border: `1px solid ${exp.accent}30`, background: "rgba(255,255,255,0.01)" }}>
          <div className="about-exp-dot" style={{
            background: exp.accent,
            boxShadow: `0 0 8px ${exp.accent}`,
            animation: exp.status === "current" ? "pulseDot 2s ease infinite" : "none"
          }} />
        </div>
      </div>

      <div className="glass about-exp-card" style={{ borderLeft: `3px solid ${exp.accent}` }}>
        <div className="about-exp-header">
          <div>
            <div className="about-exp-role-row">
              <h3 className="about-exp-role">{exp.role}</h3>
              <span className="about-exp-type" style={{
                color: exp.accent, background: exp.accent + "10", border: `1px solid ${exp.accent}20`
              }}>{exp.type}</span>
            </div>
            <div className="about-exp-company" style={{ color: exp.accent }}>
              {exp.company}
            </div>
            <div className="about-exp-location">
              📍 {exp.location}
            </div>
          </div>
          <div className="about-exp-period">{exp.period}</div>
        </div>

        <div className="about-exp-tasks">
          {exp.tasks.map((t, i) => (
            <div key={i} className="about-exp-task">
              <span className="about-exp-task-tag" style={{
                color: exp.accent, background: exp.accent + "10", border: `1px solid ${exp.accent}20`
              }}>{t.tag}</span>
              <span className="about-exp-task-desc">{t.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ValueCard({ v, delay }) {
  const ref = useScrollFade(delay);
  return (
    <div ref={ref} className="glass about-value-card" style={{ borderLeft: `3px solid ${v.color}` }}>
      <div className="about-value-tag" style={{ color: v.color }}>{v.tag}</div>
      <h3 className="about-value-title">{v.title}</h3>
      <p className="about-value-desc">{v.desc}</p>
      <div className="about-value-proof" style={{ color: v.color, background: `${v.color}10` }}>{v.proof}
      </div>
    </div>
  );
}

export default function About() {
  const bioRef = useScrollFade(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (password.trim() === "sudo apt-get update money" || password.trim() === "sudo apt get update money") {
      setIsUnlocked(true);
    } else {
      // Optional: Add a shake effect or error message here
      setPassword("");
    }
  };

  if (!isUnlocked) {
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    
    // Format date in French (e.g., Mardi 25 Août)
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const dateStr = time.toLocaleDateString('fr-FR', options);
    const formattedDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

    return (
      <div className="lock-screen-container">
        <Helmet>
          <title>Verrouillé — Dona Eric</title>
        </Helmet>
        
        <div className="lock-screen-time">
          <h1>{hours}:{minutes}</h1>
          <p>{formattedDate}</p>
        </div>

        <div className="lock-screen-user">
          <div className="nav-logo-monogram" style={{ width: "80px", height: "80px", margin: "0 auto 16px", border: "2px solid rgba(255, 255, 255, 0.4)" }}>
            <span className="nav-logo-letter" style={{ fontSize: "36px" }}>D</span>
            <span className="nav-logo-dot" style={{ width: "10px", height: "10px", bottom: "14px", right: "16px" }} />
          </div>
          <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: "600", marginBottom: "24px" }}>dona.ia</h2>
        </div>

        <form onSubmit={handleUnlock} className="lock-screen-form">
          <div className="lock-input-wrapper">
            <input 
              type="text" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrer la commande..."
              autoFocus
            />
            <button type="submit">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
          
          <div className="lock-screen-hint">
            <span className="hint-icon">i</span>
            Astuce : entrez 'sudo apt-get update money' pour continuer
          </div>
          <p className="lock-screen-prompt">Appuyez sur Entrée ou cliquez pour accéder</p>
        </form>
      </div>
    );
  }

  return <Desktop />;
}