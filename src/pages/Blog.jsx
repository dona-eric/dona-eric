import React, { useEffect, useRef, useState } from "react";

// ─── Hooks ────────────────────────────────────────────────────────────────────
const useFadeIn = (delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`;
    const t = setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, 60);
    return () => clearTimeout(t);
  }, [delay]);
  return ref;
};

const useScrollFade = (delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const ARTICLES = [
  {
    id: "llama3-medical",
    title: "Fine-tuning Llama 3 sur un dataset médical africain",
    excerpt: "Comment j'ai atteint 94% de précision sur un RAG médical en langue locale avec seulement 8 Go de VRAM.",
    date: "15 Nov 2025",
    link: "https://medium.com/koulodjiric/fine-tuning-llama-3-afrique",
    reads: "3.2k",
    tags: ["LLM", "Fine-tuning", "RAG"],
    accent: "#a78bfa",
    featured: true,
  },
  {
    id: "llm-prod-50",
    title: "Déployer un LLM en production pour moins de 50$/mois",
    excerpt: "Architecture complète : Groq + FastAPI + Docker + Monitoring + Auto-scaling. Cas réel avec chiffres.",
    date: "8 Nov 2025",
    link: "https://medium.com/koulodjiric/llm-production-50-dollars",
    reads: "5.8k",
    tags: ["MLOps", "Docker", "Groq"],
    accent: "#00d4ff",
    featured: true,
  },
  {
    id: "rag-failure",
    title: "Pourquoi 90% des projets RAG échouent",
    excerpt: "Les 7 erreurs fatales que je vois tous les jours chez mes clients et étudiants.",
    date: "1 Nov 2025",
    link: "https://medium.com/koulodjiric/rag-failure",
    reads: "7.1k",
    tags: ["RAG", "LangChain", "Production"],
    accent: "#22c55e",
    featured: false,
  },
  {
    id: "parcours",
    title: "De la physique fondamentale à l'IA en production",
    excerpt: "Mon parcours complet : physique → data → LLM → mentorat. Ce que j'aurais voulu savoir.",
    date: "20 Oct 2025",
    link: "https://medium.com/koulodjiric/mon-parcours",
    reads: "2.9k",
    tags: ["Career", "Data Science", "Story"],
    accent: "#f59e0b",
    featured: false,
  },
  {
    id: "prompt-patterns",
    title: "Prompt Engineering : 12 patterns que j'utilise en prod",
    excerpt: "Chain-of-Verification, Tree-of-Thought, Self-Consistency… appliqués à des cas réels en production.",
    date: "12 Sep 2025",
    link: "https://cykrhzat.mychariow.com/prompt",
    reads: "9.4k",
    tags: ["Prompt Engineering", "LLM", "Patterns"],
    accent: "#f97316",
    featured: false,
  },
];

const STATS = [
  { value: `${ARTICLES.length}+`,  label: "Articles publiés",    color: "#00d4ff" },
  { value: "28k+", label: "Lectures totales",    color: "#a78bfa" },
  { value: "9.4k", label: "Article le + lu",     color: "#22c55e" },
  { value: "2",    label: "Plateformes",          color: "#f59e0b" },
];

// ─── Featured article card ─────────────────────────────────────────────────────
function FeaturedCard({ article, delay }) {
  const ref = useScrollFade(delay);
  const [hov, setHov] = useState(false);

  return (
    <a ref={ref} href={article.link} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "block", textDecoration: "none",
        background: hov ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hov ? article.accent + "55" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 12, overflow: "hidden",
        transition: "all 0.3s ease",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hov ? `0 20px 60px ${article.accent}15` : "none",
        position: "relative"
      }}>
      {/* Top accent */}
      <div style={{
        height: 2,
        background: `linear-gradient(90deg, transparent, ${article.accent}, transparent)`,
        opacity: hov ? 1 : 0.35, transition: "opacity 0.3s"
      }} />

      <div style={{ padding: "32px 32px 28px" }}>
        {/* Meta row */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          marginBottom: 20, flexWrap: "wrap"
        }}>
          <span style={{
            padding: "3px 10px", borderRadius: 3,
            background: article.accent + "15", border: `1px solid ${article.accent}30`,
            fontFamily: "monospace", fontSize: 10, color: article.accent,
            letterSpacing: "0.08em"
          }}>★ Featured</span>
          <span style={{ fontFamily: "monospace", fontSize: 11, color: "#334155" }}>
            {article.date}
          </span>
          <span style={{ color: "#334155" }}>·</span>
          <span style={{ fontFamily: "monospace", fontSize: 11, color: "#475569" }}>
            ↗ {article.reads} lectures
          </span>
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: "clamp(17px, 2.5vw, 22px)", fontWeight: 700,
          color: hov ? "#f8fafc" : "#e2e8f0",
          lineHeight: 1.35, marginBottom: 14,
          fontFamily: "'Space Grotesk', sans-serif",
          letterSpacing: "-0.01em", transition: "color 0.2s"
        }}>{article.title}</h2>

        {/* Excerpt */}
        <p style={{
          fontSize: 14, color: "#64748b", lineHeight: 1.8, marginBottom: 24
        }}>{article.excerpt}</p>

        {/* Tags */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24 }}>
          {article.tags.map(t => (
            <span key={t} style={{
              padding: "3px 10px", borderRadius: 3,
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              fontFamily: "monospace", fontSize: 11, color: "#475569"
            }}>{t}</span>
          ))}
        </div>

        {/* Read link */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
          color: hov ? article.accent : "#475569",
          transition: "color 0.2s"
        }}>
          read_article() →
        </div>
      </div>
    </a>
  );
}

// ─── Regular article row ───────────────────────────────────────────────────────
function ArticleRow({ article, delay }) {
  const ref = useScrollFade(delay);
  const [hov, setHov] = useState(false);

  return (
    <a ref={ref} href={article.link} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", gap: 20, alignItems: "flex-start",
        padding: "22px 24px", borderRadius: 10, textDecoration: "none",
        background: hov ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.015)",
        border: `1px solid ${hov ? article.accent + "40" : "rgba(255,255,255,0.06)"}`,
        transition: "all 0.25s ease",
        transform: hov ? "translateX(4px)" : "translateX(0)"
      }}>

      {/* Left accent bar */}
      <div style={{
        width: 2, borderRadius: 2, flexShrink: 0, alignSelf: "stretch",
        background: `linear-gradient(180deg, ${article.accent}, transparent)`,
        opacity: hov ? 1 : 0.4, transition: "opacity 0.25s"
      }} />

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Meta */}
        <div style={{
          display: "flex", gap: 10, alignItems: "center",
          marginBottom: 10, flexWrap: "wrap"
        }}>
          {article.tags.slice(0, 2).map(t => (
            <span key={t} style={{
              padding: "2px 8px", borderRadius: 3, fontSize: 10,
              fontFamily: "monospace", color: article.accent,
              background: article.accent + "10", border: `1px solid ${article.accent}25`
            }}>{t}</span>
          ))}
          <span style={{ fontFamily: "monospace", fontSize: 10, color: "#334155" }}>
            {article.date}
          </span>
        </div>

        <h3 style={{
          fontSize: 15, fontWeight: 700,
          color: hov ? "#f1f5f9" : "#cbd5e1",
          marginBottom: 8, lineHeight: 1.4,
          fontFamily: "'Space Grotesk', sans-serif",
          transition: "color 0.2s"
        }}>{article.title}</h3>

        <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, marginBottom: 10 }}>
          {article.excerpt}
        </p>

        <div style={{
          fontFamily: "monospace", fontSize: 11, color: "#334155",
          display: "flex", gap: 12
        }}>
          <span>↗ {article.reads} lectures</span>
          <span style={{ color: hov ? article.accent : "#334155", transition: "color 0.2s" }}>
            read →
          </span>
        </div>
      </div>
    </a>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Blog() {
  const heroRef = useFadeIn(0.1);
  const ctaRef  = useScrollFade(0);

  const featured = ARTICLES.filter(a => a.featured);
  const others   = ARTICLES.filter(a => !a.featured);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060a0f; }
        @keyframes gridFloat { 0%,100%{opacity:.03}50%{opacity:.07} }
        @keyframes pulseDot  { 0%,100%{box-shadow:0 0 6px #22c55e}50%{box-shadow:0 0 14px #22c55e} }
        .cta-btn:hover { background:linear-gradient(135deg,#0891b2,#4338ca)!important; transform:translateY(-2px); box-shadow:0 12px 32px rgba(0,212,255,0.25)!important; }
        .cta-btn { transition: all 0.25s ease; }
        a { text-decoration: none; }
        @media (max-width: 860px) {
          .featured-grid { grid-template-columns: 1fr !important; }
          .stats-grid    { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>

      <div style={{
        minHeight: "100vh", background: "#060a0f",
        color: "#e2e8f0", fontFamily: "'Space Grotesk', sans-serif",
        position: "relative", overflow: "hidden"
      }}>

        {/* Grid */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.035) 1px, transparent 1px)`,
          backgroundSize: "48px 48px", animation: "gridFloat 8s ease infinite"
        }} />
        <div style={{
          position: "fixed", top: "-5%", right: 0, width: 500, height: 500,
          background: "radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0
        }} />
        <div style={{
          position: "fixed", bottom: "5%", left: "-10%", width: 500, height: 500,
          background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1060, margin: "0 auto", padding: "80px 24px 120px" }}>

          {/* ══ HERO ══ */}
          <div ref={heroRef} style={{ marginBottom: 72 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 16px", borderRadius: 4, marginBottom: 32,
              background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.25)",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
              color: "#00d4ff", letterSpacing: "0.05em"
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: "50%", background: "#22c55e",
                animation: "pulseDot 2s ease infinite", display: "inline-block"
              }} />
              blog.load() → {ARTICLES.length} articles · Medium & Web
            </div>

            <h1 style={{
              fontSize: "clamp(38px, 7vw, 74px)", fontWeight: 700,
              lineHeight: 1.05, letterSpacing: "-0.03em", color: "#f8fafc",
              marginBottom: 20
            }}>
              J'écris ce que
              <br />
              <span style={{
                background: "linear-gradient(135deg, #00d4ff 0%, #6366f1 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>je vis en production.</span>
            </h1>

            <p style={{ maxWidth: 560, color: "#94a3b8", fontSize: 16, lineHeight: 1.85, marginBottom: 48 }}>
              Pas de théorie vide. Que du concret, du terrain, des{" "}
              <strong style={{ color: "#e2e8f0" }}>systèmes qui tournent vraiment</strong>{" "}
              — avec chiffres, erreurs et leçons apprises.
            </p>

            {/* Stats */}
            <div className="stats-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12
            }}>
              {STATS.map((s, i) => {
                const ref = useScrollFade(i * 0.08);
                return (
                  <div key={i} ref={ref} style={{
                    padding: "18px 14px", textAlign: "center",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 8, position: "relative", overflow: "hidden"
                  }}>
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: 2,
                      background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`
                    }} />
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 26, fontWeight: 700, color: s.color, lineHeight: 1, marginBottom: 6
                    }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: "#475569", fontFamily: "monospace" }}>{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ══ FEATURED ══ */}
          <div style={{ marginBottom: 80 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              color: "#475569", letterSpacing: "0.15em", marginBottom: 8
            }}>
              <span style={{ color: "#00d4ff" }}>// </span>articles.featured[]
            </div>
            <h2 style={{
              fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 700,
              color: "#f1f5f9", marginBottom: 28, letterSpacing: "-0.02em"
            }}>Articles en vedette</h2>

            <div className="featured-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20
            }}>
              {featured.map((a, i) => (
                <FeaturedCard key={a.id} article={a} delay={i * 0.1} />
              ))}
            </div>
          </div>

          {/* ══ OTHERS ══ */}
          <div style={{ marginBottom: 88 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              color: "#475569", letterSpacing: "0.15em", marginBottom: 8
            }}>
              <span style={{ color: "#00d4ff" }}>// </span>articles.recent[]
            </div>
            <h2 style={{
              fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 700,
              color: "#f1f5f9", marginBottom: 28, letterSpacing: "-0.02em"
            }}>Articles récents</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {others.map((a, i) => (
                <ArticleRow key={a.id} article={a} delay={i * 0.08} />
              ))}
            </div>
          </div>

          {/* ══ CTA ══ */}
          <div ref={ctaRef} style={{
            textAlign: "center", padding: "56px 24px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16, position: "relative", overflow: "hidden"
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: "linear-gradient(90deg, transparent, #a78bfa, #00d4ff, transparent)"
            }} />
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              color: "#475569", letterSpacing: "0.15em", marginBottom: 20
            }}>
              <span style={{ color: "#00d4ff" }}>// </span>medium.profile()
            </div>
            <h2 style={{
              fontSize: "clamp(20px, 3.5vw, 36px)", fontWeight: 700,
              color: "#f1f5f9", marginBottom: 12, letterSpacing: "-0.02em"
            }}>
              Tous mes articles sur{" "}
              <span style={{
                background: "linear-gradient(135deg, #00d4ff, #6366f1)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>Medium</span>
            </h2>
            <p style={{
              color: "#64748b", fontFamily: "monospace",
              fontSize: 13, marginBottom: 36
            }}>
              /* Analyses · Retours d'expérience · Tutoriels production */
            </p>
            <a
              href="https://medium.com/@koulodjiric"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "14px 32px", borderRadius: 6,
                background: "linear-gradient(135deg, #0e7490, #4338ca)",
                color: "#f0f9ff", fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14, fontWeight: 600, letterSpacing: "0.05em",
                boxShadow: "0 4px 20px rgba(0,212,255,0.12)"
              }}>
              open_medium_profile() →
            </a>
          </div>

        </div>
      </div>
    </>
  );
}