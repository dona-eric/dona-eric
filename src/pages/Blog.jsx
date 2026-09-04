import { request } from "../api/apiClient";
import { MasterclassService } from "../services/masterclassService";
import { ProductService, FALLBACK_PRODUCTS } from "../services/productService";
import React, { useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import "../styles/Blog.css";

// ─── Hooks ────────────────────────────────────────────────────────────────────
import { useFadeIn, useScrollFade } from "../hooks/useAnimations";

// ─── Source config ────────────────────────────────────────────────────────────
const SOURCE_META = {
  medium: { label: "Medium", color: "#6366f1", icon: "M" },
};

const TYPE_LABELS = {
  downloadable: { label: "Téléchargeable", color: "#3b82f6" },
  course: { label: "Formation", color: "#a855f7" },
  service: { label: "Service", color: "#ec4899" },
  license: { label: "Licence", color: "#10b981" },
  bundle: { label: "Pack / Bundle", color: "#f59e0b" },
  coaching: { label: "Coaching", color: "#06b6d4" },
};

const FILTERS = [
  { key: "all", label: "Tous" },
  { key: "products", label: "🛍️ Produits & Livres" },
  { key: "medium", label: "Medium" },
];

const FALLBACK_POSTS = [
  {
    id: "https://medium.com/p/1c7a13fe5a4d",
    title: "EPISODE 7: AGENTIC CHUNKING TECHNIQUES",
    excerpt: "Welcome at Series Building RAG SYSTEMS TO ZERO-HERO IN 10 DAYS. Après LLM-Based Chunking, on arrive à une approche encore plus intéressante pour structurer vos données...",
    source: "medium",
    pub_date: 1787736661,
    score: 83,
    tags: ["artificial-intelligence", "langchain", "llm", "python-programming", "agentic-workflow"],
    raw_metrics: { views: 4965, likes: 496, comments: 24 },
    url: "https://medium.com/@koulodjiric/episode-7-agentic-chunking-techniques-1c7a13fe5a4d"
  },
  {
    id: "https://medium.com/p/d2091df9c91b",
    title: "EPISODE 6: SEGEMENTATION AGENTIC OU BASED-LLM CHUNKING",
    excerpt: "Building RAG Master in 10 Days. Jusqu’ici, nous avons essayé de définir les frontières des chunks avec des règles, puis avec le sens, puis avec la structure...",
    source: "medium",
    pub_date: 1787650261,
    score: 93,
    tags: ["agentic-rag", "artificial-intelligence", "llm", "rags"],
    raw_metrics: { views: 2241, likes: 224, comments: 11 },
    url: "https://medium.com/@koulodjiric/episode-6-segementation-agentic-ou-based-llm-chunking-d2091df9c91b"
  },
  {
    id: "https://medium.com/p/1f78c6be2e9d",
    title: "UNDERSTAND DATA ARCHITECTURES MODERNS",
    excerpt: "À l’ère de l’intelligence artificielle, les données sont comme du carburant pour les moteurs. Sans données, L’IA n’existe pas. Alors une architecture moderne...",
    source: "medium",
    pub_date: 1767708427,
    score: 97,
    tags: ["data-science", "ml-engineer", "aws-lambda", "kappa-architecture", "software-architecture"],
    raw_metrics: { views: 2162, likes: 216, comments: 10 },
    url: "https://medium.com/@koulodjiric/understand-data-architectures-moderns-1f78c6be2e9d"
  },
  {
    id: "https://medium.com/p/02d11c870cbf",
    title: "Régression Linéaire : Comprendre l'Algorithme de Base du Machine Learning",
    excerpt: "La régression linéaire est l'un des modèles fondamentaux du Machine Learning pour appréhender la modélisation prédictive...",
    source: "medium",
    pub_date: 1739355961,
    score: 83,
    tags: ["language", "machine-learning", "python", "data-science", "programming"],
    raw_metrics: { views: 1555, likes: 155, comments: 7 },
    url: "https://medium.com/@koulodjiric/r%C3%A9gression-lin%C3%A9aire-02d11c870cbf"
  },
  {
    id: "https://medium.com/p/3eff33c8dde7",
    title: "OPTIMISATION DES MODÈLES D’APPRENTISSAGE POUR LA PRODUCTION",
    excerpt: "L’optimisation des modèles d’apprentissage automatique pour la production implique l'automatisation des pipelines d'inférence et de monitoring...",
    source: "medium",
    pub_date: 1737632082,
    score: 74,
    tags: ["apache-spark", "machine-learning", "apache-airflow", "deployment-pipelines", "automation-tools"],
    raw_metrics: { views: 4418, likes: 441, comments: 22 },
    url: "https://medium.com/@koulodjiric/optimisation-des-mod%C3%A8les-dapprentissage-pour-la-production-3eff33c8dde7"
  },
  {
    id: "https://medium.com/p/4fd8685628c8",
    title: "Avoid Using PCA for Visualisation Unless…",
    excerpt: "ACP : Analyse en Composantes Principales, de par sa nature est une technique de réduction de dimensionnalité. Parfois utilisée pour la visualisation...",
    source: "medium",
    pub_date: 1732554164,
    score: 76,
    tags: ["data-science", "machine-learning", "data-visualization", "data-analysis", "pca-analysis"],
    raw_metrics: { views: 3672, likes: 367, comments: 18 },
    url: "https://medium.com/@koulodjiric/avoid-using-pca-for-visualisation-unless-4fd8685628c8"
  },
  {
    id: "https://medium.com/p/ffd431c80d49",
    title: "Enrichissez l’analyse des données manquantes avec des cartes thermiques",
    excerpt: "En science de données, lors de l’exploration, le nettoyage des données manquantes est une étape clé avant la modélisation...",
    source: "medium",
    pub_date: 1729196453,
    score: 86,
    tags: ["missforest", "knn-algorithm", "handling-missing-values", "missing-value-treatment", "data-analyst"],
    raw_metrics: { views: 2624, likes: 262, comments: 13 },
    url: "https://medium.com/@koulodjiric/enrichissez-lanalyse-des-donn%C3%A9es-manquantes-avec-des-cartes-thermiques-ffd431c80d49"
  },
  {
    id: "https://medium.com/p/a6fbd676f0a0",
    title: "Modélisation de sujets",
    excerpt: "La modélisation de sujets avec NLP et LLMs permet d'extraire automatiquement des thématiques à partir d'un grand volume de textes...",
    source: "medium",
    pub_date: 1728308062,
    score: 99,
    tags: ["modelisation-des-sujets", "llms-utilization", "data-science", "nlp"],
    raw_metrics: { views: 1594, likes: 159, comments: 7 },
    url: "https://medium.com/@koulodjiric/mod%C3%A9lisation-de-sujets-a6fbd676f0a0"
  },
  {
    id: "https://medium.com/p/3d555cdf4074",
    title: "Sur moi — De la Physique fondamentale à la Data Science",
    excerpt: "Mon premier article sur Medium : Mon voyage vers l’exploration du monde quantique, de la physique théorique vers l'IA et le Machine Learning.",
    source: "medium",
    pub_date: 1727816633,
    score: 81,
    tags: ["physique", "machine-learning-ai", "physique-quantique", "data-science"],
    raw_metrics: { views: 499, likes: 49, comments: 2 },
    url: "https://medium.com/@koulodjiric/sur-moi-3d555cdf4074"
  }
];

// ─── Skeleton card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="blog-skeleton-card">
      {["60%", "90%", "75%", "40%"].map((w, i) => (
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
  const ref = useScrollFade(delay);
  const [hov, setHov] = useState(false);
  const src = SOURCE_META[post.source] || SOURCE_META.medium;

  const pubDate = new Date(post.pub_date * 1000).toLocaleDateString("fr-FR", {
    day: "numeric", month: "short", year: "numeric"
  });

  const metrics = post.raw_metrics || { views: 0, likes: 0, comments: 0 };

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
        {post.tags && post.tags.length > 0 && (
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
                👁 {metrics.views >= 1000 ? (metrics.views / 1000).toFixed(1) + "k" : metrics.views}
              </span>
            )}
            {metrics.likes > 0 && (
              <span className="article-metric">
                ♥ {metrics.likes >= 1000 ? (metrics.likes / 1000).toFixed(1) + "k" : metrics.likes}
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
          <span className="storytelling-readmore" style={{ display: "block", marginTop: "12px", color: "#6366f1", fontWeight: "600", fontSize: "13px" }}>
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

// ─── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ product, index }) {
  const ref = useScrollFade(index * 0.1);
  const [hov, setHov] = useState(false);

  const { name, description, pricing, pictures, type, category, slug, is_free } = product;
  const imageSrc = pictures?.cover || pictures?.thumbnail;
  const typeMeta = TYPE_LABELS[type] || { label: type || "Produit", color: "#6366f1" };
  const priceDisplay = is_free || pricing?.type === "free" ? "Gratuit" : (pricing?.current_price?.formatted || "Voir offre");
  const categoryLabel = category?.label;
  const buyUrl = product.buy_url || product.url || `https://cykrhzat.mychariow.shop/${slug}`;

  const cleanDesc = description ? description.replace(/(<([^>]+)>)/gi, "").trim() : "";

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="product-card"
      style={{
        background: hov ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hov ? typeMeta.color + "60" : "rgba(255,255,255,0.07)"}`,
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? `0 20px 48px ${typeMeta.color}15` : "none"
      }}
    >
      <div className="product-card-top-bar" style={{
        background: `linear-gradient(90deg, transparent, ${typeMeta.color}, transparent)`,
        opacity: hov ? 1 : 0.3
      }} />

      {imageSrc ? (
        <div className="product-image-container">
          <img src={imageSrc} alt={name} className="product-image" />
          <div className="product-image-overlay" />
        </div>
      ) : (
        <div className="product-image-placeholder" style={{
          background: `radial-gradient(circle at center, ${typeMeta.color}20 0%, rgba(15,23,42,0.8) 100%)`
        }}>
          <span className="product-placeholder-icon">📦</span>
        </div>
      )}

      <div className="product-card-body">
        <div className="product-tags-row">
          <span className="product-type-badge" style={{
            color: typeMeta.color,
            background: typeMeta.color + "15",
            border: `1px solid ${typeMeta.color}35`
          }}>
            {typeMeta.label}
          </span>
          {categoryLabel && (
            <span className="product-category-badge">
              {categoryLabel}
            </span>
          )}
        </div>

        <h3 className="product-title" style={{ color: hov ? "#ffffff" : "#f1f5f9" }}>
          {name}
        </h3>

        {cleanDesc && (
          <p className="product-description">
            {cleanDesc.length > 130 ? cleanDesc.substring(0, 130) + "..." : cleanDesc}
          </p>
        )}

        <div className="product-card-footer">
          <div className="product-price-tag">
            <span className="product-price-label">Prix</span>
            <span className="product-price-value" style={{ color: is_free || pricing?.type === "free" ? "#10b981" : "#00d4ff" }}>
              {priceDisplay}
            </span>
          </div>

          <a
            href={buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="product-buy-btn"
            style={{
              background: hov ? typeMeta.color : typeMeta.color + "dd",
              boxShadow: hov ? `0 4px 20px ${typeMeta.color}50` : "none"
            }}
          >
            Obtenir ↗
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Blog() {
  const heroRef = useFadeIn(0.1);

  const [posts, setPosts] = useState(FALLBACK_POSTS);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [cachedAt, setCachedAt] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const fetchPosts = useCallback(async (source = "all") => {
    try {
      const data = await request(`posts?source=${source}&limit=20`);
      if (Array.isArray(data?.posts) && data.posts.length > 0) {
        setPosts(data.posts);
        setCachedAt(data.cached_at);
      }
    } catch (err) {
      console.warn("[Blog] API error fetching live posts, using static catalog:", err.message);
    }
  }, []);

  useEffect(() => { fetchPosts(filter); }, [filter, fetchPosts]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await MasterclassService.getAll();
      setEvents(data || []);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      const data = await ProductService.getAll();
      if (data && data.length > 0) {
        setProducts(data);
      }
      setLoadingProducts(false);
    };
    fetchProducts();
  }, []);

  // Split featured (top 2 by score) vs rest
  const featured = posts.slice(0, 2);
  const others = posts.slice(2);
  const completedEvents = events.filter(mc => mc.isPast);

  // Aggregate stats
  const totalViews = posts.reduce((a, p) => a + (p.raw_metrics?.views || 0), 0);
  const totalLikes = posts.reduce((a, p) => a + (p.raw_metrics?.likes || 0), 0);

  const STATS = [
    { value: `${posts.length}`, label: "Articles", color: "#00d4ff" },
    { value: `${products.length}`, label: "Produits & Livres", color: "#10b981" },
    { value: totalViews >= 1000 ? (totalViews / 1000).toFixed(1) + "k" : totalViews || "—", label: "Vues totales", color: "#a78bfa" },
    { value: totalLikes >= 1000 ? (totalLikes / 1000).toFixed(1) + "k" : totalLikes || "—", label: "Likes / Claps", color: "#f59e0b" },
  ];

  const showProductsSection = filter === "all" || filter === "products" || filter === "books";
  const showArticlesSection = filter === "all" || filter === "medium";

  return (
    <>
      <Helmet>
        <title>Blog & Produits | Dona Eric</title>
        <meta name="description" content="Articles Medium, livres, produits numériques et masterclasses sur l'intelligence artificielle, le ML et le déploiement cloud par Dona Eric KOULODJI." />
      </Helmet>
      <div className="blog-main">
        {/* Grid + blobs */}
        <div className="blog-grid-bg" />
        <div className="blog-blob-top" />
        <div className="blog-blob-bottom" />

        <div className="blog-container">

          {/* ══ HERO ══ */}
          <div ref={heroRef} className="blog-hero">
            <div className="blog-badge" style={{ background: "rgba(99,102,241,0.1)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.2)" }}>
              <span className="blog-badge-dot" style={{ background: "#818cf8", boxShadow: "0 0 8px #818cf8" }} />
              MLAcademy & Chariow Store
            </div>
            <h1 className="blog-title">
              Écrits, Livres & <span className="gradient-text">Produits.</span>
            </h1>
            <p className="blog-description">
              Découvrez mes articles techniques pointus publiés sur Medium, mes livres électroniques et l'ensemble
              de nos produits numériques sur Chariow pour maîtriser l'Ingénierie IA & le Machine Learning.
            </p>
          </div>

          {/* Stats */}
          <div className="blog-stats-grid">
            {STATS.map((s, i) => (
              <div key={i} className="blog-stat-card">
                <div className="blog-stat-gradient" style={{
                  background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`
                }} />
                <div className="blog-stat-value" style={{ color: s.color }}>
                  {s.value}
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

          {/* ══ PRODUCTS SECTION ══ */}
          {showProductsSection && (
            <div className="blog-section">
              <div className="blog-section-subtitle">
                <span>// </span>products.chariow_store[]
              </div>
              <h2 className="blog-section-title">
                {filter === "all" ? "Produits & Livres Numériques" : "Tous mes Produits & Livres"}
              </h2>

              {loadingProducts && products.length === 0 ? (
                <div className="blog-skeleton-grid">
                  {[...Array(2)].map((_, i) => <SkeletonCard key={i} />)}
                </div>
              ) : products.length > 0 ? (
                <div className="blog-featured-grid">
                  {products.map((p, i) => <ProductCard key={p.id || i} product={p} index={i} />)}
                </div>
              ) : (
                <div className="blog-empty-state">
                  // Aucun produit disponible pour le moment.
                </div>
              )}
            </div>
          )}

          {/* ══ ARTICLES FEATURED ══ */}
          {showArticlesSection && featured.length > 0 && (
            <div className="blog-section">
              <div className="blog-section-subtitle">
                <span>// </span>posts.top_scored[]
              </div>
              <h2 className="blog-section-title">
                Les Articles les plus populaires sur Medium
              </h2>
              <div className="blog-featured-grid">
                {featured.map((p, i) => <ArticleCard key={p.id || i} post={p} delay={i * 0.1} featured />)}
              </div>
            </div>
          )}

          {/* ══ COMMUNITY STORYTELLING ══ */}
          {showArticlesSection && completedEvents.length > 0 && (
            <div className="blog-section">
              <div className="blog-section-subtitle">
                <span>// </span>community.impact_storytelling()
              </div>
              <h2 className="blog-section-title">
                L'Impact de Nos Événements
              </h2>
              <div className="blog-storytelling-grid">
                {completedEvents.map((mc, i) => (
                  <StorytellingCard key={mc.id || i} mc={mc} index={i} onClick={() => setSelectedEvent(mc)} />
                ))}
              </div>
            </div>
          )}

          {/* ══ OTHERS ARTICLES ══ */}
          {showArticlesSection && others.length > 0 && (
            <div className="blog-section-alt">
              <div className="blog-section-subtitle">
                <span>// </span>posts.recent[]
              </div>
              <h2 className="blog-section-title">
                Tous les Articles Medium Récentes
              </h2>
              <div className="blog-others-grid">
                {others.map((p, i) => <ArticleCard key={p.id || i} post={p} delay={i * 0.07} featured={false} />)}
              </div>
            </div>
          )}

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