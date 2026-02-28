import React, { useEffect, useRef, useState, useCallback } from "react";

// ─── Config ───────────────────────────────────────────────────────────────────
// Set this to your deployed backend URL (or localhost for dev)
const API_BASE = import.meta.env.VITE_API_URL ;

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

// ─── Source config ────────────────────────────────────────────────────────────
const SOURCE_META = {
  medium:   { label: "Medium",   color: "#00d4ff", icon: "M" },
  linkedin: { label: "LinkedIn", color: "#a78bfa", icon: "in" },
};

const FILTERS = [
  { key: "all",      label: "Tous" },
  { key: "medium",   label: "Medium" },
  { key: "linkedin", label: "LinkedIn" },
];

// ─── Skeleton card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 12, padding: "28px 28px", overflow: "hidden"
    }}>
      {["60%","90%","75%","40%"].map((w, i) => (
        <div key={i} style={{
          height: i === 0 ? 10 : i === 3 ? 8 : 14,
          width: w, borderRadius: 4, marginBottom: 14,
          background: "rgba(255,255,255,0.05)",
          animation: `skeletonPulse 1.6s ease ${i * 0.15}s infinite`
        }} />
      ))}
    </div>
  );
}

// ─── Score badge ──────────────────────────────────────────────────────────────
function ScoreBadge({ score }) {
  const color = score >= 60 ? "#22c55e" : score >= 30 ? "#f59e0b" : "#64748b";
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 4,
      fontFamily: "monospace", fontSize: 10, color,
      padding: "2px 8px", borderRadius: 3,
      background: color + "10", border: `1px solid ${color}25`
    }}>
      ↑ {score}
    </div>
  );
}

// ─── Article card ──────────────────────────────────────────────────────────────
function ArticleCard({ post, delay, featured }) {
  const ref   = useScrollFade(delay);
  const [hov, setHov] = useState(false);
  const src   = SOURCE_META[post.source] || SOURCE_META.medium;

  const pubDate = new Date(post.pub_date * 1000).toLocaleDateString("fr-FR", {
    day: "numeric", month: "short", year: "numeric"
  });

  const metrics = post.raw_metrics;

  return (
    <div ref={ref}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hov ? src.color + "50" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 12, overflow: "hidden", transition: "all 0.3s ease",
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov ? `0 16px 48px ${src.color}12` : "none",
        display: "flex", flexDirection: "column"
      }}>

      {/* Top bar */}
      <div style={{
        height: 2,
        background: `linear-gradient(90deg, transparent, ${src.color}, transparent)`,
        opacity: hov ? 1 : 0.3, transition: "opacity 0.3s"
      }} />

      <div style={{ padding: "24px 24px 22px", flexGrow: 1, display: "flex", flexDirection: "column" }}>

        {/* Header row */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", gap: 8, marginBottom: 16, flexWrap: "wrap"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Source badge */}
            <span style={{
              padding: "3px 10px", borderRadius: 3, fontSize: 10,
              fontFamily: "monospace", color: src.color,
              background: src.color + "15", border: `1px solid ${src.color}30`,
              letterSpacing: "0.08em", fontWeight: 600
            }}>{src.label}</span>
            {featured && (
              <span style={{
                padding: "3px 10px", borderRadius: 3, fontSize: 10,
                fontFamily: "monospace", color: "#f59e0b",
                background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)"
              }}>★ Top</span>
            )}
          </div>
          <ScoreBadge score={post.score} />
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: featured ? 19 : 16, fontWeight: 700,
          color: hov ? "#f8fafc" : "#e2e8f0",
          lineHeight: 1.4, marginBottom: 12,
          fontFamily: "'Space Grotesk', sans-serif",
          transition: "color 0.2s", flexGrow: 0
        }}>{post.title}</h3>

        {/* Excerpt */}
        <p style={{
          fontSize: 13, color: "#64748b", lineHeight: 1.75,
          marginBottom: 18, flexGrow: 1
        }}>{post.excerpt}</p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
            {post.tags.slice(0, 4).map(t => (
              <span key={t} style={{
                padding: "2px 8px", borderRadius: 3, fontSize: 10,
                fontFamily: "monospace", color: "#475569",
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)"
              }}>{t}</span>
            ))}
          </div>
        )}

        {/* Metrics + date */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 18
        }}>
          <div style={{ display: "flex", gap: 14 }}>
            {metrics.views > 0 && (
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "#334155" }}>
                👁 {metrics.views >= 1000 ? (metrics.views/1000).toFixed(1)+"k" : metrics.views}
              </span>
            )}
            {metrics.likes > 0 && (
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "#334155" }}>
                ♥ {metrics.likes >= 1000 ? (metrics.likes/1000).toFixed(1)+"k" : metrics.likes}
              </span>
            )}
            {metrics.comments > 0 && (
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "#334155" }}>
                💬 {metrics.comments}
              </span>
            )}
          </div>
          <span style={{ fontFamily: "monospace", fontSize: 11, color: "#334155" }}>{pubDate}</span>
        </div>

        {/* CTA */}
        <a href={post.url} target="_blank" rel="noopener noreferrer" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          padding: "10px", borderRadius: 6, textDecoration: "none",
          background: hov ? src.color + "20" : src.color + "0d",
          border: `1px solid ${hov ? src.color + "50" : src.color + "25"}`,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
          color: src.color, transition: "all 0.2s ease", fontWeight: 500
        }}>
          Lire sur {src.label} ↗
        </a>
      </div>
    </div>
  );
}

// ─── Filter button ─────────────────────────────────────────────────────────────
function FilterBtn({ label, active, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: "7px 16px", borderRadius: 4, cursor: "pointer",
        fontFamily: "monospace", fontSize: 12, letterSpacing: "0.06em",
        border: `1px solid ${active ? "rgba(0,212,255,0.6)" : hov ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.1)"}`,
        background: active ? "rgba(0,212,255,0.12)" : hov ? "rgba(0,212,255,0.05)" : "transparent",
        color: active ? "#00d4ff" : hov ? "#94a3b8" : "#64748b",
        transition: "all 0.2s ease"
      }}>
      {label}
    </button>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Blog() {
  const heroRef = useFadeIn(0.1);
  const ctaRef  = useScrollFade(0);

  const [posts,    setPosts]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [filter,   setFilter]   = useState("all");
  const [cachedAt, setCachedAt] = useState(null);

  const fetchPosts = useCallback(async (source = "all") => {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch(`${API_BASE}/api/posts?source=${source}&limit=20`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setPosts(data.posts || []);
      setCachedAt(data.cached_at);
    } catch (err) {
      setError("En cours");
      console.error("[Blog]", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPosts(filter); }, [filter, fetchPosts]);

  // Split featured (top 2 by score) vs rest
  const featured = posts.slice(0, 2);
  const others   = posts.slice(2);

  // Aggregate stats
  const totalViews = posts.reduce((a, p) => a + (p.raw_metrics?.views || 0), 0);
  const totalLikes = posts.reduce((a, p) => a + (p.raw_metrics?.likes || 0), 0);

  const STATS = [
    { value: `${posts.length}`,   label: "Articles fetched",  color: "#00d4ff" },
    { value: totalViews >= 1000 ? (totalViews/1000).toFixed(1)+"k" : totalViews || "—", label: "Vues totales",    color: "#a78bfa" },
    { value: totalLikes >= 1000 ? (totalLikes/1000).toFixed(1)+"k" : totalLikes || "—", label: "Likes / Claps",  color: "#22c55e" },
    { value: "Auto",              label: "Mise à jour",       color: "#f59e0b" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060a0f; }
        @keyframes gridFloat    { 0%,100%{opacity:.03}50%{opacity:.07} }
        @keyframes pulseDot     { 0%,100%{box-shadow:0 0 6px #22c55e}50%{box-shadow:0 0 14px #22c55e} }
        @keyframes skeletonPulse{ 0%,100%{opacity:.04}50%{opacity:.1} }
        .cta-btn:hover { background:linear-gradient(135deg,#0891b2,#4338ca)!important; transform:translateY(-2px); box-shadow:0 12px 32px rgba(0,212,255,0.25)!important; }
        .cta-btn { transition: all 0.25s ease; }
        a { text-decoration: none; }
        @media (max-width: 860px) {
          .featured-grid { grid-template-columns: 1fr !important; }
          .others-grid   { grid-template-columns: 1fr !important; }
          .stats-grid    { grid-template-columns: repeat(2,1fr) !important; }
          .filter-row    { flex-wrap: wrap !important; }
        }
      `}</style>

      <div style={{
        minHeight: "100vh", background: "#060a0f",
        color: "#e2e8f0", fontFamily: "'Space Grotesk', sans-serif",
        position: "relative", overflow: "hidden"
      }}>
        {/* Grid + blobs */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(rgba(0,212,255,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.035) 1px,transparent 1px)`,
          backgroundSize: "48px 48px", animation: "gridFloat 8s ease infinite"
        }} />
        <div style={{ position:"fixed", top:"-5%", right:0, width:500, height:500, background:"radial-gradient(circle,rgba(167,139,250,0.05) 0%,transparent 70%)", pointerEvents:"none", zIndex:0 }} />
        <div style={{ position:"fixed", bottom:"5%", left:"-10%", width:500, height:500, background:"radial-gradient(circle,rgba(0,212,255,0.05) 0%,transparent 70%)", pointerEvents:"none", zIndex:0 }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1060, margin: "0 auto", padding: "80px 24px 120px" }}>

          {/* ══ HERO ══ */}
          <div ref={heroRef} style={{ marginBottom: 60 }}>
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
              blog.fetch() → Medium + LinkedIn · auto-sync 6h
            </div>

            <h1 style={{
              fontSize: "clamp(38px, 7vw, 74px)", fontWeight: 700,
              lineHeight: 1.05, letterSpacing: "-0.03em", color: "#f8fafc", marginBottom: 20
            }}>
              J'écris ce que
              <br />
              <span style={{
                background: "linear-gradient(135deg, #00d4ff 0%, #6366f1 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>je vis en production.</span>
            </h1>

            <p style={{ maxWidth: 560, color: "#94a3b8", fontSize: 16, lineHeight: 1.85, marginBottom: 40 }}>
              Articles triés automatiquement par <strong style={{ color: "#e2e8f0" }}>vues · likes · fraîcheur</strong>.
              Mis à jour toutes les 6h depuis Medium & LinkedIn.
            </p>

            {/* Stats */}
            <div className="stats-grid" style={{
              display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 40
            }}>
              {STATS.map((s, i) => (
                <div key={i} style={{
                  padding: "16px 14px", textAlign: "center",
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
                    fontSize: 24, fontWeight: 700, color: s.color, lineHeight: 1, marginBottom: 6
                  }}>{loading ? "…" : s.value}</div>
                  <div style={{ fontSize: 11, color: "#475569", fontFamily: "monospace" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Filters + cache info */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div className="filter-row" style={{ display: "flex", gap: 8 }}>
                {FILTERS.map(f => (
                  <FilterBtn key={f.key} label={f.label} active={filter === f.key} onClick={() => setFilter(f.key)} />
                ))}
              </div>
              {cachedAt && (
                <span style={{ fontFamily: "monospace", fontSize: 10, color: "#334155" }}>
                  sync: {new Date(cachedAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
            </div>
          </div>

          {/* ══ ERROR ══ */}
          {error && (
            <div style={{
              padding: "16px 20px", borderRadius: 8, marginBottom: 40,
              background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)",
              fontFamily: "monospace", fontSize: 13, color: "#f87171"
            }}>
              ✗ {error}
            </div>
          )}

          {/* ══ LOADING SKELETONS ══ */}
          {loading && !error && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20, marginBottom: 40 }}>
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* ══ FEATURED ══ */}
          {!loading && !error && featured.length > 0 && (
            <div style={{ marginBottom: 72 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#475569", letterSpacing: "0.15em", marginBottom: 8 }}>
                <span style={{ color: "#00d4ff" }}>// </span>posts.top_scored[]
              </div>
              <h2 style={{ fontSize: "clamp(18px,3vw,26px)", fontWeight: 700, color: "#f1f5f9", marginBottom: 24, letterSpacing: "-0.02em" }}>
                Les plus populaires
              </h2>
              <div className="featured-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
                {featured.map((p, i) => <ArticleCard key={p.id} post={p} delay={i * 0.1} featured />)}
              </div>
            </div>
          )}

          {/* ══ OTHERS ══ */}
          {!loading && !error && others.length > 0 && (
            <div style={{ marginBottom: 80 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#475569", letterSpacing: "0.15em", marginBottom: 8 }}>
                <span style={{ color: "#00d4ff" }}>// </span>posts.recent[]
              </div>
              <h2 style={{ fontSize: "clamp(18px,3vw,26px)", fontWeight: 700, color: "#f1f5f9", marginBottom: 24, letterSpacing: "-0.02em" }}>
                Articles récents
              </h2>
              <div className="others-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
                {others.map((p, i) => <ArticleCard key={p.id} post={p} delay={i * 0.07} featured={false} />)}
              </div>
            </div>
          )}

          {/* ══ EMPTY STATE ══ */}
          {!loading && !error && posts.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px", fontFamily: "monospace", color: "#334155" }}>
              // no posts matching filter — try "Tous"
            </div>
          )}

          {/* ══ CTA ══ */}
          <div ref={ctaRef} style={{
            textAlign: "center", padding: "56px 24px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16, position: "relative", overflow: "hidden"
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #a78bfa, #00d4ff, transparent)" }} />
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#475569", letterSpacing: "0.15em", marginBottom: 20 }}>
              <span style={{ color: "#00d4ff" }}>// </span>follow.profiles()
            </div>
            <h2 style={{ fontSize: "clamp(18px,3.5vw,32px)", fontWeight: 700, color: "#f1f5f9", marginBottom: 12, letterSpacing: "-0.02em" }}>
              Suivre mes publications
            </h2>
            <p style={{ color: "#64748b", fontFamily: "monospace", fontSize: 13, marginBottom: 32 }}>
              /* Notifications automatiques dès qu'un article est publié */
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://medium.com/@koulodjiric" target="_blank" rel="noopener noreferrer"
                className="cta-btn" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "12px 24px", borderRadius: 6,
                  background: "linear-gradient(135deg, #0e7490, #4338ca)",
                  color: "#f0f9ff", fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13, fontWeight: 600, letterSpacing: "0.05em",
                  boxShadow: "0 4px 20px rgba(0,212,255,0.12)"
                }}>
                follow_medium() →
              </a>
              <a href="https://linkedin.com/in/dona-erick" target="_blank" rel="noopener noreferrer"
                className="cta-btn" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "12px 24px", borderRadius: 6,
                  background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.3)",
                  color: "#a78bfa", fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13, fontWeight: 600, letterSpacing: "0.05em"
                }}>
                follow_linkedin() →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}