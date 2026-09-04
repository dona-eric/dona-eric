import React, { useState } from "react";
import { Link } from "react-router-dom";
import GravatarQR from "./GravatarQR";
import { useLanguage } from "../context/LanguageContext";
import "../styles/Hero.css";

export default function Hero() {
  const [showGravatarModal, setShowGravatarModal] = useState(false);
  const { t } = useLanguage();

  return (
    <section className="hero-section-pixel">
      {/* Background Portrait Blend Overlay */}
      <div className="hero-portrait-bg-container">
        <img 
          src="/eric-donerick.jpg" 
          alt="Dona Eric KOULODJI" 
          className="hero-portrait-bg-img" 
        />
        <div className="hero-portrait-gradient-overlay" />
      </div>

      <div className="hero-container-inner">
        {/* Top Status Pill Badge */}
        <div className="hero-status-pill">
          <span className="hero-status-dot" />
          <span className="hero-status-text">{t("home.badge")}</span>
        </div>

        {/* Main Title Name */}
        <h1 className="hero-name-title">
          DONA ERIC KOULODJI
        </h1>

        {/* Subtitle Highlight */}
        <h2 className="hero-role-subtitle">
          {t("home.heroTitleLine1")} <span className="hero-subtitle-separator">|</span> <span className="hero-accent-text">{t("home.heroTitleLine2")}</span>
        </h2>

        {/* Value Proposition Description */}
        <p className="hero-description-text">
          {t("home.heroSubtitle")}
        </p>

        {/* Tech Stack Pills */}
        <div className="hero-tech-pills">
          <span className="hero-tech-pill">⚡ PyTorch & TensorFlow</span>
          <span className="hero-tech-pill">🚀 MLOps & Docker</span>
          <span className="hero-tech-pill">🤖 Agentic AI & RAG</span>
          <span className="hero-tech-pill">🐍 FastAPI & PySpark</span>
          <span className="hero-tech-pill">Python & SQL</span>
          <span className="hero-tech-pill">NextJs</span>
        </div>

        {/* Action Buttons */}
        <div className="hero-cta-buttons">
          <Link to="/about" className="hero-btn-primary-blue">
            <span>{t("home.btnProjects")}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>

          <Link to="/contact" className="hero-btn-secondary-glass">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>{t("home.btnContact")}</span>
          </Link>
        </div>

        {/* Social Icons Row */}
        <div className="hero-social-row">
          {/* Gravatar QR Button */}
          <button 
            onClick={() => setShowGravatarModal(true)}
            className="hero-social-circle" 
            aria-label="Gravatar QR Code" 
            title="Gravatar QR Code"
            style={{ cursor: "pointer", border: "1px solid rgba(99, 102, 241, 0.4)", color: "#a5b4fc" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </button>

          {/* GitHub */}
          <a href="https://github.com/dona-eric" target="_blank" rel="noopener noreferrer" className="hero-social-circle" aria-label="GitHub" title="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a href="https://linkedin.com/in/dona-erick" target="_blank" rel="noopener noreferrer" className="hero-social-circle" aria-label="LinkedIn" title="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Modal QR Code Gravatar */}
      {showGravatarModal && (
        <GravatarQR onClose={() => setShowGravatarModal(false)} />
      )}
    </section>
  );
}