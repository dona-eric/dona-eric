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
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;600;700&display=swap');
        .nav-link-text  { transition: color 0.2s ease; }
        .nav-link:hover .nav-link-text { color: #00d4ff !important; }
        .nav-link:hover .nav-link-bar  { opacity: 1 !important; }
        .cta-nav:hover  {
          background: linear-gradient(135deg,#0891b2,#4338ca) !important;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(0,212,255,0.2) !important;
        }
        .mob-link:hover { background: rgba(0,212,255,0.06) !important; border-color: rgba(0,212,255,0.2) !important; }
        .mob-link:hover .mob-link-text { color: #00d4ff !important; }
        @keyframes pulseDot { 0%,100%{box-shadow:0 0 6px #22c55e}50%{box-shadow:0 0 14px #22c55e} }
      `}</style>

      <nav style={{
        position: "sticky", top: 0, zIndex: 50, width: "100%",
        transition: "all 0.3s ease",
        background: scrolled
          ? "rgba(4,7,12,0.97)"
          : "rgba(6,10,15,0.92)",
        borderBottom: `1px solid ${scrolled ? "rgba(0,212,255,0.12)" : "rgba(255,255,255,0.05)"}`,
        backdropFilter: "blur(20px)",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.4)" : "none"
      }}>

        {/* Subtle grid overlay */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)`,
          backgroundSize: "48px 48px"
        }} />

        {/* Bottom gradient line on scroll */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)",
          opacity: scrolled ? 1 : 0, transition: "opacity 0.3s"
        }} />

        <div style={{
          maxWidth: 1160, margin: "0 auto", padding: "0 24px",
          position: "relative", zIndex: 1
        }}>
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", height: 68
          }}>

            {/* ── Logo ── */}
            <Link to="/" style={{ textDecoration: "none" }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 15, fontWeight: 700, letterSpacing: "0.05em"
              }}>
                <span style={{ color: "#475569" }}>{"<"}</span>
                <span style={{
                  background: "linear-gradient(135deg, #00d4ff, #6366f1)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                }}>DEK</span>
                <span style={{ color: "#475569" }}>{" />"}</span>
              </div>
            </Link>

            {/* ── Desktop nav ── */}
            <div style={{
              display: "flex", alignItems: "center", gap: 4,
              fontFamily: "'JetBrains Mono', monospace"
            }} className="desktop-nav">
              {NAVIGATION.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link key={item.path} to={item.path}
                    className="nav-link"
                    style={{
                      position: "relative", padding: "8px 14px",
                      borderRadius: 4, textDecoration: "none",
                      background: active ? "rgba(0,212,255,0.08)" : "transparent",
                      border: `1px solid ${active ? "rgba(0,212,255,0.25)" : "transparent"}`,
                      transition: "all 0.2s ease"
                    }}>
                    <span className="nav-link-text" style={{
                      fontSize: 12, fontWeight: 500, letterSpacing: "0.06em",
                      color: active ? "#00d4ff" : "#64748b"
                    }}>{item.name}</span>
                    {/* Active dot */}
                    {active && (
                      <span style={{
                        position: "absolute", top: 5, right: 5,
                        width: 4, height: 4, borderRadius: "50%",
                        background: "#00d4ff",
                        boxShadow: "0 0 6px #00d4ff"
                      }} />
                    )}
                    {/* Hover underbar */}
                    <div className="nav-link-bar" style={{
                      position: "absolute", bottom: 0, left: "20%", right: "20%",
                      height: 1, borderRadius: 1,
                      background: "linear-gradient(90deg, transparent, #00d4ff, transparent)",
                      opacity: 0, transition: "opacity 0.2s"
                    }} />
                  </Link>
                );
              })}
            </div>

            {/* ── CTA ── */}
            <div className="desktop-cta" style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* Availability dot */}
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10, color: "#22c55e", letterSpacing: "0.08em"
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%", background: "#22c55e",
                  animation: "pulseDot 2s ease infinite", display: "inline-block"
                }} />
                open_to_work
              </div>

              <Link href="/contact" className="cta-nav" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "8px 18px", borderRadius: 4,
                background: "linear-gradient(135deg, #0e7490, #4338ca)",
                color: "#f0f9ff", textDecoration: "none",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12, fontWeight: 600, letterSpacing: "0.06em",
                transition: "all 0.25s ease",
                boxShadow: "0 2px 12px rgba(0,212,255,0.1)"
              }}>
                hire_me() →
              </Link>
            </div>

            {/* ── Mobile burger ── */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                display: "none", padding: "8px", borderRadius: 4,
                background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
                color: "#64748b", cursor: "pointer", lineHeight: 0,
                transition: "all 0.2s"
              }}
              className="mobile-burger"
              aria-label="Toggle menu"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                {isOpen ? (
                  <>
                    <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="16" y1="2" x2="2" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </>
                ) : (
                  <>
                    <line x1="2" y1="5"  x2="16" y2="5"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="2" y1="9"  x2="16" y2="9"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="2" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* ── Mobile menu ── */}
          {isOpen && (
            <div style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              padding: "16px 0 20px", display: "none"
            }} className="mobile-menu">
              <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 16 }}>
                {NAVIGATION.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link key={item.path} to={item.path}
                      className="mob-link"
                      style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "12px 14px", borderRadius: 4, textDecoration: "none",
                        background: active ? "rgba(0,212,255,0.08)" : "transparent",
                        border: `1px solid ${active ? "rgba(0,212,255,0.25)" : "transparent"}`,
                        transition: "all 0.2s ease"
                      }}>
                      <span style={{
                        width: 5, height: 5, borderRadius: "50%",
                        background: active ? "#00d4ff" : "rgba(255,255,255,0.15)",
                        boxShadow: active ? "0 0 6px #00d4ff" : "none",
                        flexShrink: 0
                      }} />
                      <span className="mob-link-text" style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 13, fontWeight: 500,
                        color: active ? "#00d4ff" : "#64748b",
                        letterSpacing: "0.06em", transition: "color 0.2s"
                      }}>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile CTA */}
              <Link href="https://wa.me/+2290141730240" target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "13px", borderRadius: 4, textDecoration: "none",
                  background: "linear-gradient(135deg, #0e7490, #4338ca)",
                  color: "#f0f9ff", fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13, fontWeight: 600, letterSpacing: "0.05em",
                  marginBottom: 12
                }}>
                ✉ WhatsApp → démarrer
              </Link>

              {/* Mobile availability */}
              <div style={{
                display: "flex", justifyContent: "center",
                alignItems: "center", gap: 8,
                padding: "8px", borderRadius: 4,
                background: "rgba(34,197,94,0.07)",
                border: "1px solid rgba(34,197,94,0.2)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11, color: "#22c55e"
              }}>
                <span style={{
                  width: 5, height: 5, borderRadius: "50%", background: "#22c55e",
                  animation: "pulseDot 2s ease infinite", display: "inline-block"
                }} />
                Disponible pour projets · Open=True
              </div>
            </div>
          )}
        </div>

        {/* Responsive styles */}
        <style>{`
          @media (max-width: 768px) {
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