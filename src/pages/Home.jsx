import React, { useEffect, useRef, useState } from "react";
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

function StatCard({ value, label, delay }) {
  const ref = useScrollFade(delay);
  return (
    <div ref={ref} className="glass home-stat-card">
      <div className="home-stat-gradient" />
      <div className="home-stat-value">{value}</div>
      <div className="home-stat-label">
        {label}
      </div>
    </div>
  );
}

function TrustBadge({ icon, label, delay }) {
  const ref = useScrollFade(delay);
  return (
    <div ref={ref} className="glass home-trust-badge">
      <span className="home-trust-badge-icon">{icon}</span>
      {label}
    </div>
  );
}

export default function Home() {
  const ctaHeaderRef  = useScrollFade(0);
  const ctaTitleRef   = useScrollFade(0.15);
  const ctaDescRef    = useScrollFade(0.25);
  const ctaBtnsRef    = useScrollFade(0.35);
  const ctaStatusRef  = useScrollFade(0.5);
  const trustRef      = useScrollFade(0);

  const stats = [
    { value: "24h",  label: "RÉPONSE GARANTIE" },
    { value: "90%",  label: "PRÉCISION MOYENNE" },
    { value: "5+",   label: "MODÈLES EN PROD" },
    { value: "3",    label: "PAYS TOUCHÉS" },
  ];

  return (
    <main className="home-main">
      <Hero />

      <section id="contact" className="home-section">
        <div className="home-container">

          {/* Badge */}
          <div ref={ctaHeaderRef} className="home-badge">
            <span className="home-badge-dot" />
            🔥 3 PROJETS LIVRÉS CE TRIMESTRE · 1 SLOT DISPONIBLE
          </div>

          {/* Title */}
          <h2 ref={ctaTitleRef} className="home-title">
            Votre concurrent a déjà<br />
            <span className="home-title-gradient">son IA en production.</span>
          </h2>

          {/* Description */}
          <p ref={ctaDescRef} className="home-description">
            Pendant que votre équipe analyse encore les options, je livre un{" "}
            <strong>agent IA opérationnel</strong>,{" "}
            un <strong>pipeline ML en production</strong>{" "}
            ou un <strong>système RAG clé-en-main</strong> —
            en semaines, pas en mois. Zéro POC qui dort. Zéro réunion inutile.{" "}
            <strong className="accent">Du concret pour votre entreprise.</strong>
          </p>

          {/* CTA Buttons */}
          <div ref={ctaBtnsRef} className="home-cta-container">
            <a href="https://wa.me/+2290151344289" target="_blank" rel="noopener noreferrer"
              className="home-cta-primary"
              >
              Démarrer mon projet →
            </a>
            <a href="mailto:donaerickoulodji@gmail.com" 
              className="home-cta-secondary"
              >
              ✉ Me décrire mon besoin
            </a>
          </div>

          {/* Stats mini-row */}
          <div className="home-stats-grid">
            {stats.map((s, i) => <StatCard key={i} {...s} delay={0.4 + i * 0.08} />)}
          </div>

          {/* Garanties */}
          <div ref={ctaStatusRef} className="home-status-container">
            {[
              "Réponse sous 24h",
              "Livraison en semaines",
              "Code propre · Documenté",
              "Remote · Freelance · Contract"
            ].map((g) => (
              <span key={g} className="home-status-item">
                <span className="home-status-icon">✓</span> {g}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="home-trust-section">
        <div className="home-container">
          <div ref={trustRef} className="home-trust-header">
            <span className="home-trust-accent">//</span> ILS M'ONT FAIT CONFIANCE
          </div>

          <div className="home-trust-grid">
            <TrustBadge icon="🏢" label="Entreprises Tech" delay={0.1} />
            <TrustBadge icon="🚀" label="Startups Africaines" delay={0.2} />
            <TrustBadge icon="🎓" label="Institutions académiques" delay={0.3} />
            <TrustBadge icon="🌍" label="Clients internationaux" delay={0.4} />
          </div>
        </div>
      </section>

    </main>
  );
}