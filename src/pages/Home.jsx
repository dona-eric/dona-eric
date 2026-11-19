import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Hero from "../components/Hero";
import PulsarGlyph from "../quantum/PulsarGlyph";
import {Counter, Magnetic, Marquee, Reveal, Roll, ScrubWords, SectionHead, SplitText, EASE,
} from "../quantum/primitives";
import { useScrollLock } from "../quantum/MotionContext";
import { PROJECTS, STATUS } from "../data/projects";
import { STATS, VALUES } from "../data/profile";
import { ReviewService, DEFAULT_REVIEWS } from "../services/reviewService";
import "../styles/Home.css";

/* ─────────── Marquee band ─────────── */
const BAND = ["NLP", "Agents LLM", "RAG", "MLOps", "Séries temporelles", "Computer Vision", "Explicabilité SHAP", "FastAPI"];

function Band() {
  return (
    <section className="hm-band" aria-label="Domaines">
      <Marquee speed={45}>
        {BAND.map((w, i) => (
          <span key={i} className="hm-band-item">
            {i % 2 ? <span className="q-serif">{w}</span> : w}
            <span className="hm-band-sep">ψ</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/* ─────────── Manifesto + stats ─────────── */
function Manifesto() {
  return (
    <section className="q-section hm-manifesto">
      <div className="q-container">
        <SectionHead index="01" label="Manifeste" />
        <ScrubWords
          className="hm-manifesto-text"
          text="Une décision ne vaut que par la qualité de la donnée et la rigueur du modèle qui la portent. Je pose les hypothèses, je quantifie l'incertitude, puis je livre des systèmes IA qui tiennent en production."
          highlight={["rigueur", "l'incertitude", "production"]}
        />
        <div className="hm-stats">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="hm-stat">
              <Counter to={s.value} suffix={s.suffix || ""} pad={2} className="hm-stat-value" />
              <span className="hm-stat-label">{s.label}</span>
              <span className="hm-stat-note">{s.note}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Featured projects: pinned horizontal scroll ─────────── */
function ProjectPanel({ p, i, total }) {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const status = STATUS[p.status] || STATUS.done;

  return (
    <article
      className="hm-panel"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => navigate(`/projects#${p.id}`)}
      data-cursor="label"
      data-cursor-label="Ouvrir"
    >
      <div className="hm-panel-visual">
        <PulsarGlyph seed={p.id} color={p.accent} active={hover} />
        <span className="hm-panel-idx">{String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        <span className={`hm-panel-status tone-${status.tone}`}>
          <i /> {status.label}
        </span>
      </div>
      <div className="hm-panel-info">
        <span className="q-label">{p.category.toUpperCase()} · {p.impactDetail}</span>
        <h3 className="hm-panel-title">{p.title}</h3>
        <p className="hm-panel-sub">{p.subtitle}</p>
        <div className="hm-panel-impact">
          <span className="q-serif">{p.impact}</span>
        </div>
        <div className="hm-panel-stack">
          {p.stack.slice(0, 5).map((s) => <span key={s} className="q-chip">{s}</span>)}
        </div>
        <div className="hm-panel-links" onClick={(e) => e.stopPropagation()}>
          <a href={p.github} target="_blank" rel="noopener noreferrer" className="q-btn q-btn--sm">
            <Roll>Code</Roll> <span className="q-btn-arrow">↗</span>
          </a>
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noopener noreferrer" className="q-btn q-btn--sm q-btn--accent">
              <Roll>Démo</Roll> <span className="q-btn-arrow">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function FeaturedProjects() {
  const featured = PROJECTS.filter((p) => p.featured);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [dist, setDist] = useState(0);
  const [wide, setWide] = useState(() => typeof window !== "undefined" && window.innerWidth >= 900);

  useLayoutEffect(() => {
    const measure = () => {
      const isWide = window.innerWidth >= 900;
      setWide(isWide);
      if (isWide && trackRef.current) {
        setDist(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="hm-featured"
      style={wide ? { height: `calc(100vh + ${dist}px)` } : undefined}
    >
      <div className={wide ? "hm-featured-sticky" : "hm-featured-static"}>
        <div className="q-container hm-featured-head">
          <SectionHead index="02" label="Projets sélectionnés" />
          <div className="hm-featured-title-row">
            <h2 className="q-title">
              <SplitText>Du modèle</SplitText>{" "}
              <SplitText className="q-serif q-accent" delay={0.15}>au produit.</SplitText>
            </h2>
            <Link to="/projects" className="hm-featured-all">
              <Roll>Tous les projets ({String(PROJECTS.length).padStart(2, "0")})</Roll> →
            </Link>
          </div>
        </div>

        <motion.div ref={trackRef} className="hm-track" style={wide ? { x } : undefined}>
          {featured.map((p, i) => (
            <ProjectPanel key={p.id} p={p} i={i} total={featured.length} />
          ))}
          {wide && (
            <Link to="/projects" className="hm-panel hm-panel--more" data-cursor="label" data-cursor-label="Tout voir">
              <span className="q-label">(+{PROJECTS.length - featured.length})</span>
              <span className="hm-more-text">Voir les {PROJECTS.length} projets</span>
              <span className="hm-more-arrow">→</span>
            </Link>
          )}
        </motion.div>

        {wide && (
          <div className="q-container">
            <div className="hm-progress"><motion.span style={{ width: bar }} /></div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────── Expertise rows ─────────── */
const EXPERTISE = [
  { t: "Statistique appliquée", s: "Modélisation · Inférence · Tests · R / Python", d: "Hypothèses explicites, incertitude quantifiée, résultats interprétables par le métier." },
  { t: "Machine Learning", s: "Scikit-Learn · XGBoost · PyTorch · Séries temporelles", d: "Modèles prédictifs évalués honnêtement : baseline, validation croisée, contrôle du surapprentissage." },
  { t: "LLM & Agents", s: "LangGraph · RAG · Qdrant · ChromaDB · Groq", d: "Agents qui citent leurs sources, retrieval mesuré, garde-fous et évaluation." },
  { t: "MLOps", s: "Docker · FastAPI · MLflow · DVC · CI/CD", d: "Du notebook à l'API : versioning, monitoring de dérive, déploiement reproductible." },
  { t: "Data", s: "Python · SQL · PySpark · PostgreSQL", d: "Pipelines propres, qualité de données contrôlée, corpus de plusieurs Go." },
];

function Expertise() {
  return (
    <section className="q-section hm-expertise">
      <div className="q-container">
        <SectionHead index="03" label="Spectre d'expertise" />
        <ul className="hm-exp-list">
          {EXPERTISE.map((e, i) => (
            <Reveal as="li" key={e.t} delay={i * 0.06} className="hm-exp-row">
              <Link to="/skills" className="hm-exp-link" data-cursor="label" data-cursor-label="Stack">
                <span className="hm-exp-idx">{String(i + 1).padStart(2, "0")}</span>
                <span className="hm-exp-title">{e.t}</span>
                <span className="hm-exp-meta">
                  <span className="hm-exp-stack">{e.s}</span>
                  <span className="hm-exp-desc">{e.d}</span>
                </span>
                <span className="hm-exp-arrow">→</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─────────── Approach: stacked sticky cards ─────────── */
function ApproachCard({ v, i, total, progress }) {
  const start = i / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i) * 0.035]);
  return (
    <div className="hm-approach-slot" style={{ top: `calc(110px + ${i * 28}px)` }}>
      <motion.div className="hm-approach-card" style={{ scale }}>
        <div className="hm-approach-left">
          <span className="hm-approach-num q-serif">{v.tag}</span>
        </div>
        <div className="hm-approach-right">
          <h3 className="hm-approach-title">{v.title}</h3>
          <p className="hm-approach-desc">{v.desc}</p>
          <span className="q-chip hm-approach-proof">→ {v.proof}</span>
        </div>
      </motion.div>
    </div>
  );
}

function Approach() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section className="q-section hm-approach">
      <div className="q-container">
        <SectionHead index="04" label="Méthode" />
        <h2 className="q-title hm-approach-heading">
          <SplitText>Trois principes,</SplitText>{" "}
          <SplitText className="q-serif" delay={0.12}>zéro slide.</SplitText>
        </h2>
        <div ref={ref} className="hm-approach-stack">
          {VALUES.map((v, i) => (
            <ApproachCard key={v.tag} v={v} i={i} total={VALUES.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── Reviews ─────────── */
function ReviewModal({ onClose, onCreated }) {
  const [form, setForm] = useState({ name: "", role: "", rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  useScrollLock(true);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.name.trim() || !form.comment.trim()) {
      setError("Veuillez remplir votre nom et votre avis.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await ReviewService.create(form);
      await onCreated(res);
      setSuccess(true);
      setTimeout(onClose, 1800);
    } catch (err) {
      setError(err.message || "Erreur lors de l'envoi de votre avis.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className="hm-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="hm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-title"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        <button className="hm-modal-close" onClick={onClose} aria-label="Fermer">×</button>
        {success ? (
          <div className="hm-modal-success">
            <span className="q-label q-label--accent">Mesure enregistrée ✓</span>
            <h3>Merci pour votre avis.</h3>
            <p>Votre retour d'expérience a été publié.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="hm-modal-form">
            <span className="q-label">// nouvel avis</span>
            <h3 id="review-title">Donner votre avis</h3>
            <p className="hm-modal-intro">Partagez votre retour sur la pédagogie, l'enseignement et le travail collaboratif avec Dona Eric.</p>
            {error && <div className="hm-modal-error">{error}</div>}
            <div className="q-field">
              <label htmlFor="rv-name">Nom &amp; prénom *</label>
              <input id="rv-name" type="text" required placeholder="Jean Dupont" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="q-field">
              <label htmlFor="rv-role">Rôle / formation suivie</label>
              <input id="rv-role" type="text" placeholder="Étudiant MLAcademy" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            </div>
            <div className="q-field">
              <label>Note</label>
              <div className="hm-stars-pick" role="radiogroup" aria-label="Note sur 5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={form.rating === s}
                    aria-label={`${s} sur 5`}
                    className={s <= form.rating ? "is-on" : ""}
                    onClick={() => setForm({ ...form, rating: s })}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="q-field">
              <label htmlFor="rv-comment">Votre avis *</label>
              <textarea id="rv-comment" required rows={4} placeholder="Clarté des explications, méthode, suivi des projets…" value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} />
            </div>
            <button type="submit" className="q-btn q-btn--accent" disabled={submitting}>
              {submitting ? "Envoi en cours…" : "Publier mon avis →"}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

function Reviews() {
  const [reviews, setReviews] = useState(DEFAULT_REVIEWS);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const [limit, setLimit] = useState(0);

  useEffect(() => {
    ReviewService.getAll().then((data) => {
      if (data && data.length > 0) setReviews(data);
    });
  }, []);

  useLayoutEffect(() => {
    const m = () => {
      if (!wrapRef.current || !trackRef.current) return;
      setLimit(Math.max(0, trackRef.current.scrollWidth - wrapRef.current.clientWidth));
    };
    m();
    const ro = new ResizeObserver(m);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [reviews]);

  const onCreated = async (res) => {
    if (res && res.review) setReviews((prev) => [res.review, ...prev]);
    else setReviews(await ReviewService.getAll());
  };

  return (
    <section className="q-section hm-reviews">
      <div className="q-container">
        <SectionHead index="05" label="Retours d'expérience" />
        <div className="hm-reviews-head">
          <h2 className="q-title">
            <SplitText>Ce qu'en disent</SplitText>{" "}
            <SplitText className="q-serif" delay={0.12}>les apprenants.</SplitText>
          </h2>
          <div className="hm-reviews-meta">
            <span className="hm-reviews-score">5.0<small>/5</small></span>
            <span className="q-label">MLAcademy &amp; bootcamps · avis publiés par les apprenants</span>
            <Magnetic strength={0.25}>
              <button className="q-btn" onClick={() => setOpen(true)}>
                <Roll>Laisser un avis</Roll> <span className="q-btn-arrow">→</span>
              </button>
            </Magnetic>
          </div>
        </div>
      </div>

      <div ref={wrapRef} className="hm-reviews-wrap" data-cursor="label" data-cursor-label="Glisser">
        <motion.div
          ref={trackRef}
          className="hm-reviews-track"
          drag={limit > 0 ? "x" : false}
          dragConstraints={{ left: -limit, right: 0 }}
          dragElastic={0.08}
        >
          {reviews.length === 0 && (
            <div className="hm-review-card"><p>Soyez le premier étudiant à laisser un témoignage.</p></div>
          )}
          {reviews.map((rev, i) => {
            const rating = Math.max(1, Math.min(5, rev.rating || 5));
            return (
              <article key={rev.id || i} className="hm-review-card">
                <span className="hm-review-q q-serif" aria-hidden="true">“</span>
                <p className="hm-review-text">{rev.comment}</p>
                <footer className="hm-review-foot">
                  <span className="hm-review-avatar">{(rev.name || "E").charAt(0).toUpperCase()}</span>
                  <span>
                    <strong>{rev.name}</strong>
                    <small>{rev.role || "Étudiant / Apprenant"}</small>
                  </span>
                  <span className="hm-review-stars" aria-label={`${rating} sur 5`}>
                    {"★".repeat(rating)}<span>{"★".repeat(5 - rating)}</span>
                  </span>
                </footer>
              </article>
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence>
        {open && <ReviewModal onClose={() => setOpen(false)} onCreated={onCreated} />}
      </AnimatePresence>
    </section>
  );
}

export default function Home() {
  return (
    <div className="hm">
      <Hero />
      <Band />
      <Manifesto />
      <FeaturedProjects />
      <Expertise />
      <Approach />
      <Reviews />
    </div>
  );
}
