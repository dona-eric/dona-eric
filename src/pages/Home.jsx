import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Hero from "../components/Hero";
import PulsarGlyph from "../quantum/PulsarGlyph";
import {Counter, Magnetic, Marquee, Reveal, Roll, ScrubWords, SectionHead, SplitText, EASE,
} from "../quantum/primitives";
import { useScrollLock } from "../quantum/MotionContext";
import { useLanguage } from "../context/LanguageContext";
import { PROJECTS, STATUS } from "../data/projects";
import { STATS, VALUES } from "../data/profile";
import { ReviewService, DEFAULT_REVIEWS } from "../services/reviewService";
import "../styles/Home.css";

/* ─────────── Marquee band ─────────── */
const BAND = [
  "NLP",
  { en: "LLM agents", fr: "Agents LLM" },
  "RAG",
  "MLOps",
  { en: "Time series", fr: "Séries temporelles" },
  "Computer Vision",
  { en: "SHAP explainability", fr: "Explicabilité SHAP" },
  "FastAPI",
];

function Band() {
  const { tr, tx } = useLanguage();
  return (
    <section className="hm-band" aria-label={tr("Domains", "Domaines")}>
      <Marquee speed={45}>
        {BAND.map((w, i) => (
          <span key={i} className="hm-band-item">
            {i % 2 ? <span className="q-serif">{tx(w)}</span> : tx(w)}
            <span className="hm-band-sep">ψ</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/* ─────────── Manifesto + stats ─────────── */
function Manifesto() {
  const { lang, tr, tx } = useLanguage();
  return (
    <section className="q-section hm-manifesto">
      <div className="q-container">
        <SectionHead index="01" label={tr("Manifesto", "Manifeste")} />
        <ScrubWords
          className="hm-manifesto-text"
          key={lang}
          text={tr(
            "A decision is only as good as the data and the rigour of the model behind it. I state the assumptions, quantify the uncertainty, then ship AI systems that hold up in production.",
            "Une décision ne vaut que par la qualité de la donnée et la rigueur du modèle qui la portent. Je pose les hypothèses, je quantifie l'incertitude, puis je livre des systèmes IA qui tiennent en production."
          )}
          highlight={lang === "fr" ? ["rigueur", "l'incertitude", "production"] : ["rigour", "uncertainty", "production"]}
        />
        <div className="hm-stats">
          {STATS.map((s, i) => (
            <Reveal key={s.value + tx(s.label)} delay={i * 0.08} className="hm-stat">
              <Counter to={s.value} suffix={s.suffix || ""} pad={2} className="hm-stat-value" />
              <span className="hm-stat-label">{tx(s.label)}</span>
              <span className="hm-stat-note">{tx(s.note)}</span>
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
  const { tr, tx } = useLanguage();
  const status = STATUS[p.status] || STATUS.done;

  return (
    <article
      className="hm-panel"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => navigate(`/projects#${p.id}`)}
      data-cursor="label"
      data-cursor-label={tr("Open", "Ouvrir")}
    >
      <div className="hm-panel-visual">
        <PulsarGlyph seed={p.id} color={p.accent} active={hover} />
        <span className="hm-panel-idx">{String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        <span className={`hm-panel-status tone-${status.tone}`}>
          <i /> {tx(status.label)}
        </span>
      </div>
      <div className="hm-panel-info">
        <span className="q-label">{p.category.toUpperCase()} · {tx(p.impactDetail)}</span>
        <h3 className="hm-panel-title">{p.title}</h3>
        <p className="hm-panel-sub">{tx(p.subtitle)}</p>
        <div className="hm-panel-impact">
          <span className="q-serif">{tx(p.impact)}</span>
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
              <Roll>{tr("Demo", "Démo")}</Roll> <span className="q-btn-arrow">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function FeaturedProjects() {
  const { tr } = useLanguage();
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
          <SectionHead index="02" label={tr("Selected projects", "Projets sélectionnés")} />
          <div className="hm-featured-title-row">
            <h2 className="q-title">
              <SplitText>{tr("From model", "Du modèle")}</SplitText>{" "}
              <SplitText className="q-serif q-accent" delay={0.15}>{tr("to product.", "au produit.")}</SplitText>
            </h2>
            <Link to="/projects" className="hm-featured-all">
              <Roll>{tr("All projects", "Tous les projets")} ({String(PROJECTS.length).padStart(2, "0")})</Roll> →
            </Link>
          </div>
        </div>

        <motion.div ref={trackRef} className="hm-track" style={wide ? { x } : undefined}>
          {featured.map((p, i) => (
            <ProjectPanel key={p.id} p={p} i={i} total={featured.length} />
          ))}
          {wide && (
            <Link to="/projects" className="hm-panel hm-panel--more" data-cursor="label" data-cursor-label={tr("See all", "Tout voir")}>
              <span className="q-label">(+{PROJECTS.length - featured.length})</span>
              <span className="hm-more-text">{tr(`See all ${PROJECTS.length} projects`, `Voir les ${PROJECTS.length} projets`)}</span>
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
  {
    t: { en: "Applied statistics", fr: "Statistique appliquée" },
    s: { en: "Modelling · Inference · Testing · R / Python", fr: "Modélisation · Inférence · Tests · R / Python" },
    d: {
      en: "Explicit assumptions, quantified uncertainty, results the business can interpret.",
      fr: "Hypothèses explicites, incertitude quantifiée, résultats interprétables par le métier.",
    },
  },
  {
    t: "Machine Learning",
    s: { en: "Scikit-Learn · XGBoost · PyTorch · Time series", fr: "Scikit-Learn · XGBoost · PyTorch · Séries temporelles" },
    d: {
      en: "Predictive models evaluated honestly: baseline, cross-validation, overfitting control.",
      fr: "Modèles prédictifs évalués honnêtement : baseline, validation croisée, contrôle du surapprentissage.",
    },
  },
  {
    t: { en: "LLMs & Agents", fr: "LLM & Agents" },
    s: "LangGraph · RAG · Qdrant · ChromaDB · Groq",
    d: {
      en: "Agents that cite their sources, measured retrieval, guardrails and evaluation.",
      fr: "Agents qui citent leurs sources, retrieval mesuré, garde-fous et évaluation.",
    },
  },
  {
    t: "MLOps",
    s: "Docker · FastAPI · MLflow · DVC · CI/CD",
    d: {
      en: "From notebook to API: versioning, drift monitoring, reproducible deployment.",
      fr: "Du notebook à l'API : versioning, monitoring de dérive, déploiement reproductible.",
    },
  },
  {
    t: "Data",
    s: "Python · SQL · PySpark · PostgreSQL",
    d: {
      en: "Clean pipelines, controlled data quality, multi-gigabyte corpora.",
      fr: "Pipelines propres, qualité de données contrôlée, corpus de plusieurs Go.",
    },
  },
];

function Expertise() {
  const { tr, tx } = useLanguage();
  return (
    <section className="q-section hm-expertise">
      <div className="q-container">
        <SectionHead index="03" label={tr("Expertise spectrum", "Spectre d'expertise")} />
        <ul className="hm-exp-list">
          {EXPERTISE.map((e, i) => (
            <Reveal as="li" key={tx(e.t)} delay={i * 0.06} className="hm-exp-row">
              <Link to="/skills" className="hm-exp-link" data-cursor="label" data-cursor-label="Stack">
                <span className="hm-exp-idx">{String(i + 1).padStart(2, "0")}</span>
                <span className="hm-exp-title">{tx(e.t)}</span>
                <span className="hm-exp-meta">
                  <span className="hm-exp-stack">{tx(e.s)}</span>
                  <span className="hm-exp-desc">{tx(e.d)}</span>
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
  const { tx } = useLanguage();
  const start = i / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i) * 0.035]);
  return (
    <div className="hm-approach-slot" style={{ top: `calc(110px + ${i * 28}px)` }}>
      <motion.div className="hm-approach-card" style={{ scale }}>
        <div className="hm-approach-left">
          <span className="hm-approach-num q-serif">{v.tag}</span>
        </div>
        <div className="hm-approach-right">
          <h3 className="hm-approach-title">{tx(v.title)}</h3>
          <p className="hm-approach-desc">{tx(v.desc)}</p>
          <span className="q-chip hm-approach-proof">→ {tx(v.proof)}</span>
        </div>
      </motion.div>
    </div>
  );
}

function Approach() {
  const { tr } = useLanguage();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section className="q-section hm-approach">
      <div className="q-container">
        <SectionHead index="04" label={tr("Method", "Méthode")} />
        <h2 className="q-title hm-approach-heading">
          <SplitText>{tr("Three principles,", "Trois principes,")}</SplitText>{" "}
          <SplitText className="q-serif" delay={0.12}>{tr("zero slides.", "zéro slide.")}</SplitText>
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
  const { tr } = useLanguage();
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
      setError(tr("Please enter your name and your review.", "Veuillez remplir votre nom et votre avis."));
      return;
    }
    setSubmitting(true);
    try {
      const res = await ReviewService.create(form);
      await onCreated(res);
      setSuccess(true);
      setTimeout(onClose, 1800);
    } catch (err) {
      setError(err.message || tr("Something went wrong while sending your review.", "Erreur lors de l'envoi de votre avis."));
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
        <button className="hm-modal-close" onClick={onClose} aria-label={tr("Close", "Fermer")}>×</button>
        {success ? (
          <div className="hm-modal-success">
            <span className="q-label q-label--accent">{tr("Measurement recorded ✓", "Mesure enregistrée ✓")}</span>
            <h3>{tr("Thank you for your review.", "Merci pour votre avis.")}</h3>
            <p>{tr("Your feedback has been published.", "Votre retour d'expérience a été publié.")}</p>
          </div>
        ) : (
          <form onSubmit={submit} className="hm-modal-form">
            <span className="q-label">{tr("// new review", "// nouvel avis")}</span>
            <h3 id="review-title">{tr("Leave a review", "Donner votre avis")}</h3>
            <p className="hm-modal-intro">{tr("Share your feedback on Dona Eric's teaching, pedagogy and collaborative work.", "Partagez votre retour sur la pédagogie, l'enseignement et le travail collaboratif avec Dona Eric.")}</p>
            {error && <div className="hm-modal-error">{error}</div>}
            <div className="q-field">
              <label htmlFor="rv-name">{tr("Full name *", "Nom & prénom *")}</label>
              <input id="rv-name" type="text" required placeholder={tr("Jane Doe", "Jean Dupont")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="q-field">
              <label htmlFor="rv-role">{tr("Role / programme followed", "Rôle / formation suivie")}</label>
              <input id="rv-role" type="text" placeholder={tr("MLAcademy student", "Étudiant MLAcademy")} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            </div>
            <div className="q-field">
              <label>{tr("Rating", "Note")}</label>
              <div className="hm-stars-pick" role="radiogroup" aria-label={tr("Rating out of 5", "Note sur 5")}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={form.rating === s}
                    aria-label={tr(`${s} out of 5`, `${s} sur 5`)}
                    className={s <= form.rating ? "is-on" : ""}
                    onClick={() => setForm({ ...form, rating: s })}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="q-field">
              <label htmlFor="rv-comment">{tr("Your review *", "Votre avis *")}</label>
              <textarea id="rv-comment" required rows={4} placeholder={tr("Clarity of explanations, method, project follow-up…", "Clarté des explications, méthode, suivi des projets…")} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} />
            </div>
            <button type="submit" className="q-btn q-btn--accent" disabled={submitting}>
              {submitting ? tr("Sending…", "Envoi en cours…") : tr("Publish my review →", "Publier mon avis →")}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

function Reviews() {
  const { tr } = useLanguage();
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
        <SectionHead index="05" label={tr("Feedback", "Retours d'expérience")} />
        <div className="hm-reviews-head">
          <h2 className="q-title">
            <SplitText>{tr("What learners", "Ce qu'en disent")}</SplitText>{" "}
            <SplitText className="q-serif" delay={0.12}>{tr("have to say.", "les apprenants.")}</SplitText>
          </h2>
          <div className="hm-reviews-meta">
            <span className="hm-reviews-score">5.0<small>/5</small></span>
            <span className="q-label">{tr("MLAcademy & bootcamps · reviews published by learners", "MLAcademy & bootcamps · avis publiés par les apprenants")}</span>
            <Magnetic strength={0.25}>
              <button className="q-btn" onClick={() => setOpen(true)}>
                <Roll>{tr("Leave a review", "Laisser un avis")}</Roll> <span className="q-btn-arrow">→</span>
              </button>
            </Magnetic>
          </div>
        </div>
      </div>

      <div ref={wrapRef} className="hm-reviews-wrap" data-cursor="label" data-cursor-label={tr("Drag", "Glisser")}>
        <motion.div
          ref={trackRef}
          className="hm-reviews-track"
          drag={limit > 0 ? "x" : false}
          dragConstraints={{ left: -limit, right: 0 }}
          dragElastic={0.08}
        >
          {reviews.length === 0 && (
            <div className="hm-review-card"><p>{tr("Be the first learner to leave a testimonial.", "Soyez le premier étudiant à laisser un témoignage.")}</p></div>
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
                    <small>{rev.role || tr("Student / Learner", "Étudiant / Apprenant")}</small>
                  </span>
                  <span className="hm-review-stars" aria-label={tr(`${rating} out of 5`, `${rating} sur 5`)}>
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
