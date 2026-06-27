import React, { useEffect, useRef, useState } from "react";
import TagCloud from "../components/TagCloud";
import GenerativeBg from "../components/GenerativeBg";
import "../styles/About.css";

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

export default function About() {
  const bioRef = useScrollFade(0);

  return (
    <main className="about-main">
      <GenerativeBg density={25} />
      <div className="about-container" style={{ position: "relative", zIndex: 2 }}>
        
        {/* Title */}
        <div className="about-title-container">
          <div className="about-subtitle">
            // profile.load()
          </div>
          <h1 className="about-title">
            Dona Éric KOULODJI
          </h1>
          <p className="about-description">
            Je prends votre problème métier et je livre un{" "}
            <strong>système IA opérationnel</strong> — agent autonome,
            modèle ML en prod, ou pipeline RAG clé-en-main. Formé en physique, je modélise
            rigoureusement avant de coder. Résultat :{" "}
            <strong className="accent">des solutions qui scalent, pas des POC qui dorment.</strong>
          </p>
        </div>

        {/* Bento Box */}
        <div className="about-bento-grid">
          {/* Card 1: Stats */}
          <div className="glass about-bento-card bento-span-2">
            <h3 style={{fontFamily: "'Space Grotesk', sans-serif", fontSize: "24px", color: "#ffffff", marginBottom: "24px", width: "100%", textAlign: "left"}}>🚀 Impact</h3>
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "24px", width: "100%"}}>
              {STATS.map((s, i) => (
                <div key={i} style={{textAlign: "left"}}>
                  <div className="about-stat-value" style={{fontSize: "36px"}}>
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="about-stat-label">{s.label}</div>
                  <div className="about-stat-note">{s.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Localisation */}
          <div className="glass about-bento-card bento-span-1" style={{background: "rgba(255, 255, 255, 0.02)", borderColor: "rgba(255, 255, 255, 0.08)"}}>
            <div style={{fontSize: "48px", marginBottom: "16px"}}>🌍</div>
            <h3 style={{fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", color: "#ffffff", marginBottom: "8px"}}>Based in Bénin</h3>
            <p style={{color: "#94a3b8", fontSize: "14px"}}>Available for remote work worldwide.</p>
          </div>

          {/* Card 3: Tech Stack (TagCloud) */}
          <div className="glass about-bento-card bento-span-2 bento-row-span-2" style={{padding: 0, minHeight: "400px"}}>
             <div style={{position: "absolute", top: "24px", left: "32px", zIndex: 10}}>
                <h3 style={{fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", color: "#ffffff", margin: 0}}>Tech Stack</h3>
                <p style={{color: "#94a3b8", fontSize: "13px", marginTop: "4px"}}>Outils & Technologies que je maîtrise</p>
             </div>
             <TagCloud tags={[
               { label: "Python", icon: "🐍" },
               { label: "TensorFlow", icon: "🧠" },
               { label: "PyTorch", icon: "🔥" },
               { label: "React", icon: "⚛️" },
               { label: "Node.js", icon: "🟢" },
               { label: "Docker", icon: "🐳" },
               { label: "AWS", icon: "☁️" },
               { label: "FastAPI", icon: "⚡" },
               { label: "SQL", icon: "🗄️" },
               { label: "MLOps", icon: "⚙️" },
               { label: "LangChain", icon: "🦜" },
               { label: "Scikit-Learn", icon: "📊" },
               { label: "Git", icon: "🐙" },
               { label: "Spark", icon: "✨" },
               { label: "MongoDB", icon: "🍃" }
             ]} radius={130} />
          </div>

          {/* Card 4: Currently Learning */}
          <div className="glass about-bento-card bento-span-1 align-left">
            <div style={{width: "40px", height: "40px", borderRadius: "8px", background: "rgba(59, 130, 246, 0.1)", color: "var(--neon-cyan)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px"}}>📚</div>
            <h3 style={{fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", color: "#ffffff", marginBottom: "12px"}}>Actuellement...</h3>
            <ul style={{listStyle: "none", padding: 0, margin: 0, color: "#94a3b8", fontSize: "14px", display: "flex", flexDirection: "column", gap: "10px"}}>
              <li>→ Approfondissement LLM Agents</li>
              <li>→ Optimisation RAG Avancé</li>
              <li>→ Déploiement Kubernetes</li>
            </ul>
          </div>
          
          {/* Card 5: Connect */}
          <div className="glass about-bento-card bento-span-1 align-left" style={{background: "rgba(255, 255, 255, 0.02)", borderColor: "rgba(255, 255, 255, 0.08)"}}>
            <h3 style={{fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", color: "#ffffff", marginBottom: "8px"}}>Travaillons ensemble</h3>
            <p style={{color: "#94a3b8", fontSize: "14px", marginBottom: "16px"}}>Un projet en tête ? Discutons-en.</p>
            <a href="mailto:donaerickoulodji@gmail.com" style={{color: "var(--neon-cyan)", textDecoration: "none", fontWeight: "600", fontSize: "14px"}}>✉ Contactez-moi →</a>
          </div>

        </div>

        {/* Bio / Timeline */}
        <div ref={bioRef} className="about-bio-container">
          <div className="glass about-bio-card">
            <div className="about-bio-subtitle">
              // formations.md
            </div>

            <div className="about-timeline">
              {[
                { year: "01 Avril 2025 - 29 Mai 2026", label: "Ingénieur Machine Learning", detail: " DataCamp & Isheero" },
                { year: "18-28 Sept 2025", label: "Introduction à l'Astrophysique et la Cosmologie", detail: "Benin4Space"},
                { year: "Janv-Mai 2025", label: "Data Science Applied certifed", detail: "World Quant University (Data Science · Python · ML · Stats)" },
                { year: "Avr-Sept 2024", label: "Data Science Certified", detail: "Africa TechUp Tour"},
                { year: "2020-2024", label: "Licence Physique Fondamentale", detail: "Université d'Abomey-Calavi • Faculté des Sciences et Techniques" },
              ].map((item, i) => (
                <div key={i} className="about-timeline-item">
                  {i < 4 && (
                    <div className="about-timeline-line" />
                  )}
                  <div className="about-timeline-year">{item.year}</div>
                  <div className="about-timeline-dot" />
                  <div>
                    <div className="about-timeline-label">{item.label}</div>
                    <div className="about-timeline-detail">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experiences */}
        <div className="about-experiences-container">
          <div className="about-section-subtitle">
            // experience.professional[]
          </div>
          <h2 className="about-section-title">
            Expériences Professionnelles
          </h2>

          <div className="about-exp-list">
            {EXPERIENCES.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} delay={i * 0.15} isLast={i === EXPERIENCES.length - 1} />
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="about-values-container">
          <div className="about-section-subtitle">
            // values.core
          </div>
          <h2 className="about-section-title">
            Pourquoi travailler <span className="gradient-text">avec moi ?</span>
          </h2>

          <div className="about-values-grid">
            {VALUES.map((v, i) => {
              const ref = useScrollFade(i * 0.15);
              return (
                <div key={i} ref={ref} className="glass about-value-card" style={{ borderLeft: `3px solid ${v.color}` }}>
                  <div className="about-value-tag" style={{ color: v.color }}>{v.tag}</div>
                  <h3 className="about-value-title">{v.title}</h3>
                  <p className="about-value-desc">{v.desc}</p>
                  <div className="about-value-proof" style={{ color: v.color, background: `${v.color}10` }}>{v.proof}
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