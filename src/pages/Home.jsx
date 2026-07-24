import { MasterclassService } from "../services/masterclassService";
import { Analytics } from "@vercel/analytics/react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import "../styles/Home.css";

import { useScrollFade } from "../hooks/useAnimations";

// --- Composants ---
function StatCard({ value, label, delay }) {
  const ref = useScrollFade(delay);
  return (
    <div ref={ref} className="glass home-stat-card">
      <div className="home-stat-gradient" />
      <div className="home-stat-value">{value}</div>
      <div className="home-stat-label">{label}</div>
    </div>
  );
}

function ExpertiseCard({ icon, title, desc, delay, color }) {
  const ref = useScrollFade(delay);
  return (
    <div ref={ref} className="glass home-expertise-card" style={{ '--card-color': color }}>
      <div className="home-expertise-gradient" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
      <div className="home-expertise-icon" style={{ color: color, background: `${color}15` }}>{icon}</div>
      <h3 className="home-expertise-title">{title}</h3>
      <p className="home-expertise-desc">{desc}</p>
    </div>
  );
}

function FeaturedProject({ project, reverse, delay }) {
  const ref = useScrollFade(delay);
  return (
    <div ref={ref} className={`glass home-featured-project ${reverse ? 'reverse' : ''}`}>
       <div className="home-fp-content">
          <div className="home-fp-tag" style={{ color: project.color, background: `${project.color}15`, border: `1px solid ${project.color}30` }}>{project.tag}</div>
          <h3 className="home-fp-title">{project.title}</h3>
          <p className="home-fp-desc">{project.desc}</p>
          <div className="home-fp-stack">
            {project.stack.map(s => <span key={s} className="home-fp-stack-item">{s}</span>)}
          </div>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="home-fp-link" style={{ color: project.color }}>
            Voir le projet →
          </a>
       </div>
       <div className="home-fp-image-container">
          <div className="home-fp-image-overlay" style={{ background: `linear-gradient(45deg, ${project.color}20, transparent)` }} />
          <div className="home-fp-image-placeholder">
             {project.icon}
          </div>
       </div>
     </div>
  );
}


function MasterclassTeaser() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      const data = await MasterclassService.getAll();
      if (data && data.length > 0) {
        // Check if open
        const today = new Date();
        today.setHours(0,0,0,0);
        const openEvent = data.find(mc => {
          const d = new Date(mc.date);
          d.setHours(0,0,0,0);
          return d >= today;
        });
        setEvent(openEvent || data[0]);
      }
      setLoading(false);
    };
    fetchEvent();
  }, []);

  const ref = useScrollFade(0.2);

  if (loading || !event) return null;

  return (
    <div ref={ref} className="home-teaser-container">
      <div className="glass home-teaser-card">
         <div className="home-teaser-content">
            <span className="home-teaser-badge">🎓 Prochaine Masterclass</span>
            <h3 className="home-teaser-title">{event.title}</h3>
            <p className="home-teaser-date">📅 {new Date(event.date).toLocaleDateString('fr-FR')} à {event.time}</p>
         </div>
         <Link to={`/formations/${event.id}`} className="home-teaser-btn">S'inscrire</Link>
      </div>
    </div>
  );
}

function AcademyTeaser() {
  const ref = useScrollFade(0.2);
  return (
    <div ref={ref} className="home-teaser-container" style={{ margin: "40px auto", maxWidth: "1000px" }}>
      <div className="glass home-teaser-card" style={{ 
        background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.08))", 
        border: "1px solid rgba(99,102,241,0.3)",
        display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", padding: "40px"
      }}>
         <div className="home-teaser-content" style={{ flex: "1 1 500px" }}>
            <span className="home-teaser-badge" style={{ background: "rgba(99,102,241,0.2)", color: "#c7d2fe", display: "inline-block", marginBottom: "16px" }}>🚀 Lancement</span>
            <h3 className="home-teaser-title" style={{ fontSize: "36px", lineHeight: "1.2", marginBottom: "16px" }}>
              Road to Data Science<br/>Moderne en 90 Jours
            </h3>
            <p className="home-teaser-date" style={{ color: "#cbd5e1", fontSize: "18px", marginBottom: "24px", maxWidth: "450px" }}>
              La première formation intensive pour passer de Python à Kubernetes. Construisez des projets concrets.
            </p>
            <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
              <span style={{ background: "rgba(255,255,255,0.05)", padding: "6px 16px", borderRadius: "20px", fontSize: "14px", fontWeight: "500" }}>90 jours</span>
              <span style={{ background: "rgba(255,255,255,0.05)", padding: "6px 16px", borderRadius: "20px", fontSize: "14px", fontWeight: "500" }}>21 modules</span>
              <span style={{ background: "rgba(255,255,255,0.05)", padding: "6px 16px", borderRadius: "20px", fontSize: "14px", fontWeight: "500" }}>10 projets</span>
            </div>
         </div>
         <div style={{ flex: "0 1 auto", textAlign: "center", minWidth: "250px" }}>
           <div style={{ fontSize: "48px", fontWeight: "bold", color: "var(--neon-purple)", marginBottom: "8px" }}>00</div>
           <div style={{ fontSize: "14px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "24px" }}>Jours avant fermeture</div>
           <Link to="/academy" className="home-teaser-btn" style={{ background: "#6366f1", display: "block", fontSize: "16px", padding: "16px 24px" }}>Rejoindre MLAcademy →</Link>
         </div>
      </div>
    </div>
  );
}

export default function Home() {
  const expertiseHeaderRef = useScrollFade(0);
  const impactRef = useScrollFade(0);
  const projectsRef = useScrollFade(0);

  const stats = [
    { value: "24h",  label: "RÉPONSE GARANTIE" },
    { value: "90%",  label: "PRÉCISION MOYENNE" },
    { value: "5+",   label: "MODÈLES EN PROD" },
    { value: "3",    label: "PAYS TOUCHÉS" },
  ];

  return (
    <main className="home-main">
      <Hero />

      {/* SECTION ACADEMY TEASER */}
      <section className="home-section" style={{ padding: "40px 0" }}>
        <div className="home-container">
           <AcademyTeaser />
        </div>
      </section>

      {/* SECTION EXPERTISE */}
      <section className="home-section home-expertise-section">
        <div className="home-container">
           <div ref={expertiseHeaderRef} className="home-section-header">
             <span className="home-section-subtitle">// Ce que je livre aux entreprises</span>
             <h2 className="home-section-title">Des Systèmes IA <br/><span className="gradient-text">prêts pour la production</span></h2>
           </div>
           <div className="home-bento-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", gridAutoRows: "minmax(250px, auto)" }}>
             <div className="glass bento-card" style={{ padding: "40px", borderRadius: "24px", background: "linear-gradient(135deg, rgba(168,85,247,0.1), transparent)", border: "1px solid rgba(168,85,247,0.3)", gridColumn: "span 2 / auto" }}>
               <div style={{ color: "#a855f7", background: "rgba(168,85,247,0.15)", width: "56px", height: "56px", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", marginBottom: "24px" }}>🤖</div>
               <h3 style={{ fontSize: "24px", color: "#ffffff", marginBottom: "16px", fontFamily: "'Space Grotesk', sans-serif" }}>LLM & Agents Autonomes</h3>
               <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: "1.7", maxWidth: "600px" }}>Je conçois des agents intelligents (RAG, multi-agents) capables d'automatiser des flux de travail complexes, d'interagir avec vos bases de données et de réduire le temps de traitement manuel.</p>
             </div>
             <div className="glass bento-card" style={{ padding: "40px", borderRadius: "24px", background: "linear-gradient(135deg, rgba(0,212,255,0.1), transparent)", border: "1px solid rgba(0,212,255,0.3)" }}>
               <div style={{ color: "#00d4ff", background: "rgba(0,212,255,0.15)", width: "56px", height: "56px", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", marginBottom: "24px" }}>⚙️</div>
               <h3 style={{ fontSize: "24px", color: "#ffffff", marginBottom: "16px", fontFamily: "'Space Grotesk', sans-serif" }}>MLOps & Déploiement</h3>
               <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: "1.7" }}>Un modèle dans un notebook ne sert à rien. J'architecture et déploie des pipelines robustes (Docker, CI/CD, MLflow) scalables et monitorés pour le cloud.</p>
             </div>
             <div className="glass bento-card" style={{ padding: "40px", borderRadius: "24px", background: "linear-gradient(135deg, rgba(236,72,153,0.1), transparent)", border: "1px solid rgba(236,72,153,0.3)" }}>
               <div style={{ color: "#ec4899", background: "rgba(236,72,153,0.15)", width: "56px", height: "56px", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", marginBottom: "24px" }}>📊</div>
               <h3 style={{ fontSize: "24px", color: "#ffffff", marginBottom: "16px", fontFamily: "'Space Grotesk', sans-serif" }}>Data Science Prédictive</h3>
               <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: "1.7" }}>Du nettoyage des données à l'explicabilité (SHAP), je construis des moteurs de recommandation et de prévision qui transforment vos données en décisions stratégiques.</p>
             </div>
           </div>
        </div>
      </section>

      {/* SECTION IMPACT & ROI (CTA Entreprise) */}
      <section id="impact" className="home-section home-impact-section" style={{marginBottom: "100px"}}>
        <div className="home-container">
          <div ref={impactRef} className="home-impact-content glass" style={{ padding: "60px 40px", borderRadius: "24px", background: "linear-gradient(135deg, rgba(15,23,42,0.8), rgba(30,41,59,0.8))", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="home-badge">
              <span className="home-badge-dot" />
              🔥 1 SLOT DE CONSULTING DISPONIBLE CE TRIMESTRE
            </div>
            <h2 className="home-title" style={{ marginTop: "20px" }}>
              Votre concurrent a déjà<br />
              <span className="home-title-gradient"> un système autonome qui tourne</span>
            </h2>
            <p className="home-description" style={{ maxWidth: "700px" }}>
              Pendant que d'autres s'attardent sur des POCs qui ne voient jamais le jour, je livre un{" "}
              <strong>agent IA opérationnel</strong>,{" "}
              un <strong>système orienté business</strong>{" "}
              ou un <strong>pipeline MLOps robuste</strong>. Zéro blabla. Zéro réunion inutile.{" "}
              <strong className="accent">Du concret pour votre entreprise.</strong>
            </p>
            <div className="home-stats-grid" style={{ marginBottom: "40px" }}>
              {stats.map((s, i) => <StatCard key={i} {...s} delay={0.2 + i * 0.1} />)}
            </div>
            <div className="home-cta-container" style={{ justifyContent: "flex-start" }}>
              <a href="https://wa.me/+2290151344289" target="_blank" rel="noopener noreferrer" className="home-cta-primary">
                Discuter de votre projet →
              </a>
              <a href="mailto:donaerickoulodji@gmail.com" className="home-cta-secondary">
                ✉ M'envoyer un email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION TÉMOIGNAGES / PREUVE SOCIALE */}
      <section className="home-section" style={{ background: "rgba(15,23,42,0.5)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="home-container">
          <div className="home-section-header" style={{ marginBottom: "60px" }}>
            <span className="home-section-subtitle">// Preuve Sociale</span>
            <h2 className="home-section-title">Ils ont <span className="gradient-text">transformé leur métier</span></h2>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {[1, 2, 3].map((item) => (
              <div key={item} className="glass" style={{ padding: "32px", borderRadius: "16px", textAlign: "left", position: "relative" }}>
                <div style={{ position: "absolute", top: "20px", right: "20px", color: "rgba(255,255,255,0.1)", fontSize: "40px", fontFamily: "serif" }}>"</div>
                <div style={{ display: "flex", gap: "2px", color: "#f59e0b", marginBottom: "16px" }}>
                  ★★★★★
                </div>
                <p style={{ color: "#e2e8f0", fontSize: "15px", lineHeight: "1.7", marginBottom: "24px", fontStyle: "italic" }}>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla."
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
                  <div>
                    <h4 style={{ color: "#ffffff", fontSize: "15px", fontWeight: "600", marginBottom: "4px" }}>Nom du Client</h4>
                    <span style={{ color: "#94a3b8", fontSize: "13px" }}>CEO @ Entreprise B2B</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION PROJETS PHARES */}
      <section className="home-section home-projects-section">
        <div className="home-container">
           <div ref={projectsRef} className="home-section-header">
             <span className="home-section-subtitle">// Use Cases</span>
             <h2 className="home-section-title">Projets <span className="gradient-text">Phares</span></h2>
           </div>
           
           <div className="home-fp-list">
              <FeaturedProject 
                delay={0.1}
                project={{
                  tag: "RAG & NLP", title: "VeritaAI", color: "#10b981", icon: "🗞️",
                  desc: "Système RAG + BERT pour analyser et scorer l'authenticité des informations en temps réel. Pipeline NLP complet avec API déployée et interface Streamlit.",
                  stack: ["BERT", "Transformers", "RAG", "FastAPI"],
                  link: "https://verita-ai.streamlit.app"
                }}
              />
              <FeaturedProject 
                delay={0.2} reverse={true}
                project={{
                  tag: "Generative AI", title: "CoachAI", color: "#a855f7", icon: "🏋️",
                  desc: "Application LLM qui génère des entraînements personnalisés, plans de récupération et recommandations nutritionnelles via RAG et LLM multi-providers.",
                  stack: ["OpenAI", "GroqCloud", "LangChain", "Streamlit"],
                  link: "https://coach-ai.streamlit.app"
                }}
              />
           </div>
           
           <div style={{textAlign: "center", marginTop: "40px"}}>
             <Link to="/projets" className="home-cta-secondary" style={{display: "inline-block"}}>Voir tous les projets →</Link>
           </div>
        </div>
      </section>

      {/* SECTION MASTERCLASS TEASER */}
      <section className="home-section">
        <div className="home-container">
           <MasterclassTeaser />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="home-section" style={{ padding: "100px 0", textAlign: "center" }}>
        <div className="home-container">
          <h2 className="home-title" style={{ fontSize: "3rem", marginBottom: "24px" }}>
            Prêt à passer à <span className="gradient-text">l'action ?</span>
          </h2>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/academy" className="btn-primary" style={{ background: "#6366f1", padding: "16px 32px", fontSize: "1.1rem" }}>🎓 Rejoindre la Formation</Link>
            <a href="/contact" className="btn-secondary" style={{ padding: "16px 32px", fontSize: "1.1rem" }}>💼 Démarrer un projet B2B</a>
          </div>
        </div>
      </section>

    </main>
  );
}