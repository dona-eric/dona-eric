import React, { useEffect, useRef, useState } from "react";
<Helmet>
  <title>Mes Projets IA & Computer Vision & Machine Learning | Dona Eric</title>
  <meta name="description" content="Découvrez AfriDrive, mes modèles de détection d'images réelles vs IA et mes travaux en MLOps." />
</Helmet>
// ─── Hooks ────────────────────────────────────────────────────────────────────
const useFadeIn = (delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`;
    const t = setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, 60);
    return () => clearTimeout(t);
  }, [delay]);
  return ref;
};

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

// ─── Data ─────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "veritaai",
    title: "VeritaAI",
    subtitle: "Détection intelligente de fake news",
    description: "Système RAG + BERT pour analyser et scorer l'authenticité des informations en temps réel. Pipeline NLP complet avec API déployée et interface Streamlit.",
    stack: ["BERT", "Transformers", "RAG", "FastAPI", "Streamlit"],
    impact: "90% précision",
    impactDetail: "3 médias partenaires",
    github: "https://github.com/dona-eric/veritaai",
    demo: "https://verita-ai.streamlit.app",
    status: "production",
    category: "nlp",
    accent: "#22c55e",
    featured: true,
  },
  {
    id: "coachai",
    title: "CoachAI",
    subtitle: "Générateur IA de programmes sportifs",
    description: "Application LLM qui génère des entraînements personnalisés, plans de récupération et recommandations nutritionnelles via RAG et LLM multi-providers.",
    stack: ["OpenAI", "GroqCloud", "RAG", "LangChain", "Streamlit"],
    impact: "-20% temps opérationnel",
    impactDetail: "Coachs professionnels",
    github: "https://github.com/dona-eric/CoachAI",
    demo: "https://coach-ai.streamlit.app",
    status: "production",
    category: "llm",
    accent: "#a78bfa",
    featured: true,
  },
  {
    id: "credit-risk",
    title: "Credit Risk Engine",
    subtitle: "Scoring de crédit automatisé",
    description: "Modèle prédictif avec explicabilité SHAP déployé chez une fintech béninoise. Pipeline MLflow complet avec monitoring de drift et API REST.",
    stack: ["Scikit-Learn", "SHAP", "FastAPI", "MLflow", "Docker"],
    impact: "+15% précision",
    impactDetail: "Fintech Bénin · Production",
    github: "https://github.com/dona-eric/Hack2Hiere_TechTech_DataScience_20",
    demo: "https://risk-score.streamlit.app",
    status: "production",
    category: "ml",
    accent: "#00d4ff",
    featured: true,
  },
  {
    id: "rag-docs",
    title: "RAG Document Intelligence",
    subtitle: "Recherche sémantique multi-documents",
    description: "Système RAG multi-format (PDF, Word, Excel) avec Groq + ChromaDB. Réponses contextuelles sur corpus de 1000+ documents en moins de 2 secondes.",
    stack: ["Groq", "LangChain", "ChromaDB", "Llama 3", "HuggingFace"],
    impact: "< 2s latence",
    impactDetail: "1000+ documents indexés",
    github: "https://huggingface.co/spaces/donerick",
    demo: "https://huggingface.co/spaces/donerick/Projects",
    status: "production",
    category: "llm",
    accent: "#f59e0b",
    featured: false,
  },
  {
    id: "ev-dashboard",
    title: "EV Dashboard Pro",
    subtitle: "Optimisation recharge véhicules électriques",
    description: "Dashboard prédictif avec Prophet + XGBoost pour anticiper la demande énergétique et réduire les coûts. Dockerisé et déployé sur GCP.",
    stack: ["Prophet", "XGBoost", "Plotly Dash", "Docker", "GCP"],
    impact: "-30% facture énergétique",
    impactDetail: "Prévision 7 jours",
    github: "https://github.com/dona-eric/dashboard-ve",
    demo: null,
    status: "done",
    category: "ml",
    accent: "#f97316",
    featured: false,
  },
  {
    id: "saferoute",
    title: "SafeRoute Bénin",
    subtitle: "Sécurité routière communautaire",
    description: "Alertes temps réel + crowdsourcing d'accidents + modèle ML de prédiction des zones à risque. Application mobile + backend Node.js.",
    stack: ["React Native", "Node.js", "MongoDB", "Scikit-Learn"],
    impact: "Prédiction zones risque",
    impactDetail: "Impact social · Bénin",
    github: "https://github.com/dona-eric/saferoute-benin",
    demo: null,
    status: "wip",
    category: "ml",
    accent: "#ef4444",
    featured: false,
  },
];

const STATUS_MAP = {
  production: { label: "En production",  color: "#22c55e", bg: "rgba(34,197,94,0.1)",  border: "rgba(34,197,94,0.3)"  },
  done:       { label: "Terminé",         color: "#94a3b8", bg: "rgba(148,163,184,0.1)", border: "rgba(148,163,184,0.3)" },
  wip:        { label: "En cours",        color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.3)"  },
};

const CAT_MAP = {
  ml:  { label: "Machine Learning", color: "#00d4ff" },
  nlp: { label: "NLP / BERT",       color: "#22c55e" },
  llm: { label: "LLM / GenAI",      color: "#a78bfa" },
};

const ALL_CATS = ["all", "ml", "nlp", "llm"];

// PROJECTS
function ProjectCard({ project, delay, featured }) {
  const ref = useScrollFade(delay);
  const [hov, setHov] = useState(false);
  const st = STATUS_MAP[project.status];
  const cat = CAT_MAP[project.category];

  return (
    <div ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hov ? project.accent + "55" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 12, overflow: "hidden",
        transition: "all 0.3s ease",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hov ? `0 16px 48px ${project.accent}18` : "none",
        display: "flex", flexDirection: "column", position: "relative"
      }}>

      {/* Top accent */}
      <div style={{
        height: 2,
        background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
        opacity: hov ? 1 : 0.4, transition: "opacity 0.3s"
      }} />

      {/* Header bar */}
      <div style={{
        padding: "20px 24px 0",
        display: "flex", justifyContent: "space-between", alignItems: "flex-start"
      }}>
        {/* Category + Status */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span style={{
            padding: "3px 10px", borderRadius: 3, fontSize: 10,
            fontFamily: "monospace", color: cat.color,
            background: cat.color + "15", border: `1px solid ${cat.color}30`,
            letterSpacing: "0.08em"
          }}>{cat.label}</span>
          <span style={{
            padding: "3px 10px", borderRadius: 3, fontSize: 10,
            fontFamily: "monospace", color: st.color,
            background: st.bg, border: `1px solid ${st.border}`,
            letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: 5
          }}>
            {project.status === "production" && (
              <span style={{
                width: 5, height: 5, borderRadius: "50%", background: st.color,
                display: "inline-block", animation: "pulseDot 2s ease infinite"
              }} />
            )}
            {st.label}
          </span>
        </div>

        {/* Featured tag */}
        {featured && (
          <span style={{
            padding: "3px 10px", borderRadius: 3, fontSize: 10,
            fontFamily: "monospace", color: "#f59e0b",
            background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)",
            letterSpacing: "0.08em"
          }}>★ Featured</span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "16px 24px 24px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Title */}
        <div style={{ marginBottom: 12 }}>
          <h3 style={{
            fontSize: 20, fontWeight: 700, color: "#f1f5f9",
            marginBottom: 4, fontFamily: "'Space Grotesk', sans-serif"
          }}>{project.title}</h3>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
            color: project.accent, opacity: 0.85
          }}>{project.subtitle}</div>
        </div>

        {/* Description */}
        <p style={{
          fontSize: 13, color: "#64748b", lineHeight: 1.75,
          marginBottom: 16, flexGrow: 1
        }}>{project.description}</p>

        {/* Impact metric */}
        <div style={{
          padding: "12px 16px", borderRadius: 6, marginBottom: 16,
          background: project.accent + "0d", border: `1px solid ${project.accent}25`,
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
            fontWeight: 700, color: project.accent
          }}>{project.impact}</span>
          <span style={{ fontFamily: "monospace", fontSize: 11, color: "#475569" }}>
            {project.impactDetail}
          </span>
        </div>

        {/* Stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          {project.stack.map(tech => (
            <span key={tech} style={{
              padding: "3px 10px", borderRadius: 3, fontSize: 11,
              fontFamily: "monospace", color: "#94a3b8",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)"
            }}>{tech}</span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 10 }}>
          <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
            flex: 1, padding: "9px", borderRadius: 5, textAlign: "center",
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
            fontFamily: "monospace", fontSize: 12, color: "#64748b",
            transition: "all 0.2s", textDecoration: "none",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6
          }}
            onMouseEnter={e => { e.currentTarget.style.color = "#e2e8f0"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
          >
            ⌥ source_code
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{
              flex: 1, padding: "9px", borderRadius: 5, textAlign: "center",
              background: project.accent + "15", border: `1px solid ${project.accent}35`,
              fontFamily: "monospace", fontSize: 12, color: project.accent,
              transition: "all 0.2s", textDecoration: "none",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6
            }}
              onMouseEnter={e => { e.currentTarget.style.background = project.accent + "25"; }}
              onMouseLeave={e => { e.currentTarget.style.background = project.accent + "15"; }}
            >
              ↗ live_demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main 
export default function Projects() {
  const heroRef  = useFadeIn(0.1);
  const filterRef = useFadeIn(0.3);

  const [activeFilter, setActiveFilter] = useState("all");
  const featured = PROJECTS.filter(p => p.featured);
  const others   = PROJECTS.filter(p => !p.featured);
  const filtered = activeFilter === "all"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  const statsRow = [
    { value: `${PROJECTS.filter(p => p.status === "production").length}`, label: "En production" },
    { value: `${PROJECTS.length}+`, label: "Projets livrés" },
    { value: "3", label: "Pays touchés" },
    { value: "90%", label: "Précision moy." },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060a0f; }
        @keyframes gridFloat { 0%,100%{opacity:.03}50%{opacity:.07} }
        @keyframes pulseDot  { 0%,100%{box-shadow:0 0 6px #22c55e}50%{box-shadow:0 0 14px #22c55e} }
        .filter-btn:hover { border-color: rgba(0,212,255,0.4) !important; color: #00d4ff !important; }
        .cta-btn:hover { transform:translateY(-2px); box-shadow:0 12px 40px rgba(0,212,255,0.25)!important; }
        a { text-decoration: none; }
        @media (max-width: 900px) {
          .projects-featured { grid-template-columns: 1fr !important; }
          .projects-grid     { grid-template-columns: 1fr !important; }
          .stats-row         { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>

      <div style={{
        minHeight: "100vh", background: "#060a0f",
        color: "#e2e8f0", fontFamily: "'Space Grotesk', sans-serif",
        position: "relative", overflow: "hidden"
      }}>

        {/* Grid bg */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.035) 1px, transparent 1px)`,
          backgroundSize: "48px 48px", animation: "gridFloat 8s ease infinite"
        }} />
        <div style={{
          position: "fixed", top: "-10%", right: "-5%", width: 600, height: 600,
          background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0
        }} />
        <div style={{
          position: "fixed", bottom: "5%", left: "-10%", width: 500, height: 500,
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1160, margin: "0 auto", padding: "80px 24px 120px" }}>

          {/* ══ HERO ══ */}
          <div ref={heroRef} style={{ marginBottom: 72 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 16px", borderRadius: 4, marginBottom: 32,
              background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.25)",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
              color: "#00d4ff", letterSpacing: "0.05em"
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: "50%", background: "#22c55e",
                animation: "pulseDot 2s ease infinite", display: "inline-block"
              }} />
              projects.load() → {PROJECTS.filter(p => p.status === "production").length} systèmes en production
            </div>

            <h1 style={{
              fontSize: "clamp(40px, 7vw, 78px)", fontWeight: 700,
              lineHeight: 1.05, letterSpacing: "-0.03em", color: "#f8fafc",
              marginBottom: 20
            }}>
              Des modèles qui
              <br />
              <span style={{
                background: "linear-gradient(135deg, #00d4ff 0%, #6366f1 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>tournent en Production.</span>
            </h1>

            <p style={{ maxWidth: 580, color: "#94a3b8", fontSize: 16, lineHeight: 1.8 }}>
              Pas juste des notebooks. Des systèmes utilisés tous les jours —
              par des{" "}<strong style={{ color: "#e2e8f0" }}>entreprises, coachs, médias et institutions</strong>{" "}
              au Bénin et au-delà.
            </p>

            {/* Stats inline */}
            <div className="stats-row" style={{
              display: "grid", gridTemplateColumns: "repeat(4,1fr)",
              gap: 12, marginTop: 48
            }}>
              {statsRow.map((s, i) => (
                <div key={i} style={{
                  padding: "16px", borderRadius: 8, textAlign: "center",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)", position: "relative"
                }}>
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 2,
                    background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)"
                  }} />
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 28, fontWeight: 700, color: "#00d4ff"
                  }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 4, fontFamily: "monospace" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ══ FEATURED ══ */}
          <div style={{ marginBottom: 80 }}>
            <div style={{ marginBottom: 32, display: "flex", alignItems: "center", gap: 16 }}>
              <div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                  color: "#475569", letterSpacing: "0.15em", marginBottom: 6
                }}>
                  <span style={{ color: "#00d4ff" }}>// </span>projects.featured[]
                </div>
                <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
                  Projets phares
                </h2>
              </div>
            </div>

            <div className="projects-featured" style={{
              display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20
            }}>
              {featured.map((p, i) => (
                <ProjectCard key={p.id} project={p} delay={i * 0.1} featured />
              ))}
            </div>
          </div>

          {/* ══ FILTER + ALL ══ */}
          <div style={{ marginBottom: 80 }}>
            <div style={{ marginBottom: 32 }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                color: "#475569", letterSpacing: "0.15em", marginBottom: 6
              }}>
                <span style={{ color: "#00d4ff" }}>// </span>projects.all[]
              </div>
              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", flexWrap: "wrap", gap: 16
              }}>
                <h2 style={{ fontSize: 28, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
                  Tous les projets
                </h2>

                {/* Filter buttons */}
                <div ref={filterRef} style={{ display: "flex", gap: 8 }}>
                  {ALL_CATS.map(cat => {
                    const active = activeFilter === cat;
                    const label = cat === "all" ? "Tous" : CAT_MAP[cat]?.label || cat;
                    const color = cat === "all" ? "#00d4ff" : CAT_MAP[cat]?.color || "#94a3b8";
                    return (
                      <button key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className="filter-btn"
                        style={{
                          padding: "7px 16px", borderRadius: 4, cursor: "pointer",
                          fontFamily: "monospace", fontSize: 12, letterSpacing: "0.06em",
                          border: `1px solid ${active ? color + "60" : "rgba(255,255,255,0.1)"}`,
                          background: active ? color + "15" : "transparent",
                          color: active ? color : "#64748b",
                          transition: "all 0.2s ease"
                        }}>
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="projects-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20
            }}>
              {filtered.map((p, i) => (
                <ProjectCard key={p.id} project={p} delay={i * 0.07} featured={false} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{
                textAlign: "center", padding: "60px",
                fontFamily: "monospace", color: "#334155"
              }}>
                // no projects matching filter
              </div>
            )}
          </div>

          {/* ══ CTA ══ */}
          <div style={{
            textAlign: "center", padding: "64px 24px",
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
              <span style={{ color: "#00d4ff" }}>// </span>new_project.init()
            </div>
            <h2 style={{
              fontSize: "clamp(22px, 3.5vw, 38px)", fontWeight: 700,
              color: "#f1f5f9", marginBottom: 12, letterSpacing: "-0.02em"
            }}>
              Un projet IA en tête ?
            </h2>
            <p style={{ color: "#64748b", fontSize: 14, fontFamily: "monospace", marginBottom: 36 }}>
              /* De la donnée brute au système en production — discutons. */
            </p>
            <a href="/contact" className="cta-btn" style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              padding: "15px 34px", borderRadius: 6,
              background: "linear-gradient(135deg, #0e7490, #4338ca)",
              color: "#f0f9ff", fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14, fontWeight: 600, letterSpacing: "0.05em",
              transition: "all 0.25s ease",
              boxShadow: "0 4px 20px rgba(0,212,255,0.12)"
            }}>
              initiate_contact() →
            </a>

            <div style={{ marginTop: 32, display: "inline-flex", alignItems: "center", gap: 10,
              padding: "10px 20px", borderRadius: 6,
              background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)",
              fontFamily: "monospace", fontSize: 12, color: "#22c55e"
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%", background: "#22c55e",
                display: "inline-block", animation: "pulseDot 2s ease infinite"
              }} />
              Disponible pour nouveaux projets · Freelance · Contract · Long terme
            </div>
          </div>

        </div>
      </div>
    </>
  );
}