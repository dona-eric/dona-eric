import React, { useState } from "react";
import { Link } from "react-router-dom";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/dona-eric",
    color: "#00d4ff",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/dona-erick",
    color: "#a78bfa",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com/ericschrodinger",
    color: "#64748b",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/2290151344289",
    color: "#22c55e",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
];

const QUICK_LINKS = [
  { label: "About",    href: "/about"    },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Blog",     href: "/blog"     },
  { label: "Contacts",  href: "/contact"  },
];

const EXPERTISE = [
  "Machine Learning",
  "Deep Learning",
  "LLM / RAG",
  "MLOps",
  "Data Science",
  "Fine Tuning"
];

function SocialBtn({ item }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={item.href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      aria-label={item.label}
      style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        padding: "6px 12px", borderRadius: 4, textDecoration: "none",
        background: hov ? `${item.color}12` : "rgba(255,255,255,0.03)",
        border: `1px solid ${hov ? `${item.color}45` : "rgba(255,255,255,0.08)"}`,
        color: hov ? item.color : "#475569",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11, fontWeight: 500,
        transition: "all 0.2s ease",
        whiteSpace: "nowrap"
      }}>
      {item.icon}
      <span>{item.label}</span>
    </a>
  );
}

function FooterLink({ href, label }) {
  const [hov, setHov] = useState(false);
  const style = {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
    color: hov ? "#00d4ff" : "#475569",
    textDecoration: "none", transition: "color 0.2s ease",
    letterSpacing: "0.04em"
  };
  return (
    <Link to={href} style={style}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}>
      {label}
    </Link>
  );
}

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;600&display=swap');
        @keyframes pulseDot { 0%,100%{box-shadow:0 0 6px #22c55e}50%{box-shadow:0 0 14px #22c55e} }
        @media (max-width: 768px) {
          .footer-grid   { grid-template-columns: 1fr 1fr !important; }
          .footer-brand  { grid-column: 1 / -1 !important; }
          .footer-socials{ flex-wrap: wrap !important; }
        }
        @media (max-width: 480px) {
          .footer-grid   { grid-template-columns: 1fr !important; }
          .footer-bottom { flex-direction: column !important; align-items: flex-start !important; }
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

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1160, margin: "0 auto", padding: "56px 24px 0" }}>

          {/* ── Main grid ── */}
          <div className="footer-grid" style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 40, marginBottom: 48
          }}>

            {/* Brand */}
            <div className="footer-brand">
              {/* Logo */}
              <div style={{ marginBottom: 14 }}>
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
                
              </div>

              {/* Name + role */}
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                color: "#334155", letterSpacing: "0.12em", marginBottom: 6
              }}>// profile</div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#94a3b8", marginBottom: 4 }}>
                Dona Éric KOULODJI
              </p>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                color: "#475569", marginBottom: 18, letterSpacing: "0.05em"
              }}>
                <span style={{ color: "#6366f1" }}>role</span> :: Data Scientist → ML Engineer
              </p>

              {/* Location */}
              <div style={{
                display: "flex", alignItems: "center", gap: 8, marginBottom: 18,
                fontFamily: "monospace", fontSize: 12, color: "#475569"
              }}>
                <span>📍</span>
                Abomey-Calavi, Bénin · Remote OK
              </div>

              {/* Availability */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "6px 14px", borderRadius: 4, marginBottom: 20,
                background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)",
                fontFamily: "monospace", fontSize: 11, color: "#22c55e"
              }}>
                <span style={{
                  width: 5, height: 5, borderRadius: "50%", background: "#22c55e",
                  animation: "pulseDot 2s ease infinite", display: "inline-block", flexShrink: 0
                }} />
                AVAILABLE_FOR_HIRE :: open=True
              </div>

              {/* Socials — SVG icons + labels */}
              <div className="footer-socials" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
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
                {QUICK_LINKS.map(l => <FooterLink key={l.href} href={l.href} label={l.label} />)}
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
                  textDecoration: "none", transition: "color 0.2s", wordBreak: "break-all"
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
                    background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)",
                    fontFamily: "monospace", fontSize: 11, color: "#22c55e",
                    textDecoration: "none", transition: "all 0.2s ease"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(34,197,94,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(34,197,94,0.07)"; }}
                >
                  ↗ start_conversation()
                </a>
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="footer-bottom" style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            padding: "20px 0",
            display: "flex", alignItems: "center",
            justifyContent: "space-between", flexWrap: "wrap", gap: 12
          }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#334155"
            }}>
              © {year} dona-eric.koulodji · Data Science & ML Engineering · Abomey-Calavi · BÉNIN
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
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;