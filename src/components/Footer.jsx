import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NAVIGATION } from "../config/constants";

const SOCIALS = [
  { label: "GitHub",   href: "https://github.com/dona-eric",           icon: "⌥" },
  { label: "LinkedIn", href: "https://linkedin.com/in/dona-erick",      icon: "◈" },
  { label: "Twitter",  href: "https://twitter.com/ericschrodinger",     icon: "✕" },
  { label: "WhatsApp", href: "https://wa.me/2290151344289",             icon: "✉" },
];

const QUICK_LINKS = [
  { label: "About",    href: "/about"    },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Contact",  href: "/contact"  },
];

const EXPERTISE = [
  "Machine Learning",
  "Deep Learning",
  "LLM / RAG",
  "MLOps",
  "Computer Vision",
  "Data Science",
];

function SocialBtn({ item }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={item.href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: 36, height: 36, borderRadius: 4,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: hov ? "rgba(0,212,255,0.1)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hov ? "rgba(0,212,255,0.35)" : "rgba(255,255,255,0.08)"}`,
        color: hov ? "#00d4ff" : "#475569",
        fontSize: 14, transition: "all 0.2s ease", textDecoration: "none",
        fontFamily: "monospace"
      }} aria-label={item.label}>
      {item.icon}
    </a>
  );
}

function FooterLink({ href, label, isRoute }) {
  const [hov, setHov] = useState(false);
  const style = {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
    color: hov ? "#00d4ff" : "#475569",
    textDecoration: "none", transition: "color 0.2s ease",
    letterSpacing: "0.04em"
  };
  return isRoute
    ? <Link to={href} style={style} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{label}</Link>
    : <a href={href} style={style} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{label}</a>;
}

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;600&display=swap');
        @keyframes pulseDot { 0%,100%{box-shadow:0 0 6px #22c55e}50%{box-shadow:0 0 14px #22c55e} }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-brand { grid-column: 1 / -1 !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <footer style={{
        background: "#040710",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        position: "relative", overflow: "hidden",
        fontFamily: "'Space Grotesk', sans-serif"
      }}>

        {/* Grid bg */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px)`,
          backgroundSize: "48px 48px"
        }} />

        {/* Top accent */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.3), rgba(99,102,241,0.3), transparent)"
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1160, margin: "0 auto", padding: "64px 24px 0" }}>

          {/* ── Main grid ── */}
          <div className="footer-grid" style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 40, marginBottom: 56
          }}>

            {/* Brand */}
            <div className="footer-brand">
              {/* Logo */}
              <div style={{ marginBottom: 16 }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 16, fontWeight: 700
                }}>
                  <span style={{ color: "#334155" }}>{"<"}</span>
                  <span style={{
                    background: "linear-gradient(135deg, #00d4ff, #6366f1)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                  }}>DEK</span>
                  <span style={{ color: "#334155" }}>{" />"}</span>
                </span>
              </div>

              {/* Name + role */}
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11, color: "#334155",
                letterSpacing: "0.12em", marginBottom: 8
              }}>// profile</div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#94a3b8", marginBottom: 4 }}>
                Dona Éric KOULODJI
              </p>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11, color: "#475569", marginBottom: 20, letterSpacing: "0.05em"
              }}>
                <span style={{ color: "#6366f1" }}>role</span> :: Data Scientist → ML Engineer
              </p>

              {/* Location */}
              <div style={{
                display: "flex", alignItems: "center", gap: 8, marginBottom: 24,
                fontFamily: "monospace", fontSize: 12, color: "#475569"
              }}>
                <span style={{ color: "#334155" }}>📍</span>
                Abomey-Calavi, Bénin · Remote OK
              </div>

              {/* Availability */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "6px 14px", borderRadius: 4, marginBottom: 24,
                background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)",
                fontFamily: "monospace", fontSize: 11, color: "#22c55e"
              }}>
                <span style={{
                  width: 5, height: 5, borderRadius: "50%", background: "#22c55e",
                  animation: "pulseDot 2s ease infinite", display: "inline-block"
                }} />
                AVAILABLE_FOR_HIRE :: open=True
              </div>

              {/* Socials */}
              <div style={{ display: "flex", gap: 8 }}>
                {SOCIALS.map(s => <SocialBtn key={s.label} item={s} />)}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                color: "#334155", letterSpacing: "0.15em", marginBottom: 16
              }}>// navigation</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {QUICK_LINKS.map(l => (
                  <FooterLink key={l.href} href={l.href} label={l.label} isRoute />
                ))}
              </div>
            </div>

            {/* Expertise */}
            <div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                color: "#334155", letterSpacing: "0.15em", marginBottom: 16
              }}>// expertise</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {EXPERTISE.map(e => (
                  <span key={e} style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                    color: "#475569", letterSpacing: "0.04em"
                  }}>{e}</span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                color: "#334155", letterSpacing: "0.15em", marginBottom: 16
              }}>// contact.info</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <a href="mailto:donaerickoulodji@gmail.com" style={{
                  fontFamily: "monospace", fontSize: 11, color: "#475569",
                  textDecoration: "none", transition: "color 0.2s",
                  wordBreak: "break-all"
                }}
                  onMouseEnter={e => e.currentTarget.style.color = "#00d4ff"}
                  onMouseLeave={e => e.currentTarget.style.color = "#475569"}
                >
                  ✉ donaerickoulodji@gmail.com
                </a>
                <a href="tel:+2290141730240" style={{
                  fontFamily: "monospace", fontSize: 11, color: "#475569",
                  textDecoration: "none", transition: "color 0.2s"
                }}
                  onMouseEnter={e => e.currentTarget.style.color = "#00d4ff"}
                  onMouseLeave={e => e.currentTarget.style.color = "#475569"}
                >
                  ☎ +229 01 41 73 02 40
                </a>
                <a href="https://wa.me/2290151344289" target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "8px 14px", borderRadius: 4, marginTop: 4,
                    background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.2)",
                    fontFamily: "monospace", fontSize: 11, color: "#00d4ff",
                    textDecoration: "none", transition: "all 0.2s ease"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,212,255,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,212,255,0.07)"; }}
                >
                  ↗ start_conversation()
                </a>
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            padding: "20px 0",
            display: "flex", alignItems: "center",
            justifyContent: "space-between", flexWrap: "wrap", gap: 12
          }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#334155"
            }}>
              © {year} dona-eric.koulodji · Data Science & ML Engineer · Abomey-Calavi · BÉNIN
            </span>

            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              {["Confidentialité", "Conditions"].map(l => (
                <a key={l} href="#" style={{
                  fontFamily: "monospace", fontSize: 11, color: "#334155",
                  textDecoration: "none", transition: "color 0.2s"
                }}
                  onMouseEnter={e => e.currentTarget.style.color = "#475569"}
                  onMouseLeave={e => e.currentTarget.style.color = "#334155"}
                >{l}</a>
              ))}

              {/* Stack badge
              <span style={{
                padding: "3px 10px", borderRadius: 3,
                background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)",
                fontFamily: "monospace", fontSize: 10, color: "#4f46e5",
                letterSpacing: "0.08em"
              }}>React · Vite · TailwindCSS</span> */}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;