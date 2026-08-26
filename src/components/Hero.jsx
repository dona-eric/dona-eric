import React, { useState } from "react";
import { Link } from "react-router-dom";
import GravatarQR from "./GravatarQR";
import "../styles/Hero.css";

export default function Hero() {
  const [showGravatarModal, setShowGravatarModal] = useState(false);

  return (
    <section className="hero-section-pixel">
      {/* Background Portrait Blend Overlay */}
      <div className="hero-portrait-bg-container">
        <img 
          src="/eric-dona.jpg" 
          alt="Dona Eric KOULODJI" 
          className="hero-portrait-bg-img" 
        />
        <div className="hero-portrait-gradient-overlay" />
      </div>

      <div className="hero-container-inner">
        {/* Top Status Pill Badge */}
        <div className="hero-status-pill">
          <span className="hero-status-dot" />
          <span className="hero-status-text">DISPONIBLE POUR DE NOUVEAUX PROJETS</span>
        </div>

        {/* Main Title Name */}
        <h1 className="hero-name-title">
          DONA ERIC KOULODJI
        </h1>

        {/* Subtitle Highlight */}
        <h2 className="hero-role-subtitle">
          Ingénieur Machine Learning <span className="hero-subtitle-separator">|</span> <span className="hero-accent-text">Expertise MLOps</span> & Fondateur MLAcademy
        </h2>

        {/* Value Proposition Description */}
        <p className="hero-description-text">
          De la <span className="gradient-text">Physique Mathématique</span> à la data et l'intelligence Artificielle, je structure des architectures MLOps fiables, scalables et performantes. Spécialiste en Machine Learning, Agentic AI et Data Science, je transforme vos défis techniques en leviers de croissance durables.
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
            <span>Découvrez-moi ici</span>
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
            <span>Me Contacter</span>
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

          {/* Twitter / X */}
          <a href="https://twitter.com/@EricSchrodinger" target="_blank" rel="noopener noreferrer" className="hero-social-circle" aria-label="Twitter" title="Twitter / X">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          {/* WhatsApp */}
          <a href="https://wa.me/+2290151344289" target="_blank" rel="noopener noreferrer" className="hero-social-circle" aria-label="WhatsApp" title="WhatsApp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.926 0-3.815-.518-5.467-1.498l-.392-.232-4.062 1.065 1.084-3.961-.254-.405c-1.077-1.716-1.644-3.702-1.644-5.742 0-6.024 4.899-10.923 10.926-10.923 2.919 0 5.662 1.136 7.727 3.204 2.064 2.067 3.2 4.811 3.2 7.727 0 6.026-4.898 10.925-10.924 10.925m0-20.082C5.972 1.761 1 6.733 1 12.877c0 2.372.684 4.606 1.978 6.514L0 25l5.772-1.513a11.08 11.08 0 0 0 6.279 1.916c6.046 0 10.967-4.921 10.967-10.966 0-2.93-1.141-5.684-3.214-7.757C17.73 4.59 14.976 3.447 12.051 3.447"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Gravatar Modal */}
      {showGravatarModal && (
        <div 
          onClick={() => setShowGravatarModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "rgba(2, 6, 23, 0.85)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative" }}>
            <button
              onClick={() => setShowGravatarModal(false)}
              style={{
                position: "absolute",
                top: "-12px",
                right: "-12px",
                background: "#1e293b",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#ffffff",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                fontSize: "18px",
                cursor: "pointer",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              ×
            </button>
            <GravatarQR email="donaerickoulodji@gmail.com" defaultType="gravatar" defaultVersion="3" size={350} />
          </div>
        </div>
      )}
    </section>
  );
}