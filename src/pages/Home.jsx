import React, { useEffect, useRef, useState } from "react";
import Hero from "../components/Hero";

const useScrollFade = (delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        obs.disconnect();
      }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
};

function StatCard({ value, label, delay }) {
  const ref = useScrollFade(delay);
  return (
    <div ref={ref} className="glass" style={{
      padding: "24px 16px", textAlign: "center",
      position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, transparent, #00d4ff, transparent)"
      }} />
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 32, fontWeight: 700, color: "#00d4ff", lineHeight: 1, marginBottom: 8
      }}>{value}</div>
      <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        {label}
      </div>
    </div>
  );
}

function TrustBadge({ icon, label, delay }) {
  const ref = useScrollFade(delay);
  return (
    <div ref={ref} className="glass" style={{
      padding: "16px 24px", display: "flex", alignItems: "center", gap: 12,
      fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#e2e8f0", fontWeight: 500,
      transition: "all 0.3s ease"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "rgba(0, 212, 255, 0.4)";
      e.currentTarget.style.transform = "translateY(-2px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
      e.currentTarget.style.transform = "translateY(0)";
    }}
    >
      <span style={{ fontSize: 20 }}>{icon}</span>
      {label}
    </div>
  );
}

export default function Home() {
  const ctaHeaderRef  = useScrollFade(0);
  const ctaTitleRef   = useScrollFade(0.15);
  const ctaDescRef    = useScrollFade(0.25);
  const ctaBtnsRef    = useScrollFade(0.35);
  const ctaStatusRef  = useScrollFade(0.5);
  const trustRef      = useScrollFade(0);

  const stats = [
    { value: "24h",  label: "RÉPONSE GARANTIE" },
    { value: "90%",  label: "PRÉCISION MOYENNE" },
    { value: "5+",   label: "MODÈLES EN PROD" },
    { value: "3",    label: "PAYS TOUCHÉS" },
  ];

  return (
    <main style={{ color: "#e2e8f0", fontFamily: "'Inter', sans-serif" }}>
      <Hero />

      <section id="contact" style={{ position: "relative", zIndex: 1, padding: "80px 24px 100px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>

          {/* Badge */}
          <div ref={ctaHeaderRef} style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "8px 20px", borderRadius: "30px", marginBottom: 36,
            background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.3)",
            fontSize: 11, fontWeight: 600, color: "#00d4ff", letterSpacing: "0.08em"
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%", background: "#00d4ff",
              boxShadow: "0 0 10px #00d4ff", display: "inline-block"
            }} />
            🔥 3 PROJETS LIVRÉS CE TRIMESTRE · 1 SLOT DISPONIBLE
          </div>

          {/* Title */}
          <h2 ref={ctaTitleRef} style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(32px, 5.5vw, 62px)", fontWeight: 800,
            lineHeight: 1.1, letterSpacing: "-0.03em",
            color: "#ffffff", marginBottom: 24
          }}>
            Votre concurrent a déjà<br />
            <span style={{
              background: "linear-gradient(135deg, #00d4ff 0%, #ec4899 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>son IA en production.</span>
          </h2>

          {/* Description */}
          <p ref={ctaDescRef} style={{
            maxWidth: 680, margin: "0 auto 52px",
            color: "#94a3b8", fontSize: 16, lineHeight: 1.8
          }}>
            Pendant que votre équipe analyse encore les options, je livre un{" "}
            <strong style={{ color: "#ffffff" }}>agent IA opérationnel</strong>,{" "}
            un <strong style={{ color: "#ffffff" }}>pipeline ML en production</strong>{" "}
            ou un <strong style={{ color: "#ffffff" }}>système RAG clé-en-main</strong> —
            en semaines, pas en mois. Zéro POC qui dort. Zéro réunion inutile.{" "}
            <strong style={{ color: "#00d4ff" }}>Du concret pour votre entreprise.</strong>
          </p>

          {/* CTA Buttons */}
          <div ref={ctaBtnsRef} style={{
            display: "flex", gap: 16, justifyContent: "center",
            flexWrap: "wrap", marginBottom: 56
          }}>
            <a href="https://wa.me/+2290151344289" target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "14px 32px", borderRadius: "8px",
                background: "#00d4ff", color: "#0f172a",
                fontSize: 15, fontWeight: 600, textDecoration: "none",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 20px rgba(0, 212, 255, 0.2)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.background = "#00b8e6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "#00d4ff";
              }}
              >
              Démarrer mon projet →
            </a>
            <a href="mailto:donaerickoulodji@gmail.com" 
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "14px 32px", borderRadius: "8px", background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#f8fafc", fontSize: 15, fontWeight: 500, textDecoration: "none",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
              }}
              >
              ✉ Me décrire mon besoin
            </a>
          </div>

          {/* Stats mini-row */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 16, maxWidth: 720, margin: "0 auto 56px"
          }}>
            {stats.map((s, i) => <StatCard key={i} {...s} delay={0.4 + i * 0.08} />)}
          </div>

          {/* Garanties */}
          <div ref={ctaStatusRef} style={{
            display: "flex", flexWrap: "wrap", gap: 24,
            justifyContent: "center"
          }}>
            {[
              "Réponse sous 24h",
              "Livraison en semaines",
              "Code propre · Documenté",
              "Remote · Freelance · Contract"
            ].map((g) => (
              <span key={g} style={{
                fontSize: 13, color: "#64748b", fontWeight: 500,
                display: "flex", alignItems: "center", gap: 8
              }}>
                <span style={{ color: "#00d4ff", fontSize: 16 }}>✓</span> {g}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 1, padding: "20px 24px 80px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <div ref={trustRef} style={{
            fontSize: 11, color: "#64748b", fontWeight: 600, letterSpacing: "0.15em", 
            textTransform: "uppercase", marginBottom: 32
          }}>
            <span style={{ color: "#00d4ff" }}>//</span> ILS M'ONT FAIT CONFIANCE
          </div>

          <div style={{
            display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap"
          }}>
            <TrustBadge icon="🏢" label="Entreprises Tech" delay={0.1} />
            <TrustBadge icon="🚀" label="Startups Africaines" delay={0.2} />
            <TrustBadge icon="🎓" label="Institutions académiques" delay={0.3} />
            <TrustBadge icon="🌍" label="Clients internationaux" delay={0.4} />
          </div>
        </div>
      </section>

    </main>
  );
}