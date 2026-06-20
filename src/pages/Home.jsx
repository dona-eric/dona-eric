import { MasterclassService } from "../services/masterclassService";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import "../styles/Home.css";

const useScrollFade = (delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        obs.disconnect();
      }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
};

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

      {/* SECTION EXPERTISE */}
      <section className="home-section home-expertise-section">
        <div className="home-container">
           <div ref={expertiseHeaderRef} className="home-section-header">
             <span className="home-section-subtitle">// Ce que je livre</span>
             <h2 className="home-section-title">Des Systèmes intelligents <br/><span className="gradient-text">qui vous font gagnez plus de temps et d'argent</span></h2>
           </div>
           <div className="home-expertise-grid">
             <ExpertiseCard 
               delay={0.1} color="#a855f7" icon="🤖"
               title="LLM & Agents Autonomes"
               desc="Je conçois des agents intelligents (RAG, multi-agents) capables d'automatiser des flux de travail complexes, d'interagir avec vos bases de données et de réduire le temps de traitement manuel."
             />
             <ExpertiseCard 
               delay={0.2} color="#00d4ff" icon="⚙️"
               title="MLOps & Déploiement"
               desc="Un modèle dans un notebook ne sert à rien. J'architecture et déploie des pipelines robustes (Docker, CI/CD, MLflow) scalables et monitorés pour le cloud."
             />
             <ExpertiseCard 
               delay={0.3} color="#ec4899" icon="📊"
               title="Data Science Prédictive"
               desc="Du nettoyage des données à l'explicabilité du modèle (SHAP), je construis des moteurs de recommandation et de prévision qui transforment vos données en décisions stratégiques."
             />
           </div>
        </div>
      </section>

      {/* SECTION IMPACT & ROI (Anciennement Contact) */}
      <section id="impact" className="home-section home-impact-section">
        <div className="home-container">
          <div ref={impactRef} className="home-impact-content">
            <div className="home-badge">
              <span className="home-badge-dot" />
              🔥 3 PROJETS LIVRÉS CE SEMESTRE · 1 SLOT DISPONIBLE
            </div>
            <h2 className="home-title">
              Votre concurrent a déjà<br />
              <span className="home-title-gradient"> un système autonome qui tourne</span>
            </h2>
            <p className="home-description">
              Pendant que votre équipe s'attardent sur les options élémentaires, je livre un{" "}
              <strong>agent IA opérationnel</strong>,{" "}
              un <strong>un système orienté businnes</strong>{" "}
              ou un <strong>système RAG clé-en-main</strong>  plus simples, plus rapides et sécurisé. Zéro POC qui dort. Zéro réunion inutile.{" "}
              <strong className="accent">Du concret pour votre entreprise.</strong>
            </p>
            <div className="home-stats-grid">
              {stats.map((s, i) => <StatCard key={i} {...s} delay={0.2 + i * 0.1} />)}
            </div>
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
      <section className="home-section home-cta-section" style={{marginBottom: "100px", textAlign: "center"}}>
        <div className="home-container">
           <div className="glass" style={{padding: "60px 40px", borderRadius: "24px", background: "linear-gradient(135deg, rgba(0,212,255,0.05), rgba(236,72,153,0.05))"}}>
              <h2 style={{fontFamily: "'Space Grotesk', sans-serif", fontSize: "36px", color: "#fff", marginBottom: "16px"}}>Prêt à accélérer ?</h2>
              <p style={{color: "#94a3b8", fontSize: "18px", marginBottom: "32px", maxWidth: "500px", margin: "0 auto 32px"}}>
                Transformons vos données en avantage compétitif. Contactez-moi pour discuter de votre infrastructure IA.
              </p>
              <div className="home-cta-container" style={{justifyContent: "center"}}>
                <a href="https://wa.me/+2290151344289" target="_blank" rel="noopener noreferrer" className="home-cta-primary">
                  Démarrer mon projet →
                </a>
                <a href="mailto:donaerickoulodji@gmail.com" className="home-cta-secondary">
                  ✉ Me décrire mon besoin
                </a>
              </div>
           </div>
        </div>
      </section>

    </main>
  );
}