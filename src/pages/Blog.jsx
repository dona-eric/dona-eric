import React, { useEffect, useRef, useState, useCallback } from "react";
import "../styles/Blog.css";
import { getApiUrl } from "../config/masterclasses.config";

// ─── Config ───────────────────────────────────────────────────────────────────
const API_BASE = getApiUrl();

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
// ─── Source config ────────────────────────────────────────────────────────────
const SOURCE_META = {
  medium:   { label: "Medium",   color: "#00d4ff", icon: "M" },
};

const FILTERS = [
  { key: "all",      label: "Tous" },
  { key: "medium",   label: "Medium" },
];

// ─── Skeleton card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="blog-skeleton-card">
      {["60%","90%","75%","40%"].map((w, i) => (
        <div key={i} className="blog-skeleton-line" style={{
          height: i === 0 ? 10 : i === 3 ? 8 : 14,
          width: w, animationDelay: `${i * 0.15}s`
        }} />
      ))}
    </div>
  );
}

// ─── Score badge ──────────────────────────────────────────────────────────────
function ScoreBadge({ score }) {
  const color = score >= 60 ? "#22c55e" : score >= 30 ? "#f59e0b" : "#64748b";
  return (
    <div className="article-score-badge" style={{
      color, background: color + "10", border: `1px solid ${color}25`
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
      className="article-card"
      style={{
        background: hov ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hov ? src.color + "50" : "rgba(255,255,255,0.07)"}`,
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov ? `0 16px 48px ${src.color}12` : "none"
      }}>

      {/* Top bar */}
      <div className="article-card-gradient" style={{
        background: `linear-gradient(90deg, transparent, ${src.color}, transparent)`,
        opacity: hov ? 1 : 0.3
      }} />

      <div className="article-card-content">

        {/* Header row */}
        <div className="article-header-row">
          <div className="article-tags-group">
            {/* Source badge */}
            <span className="article-source-badge" style={{
              color: src.color, background: src.color + "15", border: `1px solid ${src.color}30`
            }}>{src.label}</span>
            {featured && (
              <span className="article-featured-badge">★ Top</span>
            )}
          </div>
          <ScoreBadge score={post.score} />
        </div>

        {/* Title */}
        <h3 className="article-title" style={{
          fontSize: featured ? 19 : 16,
          color: hov ? "#f8fafc" : "#e2e8f0"
        }}>{post.title}</h3>

        {/* Excerpt */}
        <p className="article-excerpt">{post.excerpt}</p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="article-tags-container">
            {post.tags.slice(0, 4).map(t => (
              <span key={t} className="article-tag">{t}</span>
            ))}
          </div>
        )}

        {/* Metrics + date */}
        <div className="article-metrics-row">
          <div className="article-metrics-group">
            {metrics.views > 0 && (
              <span className="article-metric">
                👁 {metrics.views >= 1000 ? (metrics.views/1000).toFixed(1)+"k" : metrics.views}
              </span>
            )}
            {metrics.likes > 0 && (
              <span className="article-metric">
                ♥ {metrics.likes >= 1000 ? (metrics.likes/1000).toFixed(1)+"k" : metrics.likes}
              </span>
            )}
            {metrics.comments > 0 && (
              <span className="article-metric">
                💬 {metrics.comments}
              </span>
            )}
          </div>
          <span className="article-date">{pubDate}</span>
        </div>

        {/* CTA */}
        <a href={post.url} target="_blank" rel="noopener noreferrer" className="article-cta" style={{
          background: hov ? src.color + "20" : src.color + "0d",
          border: `1px solid ${hov ? src.color + "50" : src.color + "25"}`,
          color: src.color
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
      className="blog-filter-btn"
      style={{
        border: `1px solid ${active ? "rgba(0,212,255,0.6)" : hov ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.1)"}`,
        background: active ? "rgba(0,212,255,0.12)" : hov ? "rgba(0,212,255,0.05)" : "transparent",
        color: active ? "#00d4ff" : hov ? "#94a3b8" : "#64748b",
      }}>
      {label}
    </button>
  );
}

// ─── Storytelling Card ─────────────────────────────────────────────────────────
function StorytellingCard({ mc, index, onClick }) {
  const ref = useScrollFade(index * 0.1);
  const dateStr = new Date(mc.date).toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric"
  });
  
  // Display only the first paragraph as preview snippet
  const cleanSnippet = mc.storytelling ? mc.storytelling.split("<br/>")[0] : "";

  return (
    <div ref={ref} className="storytelling-card" onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="storytelling-card-content">
        <div className="storytelling-number-container">
          <span className="storytelling-number">{mc.registrantsCount}</span>
          <span className="storytelling-number-label">participants</span>
        </div>
        <h3 className="storytelling-event-title">{mc.title}</h3>
        <div className="storytelling-post-text">
          <p style={{ margin: 0 }}>"{cleanSnippet}..."</p>
          <span className="storytelling-readmore" style={{ display: "block", marginTop: "12px", color: "#00d4ff", fontWeight: "600", fontSize: "13px" }}>
            Lire le post complet →
          </span>
        </div>
        <div className="storytelling-meta">
          <span>{mc.type === "webinaire" ? "Webinaire" : "Masterclass"}</span>
          <span style={{ textTransform: "capitalize" }}>{dateStr}</span>
        </div>
      </div>
    </div>
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
  const [events,   setEvents]   = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchPosts = useCallback(async (source = "all") => {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch(`${API_BASE}/posts?source=${source}&limit=20`);
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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_BASE}/masterclasses`);
        if (res.ok) {
          const data = await res.json();
          setEvents(data || []);
        }
      } catch (err) {
        console.error("Error fetching masterclasses in blog:", err);
      }
    };
    fetchEvents();
  }, []);

  // Split featured (top 2 by score) vs rest
  const featured = posts.slice(0, 2);
  const others   = posts.slice(2);
  const completedEvents = events.filter(mc => mc.isPast);

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
      <div className="blog-main">
        {/* Grid + blobs */}
        <div className="blog-grid-bg" />
        <div className="blog-blob-top" />
        <div className="blog-blob-bottom" />

        <div className="blog-container">

          {/* ══ HERO ══ */}
          <div ref={heroRef} className="blog-hero">
            <div className="blog-badge">
              <span className="blog-badge-dot" />
              blog.fetch() → Medium · auto-sync 6h
            </div>

            <h1 className="blog-title">
              J'écris ce que
              <br />
              <span className="blog-title-gradient">je vis en production.</span>
            </h1>

            <p className="blog-description">
              Articles triés automatiquement par <strong>vues · likes · fraîcheur</strong>.
              Mis à jour toutes les 6h depuis Medium.
            </p>

            {/* Stats */}
            <div className="blog-stats-grid">
              {STATS.map((s, i) => (
                <div key={i} className="blog-stat-card">
                  <div className="blog-stat-gradient" style={{
                    background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`
                  }} />
                  <div className="blog-stat-value" style={{ color: s.color }}>
                    {loading ? "…" : s.value}
                  </div>
                  <div className="blog-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Filters + cache info */}
            <div className="blog-filters-container">
              <div className="blog-filter-row">
                {FILTERS.map(f => (
                  <FilterBtn key={f.key} label={f.label} active={filter === f.key} onClick={() => setFilter(f.key)} />
                ))}
              </div>
              {cachedAt && (
                <span className="blog-sync-info">
                  sync: {new Date(cachedAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
            </div>
          </div>

          {/* ══ ERROR ══ */}
          {error && (
            <div className="blog-error">
              ✗ {error}
            </div>
          )}

          {/* ══ LOADING SKELETONS ══ */}
          {loading && !error && (
            <div className="blog-skeleton-grid">
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* ══ FEATURED ══ */}
          {!loading && !error && featured.length > 0 && (
            <div className="blog-section">
              <div className="blog-section-subtitle">
                <span>// </span>posts.top_scored[]
              </div>
              <h2 className="blog-section-title">
                Les plus populaires
              </h2>
              <div className="blog-featured-grid">
                {featured.map((p, i) => <ArticleCard key={p.id} post={p} delay={i * 0.1} featured />)}
              </div>
            </div>
          )}

          {/* ══ COMMUNITY STORYTELLING ══ */}
          {!loading && !error && completedEvents.length > 0 && (
            <div className="blog-section">
              <div className="blog-section-subtitle">
                <span>// </span>community.impact_storytelling()
              </div>
              <h2 className="blog-section-title">
                L'Impact de Nos Événements
              </h2>
              <div className="blog-storytelling-grid">
                {completedEvents.map((mc, i) => (
                  <StorytellingCard key={mc.id} mc={mc} index={i} onClick={() => setSelectedEvent(mc)} />
                ))}
              </div>
            </div>
          )}

          {/* ══ OTHERS ══ */}
          {!loading && !error && others.length > 0 && (
            <div className="blog-section-alt">
              <div className="blog-section-subtitle">
                <span>// </span>posts.recent[]
              </div>
              <h2 className="blog-section-title">
                Articles récents
              </h2>
              <div className="blog-others-grid">
                {others.map((p, i) => <ArticleCard key={p.id} post={p} delay={i * 0.07} featured={false} />)}
              </div>
            </div>
          )}

          {/* ══ EMPTY STATE ══ */}
          {!loading && !error && posts.length === 0 && (
            <div className="blog-empty-state">
              // no posts matching filter — try "Tous"
            </div>
          )}

          {/* ══ CTA ══ */}
          <div ref={ctaRef} className="blog-cta-section">
            <div className="blog-cta-gradient" />
            <div className="blog-cta-subtitle">
              <span>// </span>follow.profiles()
            </div>
            <h2 className="blog-cta-title">
              Suivre mes publications
            </h2>
            <p className="blog-cta-desc">
              /* Notifications automatiques dès qu'un article est publié */
            </p>
            <div className="blog-cta-btn-container">
              <a href="https://medium.com/@koulodjiric" target="_blank" rel="noopener noreferrer"
                className="blog-cta-btn">
                follow_medium() →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ══ STORYTELLING DETAIL MODAL ══ */}
      {selectedEvent && (
        <div className="storytelling-modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="storytelling-modal" onClick={(e) => e.stopPropagation()}>
            <button className="storytelling-modal-close" onClick={() => setSelectedEvent(null)}>
              &times;
            </button>
            <div className="storytelling-modal-header">
              <span className="storytelling-modal-badge" style={{ borderColor: selectedEvent.themeColor, color: selectedEvent.themeColor, background: `${selectedEvent.themeColor}15` }}>
                {selectedEvent.type === "webinaire" ? "Webinaire" : "Masterclass"}
              </span>
              <span className="storytelling-modal-date">
                {new Date(selectedEvent.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>
            <h3 className="storytelling-modal-title">{selectedEvent.title}</h3>
            <div className="storytelling-modal-stats">
              <div className="storytelling-modal-stat-card">
                <span className="storytelling-modal-stat-number">{selectedEvent.registrantsCount}</span>
                <span className="storytelling-modal-stat-label">Participants inscrits</span>
              </div>
              <div className="storytelling-modal-stat-card">
                <span className="storytelling-modal-stat-number" style={{ color: "#10b981" }}>100%</span>
                <span className="storytelling-modal-stat-label">Gratuit & Ouvert</span>
              </div>
            </div>
            <div className="storytelling-modal-body">
              <h4 style={{ color: "#a78bfa", margin: "0 0 12px 0", fontSize: "15px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "monospace" }}>
                Récit de l'événement
              </h4>
              <div className="storytelling-modal-text" dangerouslySetInnerHTML={{ __html: selectedEvent.storytelling }} />
            </div>
            <div className="storytelling-modal-footer">
              <span className="storytelling-modal-speaker">Présenté par {selectedEvent.speaker?.name || "DTech-Africa"}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}