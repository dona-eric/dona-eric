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
    <div ref={ref} className="glass"
      style={{
        display: "flex", flexDirection: "column", position: "relative",
        padding: "0", overflow: "hidden", transition: "all 0.3s ease"
      }}
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
      <div style={{
        height: 3,
        background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
        opacity: 0.8
      }} />

      <div style={{ padding: "24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{
              padding: "4px 10px", borderRadius: 4, fontSize: 11,
              fontFamily: "'Inter', sans-serif", fontWeight: 600, color: cat.color,
              background: cat.color + "15", border: `1px solid ${cat.color}30`, textTransform: "uppercase"
            }}>{cat.label}</span>
            <span style={{
              padding: "4px 10px", borderRadius: 4, fontSize: 11,
              fontFamily: "'Inter', sans-serif", fontWeight: 600, color: st.color,
              background: st.bg, border: `1px solid ${st.border}`, display: "flex", alignItems: "center", gap: 6, textTransform: "uppercase"
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
            <span style={{
              padding: "4px 10px", borderRadius: 4, fontSize: 11,
              fontFamily: "'Inter', sans-serif", fontWeight: 600, color: "#f59e0b",
              background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", textTransform: "uppercase"
            }}>★ Featured</span>
          )}
        </div>

        <div style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: "#ffffff", marginBottom: 6, fontFamily: "'Space Grotesk', sans-serif" }}>
            {project.title}
          </h3>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: project.accent, opacity: 0.9 }}>
            {project.subtitle}
          </div>
        </div>

        <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7, marginBottom: 24, flexGrow: 1 }}>
          {project.description}
        </p>

        <div style={{
          padding: "16px", borderRadius: 8, marginBottom: 20,
          background: "rgba(255,255,255,0.02)", border: `1px solid rgba(255,255,255,0.05)`,
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: project.accent }}>
            {project.impact}
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, color: "#64748b" }}>
            {project.impactDetail}
          </span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          {project.stack.map(tech => (
            <span key={tech} style={{
              padding: "4px 10px", borderRadius: 4, fontSize: 12,
              fontFamily: "'Inter', sans-serif", fontWeight: 500, color: "#94a3b8",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)"
            }}>{tech}</span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
            flex: 1, padding: "12px", borderRadius: 6, textAlign: "center",
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
            fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#e2e8f0",
            transition: "all 0.2s ease", textDecoration: "none",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
          >
            ⌥ Code Source
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{
              flex: 1, padding: "12px", borderRadius: 6, textAlign: "center",
              background: project.accent, color: "#000000",
              fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700,
              transition: "all 0.2s ease", textDecoration: "none",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              boxShadow: `0 4px 15px ${project.accent}40`
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
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
            PROJECTS.LOAD() → {PROJECTS.filter(p => p.status === "production").length} EN PRODUCTION
          </div>

          <h1 style={{
            fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 800,
            lineHeight: 1.1, letterSpacing: "-0.02em",
            color: "#ffffff", marginBottom: 24, fontFamily: "'Space Grotesk', sans-serif"
          }}>
            Des modèles qui <br />
            <span className="gradient-text">tournent en Production.</span>
          </h1>

          <p style={{ maxWidth: 640, margin: "0 auto", color: "#94a3b8", fontSize: 17, lineHeight: 1.8 }}>
            Pas juste des notebooks. Des systèmes utilisés tous les jours —
            par des <strong style={{ color: "#ffffff" }}>entreprises, coachs, médias et institutions</strong> au Bénin et au-delà.
          </p>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 16, marginTop: 48
          }}>
            {statsRow.map((s, i) => (
              <div key={i} className="glass" style={{
                padding: "24px 16px", borderRadius: 8, textAlign: "center", position: "relative", overflow: "hidden"
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)"
                }} />
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 36, fontWeight: 800, color: "#00d4ff", marginBottom: 8
                }}>{s.value}</div>
                <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURED */}
        <div style={{ marginBottom: 100 }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
            color: "#00d4ff", letterSpacing: "0.15em", marginBottom: 16, textTransform: "uppercase"
          }}>
            // projects.featured[]
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800,
            color: "#ffffff", marginBottom: 40, letterSpacing: "-0.02em", fontFamily: "'Space Grotesk', sans-serif"
          }}>
            Projets phares
          </h2>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24
          }}>
            {featured.map((p, i) => (
              <ProjectCard key={p.id} project={p} delay={i * 0.1} featured />
            ))}
          </div>
        </div>

        {/* ALL PROJECTS */}
        <div style={{ marginBottom: 100 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 40 }}>
            <div>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
                color: "#a855f7", letterSpacing: "0.15em", marginBottom: 16, textTransform: "uppercase"
              }}>
                // projects.all[]
              </div>
              <h2 style={{
                fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800,
                color: "#ffffff", letterSpacing: "-0.02em", fontFamily: "'Space Grotesk', sans-serif"
              }}>
                Tous les projets
              </h2>
            </div>

            <div ref={filterRef} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {ALL_CATS.map(cat => {
                const active = activeFilter === cat;
                const label = cat === "all" ? "Tous" : CAT_MAP[cat]?.label || cat;
                const color = cat === "all" ? "#00d4ff" : CAT_MAP[cat]?.color || "#94a3b8";
                return (
                  <button key={cat}
                    onClick={() => setActiveFilter(cat)}
                    style={{
                      padding: "10px 20px", borderRadius: 6, cursor: "pointer",
                      fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600,
                      border: `1px solid ${active ? color + "60" : "rgba(255,255,255,0.1)"}`,
                      background: active ? color + "15" : "rgba(255,255,255,0.02)",
                      color: active ? color : "#94a3b8",
                      transition: "all 0.2s ease"
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

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24
          }}>
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} delay={i * 0.07} featured={false} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="glass" style={{
              textAlign: "center", padding: "60px", color: "#64748b", fontFamily: "'Inter', sans-serif", fontWeight: 500
            }}>
              Aucun projet ne correspond à ce filtre.
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="glass" style={{
          textAlign: "center", padding: "64px 24px", position: "relative", overflow: "hidden"
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 3,
            background: "linear-gradient(90deg, transparent, #00d4ff, #ec4899, transparent)"
          }} />
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
            color: "#00d4ff", letterSpacing: "0.15em", marginBottom: 24, textTransform: "uppercase"
          }}>
            // new_project.init()
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800,
            color: "#ffffff", marginBottom: 16, letterSpacing: "-0.02em", fontFamily: "'Space Grotesk', sans-serif"
          }}>
            Un projet IA en tête ?
          </h2>
          <p style={{ color: "#94a3b8", fontSize: 16, marginBottom: 40 }}>
            De la donnée brute au système en production — discutons.
          </p>
          <a href="/contact" style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            padding: "16px 36px", borderRadius: "8px",
            background: "linear-gradient(135deg, #00d4ff, #4338ca)",
            color: "#ffffff", fontFamily: "'Inter', sans-serif",
            fontSize: 15, fontWeight: 600, textDecoration: "none",
            transition: "all 0.3s ease", boxShadow: "0 4px 20px rgba(0, 212, 255, 0.2)"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Démarrer la collaboration →
          </a>
        </div>
      </div>
    </main>
  );
}