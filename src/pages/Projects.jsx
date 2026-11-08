import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useScrollFade } from "../hooks/useAnimations";
import "../styles/Projects.css";

const PROJECTS = [
  {
    id: "hennu", title: "Hennu AI", subtitle: "Agent IA douanier augmenté par RAG",
    problem: "La vérification manuelle des déclarations douanières et la recherche d'articles de loi sont lentes et sujettes à erreur.",
    solution: "Agent autonome (LangGraph + Qdrant + OCR) qui interroge la législation douanière, vérifie les codes SH et restitue des réponses sourcées avec citation des articles.",
    results: "Prototype fonctionnel de bout en bout : extraction OCR, retrieval Qdrant et réponses certifiées avec sources. Code public sur GitHub.",
    stack: ["LangGraph", "Qdrant", "RAG", "OCR", "FastAPI", "Docker"],
    impact: "Agent RAG + OCR", impactDetail: "Législation douanière",
    github: "https://github.com/dona-eric/Hennu", demo: null,
    status: "done", category: "llm", accent: "#10b981", featured: true,
  },
  {
    id: "veritaai", title: "VeritaAI", subtitle: "Détection de fake news par NLP",
    problem: "La vérification manuelle des faits est trop lente face à la vitesse de propagation des fausses informations.",
    solution: "Pipeline NLP (SVM + embeddings) avec API FastAPI, interface Streamlit et suivi des métriques / data drift via MLflow.",
    results: "Prototype documenté de bout en bout (notebook + API + interface). Suivi de la qualité des données et des modèles avec MLflow.",
    stack: ["SVM", "NLP", "Scikit-Learn", "FastAPI", "Streamlit", "MLflow"],
    impact: "Projet NLP", impactDetail: "Code & notebook publics",
    github: "https://github.com/dona-eric/VeritaAI", demo: "https://verita-ai.streamlit.app",
    status: "production", category: "nlp", accent: "#00d4ff", featured: true,
  },
  {
    id: "credit-risk", title: "Credit Risk Engine", subtitle: "Scoring de crédit explicable",
    problem: "L'évaluation manuelle des dossiers de crédit génère des goulots d'étranglement et des biais de décision.",
    solution: "Modèle de scoring (Scikit-Learn + SHAP) avec API REST, suivi MLflow et explicabilité des décisions.",
    results: "1er prix du hackathon Hack2Hire TechTech Data Science. +15% de précision vs la baseline du hackathon, avec explicabilité SHAP.",
    stack: ["Scikit-Learn", "SHAP", "FastAPI", "MLflow", "Streamlit"],
    impact: "1er Prix Hackathon", impactDetail: "Scoring + SHAP",
    github: "https://github.com/dona-eric/Hack2Hiere_TechTech_DataScience_20", demo: "https://risk-score.streamlit.app",
    status: "done", category: "ml", accent: "#a855f7", featured: true,
  },
  {
    id: "coachai", title: "CoachAI", subtitle: "Générateur IA de programmes sportifs",
    problem: "Les coachs sportifs passent une part importante de leur temps à rédiger des programmes personnalisés.",
    solution: "Application LLM générant entraînements, plans de récupération et recommandations selon les objectifs et contraintes du client.",
    results: "Application Streamlit déployée. Gain de temps estimé à ~20% pour les coachs sur la préparation des programmes.",
    stack: ["LangChain", "Groq", "Llama 3", "RAG", "Streamlit"],
    impact: "Démo en ligne", impactDetail: "Gain estimé -20%",
    github: "https://github.com/dona-eric/CoachAI", demo: "https://coach-ai.streamlit.app",
    status: "production", category: "llm", accent: "#ec4899", featured: true,
  },
  {
    id: "aqi-cotonou", title: "AQI Cotonou", subtitle: "Surveillance de la qualité de l'air",
    problem: "Absence d'outil public centralisé pour suivre et anticiper la pollution atmosphérique à Cotonou.",
    solution: "Dashboard de séries temporelles (Prophet + XGBoost) pour visualiser et prévoir PM2.5, PM10, O3 et NO2.",
    results: "Outil public en ligne : 5 256+ mesures horaires analysées et prévisions des polluants accessibles à tous.",
    stack: ["Python", "Prophet", "XGBoost", "Plotly", "Netlify"],
    impact: "Outil public en ligne", impactDetail: "5 256+ mesures horaires",
    github: "https://github.com/dona-eric/AirQuality", demo: "https://aqi-cotonou.netlify.app",
    status: "production", category: "ml", accent: "#f59e0b", featured: true,
  },
  {
    id: "rag-docs", title: "RAG Document Intelligence", subtitle: "Recherche sémantique multi-documents",
    problem: "Les équipes perdent des heures à chercher une information précise dans des milliers de documents.",
    solution: "Système RAG multi-format (Groq + embeddings + base vectorielle) pour interroger un corpus documentaire en langage naturel.",
    results: "Démo HuggingFace opérationnelle : réponses sourcées en moins de 2 secondes sur un corpus de documents indexés.",
    stack: ["Groq", "LangChain", "ChromaDB", "Llama 3", "HuggingFace"],
    impact: "< 2s latence", impactDetail: "Démo HuggingFace",
    github: "https://github.com/dona-eric/RAG_DOCUMENTS", demo: "https://huggingface.co/spaces/donerick/Projects",
    status: "done", category: "llm", accent: "#6366f1", featured: false,
  },
  {
    id: "modelwatch", title: "ModelWatch", subtitle: "Monitoring de dérive des modèles ML",
    problem: "Un modèle qui fonctionne au déploiement peut devenir silencieusement moins fiable avec le temps.",
    solution: "Outil open source qui suit les métriques et la dérive des données pour alerter avant que la qualité ne se dégrade.",
    results: "Projet open source publié sous licence MIT, orienté observabilité et fiabilité des modèles en production.",
    stack: ["Python", "MLOps", "Monitoring", "Data Drift", "Open Source"],
    impact: "Open source MIT", impactDetail: "Observabilité ML",
    github: "https://github.com/dona-eric/ModelWatch", demo: null,
    status: "done", category: "mlops", accent: "#22d3ee", featured: false,
  },
  {
    id: "askbenin", title: "AskBenin", subtitle: "IA souveraine pour le Bénin",
    problem: "L'information culturelle et administrative béninoise est dispersée et difficilement accessible.",
    solution: "Plateforme Agentic RAG multi-sources pour interroger la culture, les démarches et les opportunités au Bénin.",
    results: "Prototype en cours : indexation de sources culturelles et institutionnelles béninoises.",
    stack: ["LangGraph", "RAG", "FastAPI", "Next.js", "Qdrant"],
    impact: "En cours", impactDetail: "RAG multi-sources",
    github: "https://github.com/dona-eric/AskBenin", demo: null,
    status: "wip", category: "llm", accent: "#f472b6", featured: false,
  },
];

const CATEGORIES = [
  { id: "all",   label: "Tous", emoji: "🌐" },
  { id: "ml",    label: "Machine Learning", emoji: "🧠" },
  { id: "nlp",   label: "NLP / Vision", emoji: "👁️" },
  { id: "llm",   label: "LLM / Agents", emoji: "🤖" },
  { id: "mlops", label: "MLOps", emoji: "⚙️" },
];

const STATUS_CONFIG = {
  production: { label: "En Production", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  done:       { label: "Terminé",       color: "#60a5fa", bg: "rgba(96,165,250,0.1)" },
  wip:        { label: "En Cours",      color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
};

function ProjectCard({ project, onSelect, delay }) {
  const ref = useScrollFade(delay);
  const status = STATUS_CONFIG[project.status] || STATUS_CONFIG.done;

  return (
    <div
      ref={ref}
      className="project-card glass"
      onClick={() => onSelect(project)}
      style={{ cursor: "pointer", borderTop: `3px solid ${project.accent}` }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = `0 20px 40px -15px ${project.accent}30, 0 0 0 1px ${project.accent}20`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {/* Accent glow top */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "60px",
        background: `linear-gradient(180deg, ${project.accent}10, transparent)`,
        pointerEvents: "none"
      }} />

      <div className="project-card-content">
        {/* Header row */}
        <div className="project-card-header">
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {project.featured && (
              <span className="project-featured-tag">★ Featured</span>
            )}
            <span style={{
              padding: "4px 10px", borderRadius: "4px", fontSize: "11px",
              fontFamily: "'Inter', sans-serif", fontWeight: "600",
              color: status.color, background: status.bg,
              border: `1px solid ${status.color}30`
            }}>
              {project.status === "production" && <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", marginRight: "5px", boxShadow: "0 0 6px #10b981" }} />}
              {status.label}
            </span>
          </div>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px",
            color: project.accent, fontWeight: "700", letterSpacing: "0.05em",
            textTransform: "uppercase"
          }}>{project.category.toUpperCase()}</span>
        </div>

        {/* Title */}
        <h3 className="project-title">{project.title}</h3>
        <p className="project-subtitle" style={{ color: project.accent, marginBottom: "12px" }}>
          {project.subtitle}
        </p>

        {/* Description */}
        <p className="project-desc">{project.solution}</p>

        {/* Impact ribbon */}
        <div className="project-impact" style={{ borderLeft: `3px solid ${project.accent}` }}>
          <div>
            <div className="project-impact-value" style={{ color: project.accent }}>{project.impact}</div>
            <div className="project-impact-label">{project.impactDetail}</div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={project.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
            <polyline points="16 7 22 7 22 13"></polyline>
          </svg>
        </div>

        {/* Stack pills */}
        <div className="project-stack">
          {project.stack.map(tech => (
            <span key={tech} className="project-stack-item">{tech}</span>
          ))}
        </div>

        {/* Links */}
        <div className="project-links">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-github"
            onClick={e => e.stopPropagation()}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            Code Source
          </a>
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-demo"
              style={{ background: project.accent }}
              onClick={e => e.stopPropagation()}
            >
              ↗ Live Demo
            </a>
          ) : (
            <button
              className="project-link-demo"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#64748b", cursor: "default" }}
            >
              {project.status === "wip" ? "En cours de dev" : "Pas de démo publique"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  const status = STATUS_CONFIG[project.status] || STATUS_CONFIG.done;

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)", zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px"
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#0f172a", border: `1px solid ${project.accent}30`,
          borderTop: `3px solid ${project.accent}`, borderRadius: "20px",
          maxWidth: "680px", width: "100%", maxHeight: "85vh",
          overflowY: "auto", position: "relative",
          boxShadow: `0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px ${project.accent}20`
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "16px", right: "16px",
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff", width: "36px", height: "36px", borderRadius: "50%",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px", transition: "all 0.2s"
          }}
        >
          ×
        </button>

        <div style={{ padding: "32px" }}>
          {/* Status badge */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px", alignItems: "center" }}>
            <span style={{ padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", color: status.color, background: status.bg, border: `1px solid ${status.color}30` }}>
              {status.label}
            </span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", color: project.accent, fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {project.category}
            </span>
          </div>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "32px", fontWeight: "800", color: "#fff", marginBottom: "8px" }}>
            {project.title}
          </h2>
          <p style={{ color: project.accent, fontSize: "16px", fontWeight: "500", marginBottom: "32px" }}>
            {project.subtitle}
          </p>

          {/* Sections */}
          {[
            { label: "❗ Le Problème", text: project.problem, accent: "rgba(239,68,68,0.08)", border: "#ef4444" },
            { label: "💡 La Solution", text: project.solution, accent: "rgba(99,102,241,0.08)", border: "#6366f1" },
          ].map(s => (
            <div key={s.label} style={{ background: s.accent, padding: "20px", borderRadius: "10px", borderLeft: `3px solid ${s.border}`, marginBottom: "16px" }}>
              <div style={{ fontSize: "11px", color: s.border, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "700", marginBottom: "8px" }}>
                {s.label}
              </div>
              <p style={{ color: "#cbd5e1", fontSize: "15px", lineHeight: "1.7", margin: 0 }}>{s.text}</p>
            </div>
          ))}

          {/* Results */}
          <div style={{ background: `${project.accent}12`, padding: "20px", borderRadius: "10px", borderLeft: `3px solid ${project.accent}`, marginBottom: "24px" }}>
            <div style={{ fontSize: "11px", color: project.accent, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "700", marginBottom: "8px" }}>
              📊 Résultats & ROI
            </div>
            <p style={{ color: "#fff", fontSize: "15px", lineHeight: "1.7", margin: 0 }}>{project.results}</p>
          </div>

          {/* Stack */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "700", marginBottom: "12px" }}>
              🛠️ Technologies
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {project.stack.map(tech => (
                <span key={tech} style={{ padding: "6px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", fontSize: "13px", color: "#cbd5e1" }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "12px" }}>
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{ flex: 1, padding: "14px", borderRadius: "10px", textAlign: "center", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", textDecoration: "none", fontWeight: "600", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all 0.2s" }}>
              📁 Code Source
            </a>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                style={{ flex: 1, padding: "14px", borderRadius: "10px", textAlign: "center", background: project.accent, color: "#000", textDecoration: "none", fontWeight: "700", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all 0.2s" }}>
                ↗ Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const heroRef = useScrollFade(0);

  const filtered = activeFilter === "all" ? PROJECTS : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <main className="projects-main">
      <Helmet>
        <title>Projets IA — Dona Eric KOULODJI | Data Scientist & ML Engineer</title>
        <meta name="description" content="8 projets IA : NLP, agents LLM/RAG, scoring crédit explicable, qualité de l'air et MLOps. Code public, démos et résultats documentés." />
      </Helmet>

      {/* Hero */}
      <div ref={heroRef} className="projects-hero">
        <div className="projects-container">
          <div className="projects-badge">
            <span className="projects-badge-dot" />
            PROJETS DOCUMENTÉS · CODE PUBLIC · RÉSULTATS MESURÉS
          </div>

          <h1 className="projects-title">
            Projets &amp; Réalisations IA
          </h1>
          <p className="projects-description">
            Chaque projet part d'un besoin concret et va jusqu'à un livrable testable : notebook, API, démo ou outil open source.
          </p>

          {/* Mini stats */}
          <div className="projects-stats-grid" style={{ maxWidth: "760px", margin: "40px auto 0" }}>
            {[
              { v: `${PROJECTS.filter(p => p.status === "production").length}`, l: "En Production", c: "#10b981" },
              { v: `${PROJECTS.length}`, l: "Projets", c: "#6366f1" },
              { v: "3", l: "Pays Touchés", c: "#f59e0b" },
              { v: "< 48h", l: "Démarrage", c: "#ec4899" },
            ].map((s, i) => (
              <div key={i} className="project-card glass projects-stat-card">
                <div className="projects-stat-gradient" style={{ background: `linear-gradient(90deg, transparent, ${s.c}60, transparent)` }} />
                <div className="projects-stat-value" style={{ color: s.c }}>{s.v}</div>
                <div className="projects-stat-label">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="projects-container">
        {/* Filter bar */}
        <div className="projects-filter-header">
          <div>
            <div className="projects-subtitle">// projets.filter()</div>
            <h2 className="projects-section-title">
              {activeFilter === "all" ? "Tous mes projets" : CATEGORIES.find(c => c.id === activeFilter)?.label}
            </h2>
          </div>
          <div className="projects-filters">
            {CATEGORIES.map(cat => {
              const isActive = activeFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className="projects-filter-btn"
                  style={{
                    background: isActive ? "#6366f1" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isActive ? "#6366f1" : "rgba(255,255,255,0.08)"}`,
                    color: isActive ? "#fff" : "#94a3b8",
                  }}
                >
                  {cat.emoji} {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects grid */}
        <div className="projects-grid">
          {filtered.length === 0 ? (
            <div className="projects-empty">Aucun projet dans cette catégorie.</div>
          ) : (
            filtered.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={setSelectedProject}
                delay={idx * 0.05}
              />
            ))
          )}
        </div>

        {/* CTA */}
        <div className="glass projects-cta" style={{ marginTop: "80px" }}>
          <div className="projects-cta-gradient" />
          <div className="projects-cta-subtitle">// collaboration.start()</div>
          <h2 className="projects-cta-title">
            Vous avez un défi à relever ?<br />
            <span className="gradient-text">Construisons-le ensemble.</span>
          </h2>
          <p className="projects-cta-desc">Réponse sous 24h · Devis gratuit · Code et résultats documentés</p>
          <a href="https://wa.me/2290151344289" target="_blank" rel="noopener noreferrer" className="projects-cta-btn">
            🚀 Démarrer un projet →
          </a>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </main>
  );
}