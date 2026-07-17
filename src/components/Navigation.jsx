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

            {/* ── Logo ── */}
            <Link to="/" className="nav-logo-link">
              <div className="nav-logo-text">
                <span className="nav-logo-bracket">{">_"}</span> Dona.ia
              </div>
            </Link>

            {/* ── Desktop nav ── */}
            <div className="desktop-nav">
              {NAVIGATION.map((item) => {
                const active = isActive(item.path);
                let nameMap = {
                  "about": "À PROPOS",
                  "skills": "COMPÉTENCES",
                  "projects": "PROJETS",
                  "academy": "ACADEMY",
                  "masterclass": "MASTERCLASS",
                  "blog": "BLOG",
                  "contact": "CONTACT"
                };
                const displayName = nameMap[item.name.toLowerCase()] || item.name;

                return (
                  <Link key={item.path} to={item.path} className="nav-link">
                    <span className={`nav-link-text ${active ? "active" : "inactive"}`}>
                      {displayName}
                    </span>
                    <div className={`nav-link-bar ${active ? "active" : "inactive"}`} />
                  </Link>
                );
              })}
            </div>

            {/* ── CTA & Lang ── */}
            <div className="desktop-cta">
              
              {/* Language toggle */}
              <button className="lang-toggle">
                <span>文A</span> FR
              </button>

              <Link to="https://wa.me/+2290151344289" className="cta-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Réserver un appel
              </Link>
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