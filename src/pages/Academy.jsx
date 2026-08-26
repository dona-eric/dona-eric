import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import GenerativeBg from "../components/GenerativeBg";
import CountdownTimer from "../components/CountdownTimer";
import { AcademyService } from "../services/academyService";
import Desktop from "../components/os/Desktop";
import "../styles/Academy.css";

export default function Academy({ isWindow }) {
  const [preRegCount, setPreRegCount] = useState(14);

  useEffect(() => {
    AcademyService.getCount()
      .then((data) => {
        if (data && data.count > 0) setPreRegCount(data.count);
      })
      .catch(() => {});
  }, []);

  const content = (
    <div className="academy-main" style={isWindow ? { minHeight: "100%", padding: 0 } : { minHeight: "100vh" }}>
      {!isWindow && <GenerativeBg />}

      {/* ══════════════════ HERO HUB ══════════════════ */}
      <section className="academy-hero" style={{ paddingBottom: "60px" }}>
        <div className="academy-hero-content" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <div className="academy-badge" style={{ marginBottom: "24px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", color: "#a5b4fc" }}>
            <span className="academy-badge-dot" style={{ background: "#818cf8", boxShadow: "0 0 10px #818cf8" }} />
            MLAcademy — Hub de Formation
          </div>

          <h1 style={{ fontSize: "clamp(30px, 5vw, 40px)", fontWeight: 800, marginBottom: "24px", lineHeight: "1.1", fontFamily: "'Space Grotesk', sans-serif" }}>
            Maîtrisez l'IA.<br/>
            <span className="gradient-text">De Niveau Zéro au niveau Avancé</span>
          </h1>

          <p style={{ fontSize: "18px", color: "#94a3b8", lineHeight: "1.7", marginBottom: "24px" }}>
            Des parcours intensifs, des masterclasses pointues et des webinaires gratuits pour vous armer face aux défis réels de l'Intelligence Artificielle en entreprise.
          </p>

          <div style={{ marginBottom: "32px" }}>
            <div style={{ fontSize: "12px", color: "#a5b4fc", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px", fontWeight: "600" }}>⏳ Fermeture des pré-inscriptions dans :</div>
            <CountdownTimer />
            <div style={{ fontSize: "14px", color: "#6ee7b7", fontWeight: "600", marginTop: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981", display: "inline-block" }} />
              <strong>{preRegCount}</strong> personnes déjà pré-inscrites
            </div>
          </div>
        </div>
      </section>

      <div className="academy-divider" />

      {/* ══════════════════ BOOTCAMPS & PARCOURS ══════════════════ */}
      <section className="academy-section">
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          <span className="academy-section-label" style={{ color: "var(--neon-purple)", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", fontSize: "12px", display: "block", marginBottom: "16px" }}>// parcours.intensifs()</span>
          <h2 className="academy-section-title" style={{ fontSize: "36px", fontWeight: "800", color: "#fff", marginBottom: "40px", fontFamily: "'Space Grotesk', sans-serif" }}>Bootcamps & Formations Longues</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
            {/* Carte Bootcamp 90 Jours */}
            <div className="glass" style={{ borderRadius: "24px", padding: "32px", display: "flex", flexDirection: "column", border: "1px solid rgba(99,102,241,0.3)", background: "linear-gradient(135deg, rgba(99,102,241,0.1), transparent)", position: "relative", overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <span style={{ background: "rgba(99,102,241,0.2)", color: "#a5b4fc", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "700", textTransform: "uppercase" }}>En cours</span>
                <span style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "600" }}>90 Jours</span>
              </div>
              <h3 style={{ fontSize: "24px", color: "#ffffff", marginBottom: "16px", fontFamily: "'Space Grotesk', sans-serif" }}>
                BootCamp Road to Data Science Moderne
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: "1.6", marginBottom: "24px", flex: 1 }}>
                La formation intensive de 90 jours pour passer de Zéro à Data Scientist. Construisez 10 projets réels et maîtrisez le cycle de vie complet d'un projet IA ou Machine Learning.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
                <span style={{ fontSize: "12px", background: "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: "4px", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.1)" }}>Python</span>
                <span style={{ fontSize: "12px", background: "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: "4px", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.1)" }}>Docker</span>
                <span style={{ fontSize: "12px", background: "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: "4px", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.1)" }}>MLOps</span>
              </div>
              <Link to="/academy/bootcamp" className="academy-cta-primary" style={{ width: "100%", textAlign: "center", background: "#6366f1", color: "#fff", padding: "14px", borderRadius: "8px", textDecoration: "none", fontWeight: "600", transition: "all 0.3s" }}>
                Découvrir le programme →
              </Link>
            </div>

            {/* Carte Futur Bootcamp */}
            <div className="glass" style={{ borderRadius: "24px", padding: "32px", display: "flex", flexDirection: "column", border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <span style={{ background: "rgba(255,255,255,0.05)", color: "#94a3b8", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "700", textTransform: "uppercase" }}>À Venir</span>
                <span style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "600" }}>4 Semaines</span>
              </div>
              <h3 style={{ fontSize: "24px", color: "#ffffff", marginBottom: "16px", fontFamily: "'Space Grotesk', sans-serif", opacity: 0.8 }}>
                LLM & Agentic AI Architect
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: "1.6", marginBottom: "24px", flex: 1, opacity: 0.8 }}>
                Apprenez à concevoir, évaluer et déployer des systèmes multi-agents complexes et des architectures RAG avancées pour les entreprises.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px", opacity: 0.6 }}>
                <span style={{ fontSize: "12px", background: "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: "4px", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.1)" }}>LangChain</span>
                <span style={{ fontSize: "12px", background: "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: "4px", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.1)" }}>Groq</span>
                <span style={{ fontSize: "12px", background: "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: "4px", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.1)" }}>Vector DB</span>
              </div>
              <button disabled style={{ width: "100%", padding: "14px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "none", cursor: "not-allowed", fontWeight: "600" }}>
                Bientôt disponible
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="academy-divider" />

      {/* ══════════════════ MASTERCLASSES ══════════════════ */}
      <section className="academy-section">
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          <span className="academy-section-label" style={{ color: "var(--neon-cyan)", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", fontSize: "12px", display: "block", marginBottom: "16px" }}>// deep_dives.load()</span>
          <h2 className="academy-section-title" style={{ fontSize: "36px", fontWeight: "800", color: "#fff", marginBottom: "16px", fontFamily: "'Space Grotesk', sans-serif" }}>Masterclasses & Webinaires</h2>
          <p className="academy-section-desc" style={{ color: "#94a3b8", fontSize: "16px", marginBottom: "40px", maxWidth: "600px" }}>
            Des sessions intensives de 2h à 4h sur des sujets techniques spécifiques. Apprentissage ciblé et pratique.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {/* Exemple de masterclass */}
            <div className="glass" style={{ padding: "32px", borderRadius: "24px", border: "1px solid rgba(16,185,129,0.3)", background: "linear-gradient(135deg, rgba(16,185,129,0.05), transparent)", display: "flex", flexDirection: "column" }}>
              <div style={{ color: "#10b981", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", marginBottom: "16px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }}/> Session Enregistrée
              </div>
              <h3 style={{ fontSize: "22px", color: "#ffffff", marginBottom: "16px", fontFamily: "'Space Grotesk', sans-serif" }}>
                Déployer un modèle ML avec FastAPI & Docker
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "15px", marginBottom: "24px", flex: 1, lineHeight: "1.6" }}>
                Passez du notebook Jupyter à une API REST conteneurisée prête pour la production en moins de 3 heures.
              </p>
              <Link to="/masterclass/deploiement-fastapi-docker" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid rgba(16,185,129,0.5)", color: "#10b981", background: "rgba(16,185,129,0.1)", textAlign: "center", textDecoration: "none", fontWeight: "600", transition: "all 0.3s" }}>
                Accéder au Replay
              </Link>
            </div>

            {/* Event à venir */}
            <div className="glass" style={{ padding: "32px", borderRadius: "24px", display: "flex", flexDirection: "column", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ color: "#a855f7", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", marginBottom: "16px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                📅 Prochain Webinaire
              </div>
              <h3 style={{ fontSize: "22px", color: "#ffffff", marginBottom: "16px", fontFamily: "'Space Grotesk', sans-serif", opacity: 0.8 }}>
                Introduction à l'Agentic AI
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "15px", marginBottom: "24px", flex: 1, lineHeight: "1.6", opacity: 0.8 }}>
                Découvrez comment les LLMs évoluent d'assistants conversationnels à agents autonomes exécutant des tâches.
              </p>
              <button disabled style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "none", cursor: "not-allowed", fontWeight: "600" }}>
                Ouverture prochaine
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ NEWSLETTER ══════════════════ */}
      <div className="academy-divider" />
      <section className="academy-section" style={{ background: "rgba(15,23,42,0.5)", padding: "60px 0" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <h2 style={{ fontSize: "32px", color: "#ffffff", marginBottom: "16px", fontFamily: "'Space Grotesk', sans-serif" }}>
            Restez informé
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "16px", marginBottom: "32px", lineHeight: "1.6" }}>
            Rejoignez la newsletter pour être notifié de l'ouverture des prochaines cohortes et des webinaires gratuits.
          </p>
          <form style={{ display: "flex", gap: "12px" }} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="votre@email.com" required style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "14px 20px", borderRadius: "8px", color: "#ffffff", outline: "none" }} />
            <button type="submit" style={{ padding: "14px 28px", background: "var(--neon-cyan)", color: "#0f172a", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer", transition: "all 0.3s" }}>
              S'inscrire
            </button>
          </form>
        </div>
      </section>
    </div>
  );

  if (!isWindow) {
    return <Desktop />;
  }

  return (
    <>
      <Helmet>
        <title>MLAcademy — Hub de Formations IA & MLOps | Dona.ia</title>
        <meta name="description" content="Découvrez nos formations, bootcamps et masterclasses en Data Science, IA et MLOps pour booster votre carrière." />
      </Helmet>
      {content}
    </>
  );
}