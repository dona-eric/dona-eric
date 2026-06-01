import React, { useEffect, useRef, useState } from "react";
import "../styles/Projects.css";

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

const PROJECTS = [
  {
    id: "veritaai", title: "VeritaAI", subtitle: "Détection intelligente de fake news",
    description: "Système RAG + BERT pour analyser et scorer l'authenticité des informations en temps réel. Pipeline NLP complet avec API déployée et interface Streamlit.",
    stack: ["BERT", "Transformers", "RAG", "FastAPI", "Streamlit"],
    impact: "90% précision", impactDetail: "3 médias partenaires",
    github: "https://github.com/dona-eric/veritaai", demo: "https://verita-ai.streamlit.app",
    status: "production", category: "nlp", accent: "#10b981", featured: true,
  },
  {
    id: "coachai", title: "CoachAI", subtitle: "Générateur IA de programmes sportifs",
    description: "Application LLM qui génère des entraînements personnalisés, plans de récupération et recommandations nutritionnelles via RAG et LLM multi-providers.",
    stack: ["OpenAI", "GroqCloud", "RAG", "LangChain", "Streamlit"],
    impact: "-20% temps opérationnel", impactDetail: "Coachs professionnels",
    github: "https://github.com/dona-eric/CoachAI", demo: "https://coach-ai.streamlit.app",
    status: "production", category: "llm", accent: "#a855f7", featured: true,
  },
  {
    id: "credit-risk", title: "Credit Risk Engine", subtitle: "Scoring de crédit automatisé",
    description: "Modèle prédictif avec explicabilité SHAP déployé chez une fintech béninoise. Pipeline MLflow complet avec monitoring de drift et API REST.",
    stack: ["Scikit-Learn", "SHAP", "FastAPI", "MLflow", "Docker"],
    impact: "+15% précision", impactDetail: "Fintech Bénin · Production",
    github: "https://github.com/dona-eric/Hack2Hiere_TechTech_DataScience_20", demo: "https://risk-score.streamlit.app",
    status: "production", category: "ml", accent: "#00d4ff", featured: true,
  },
  {
    id: "rag-docs", title: "RAG Document Intelligence", subtitle: "Recherche sémantique multi-documents",
    description: "Système RAG multi-format (PDF, Word, Excel) avec Groq + ChromaDB. Réponses contextuelles sur corpus de 1000+ documents en moins de 2 secondes.",
    stack: ["Groq", "LangChain", "ChromaDB", "Llama 3", "HuggingFace"],
    impact: "< 2s latence", impactDetail: "1000+ documents indexés",
    github: "https://huggingface.co/spaces/donerick", demo: "https://huggingface.co/spaces/donerick/Projects",
    status: "production", category: "llm", accent: "#f59e0b", featured: false,
  },
  {
    id: "ev-dashboard", title: "EV Dashboard Pro", subtitle: "Optimisation recharge véhicules électriques",
    description: "Dashboard prédictif avec Prophet + XGBoost pour anticiper la demande énergétique et réduire les coûts. Dockerisé et déployé sur GCP.",
    stack: ["Prophet", "XGBoost", "Plotly Dash", "Docker", "GCP"],
    impact: "-30% facture", impactDetail: "Prévision 7 jours",
    github: "https://github.com/dona-eric/dashboard-ve", demo: null,
    status: "done", category: "ml", accent: "#ec4899", featured: false,
  },
  {
    id: "saferoute", title: "SafeRoute Bénin", subtitle: "Sécurité routière communautaire",
    description: "Alertes temps réel + crowdsourcing d'accidents + modèle ML de prédiction des zones à risque. Application mobile + backend Node.js.",
    stack: ["React Native", "Node.js", "MongoDB", "Scikit-Learn"],
    impact: "Prédiction zones", impactDetail: "Impact social · Bénin",
    github: "https://github.com/dona-eric/saferoute-benin", demo: null,
    status: "wip", category: "ml", accent: "#ef4444", featured: false,
  },
  {
    id: "askbenin", title: "AskBenin", subtitle: "IA RAG pour souveraineté numérique béninoise",
    description: "Plateforme d'Intelligence Artificielle agentic RAG qui comprend la culture, traditions et histoire du Bénin. Permet aux citoyens de dialoguer avec une IA consciente des nuances locales—pas juste une simple interface de chat.",
    stack: ["LangChain", "LangGraph", "Torch", "FastAPI", "Python", "Next.js", "RAG", "Groq", "HuggingFace"],
    impact: "Indexation 10K docs", impactDetail: "Culture béninoise · Souveraineté numérique",
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
  ml:  { label: "Machine Learning", color: "#00d4ff" },
  nlp: { label: "NLP / BERT",       color: "#10b981" },
  llm: { label: "LLM / GenAI",      color: "#a855f7" },
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
          <div className="project-card-tags">
            <span className="project-tag" style={{
              color: cat.color, background: cat.color + "15", border: `1px solid ${cat.color}30`
            }}>{cat.label}</span>
            <span className="project-tag project-status-tag" style={{
              color: st.color, background: st.bg, border: `1px solid ${st.border}`
            }}>
              {project.status === "production" && (
                <span style={{
                  width: 6, height: 6, borderRadius: "50%", background: st.color, display: "inline-block", animation: "pulseDot 2s ease infinite"
                }} />
              )}
              {st.label}
            </span>
          </div>

          {featured && (
            <span className="project-featured-tag">★ Featured</span>
          )}
        </div>

        <div style={{ marginBottom: 16 }}>
          <h3 className="project-title">{project.title}</h3>
          <div className="project-subtitle" style={{ color: project.accent }}>
            {project.subtitle}
          </div>
        </div>

        <p className="project-desc">{project.description}</p>

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
      <div className="projects-container">
        
        {/* HERO */}
        <div className="projects-hero">
          <div className="projects-badge">
            <span className="projects-badge-dot" />
            PROJECTS.LOAD() → {PROJECTS.filter(p => p.status === "production").length} EN PRODUCTION
          </div>

          <h1 className="projects-title">
            Des modèles qui <br />
            <span className="gradient-text">tournent en Production.</span>
          </h1>

          <p className="projects-description">
            Pas juste des notebooks. Des systèmes utilisés tous les jours —
            par des <strong>entreprises, coachs, médias et institutions</strong> au Bénin et au-delà.
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
          <a href="/contact" className="projects-cta-btn">
            Démarrer la collaboration →
          </a>
        </div>
      </div>
    </main>
  );
}