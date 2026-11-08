import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import GravatarQR from "./GravatarQR";
import { useLanguage } from "../context/LanguageContext";
import "../styles/Hero.css";

const TYPING_ROLES = [
  "ML Engineer & Data Scientist",
  "Deep Learning Specialist",
  "LLM & RAG Architect",
  "MLOps Engineer",
  "AI Educator & Mentor",
];

function TypingText() {
  const [displayed, setDisplayed] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const current = TYPING_ROLES[roleIdx];
    if (isPaused) {
      const timer = setTimeout(() => { setIsPaused(false); setIsDeleting(true); }, 1800);
      return () => clearTimeout(timer);
    }
    if (!isDeleting && displayed.length < current.length) {
      const timer = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 65);
      return () => clearTimeout(timer);
    }
    if (!isDeleting && displayed.length === current.length) { setIsPaused(true); return; }
    if (isDeleting && displayed.length > 0) {
      const timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38);
      return () => clearTimeout(timer);
    }
    if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIdx((prev) => (prev + 1) % TYPING_ROLES.length);
    }
  }, [displayed, roleIdx, isDeleting, isPaused]);

  return (
    <span className="hero-typing-text">
      {displayed}<span className="hero-cursor">|</span>
    </span>
  );
}

function HeroStatCounter({ target, suffix = "", label }) {
  const initial = parseFloat(target) || 0;
  const [val, setVal] = useState(initial);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num = parseFloat(target) || 0;
        const steps = 40;
        let step = 0;
        setVal(0);
        const id = setInterval(() => {
          step++;
          const ease = 1 - Math.pow(1 - step / steps, 3);
          setVal(Math.round(num * ease));
          if (step >= steps) clearInterval(id);
        }, 1200 / steps);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div className="hero-stat-item" ref={ref}>
      <span className="hero-stat-value">{val}<span className="hero-stat-plus">{suffix}</span></span>
      <span className="hero-stat-label">{label}</span>
    </div>
  );
}

export default function Hero() {
  const [showGravatarModal, setShowGravatarModal] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { t } = useLanguage();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 9;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="hero-section-pixel">
      {/* Background Portrait Blend Overlay — with parallax */}
      <div className="hero-portrait-bg-container">
        <img
          src="/eric-donerick.jpg"
          alt="Dona Eric KOULODJI"
          className="hero-portrait-bg-img"
          style={{
            transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px) scale(1.06)`,
            transition: "transform 0.2s ease-out",
          }}
        />
        <div className="hero-portrait-gradient-overlay" />
      </div>

      {/* Floating depth orbs */}
      <div className="hero-orb hero-orb-1" style={{ transform: `translate(${mousePos.x * -0.7}px, ${mousePos.y * -0.5}px)` }} />
      <div className="hero-orb hero-orb-2" style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.3}px)` }} />

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

        {/* Typing Animated Subtitle */}
        <div className="hero-typing-container">
          <TypingText />
        </div>

        {/* Value Proposition Description */}
        <p className="hero-description-text">
          {t("home.heroSubtitle")}
        </p>

        {/* Tech Stack Pills */}
        <div className="hero-tech-pills">
          <span className="hero-tech-pill">⚡ PyTorch &amp; TensorFlow</span>
          <span className="hero-tech-pill">🚀 MLOps &amp; Docker</span>
          <span className="hero-tech-pill">🤖 Agentic AI &amp; RAG</span>
          <span className="hero-tech-pill">🐍 FastAPI &amp; PySpark</span>
          <span className="hero-tech-pill">📊 Python, SQL &amp; Scikit-Learn</span>
        </div>

        {/* Action Buttons */}
        <div className="hero-cta-buttons">
          <Link to="/projects" className="hero-btn-primary-blue">
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

          <a href="/cv_dona_eric.pdf" target="_blank" rel="noopener noreferrer" className="hero-btn-cv-ghost">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
            <span>CV PDF</span>
          </a>
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

          {/* WhatsApp */}
          <a href="https://wa.me/2290151344289" target="_blank" rel="noopener noreferrer" className="hero-social-circle" aria-label="WhatsApp" title="WhatsApp"
            style={{ border: "1px solid rgba(34, 197, 94, 0.35)", color: "#4ade80" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>

        {/* Animated Stats Strip */}
        <div className="hero-stats-strip">
          <HeroStatCounter target="3" suffix="" label="Systèmes en Prod" />
          <div className="hero-stat-divider" />
          <HeroStatCounter target="8" suffix="" label="Projets au Portfolio" />
          <div className="hero-stat-divider" />
          <div className="hero-stat-item">
            <span className="hero-stat-value">&lt;48<span className="hero-stat-plus">h</span></span>
            <span className="hero-stat-label">Démarrage Projet</span>
          </div>
          <div className="hero-stat-divider" />
          <HeroStatCounter target="3" suffix="" label="Pays Touchés" />
        </div>
      </div>

      {/* Modal QR Code Gravatar */}
      {showGravatarModal && (
        <GravatarQR onClose={() => setShowGravatarModal(false)} />
      )}
    </section>
  );
}