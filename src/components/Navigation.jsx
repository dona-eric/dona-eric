import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAVIGATION } from "../config/constants";

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .nav-link-text { transition: color 0.2s ease; }
        .nav-link:hover .nav-link-text { color: #fff !important; }
        .nav-link:hover .nav-link-bar { opacity: 1 !important; transform: scaleX(1) !important; }
        .cta-btn {
          transition: all 0.3s ease;
        }
        .cta-btn:hover {
          background: #00b8e6 !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
        }
        .lang-toggle:hover {
          background: rgba(255, 255, 255, 0.1) !important;
        }
      `}</style>

      <nav style={{
        position: "sticky", top: 0, zIndex: 50, width: "100%",
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(4,7,12,0.95)" : "rgba(6,10,15,0.8)",
        borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.08)" : "transparent"}`,
        backdropFilter: "blur(12px)",
      }}>
        <div style={{
          maxWidth: 1400, margin: "0 auto", padding: "0 24px",
          position: "relative", zIndex: 1
        }}>
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", height: 80
          }}>

            {/* ── Logo ── */}
            <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", color: "#fff"
              }}>
                <span style={{ color: "#00d4ff" }}>{">_"}</span> Dona.dev
              </div>
            </Link>

            {/* ── Desktop nav ── */}
            <div style={{
              display: "flex", alignItems: "center", gap: 32,
              fontFamily: "'Inter', sans-serif"
            }} className="desktop-nav">
              {NAVIGATION.map((item) => {
                const active = isActive(item.path);
                let nameMap = {
                  "home": "ACCUEIL",
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
                    className="nav-link"
                    style={{
                      position: "relative", padding: "8px 0",
                      textDecoration: "none",
                      display: "flex", flexDirection: "column", alignItems: "center"
                    }}>
                    <span className="nav-link-text" style={{
                      fontSize: 13, fontWeight: 500, letterSpacing: "0.08em",
                      color: active ? "#fff" : "#94a3b8",
                      textTransform: "uppercase"
                    }}>{displayName}</span>
                    <div className="nav-link-bar" style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      height: 2, background: "#00d4ff",
                      opacity: active ? 1 : 0, 
                      transform: active ? "scaleX(1)" : "scaleX(0)",
                      transition: "all 0.3s ease",
                      transformOrigin: "center"
                    }} />
                  </Link>
                );
              })}
            </div>

            {/* ── CTA & Lang ── */}
            <div className="desktop-cta" style={{ display: "flex", alignItems: "center", gap: 16 }}>
              
              {/* Language toggle */}
              <button className="lang-toggle" style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 12px", borderRadius: 20,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#94a3b8", fontFamily: "'Inter', sans-serif",
                fontSize: 12, fontWeight: 600, cursor: "pointer",
                transition: "all 0.2s ease"
              }}>
                <span>文A</span> FR
              </button>

              <Link to="https://wa.me/+2290151344289" className="cta-btn" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "10px 24px", borderRadius: 24,
                background: "#00d4ff",
                color: "#0f172a", textDecoration: "none",
                fontFamily: "'Inter', sans-serif",
                fontSize: 14, fontWeight: 600,
              }}>
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
              style={{
                display: "none", padding: "8px", borderRadius: 4,
                background: "transparent", border: "none",
                color: "#f8fafc", cursor: "pointer", lineHeight: 0,
              }}
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
            <div style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              padding: "24px 0", display: "none"
            }} className="mobile-menu">
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
                {NAVIGATION.map((item) => {
                  const active = isActive(item.path);
                  let nameMap = {
                    "home": "ACCUEIL",
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
                      className="mob-link"
                      style={{
                        display: "flex", alignItems: "center",
                        textDecoration: "none",
                        color: active ? "#00d4ff" : "#e2e8f0",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 16, fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em"
                      }}>
                      {displayName}
                    </Link>
                  );
                })}
              </div>

              <Link to="https://wa.me/+2290151344289" style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "14px", borderRadius: 8, textDecoration: "none",
                background: "#00d4ff",
                color: "#0f172a", fontFamily: "'Inter', sans-serif",
                fontSize: 14, fontWeight: 600,
                width: "100%"
              }}>
                Réserver un appel
              </Link>
            </div>
          )}
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .desktop-nav  { display: none !important; }
            .desktop-cta  { display: none !important; }
            .mobile-burger{ display: block !important; }
            .mobile-menu  { display: flex !important; flex-direction: column; }
          }
        `}</style>
      </nav>
    </>
  );
};

export default Navigation;