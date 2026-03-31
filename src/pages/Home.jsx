import React, { useEffect, useRef, useState } from "react";
import Hero from "../components/Hero";
import AIChat from "../components/AIChat";
<Helmet>
  <title>Ma page qui parle de moi Dona Eric, Data scientist, Machine Learning Engineer and AI Systems Builder</title>
  <meta name="description" content="Découvrez AfriDrive, mes modèles de détection d'images réelles vs IA et mes travaux en MLOps." />
</Helmet>
// ─── Scroll fade hook ─────────────────────────────────────────────────────────
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

// ─── Social link ──────────────────────────────────────────────────────────────
function SocialChip({ href, label }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: "7px 20px", borderRadius: 4,
        background: hov ? "rgba(0,212,255,0.08)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hov ? "rgba(0,212,255,0.35)" : "rgba(255,255,255,0.09)"}`,
        fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
        color: hov ? "#00d4ff" : "#64748b",
        transition: "all 0.2s ease", textDecoration: "none"
      }}>
      {label}
    </a>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ value, label, delay }) {
  const ref = useScrollFade(delay);
  return (
    <div ref={ref} style={{
      padding: "20px 16px", textAlign: "center",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 8, position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.45), transparent)"
      }} />
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 30, fontWeight: 700, color: "#00d4ff", lineHeight: 1, marginBottom: 8
      }}>{value}</div>
      <div style={{ fontSize: 11, color: "#475569", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>
        {label}
      </div>
    </div>
  );
}

// ─── Trust badge ─────────────────────────────────────────────────────────────
function TrustBadge({ icon, label, delay }) {
  const ref = useScrollFade(delay);
  return (
    <div ref={ref} style={{
      padding: "14px 24px", borderRadius: 6,
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.07)",
      display: "flex", alignItems: "center", gap: 10,
      fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#64748b"
    }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      {label}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const ctaHeaderRef  = useScrollFade(0);
  const ctaTitleRef   = useScrollFade(0.15);
  const ctaDescRef    = useScrollFade(0.25);
  const ctaBtnsRef    = useScrollFade(0.35);
  const ctaStatusRef  = useScrollFade(0.5);
  const ctaAltsRef    = useScrollFade(0.65);
  const trustRef      = useScrollFade(0);

  const stats = [
    { value: "24h",  label: "Réponse garantie" },
    { value: "90%",  label: "Précision moyenne" },
    { value: "4+",   label: "Modèles prod." },
    { value: "3",    label: "Pays touchés" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; }
        @keyframes gridFloat { 0%,100%{opacity:.03}50%{opacity:.07} }
        @keyframes pulseDot  { 0%,100%{box-shadow:0 0 6px #22c55e}50%{box-shadow:0 0 14px #22c55e} }
        .btn-primary:hover  { background:linear-gradient(135deg,#0891b2,#4338ca)!important; transform:translateY(-2px); box-shadow:0 12px 32px rgba(0,212,255,0.25)!important; }
        .btn-secondary:hover{ border-color:rgba(0,212,255,0.4)!important; color:#00d4ff!important; transform:translateY(-2px); }
        .btn-primary, .btn-secondary { transition: all 0.25s ease; }
        a { text-decoration: none; }
        @media (max-width: 700px) {
          .cta-btns   { flex-direction: column !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .trust-grid { flex-direction: column !important; align-items:center !important; }
          .alt-links  { flex-direction: column !important; align-items:center !important; }
        }
      `}</style>

      <main style={{ background: "#060a0f", color: "#e2e8f0", fontFamily: "'Space Grotesk', sans-serif" }}>

        {/* ── Shared grid background ── */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.035) 1px, transparent 1px)`,
          backgroundSize: "48px 48px", animation: "gridFloat 8s ease infinite"
        }} />

        {/* ══════════════════════════════════════ */}
        {/* HERO — composant existant              */}
        {/* ══════════════════════════════════════ */}
        <Hero />

        {/* ══════════════════════════════════════ */}
        {/* CTA SECTION                            */}
        {/* ══════════════════════════════════════ */}
        <section id="contact" style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            position: "absolute", top: "20%", left: "50%",
            transform: "translateX(-50%)",
            width: 700, height: 700, pointerEvents: "none",
            background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)"
          }} />

          <div style={{ maxWidth: 860, margin: "0 auto", padding: "80px 24px 100px", textAlign: "center" }}>

            {/* Badge */}
            <div ref={ctaHeaderRef} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 18px", borderRadius: 4, marginBottom: 36,
              background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.25)",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
              color: "#00d4ff", letterSpacing: "0.05em"
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: "50%", background: "#22c55e",
                animation: "pulseDot 2s ease infinite", display: "inline-block"
              }} />
              collaboration.init() → status=open
            </div>

            {/* Title */}
            <h2 ref={ctaTitleRef} style={{
              fontSize: "clamp(32px, 5.5vw, 62px)", fontWeight: 700,
              lineHeight: 1.1, letterSpacing: "-0.03em",
              color: "#f8fafc", marginBottom: 20
            }}>
              Prêt à transformer
              <br />
              <span style={{
                background: "linear-gradient(135deg, #00d4ff 0%, #6366f1 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>vos données en impact ?</span>
            </h2>

            {/* Description */}
            <p ref={ctaDescRef} style={{
              maxWidth: 620, margin: "0 auto 52px",
              color: "#94a3b8", fontSize: 16, lineHeight: 1.85
            }}>
              Que vous ayez besoin d'<strong style={{ color: "#e2e8f0" }}>analyse de données</strong>,
              de solutions de <strong style={{ color: "#e2e8f0" }}>machine learning</strong>,
              ou d'un <strong style={{ color: "#e2e8f0" }}>système IA de bout en bout</strong> —
              je transforme le problème métier en système qui tourne.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaBtnsRef} className="cta-btns" style={{
              display: "flex", gap: 14, justifyContent: "center",
              flexWrap: "wrap", marginBottom: 56
            }}>
              <a href="/contact" className="btn-primary" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "15px 32px", borderRadius: 6,
                background: "linear-gradient(135deg, #0e7490, #4338ca)",
                color: "#f0f9ff", fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14, fontWeight: 600, letterSpacing: "0.05em",
                boxShadow: "0 4px 20px rgba(0,212,255,0.12)"
              }}>
                initiate_contact() →
              </a>
              <a href="mailto:donaerickoulodji@gmail.com" className="btn-secondary" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "15px 32px", borderRadius: 6,
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14, fontWeight: 500, letterSpacing: "0.05em"
              }}>
                ✉ send_email()
              </a>
            </div>

            {/* Stats mini-row */}
            <div className="stats-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(4,1fr)",
              gap: 12, maxWidth: 720, margin: "0 auto 56px"
            }}>
              {stats.map((s, i) => <StatCard key={i} {...s} delay={0.4 + i * 0.08} />)}
            </div>

            {/* Availability badge */}
            <div ref={ctaStatusRef} style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              padding: "12px 24px", borderRadius: 6, marginBottom: 48,
              background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.25)",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 13
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: "50%", background: "#22c55e",
                animation: "pulseDot 2s ease infinite", display: "inline-block"
              }} />
              <span style={{ color: "#22c55e" }}>Disponible pour nouveaux projets</span>
              <span style={{ color: "#334155", margin: "0 4px" }}>·</span>
              <span style={{ color: "#475569" }}>Freelance · Contract · Long terme</span>
            </div>

            {/* Alt contact links */}
            <div ref={ctaAltsRef}>
              <div style={{
                fontFamily: "monospace", fontSize: 11, color: "#334155",
                letterSpacing: "0.12em", marginBottom: 14
              }}>
                <span style={{ color: "#475569" }}>// </span>other_channels
              </div>
              <div className="alt-links" style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <SocialChip href="https://medium.com/@koulodjiric" label="Medium" />
                <SocialChip href="https://wa.me/+2290151344289" label="WhatsApp" />
              </div>
            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════ */}
        {/* TRUST SECTION                          */}
        {/* ══════════════════════════════════════ */}
        <section style={{ position: "relative", zIndex: 1, padding: "64px 24px 80px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>

            <div ref={trustRef} style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              color: "#334155", letterSpacing: "0.15em", marginBottom: 28
            }}>
              <span style={{ color: "#475569" }}>// </span>clients.trusted_by[]
            </div>

            <div className="trust-grid" style={{
              display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap"
            }}>
              <TrustBadge icon="🏢" label="Entreprises Tech" delay={0.1} />
              <TrustBadge icon="🚀" label="Startups Africaines" delay={0.2} />
              <TrustBadge icon="🎓" label="Institutions académiques" delay={0.3} />
              <TrustBadge icon="🌍" label="Clients internationaux" delay={0.4} />
            </div>
          </div>
        </section>

        {/*======================  */}
        {/* SECTION AICHAT */}
          {/* <AIChat /> */}
      </main>
    </>
  );
}