import React, { useEffect, useRef, useState } from "react";
<Helmet>
  <title>Mes Services en Data science, Machine Learning et Intelligence Artificial & Computer Vision | Don Erick</title>
  <meta name="description" content="Découvrez Dona Eric, mes modèles de détection d'images réelles vs IA et mes travaux en MLOps." />
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
const SERVICES = [
  {
    id: "data",
    tag: "service_01",
    title: "Data Analysis & Intelligence",
    subtitle: "Insights actionnables · Dashboards décisionnels",
    description: "Analyse approfondie, modélisation statistique avancée et dashboards interactifs qui transforment vos données brutes en décisions éclairées.",
    accent: "#00d4ff",
    features: [
      "Exploration et nettoyage de données complexes",
      "Dashboards interactifs (Plotly, Streamlit, Power BI)",
      "Modélisation statistique et tests d'hypothèses",
      "Reporting automatisé et visualisations sur-mesure",
    ],
    deliverable: "Dashboard · Rapport · API données",
    timeline: "1 – 3 semaines",
  },
  {
    id: "ml",
    tag: "service_02",
    title: "Machine Learning & IA",
    subtitle: "Modèles en production · LLM · Computer Vision",
    description: "Conception, entraînement et déploiement de modèles IA performants — du fine-tuning LLM aux systèmes RAG, en passant par la vision par ordinateur.",
    accent: "#a78bfa",
    features: [
      "Fine-tuning de LLMs (Llama 3, Mistral, Phi-3, GPT)",
      "Systèmes RAG avec bases vectorielles (Chroma, Pinecone)",
      "Computer Vision (détection YOLO, segmentation SAM)",
      "Modèles prédictifs (churn, scoring, séries temporelles)",
    ],
    deliverable: "Modèle · API REST · Documentation",
    timeline: "2 – 8 semaines",
  },
  {
    id: "mlops",
    tag: "service_03",
    title: "MLOps & Déploiement",
    subtitle: "De l'expérience à la production · CI/CD · Monitoring",
    description: "Mise en production robuste de vos modèles ML avec pipelines automatisés, monitoring de drift et infrastructure scalable sur cloud.",
    accent: "#22c55e",
    features: [
      "Dockerisation et orchestration (Docker, Kubernetes)",
      "MLflow pour le tracking d'expériences et versioning",
      "CI/CD pour déploiement continu (GitHub Actions)",
      "Monitoring de drift et alerting en production",
    ],
    deliverable: "Pipeline · Infrastructure · Monitoring",
    timeline: "2 – 6 semaines",
  },
  {
    id: "training",
    tag: "service_04",
    title: "Formations & Bootcamps",
    subtitle: "Data Science · ML · MLOps · Équipes & individus",
    description: "Programmes intensifs orientés pratique pour monter en compétence rapidement — du Python de base aux LLMs en production.",
    accent: "#f59e0b",
    features: [
      "Bootcamps de 2 à 12 semaines (individuel ou équipe)",
      "Python, PyTorch, TensorFlow, Scikit-Learn",
      "MLOps complet (Docker, MLflow, FastAPI, CI/CD)",
      "Projets réels avec données client + certification",
    ],
    deliverable: "Curriculum · Projets · Certificat",
    timeline: "Sur mesure",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discovery",
    desc: "Analyse de vos besoins, objectifs métier et contraintes techniques. Audit de vos données existantes.",
    accent: "#00d4ff",
  },
  {
    step: "02",
    title: "Strategy",
    desc: "Définition de l'approche, choix des technologies, architecture et planning détaillé.",
    accent: "#a78bfa",
  },
  {
    step: "03",
    title: "Build",
    desc: "Implémentation itérative avec feedback continu, tests rigoureux et ajustements.",
    accent: "#22c55e",
  },
  {
    step: "04",
    title: "Deploy",
    desc: "Mise en production, monitoring, documentation complète et formation de vos équipes.",
    accent: "#f59e0b",
  },
];

// ─── Service Card ──────────────────────────────────────────────────────────────
function ServiceCard({ service, delay }) {
  const ref = useScrollFade(delay);
  const [hov, setHov] = useState(false);

  return (
    <div ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hov ? service.accent + "50" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 12, overflow: "hidden",
        transition: "all 0.3s ease",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hov ? `0 20px 60px ${service.accent}12` : "none",
        display: "flex", flexDirection: "column"
      }}>

      {/* Top accent bar */}
      <div style={{
        height: 2,
        background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)`,
        opacity: hov ? 1 : 0.35, transition: "opacity 0.3s"
      }} />

      <div style={{ padding: "32px 32px 28px", flexGrow: 1, display: "flex", flexDirection: "column" }}>

        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            color: service.accent, letterSpacing: "0.15em", marginBottom: 10
          }}>
            // {service.tag}
          </div>
          <h3 style={{
            fontSize: 22, fontWeight: 700, color: "#f1f5f9",
            marginBottom: 6, fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: "-0.01em"
          }}>{service.title}</h3>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            color: "#475569", letterSpacing: "0.05em"
          }}>{service.subtitle}</div>
        </div>

        {/* Description */}
        <p style={{
          fontSize: 14, color: "#64748b", lineHeight: 1.8, marginBottom: 24
        }}>{service.description}</p>

        {/* Features */}
        <div style={{ flexGrow: 1, marginBottom: 24 }}>
          {service.features.map((f, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 10,
              marginBottom: 10
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: "50%",
                background: service.accent, flexShrink: 0, marginTop: 7,
                boxShadow: `0 0 6px ${service.accent}80`
              }} />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12, color: "#94a3b8", lineHeight: 1.6
              }}>{f}</span>
            </div>
          ))}
        </div>

        {/* Meta footer */}
        <div style={{
          padding: "14px 16px", borderRadius: 6,
          background: service.accent + "0a",
          border: `1px solid ${service.accent}20`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 8
        }}>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: "#475569", marginBottom: 3, letterSpacing: "0.1em" }}>LIVRABLE</div>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: service.accent }}>{service.deliverable}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: "#475569", marginBottom: 3, letterSpacing: "0.1em" }}>TIMELINE</div>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: "#94a3b8" }}>{service.timeline}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Process Step ──────────────────────────────────────────────────────────────
function ProcessStep({ step, isLast, delay }) {
  const ref = useScrollFade(delay);
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, position: "relative" }}>
      {/* Connector line */}
      {!isLast && (
        <div style={{
          position: "absolute", top: 28, left: "60%", right: "-40%",
          height: 1,
          background: `linear-gradient(90deg, ${step.accent}40, transparent)`,
          zIndex: 0
        }} />
      )}

      {/* Number circle */}
      <div style={{
        width: 56, height: 56, borderRadius: "50%",
        border: `2px solid ${step.accent}50`,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: step.accent + "0d", marginBottom: 20, zIndex: 1,
        boxShadow: `0 0 20px ${step.accent}15`
      }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
          fontWeight: 700, color: step.accent
        }}>{step.step}</span>
      </div>

      <h4 style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
        fontWeight: 700, color: "#f1f5f9", marginBottom: 10, textAlign: "center"
      }}>{step.title}</h4>
      <p style={{
        fontSize: 13, color: "#64748b", lineHeight: 1.7,
        textAlign: "center", maxWidth: 200
      }}>{step.desc}</p>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Services() {
  const heroRef    = useFadeIn(0.1);
  const processRef = useScrollFade(0);
  const ctaRef     = useScrollFade(0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060a0f; }
        @keyframes gridFloat { 0%,100%{opacity:.03}50%{opacity:.07} }
        @keyframes pulseDot  { 0%,100%{box-shadow:0 0 6px #22c55e}50%{box-shadow:0 0 14px #22c55e} }
        .cta-primary:hover   { background:linear-gradient(135deg,#0891b2,#4338ca)!important; transform:translateY(-2px); box-shadow:0 12px 32px rgba(0,212,255,0.25)!important; }
        .cta-secondary:hover { border-color:rgba(0,212,255,0.4)!important; color:#00d4ff!important; transform:translateY(-2px); }
        .cta-primary, .cta-secondary { transition: all 0.25s ease; }
        a { text-decoration: none; }
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .process-row   { flex-direction: column !important; align-items: center !important; gap: 32px !important; }
          .cta-btns      { flex-direction: column !important; align-items: center !important; }
          .stats-row     { flex-wrap: wrap !important; }
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
          position: "fixed", top: "-5%", right: "-5%", width: 600, height: 600,
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
          <div ref={heroRef} style={{ marginBottom: 80 }}>

            {/* Badge */}
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
              services.available() → {SERVICES.length} expertises · status=open
            </div>

            <h1 style={{
              fontSize: "clamp(40px, 7vw, 78px)", fontWeight: 700,
              lineHeight: 1.05, letterSpacing: "-0.03em", color: "#f8fafc",
              marginBottom: 20
            }}>
              Mes domaines
              <br />
              <span style={{
                background: "linear-gradient(135deg, #00d4ff 0%, #6366f1 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>d'expertise.</span>
            </h1>

            <p style={{ maxWidth: 580, color: "#94a3b8", fontSize: 16, lineHeight: 1.85, marginBottom: 48 }}>
              Je transforme vos défis data en solutions IA{" "}
              <strong style={{ color: "#e2e8f0" }}>déployées</strong> et{" "}
              <strong style={{ color: "#e2e8f0" }}>mesurables</strong> —
              pas des prototypes, des systèmes utilisés en production.
            </p>

            {/* Stats inline */}
            <div className="stats-row" style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {[
                { v: "7+",   l: "Modèles en prod",    c: "#00d4ff" },
                { v: "90%",  l: "Précision moyenne",  c: "#a78bfa" },
                { v: "24h",  l: "Temps de réponse",   c: "#22c55e" },
                { v: "3",    l: "Pays touchés",        c: "#f59e0b" },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 34, fontWeight: 700, color: s.c, lineHeight: 1
                  }}>{s.v}</div>
                  <div style={{ fontSize: 11, color: "#475569", fontFamily: "monospace", marginTop: 6, letterSpacing: "0.1em" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ══ SERVICES GRID ══ */}
          <div style={{ marginBottom: 96 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              color: "#475569", letterSpacing: "0.15em", marginBottom: 8
            }}>
              <span style={{ color: "#00d4ff" }}>// </span>services.list[]
            </div>
            <h2 style={{
              fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 700,
              color: "#f1f5f9", marginBottom: 40, letterSpacing: "-0.02em"
            }}>Ce que je livre</h2>

            <div className="services-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20
            }}>
              {SERVICES.map((s, i) => (
                <ServiceCard key={s.id} service={s} delay={i * 0.1} />
              ))}
            </div>
          </div>

          {/* ══ PROCESS ══ */}
          <div style={{ marginBottom: 96 }}>
            <div ref={processRef}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                color: "#475569", letterSpacing: "0.15em", marginBottom: 8
              }}>
                <span style={{ color: "#00d4ff" }}>// </span>workflow.steps[]
              </div>
              <h2 style={{
                fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 700,
                color: "#f1f5f9", marginBottom: 12, letterSpacing: "-0.02em"
              }}>Mon processus de travail</h2>
              <p style={{ color: "#64748b", fontSize: 14, fontFamily: "monospace", marginBottom: 52 }}>
                /* Approche structurée · Itérations courtes · Résultats mesurables */
              </p>
            </div>

            <div className="process-row" style={{ display: "flex", gap: 0, alignItems: "flex-start" }}>
              {PROCESS.map((step, i) => (
                <ProcessStep key={i} step={step} isLast={i === PROCESS.length - 1} delay={i * 0.12} />
              ))}
            </div>
          </div>

          {/* ══ CTA ══ */}
          <div ref={ctaRef} style={{
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
              <span style={{ color: "#00d4ff" }}>// </span>project.start()
            </div>

            <h2 style={{
              fontSize: "clamp(24px, 4vw, 46px)", fontWeight: 700,
              color: "#f1f5f9", marginBottom: 14, letterSpacing: "-0.02em"
            }}>
              Prêt à démarrer
              <br />
              <span style={{
                background: "linear-gradient(135deg, #00d4ff, #6366f1)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>votre projet ?</span>
            </h2>

            <p style={{ color: "#64748b", fontFamily: "monospace", fontSize: 13, marginBottom: 40 }}>
              /* Discutons de vos objectifs — réponse garantie sous 24h */
            </p>

            <div className="cta-btns" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
              <a href="https://wa.me/2290151344289" target="_blank" rel="noopener noreferrer"
                className="cta-primary" style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "15px 32px", borderRadius: 6,
                  background: "linear-gradient(135deg, #0e7490, #4338ca)",
                  color: "#f0f9ff", fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14, fontWeight: 600, letterSpacing: "0.05em",
                  boxShadow: "0 4px 20px rgba(0,212,255,0.12)"
                }}>
                ✉ WhatsApp → discuter
              </a>
              <a href="mailto:donaerickoulodji@gmail.com"
                className="cta-secondary" style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "15px 32px", borderRadius: 6, background: "transparent",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14, fontWeight: 500, letterSpacing: "0.05em"
                }}>
                send_email()
              </a>
            </div>

            {/* Availability */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "10px 20px", borderRadius: 4,
              background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.25)",
              fontFamily: "monospace", fontSize: 12
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%", background: "#22c55e",
                display: "inline-block", animation: "pulseDot 2s ease infinite"
              }} />
              <span style={{ color: "#22c55e" }}>Disponible pour nouveaux projets</span>
              <span style={{ color: "#334155" }}>·</span>
              <span style={{ color: "#475569" }}>Freelance · Contract · Long terme</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}