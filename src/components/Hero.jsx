import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Hero.css";

const useFadeIn = (delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`;
    const t = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 60);
    return () => clearTimeout(t);
  }, [delay]);
  return ref;
};

// Tech Icon Component
function TechIcon({ name, color, icon }) {
  return (
    <div className="hero-tech-icon">
      <div className="hero-tech-icon-box"
      style={{ color: color }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.background = `rgba(${color}, 0.1)`;
        e.currentTarget.style.boxShadow = `0 4px 15px rgba(${color}, 0.2)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
        e.currentTarget.style.boxShadow = "none";
      }}
      >
        {icon}
      </div>
      <span className="hero-tech-icon-label">
        {name}
      </span>
    </div>
  );
}

// Social Button
function SocialBtn({ href, icon, color="#00d4ff" }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="hero-social-btn"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ 
        background: hov ? `${color}15` : "rgba(255,255,255,0.02)", 
        border: `1px solid ${hov ? `${color}50` : "rgba(255,255,255,0.08)"}`, 
        color: hov ? color : "#64748b", 
      }}>
      <span className="hero-social-icon">{icon}</span>
    </a>
  );
}

// Stat Card
function StatCard({ value, label, delay }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className="hero-stat-card">
      <div className="hero-stat-val">
        {value}
      </div>
      <div className="hero-stat-label">
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  const badgeRef  = useFadeIn(0.1);
  const titleRef  = useFadeIn(0.3);
  const subtitleRef = useFadeIn(0.5);
  const descRef   = useFadeIn(0.7);
  const ctaRef    = useFadeIn(0.9);
  const statsRef  = useFadeIn(1.1);
  const socialRef = useFadeIn(1.3);
  const techRef   = useFadeIn(1.5);

  return (
    <>
      <div className="hero-main">
        
        {/* Fake nodes */}
        <div className="circuit-node" style={{ top: "30%", left: "20%" }} />
        <div className="circuit-node pink" style={{ top: "70%", left: "80%" }} />
        <div className="circuit-node" style={{ top: "20%", right: "30%" }} />
        <div className="circuit-node pink" style={{ bottom: "20%", left: "30%" }} />

        <div className="hero-content">
          
          {/* Avatar */}
          {/* <div ref={badgeRef} className="hero-avatar-container">
            <div className="hero-avatar-ring">
              <img src="/dona.JPG" alt="Dona Éric KOULODJI" className="hero-avatar-img" />
            </div>
            
            {/* Badge */}
            {/* <div className="hero-badge">
              <span className="hero-badge-dot" />
              DISPONIBLE POUR DE NOUVELLES OPPORTUNITÉS
            </div>
          </div> */}

          {/* Title */}
          <h1 ref={titleRef} className="hero-title">
            Dona Éric
            <span className="gradient-text">   KOULODJI</span>
          </h1>

          {/* Subtitle */}
          <h2 ref={subtitleRef} className="hero-subtitle">
            Ingénieur Machine Learning & Data Scientist
          </h2>

          {/* Description */}
          <p ref={descRef} className="hero-desc">
            Spécialisé en conception d'architectures d'IA distribuées, gestion de données complexes et déploiement de modèles performants. Prêt à m'investir dans des défis techniques stimulants.
          </p>

          {/* Buttons */}
          <div ref={ctaRef} className="hero-cta">
            <Link to="/contact" className="hero-btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Me contacter
            </Link>
            <Link to="/projects" className="hero-btn-secondary">
              Voir mon travail
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="hero-stats-grid">
            <StatCard value="5+" label="SYSTÈMES IA EN PROD" delay={1.1} />
            <StatCard value="7+" label="PROJETS LIVRÉS" delay={1.3} />
            <StatCard value="95%" label="PRÉCISION MOYENNE" delay={1.4} />
          </div>

          {/* Socials */}
          <div ref={socialRef} className="hero-socials">
            <SocialBtn href="https://github.com/dona-eric" color="#f8fafc" icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            }/>
            <SocialBtn href="https://linkedin.com/in/dona-erick" color="#0a66c2" icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            }/>
            <SocialBtn href="https://x.com/EricSchrodinger" color="#f8fafc" icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            }/>
          </div>

          {/* Tech Stack */}
          <div ref={techRef} className="hero-tech-grid">
            <TechIcon name="Linux" color="#FCC624" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.185 5.584c-1.393-.162-2.738.704-3.111 2.046-.229.824-.131 1.763.504 2.459-1.282.893-1.636 2.65-.89 4.015.654 1.196 2.091 1.621 3.256.974.88-.489 1.353-1.464 1.3-2.457 2.062.296 3.996-1.026 4.316-3.076.223-1.433-.653-2.827-2.072-3.08-1.066-.191-2.126.33-2.678 1.257-.128-1.162-1.288-2.001-2.463-1.921l-.162-.217z"/></svg>} />
            <TechIcon name="PostgreSQL" color="#336791" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm2-11.5v4l3 1.5v2l-5-2.5-5 2.5v-2l3-1.5v-4h4z"/></svg>} />
            <TechIcon name="Docker" color="#2496ED" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.185m-2.95 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185h-2.119a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.185m2.95 2.714h2.118a.187.187 0 00.186-.186V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.95 0h2.12a.187.187 0 00.184-.186V9.006a.186.186 0 00-.185-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.951 0h2.119a.186.186 0 00.185-.186V9.006a.185.185 0 00-.185-.186h-2.119a.186.186 0 00-.185.185v1.888c0 .102.082.185.185.185M22.25 10.364s-1.077-.493-3.483.08a4.912 4.912 0 00-2.453-2.022.087.087 0 00-.097.027l-1.01 1.258a.185.185 0 01-.144.068h-11.23a2.311 2.311 0 00-1.748.777c-1.378 1.558-.962 4.673-.34 6.643 1.096 3.473 4.298 5.176 8.528 5.176h4.095c4.108 0 7.37-1.464 8.784-4.877 1.081-2.617.904-5.32-.002-7.13z"/></svg>} />
            <TechIcon name="Python" color="#3776AB" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.01-1.39.06-1.54.16-1.65.26-1.7.38-1.71.5-1.69.64-1.62.77-1.5.9-1.34 1.02-1.15 1.15-.93 1.26-.69 1.35-.44 1.4-.19 1.41.02.6.14.5.21.41.28.33.32.27.36.2.37.15.36.1.34.07.32.04.27.02.21V8.5h3.06l.03-.21.07-.28.12-.32.18-.35.26-.36.36-.36.46-.35.59-.32.73-.28.88-.21 1.05-.14 1.23-.05 1.39.01 1.54.06 1.65.16 1.7.26 1.71.38 1.69.5 1.62.64 1.5.77 1.34.9 1.15 1.02.93 1.15.69 1.26.44 1.35.19 1.4-.02 1.41zM8.09 18.25l-.26.04-.2.07-.15.11-.1.14-.04.18V20.5l.04.18.1.14.15.11.2.07.26.04h7.82l.26-.04.2-.07.15-.11.1-.14.04-.18v-1.71l-.04-.18-.1-.14-.15-.11-.2-.07-.26-.04zM3.45 6.44l.2.06.16.1.13.14.08.18v.22l-.08.18-.13.14-.16.1-.2.06H1.72l-.2-.06-.16-.1-.13-.14-.08-.18v-.22l.08-.18.13-.14.16-.1.2-.06z"/></svg>} />
            <TechIcon name="Javascript" color="#F7DF1E" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.464.54-.674 1.154-.674.807 0 1.52.39 2.052 1.02l1.644-1.22c-.896-1.146-2.083-1.614-3.696-1.614-1.928 0-3.328.915-3.805 2.502-.15.48-.12 1.049.03 1.513.315 1.033 1.213 1.512 2.77 2.127.913.36 1.527.674 1.691 1.258.12.375.045.748-.21.99-.27.27-.688.42-1.152.42-1.077 0-1.857-.494-2.5-1.393l-1.664 1.2c.988 1.453 2.38 2.082 4.164 2.082 2.158 0 3.738-1.047 4.148-2.756.164-.614.134-1.256-.03-1.844h.024zM8.341 12.35v6.52c0 1.29-.39 1.903-1.663 1.903-.54 0-1.063-.165-1.513-.45l-1.064 1.408c.75.525 1.768.808 2.876.808 2.368 0 3.327-1.42 3.327-3.957v-6.23h-1.963z"/></svg>} />
            <TechIcon name="FastAPI" color="#009688" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.92 18.23l-3.34-6.09H11.5L12 3l3.66 9.14H12.5l-1.42 6.09z"/></svg>} />
            <TechIcon name="ReactJs | NextJs" color="#004896ff" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.464.54-.674 1.154-.674.807 0 1.52.39 2.052 1.02l1.644-1.22c-.896-1.146-2.083-1.614-3.696-1.614-1.928 0-3.328.915-3.805 2.502-.15.48-.12 1.049.03 1.513.315 1.033 1.213 1.512 2.77 2.127.913.36 1.527.674 1.691 1.258.12.375.045.748-.21.99-.27.27-.688.42-1.152.42-1.077 0-1.857-.494-2.5-1.393l-1.664 1.2c.988 1.453 2.38 2.082 4.164 2.082 2.158 0 3.738-1.047 4.148-2.756.164-.614.134-1.256-.03-1.844h.024zM8.341 12.35v6.52c0 1.29-.39 1.903-1.663 1.903-.54 0-1.063-.165-1.513-.45l-1.064 1.408c.75.525 1.768.808 2.876.808 2.368 0 3.327-1.42 3.327-3.957v-6.23h-1.963z"/></svg>}></TechIcon>
          </div>

        </div>
      </div>
    </>
  );
}
