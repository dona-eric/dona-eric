import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAVIGATION } from "../config/constants";
import "../styles/Navigation.css";

const Navigation = () => {
  const [isOpen, setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={`nav-main ${scrolled ? "scrolled" : "transparent"}`}>
        <div className="nav-container">
          <div className="nav-header">

            {/* ── Logo Monogram ── */}
            <Link to="/" className="nav-logo-link">
              <div className="nav-logo-monogram">
                <span className="nav-logo-letter">D</span>
                <span className="nav-logo-dot" />
              </div>
            </Link>

            {/* ── Desktop nav ── */}
            <div className="desktop-nav">
              <Link to="/" className="nav-link">
                <span className={`nav-link-text ${isActive('/') ? 'active' : 'inactive'}`}>Home</span>
                <div className={`nav-link-bar ${isActive('/') ? 'active' : 'inactive'}`} />
              </Link>
              <Link to="/projects" className="nav-link">
                <span className={`nav-link-text ${isActive('/projects') ? 'active' : 'inactive'}`}>Projets</span>
                <div className={`nav-link-bar ${isActive('/projects') ? 'active' : 'inactive'}`} />
              </Link>
              <Link to="/about" className="nav-link">
                <span className={`nav-link-text ${isActive('/about') ? 'active' : 'inactive'}`}>À propos</span>
                <div className={`nav-link-bar ${isActive('/about') ? 'active' : 'inactive'}`} />
              </Link>
              <Link to="/contact" className="nav-link">
                <span className={`nav-link-text ${isActive('/contact') ? 'active' : 'inactive'}`}>Contact</span>
                <div className={`nav-link-bar ${isActive('/contact') ? 'active' : 'inactive'}`} />
              </Link>
              <Link to="/academy" className="nav-link">
                <span className={`nav-link-text ${isActive('/academy') ? 'active' : 'inactive'}`}>MLAcademy</span>
                <div className={`nav-link-bar ${isActive('/academy') ? 'active' : 'inactive'}`} />
              </Link>
            </div>

            {/* ── Right Utilities & CTA ── */}
            <div className="desktop-cta">
              <a href="/cv-dona-eric.pdf" target="_blank" rel="noopener noreferrer" className="btn-cv-pill">
                Télécharger CV
              </a>
              <div 
                className="lang-toggle-pill" 
                title="Langue : Français (Default)"
                style={{ cursor: "pointer" }}
              >
                <span>🇫🇷</span> FR <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
              <button 
                className="theme-toggle-btn" 
                aria-label="Toggle theme"
                title="Thème Sombre / Yaru Dark actif"
                style={{ cursor: "pointer" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              </button>
            </div>

            {/* ── Mobile burger ── */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mobile-burger"
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                {isOpen ? (
                  <>
                    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </>
                ) : (
                  <>
                    <line x1="4" y1="6"  x2="20" y2="6"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="4" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* ── Mobile menu ── */}
          {isOpen && (
            <div className="mobile-menu">
              <div className="mobile-menu-list">
                {NAVIGATION.map((item) => {
                  const active = isActive(item.path);
                  let nameMap = {
                    "about": "À PROPOS",
                    "skills": "COMPÉTENCES",
                    "projects": "PROJETS",
                    "masterclass": "MASTERCLASS",
                    "blog": "BLOG",
                    "contact": "CONTACT"
                  };
                  const displayName = nameMap[item.name.toLowerCase()] || item.name;

                  return (
                    <Link key={item.path} to={item.path}
                      className={`mob-link ${active ? "active" : "inactive"}`}>
                      {displayName}
                    </Link>
                  );
                })}
              </div>

              <Link to="https://wa.me/+2290151344289" className="mobile-cta">
                Réserver un appel
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;