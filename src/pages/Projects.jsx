import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import "../styles/Projects.css";

import { useScrollFade } from "../hooks/useAnimations";

const PROJECTS = [
  {
    id: "veritaai", title: "VeritaAI", subtitle: "Détection intelligente de fake news",
    problem: "La vérification manuelle des faits par les journalistes est trop lente face à la vitesse de propagation des fausses informations.",
    solution: "Système RAG + BERT automatisé pour analyser et scorer l'authenticité des informations en temps réel via une API FastAPI.",
    results: "Temps de vérification divisé par 10. Précision de 90% sur 3 médias partenaires.",
    stack: ["BERT", "Transformers", "RAG", "FastAPI", "Streamlit"],
    impact: "90% précision", impactDetail: "3 médias partenaires",
    github: "https://github.com/dona-eric/veritaai", demo: "https://verita-ai.streamlit.app",
    status: "production", category: "nlp", accent: "#10b981", featured: true,
  },
  {
    id: "coachai", title: "CoachAI", subtitle: "Générateur IA de programmes sportifs",
    problem: "Les coachs sportifs passent jusqu'à 40% de leur temps à rédiger des programmes personnalisés.",
    solution: "Application LLM (RAG multi-providers) générant automatiquement des entraînements, plans de récupération et recommandations.",
    results: "Gain de temps opérationnel de 20% pour les coachs professionnels.",
    stack: ["OpenAI", "GroqCloud", "RAG", "LangChain", "Streamlit"],
    impact: "-20% temps", impactDetail: "Coachs professionnels",
    github: "https://github.com/dona-eric/CoachAI", demo: "https://coach-ai.streamlit.app",
    status: "production", category: "llm", accent: "#a855f7", featured: true,
  },
  {
    id: "credit-risk", title: "Credit Risk Engine", subtitle: "Scoring de crédit automatisé",
    problem: "L'évaluation manuelle des dossiers de crédit génère des goulots d'étranglement et des biais humains.",
    solution: "Modèle prédictif MLOps avec explicabilité SHAP et monitoring de drift, intégré via API REST.",
    results: "Augmentation de la précision de 15% et approbation des crédits 3x plus rapide.",
    stack: ["Scikit-Learn", "SHAP", "FastAPI", "MLflow", "Docker"],
    impact: "+15% précision", impactDetail: "Fintech Bénin",
    github: "https://github.com/dona-eric/Hack2Hiere_TechTech_DataScience_20", demo: "https://risk-score.streamlit.app",
    status: "production", category: "ml", accent: "#00d4ff", featured: true,
  },
  {
    id: "rag-docs", title: "RAG Document Intelligence", subtitle: "Recherche sémantique multi-documents",
    problem: "Les employés perdent des heures à chercher des informations spécifiques dans des milliers de documents d'entreprise.",
    solution: "Système RAG multi-format ultra-rapide (Groq + ChromaDB) pour interroger le corpus documentaire en langage naturel.",
    results: "Accès instantané à l'information (< 2s) sur plus de 1000 documents.",
    stack: ["Groq", "LangChain", "ChromaDB", "Llama 3", "HuggingFace"],
    impact: "< 2s latence", impactDetail: "1000+ docs indexés",
    github: "https://huggingface.co/spaces/donerick", demo: "https://huggingface.co/spaces/donerick/Projects",
    status: "production", category: "llm", accent: "#f59e0b", featured: false,
  },
  {
    id: "ev-dashboard", title: "EV Dashboard Pro", subtitle: "Optimisation recharge véhicules électriques",
    problem: "Coûts énergétiques imprévisibles liés aux pics de recharge des flottes de véhicules électriques.",
    solution: "Dashboard prédictif (Prophet + XGBoost) anticipant la demande à 7 jours pour lisser la consommation.",
    results: "Réduction projetée de 30% sur la facture énergétique globale.",
    stack: ["Prophet", "XGBoost", "Plotly Dash", "Docker", "GCP"],
    impact: "-30% facture", impactDetail: "Flotte B2B",
    github: "https://github.com/dona-eric/dashboard-ve", demo: null,
    status: "done", category: "ml", accent: "#ec4899", featured: false,
  },
  {
    id: "askbenin", title: "AskBenin", subtitle: "IA souveraine pour la culture béninoise",
    problem: "Manque d'accessibilité numérique centralisée pour l'histoire, la culture et les traditions béninoises.",
    solution: "Plateforme Agentic RAG dialoguant en tenant compte des nuances culturelles locales (pas juste un chatbot générique).",
    results: "Plus de 10 000 documents culturels indexés pour la souveraineté numérique.",
    stack: ["LangChain", "LangGraph", "FastAPI", "Next.js", "RAG"],
    impact: "10K docs indexés", impactDetail: "Souveraineté numérique",
    github: "https://github.com/askbeninn", demo: null,
    status: "wip", category: "llm", accent: "#f59e0b", featured: true,
  },
];

const STATUS_MAP = {
  production: { label: "En production",  color: "#10b981", bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.3)"  },
  done:       { label: "Terminé",         color: "#94a3b8", bg: "rgba(148,163,184,0.1)", border: "rgba(148,163,184,0.3)" },
  wip:        { label: "En cours",        color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.3)"  },
};

const CAT_MAP = {
  ml:  { label: "Machine Learning / MLOps", color: "#3b82f6" },
  nlp: { label: "NLP / Computer Vision",    color: "#10b981" },
  llm: { label: "LLM / RAG / Agents",       color: "#6366f1" },
};

const ALL_CATS = ["all", "ml", "nlp", "llm"];

function ProjectCard({ project, delay, featured }) {
  const ref = useScrollFade(delay);
  const st = STATUS_MAP[project.status];
  const cat = CAT_MAP[project.category];

  return (
    <div ref={ref} className="glass project-card"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = project.accent;
        e.currentTarget.style.boxShadow = `0 16px 48px ${project.accent}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "var(--glass-border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div className="project-card-gradient" style={{
        background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`
      }} />

      <div className="project-card-content">
        <div className="project-card-header">
          <span className="project-category" style={{ color: cat.color }}>
            <span className="project-cat-dot" style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }} />
            {cat.label}
          </span>
          <span className="project-status" style={{ color: st.color, background: st.bg, border: `1px solid ${st.border}` }}>
            {st.label}
          </span>
        </div>

        <h3 className="project-title">{project.title}</h3>
        <h4 className="project-subtitle" style={{ color: cat.color, marginBottom: "16px" }}>{project.subtitle}</h4>
        
        <div className="project-b2b-content" style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
          <div>
            <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", color: "#64748b", fontWeight: "600", display: "block", marginBottom: "4px" }}>Problème</span>
            <p className="project-description" style={{ margin: 0, fontSize: "14px" }}>{project.problem}</p>
          </div>
          <div>
            <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", color: "#64748b", fontWeight: "600", display: "block", marginBottom: "4px" }}>Solution</span>
            <p className="project-description" style={{ margin: 0, fontSize: "14px" }}>{project.solution}</p>
          </div>
          <div style={{ padding: "12px", background: "rgba(255,255,255,0.03)", borderRadius: "8px", borderLeft: `3px solid ${project.accent}` }}>
            <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", color: project.accent, fontWeight: "600", display: "block", marginBottom: "4px" }}>Résultats / ROI</span>
            <p className="project-description" style={{ margin: 0, fontSize: "14px", color: "#e2e8f0" }}>{project.results}</p>
          </div>
        </div>

        <div className="project-impact">
          <span className="project-impact-value" style={{ color: project.accent }}>
            {project.impact}
          </span>
          <span className="project-impact-label">
            {project.impactDetail}
          </span>
        </div>

        <div className="project-stack">
          {project.stack.map(tech => (
            <span key={tech} className="project-stack-item">{tech}</span>
          ))}
        </div>

        <div className="project-links">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link-github">
            ⌥ Code Source
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link-demo" style={{
              background: project.accent, boxShadow: `0 4px 15px ${project.accent}40`
            }}>
              ↗ Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const filterRef = useScrollFade(0);

  const featured = PROJECTS.filter(p => p.featured);
  const filtered = activeFilter === "all" ? PROJECTS : PROJECTS.filter(p => p.category === activeFilter);

  const statsRow = [
    { value: `${PROJECTS.filter(p => p.status === "production").length}`, label: "En production" },
    { value: `${PROJECTS.length}+`, label: "Projets livrés" },
    { value: "3", label: "Pays touchés" },
    { value: "90%", label: "Précision moy." },
  ];

  return (
    <main className="projects-main">
      <Helmet>
        <title>Projets IA & ML | Dona Eric</title>
        <meta name="description" content="Découvrez mes projets en Machine Learning, NLP, RAG et MLOps. Systèmes IA déployés en production." />
      </Helmet>
      
      <div className="projects-container">
        
        {/* HERO */}
        <div className="projects-hero">
          <div className="projects-badge">
            <span className="projects-badge-dot" />
            PROJECTS.LOAD() → {PROJECTS.filter(p => p.status === "production").length} EN PRODUCTION
          </div>

          <h1 className="projects-title" style={{ fontSize: "3.5rem" }}>
            Construire.<br />
            <span className="gradient-text">Déployer. Mesurer.</span>
          </h1>

          <p className="projects-description" style={{ fontSize: "1.2rem", color: "#e2e8f0" }}>
            Découvrez comment j'aide les entreprises à automatiser leurs processus métier grâce à des systèmes IA opérationnels et sécurisés.
          </p>

          <div className="projects-stats-grid">
            {statsRow.map((s, i) => (
              <div key={i} className="glass projects-stat-card">
                <div className="projects-stat-gradient" />
                <div className="projects-stat-value">{s.value}</div>
                <div className="projects-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURED */}
        <div className="projects-section">
          <div className="projects-subtitle">
            // projects.featured[]
          </div>
          <h2 className="projects-section-title">
            Projets phares
          </h2>

          <div className="projects-grid">
            {featured.map((p, i) => (
              <ProjectCard key={p.id} project={p} delay={i * 0.1} featured />
            ))}
          </div>
        </div>

        {/* ALL PROJECTS */}
        <div className="projects-section">
          <div className="projects-filter-header">
            <div>
              <div className="projects-subtitle projects-subtitle-alt">
                // projects.all[]
              </div>
              <h2 className="projects-section-title" style={{ marginBottom: 0 }}>
                Tous les projets
              </h2>
            </div>

            <div ref={filterRef} className="projects-filters">
              {ALL_CATS.map(cat => {
                const active = activeFilter === cat;
                const label = cat === "all" ? "Tous" : CAT_MAP[cat]?.label || cat;
                const color = cat === "all" ? "#00d4ff" : CAT_MAP[cat]?.color || "#94a3b8";
                return (
                  <button key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className="projects-filter-btn"
                    style={{
                      borderColor: active ? color + "60" : "rgba(255,255,255,0.1)",
                      background: active ? color + "15" : "rgba(255,255,255,0.02)",
                      color: active ? color : "#94a3b8",
                    }}
                    onMouseEnter={(e) => { if(!active) e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
                    onMouseLeave={(e) => { if(!active) e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="projects-grid">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} delay={i * 0.07} featured={false} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="glass projects-empty">
              Aucun projet ne correspond à ce filtre.
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="glass projects-cta">
          <div className="projects-cta-gradient" />
          <div className="projects-cta-subtitle">
            // new_project.init()
          </div>
          <h2 className="projects-cta-title">
            Un projet IA en tête ?
          </h2>
          <p className="projects-cta-desc">
            De la donnée brute au système en production — discutons.
          </p>
          <a href="/contact" className="btn btn-primary">
            Démarrer la collaboration →
          </a>
        </div>
      </div>
    </main>
  );
}