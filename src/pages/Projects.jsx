import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useSpring } from "framer-motion";
import PulsarGlyph from "../quantum/PulsarGlyph";
import { Magnetic, Reveal, Roll, SplitText, EASE } from "../quantum/primitives";
import { useScrollLock } from "../quantum/MotionContext";
import { PROJECTS, CATEGORIES, STATUS } from "../data/projects";
import "../styles/Projects.css";

/* Cursor-following preview (fine pointers only) */
function FloatingPreview({ project }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 160, damping: 22, mass: 0.6 });
  const [fine, setFine] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setFine(true);
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!fine) return null;

  return (
    <motion.div className="pj-float" style={{ x: sx, y: sy }}>
      <AnimatePresence>
        {project && (
          <motion.div
            key={project.id}
            className="pj-float-card"
            initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <PulsarGlyph seed={project.id} color={project.accent} active lines={22} />
            <span className="pj-float-impact q-serif">{project.impact}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Drawer({ project, onClose }) {
  useScrollLock(true);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const status = STATUS[project.status] || STATUS.done;
  const blocks = [
    { k: "Problème", v: project.problem },
    { k: "Solution", v: project.solution },
    { k: "Résultats", v: project.results },
  ];

  return (
    <motion.div className="pj-drawer-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.aside
        className="pj-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pj-drawer-title"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        <div className="pj-drawer-visual">
          <PulsarGlyph seed={project.id} color={project.accent} active lines={30} />
          <button className="pj-drawer-close" onClick={onClose} aria-label="Fermer">×</button>
        </div>
        <div className="pj-drawer-body">
          <div className="pj-drawer-meta">
            <span className={`pj-status tone-${status.tone}`}><i />{status.label}</span>
            <span className="q-label">{project.category}</span>
          </div>
          <h2 id="pj-drawer-title" className="pj-drawer-title">{project.title}</h2>
          <p className="pj-drawer-sub">{project.subtitle}</p>
          <p className="pj-drawer-impact q-serif">{project.impact} — {project.impactDetail}</p>

          <dl className="pj-drawer-blocks">
            {blocks.map((b, i) => (
              <motion.div
                key={b.k}
                className="pj-drawer-block"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.35 + i * 0.08 }}
              >
                <dt className="q-label">{String(i + 1).padStart(2, "0")} — {b.k}</dt>
                <dd>{b.v}</dd>
              </motion.div>
            ))}
          </dl>

          <div className="pj-drawer-stack">
            {project.stack.map((s) => <span key={s} className="q-chip">{s}</span>)}
          </div>

          <div className="pj-drawer-links">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="q-btn">
              <Roll>Code source</Roll> <span className="q-btn-arrow">↗</span>
            </a>
            {project.demo ? (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="q-btn q-btn--accent">
                <Roll>Démo en ligne</Roll> <span className="q-btn-arrow">↗</span>
              </a>
            ) : (
              <span className="q-label">{project.status === "wip" ? "En cours de développement" : "Pas de démo publique"}</span>
            )}
          </div>
        </div>
      </motion.aside>
    </motion.div>
  );
}

export default function Projects() {
  const location = useLocation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [hovered, setHovered] = useState(null);
  const selectedId = location.hash.replace("#", "");
  const selected = PROJECTS.find((p) => p.id === selectedId) || null;

  const list = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  const count = (id) => (id === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.category === id).length);

  const open = (p) => navigate(`/projects#${p.id}`, { replace: false });
  const close = () => navigate("/projects", { replace: true });

  return (
    <div className="pj">
      <Helmet>
        <title>Projets IA — Dona Eric KOULODJI | Statisticien & AI Engineer</title>
        <meta name="description" content="8 projets IA : NLP, agents LLM/RAG, scoring crédit explicable, qualité de l'air et MLOps. Code public, démos et résultats documentés." />
      </Helmet>

      <header className="q-page-hero">
        <div className="q-container">
          <span className="q-label"><span className="q-dot" /> (Index) — code public · résultats mesurés</span>
          <h1 className="q-page-hero-title">
            <SplitText as="span" by="char" stagger={0.04}>Projets</SplitText>
            <sup>({String(PROJECTS.length).padStart(2, "0")})</sup>
          </h1>
          <div className="q-page-hero-foot">
            <Reveal>
              <p className="q-lead">
                Chaque projet part d'un besoin concret et va jusqu'à un livrable testable : notebook, API,
                démo ou outil open source.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="pj-kpis">
              <span><b>{PROJECTS.filter((p) => p.status === "production").length}</b> en production</span>
              <span><b>{PROJECTS.filter((p) => p.demo).length}</b> démos publiques</span>
              <span><b>1</b> prix de hackathon</span>
            </Reveal>
          </div>
        </div>
      </header>

      <section className="q-container">
        <LayoutGroup>
          <div className="pj-filters" role="tablist" aria-label="Filtrer par domaine">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={filter === c.id}
                className={`pj-filter ${filter === c.id ? "is-active" : ""}`}
                onClick={() => setFilter(c.id)}
              >
                {filter === c.id && (
                  <motion.span layoutId="pj-filter-pill" className="pj-filter-pill" transition={{ duration: 0.5, ease: EASE }} />
                )}
                <span className="pj-filter-label">{c.label}</span>
                <sup>{count(c.id)}</sup>
              </button>
            ))}
          </div>

          <div className="pj-head-row" aria-hidden="true">
            <span>N°</span><span>Projet</span><span>Domaine</span><span>Statut</span><span />
          </div>

          <motion.ul layout className="pj-list" onMouseLeave={() => setHovered(null)}>
            <AnimatePresence mode="popLayout">
              {list.map((p) => {
                const status = STATUS[p.status] || STATUS.done;
                const n = PROJECTS.indexOf(p) + 1;
                return (
                  <motion.li
                    layout
                    key={p.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.55, ease: EASE }}
                  >
                    <button
                      className="pj-row"
                      onMouseEnter={() => setHovered(p)}
                      onFocus={() => setHovered(p)}
                      onClick={() => open(p)}
                      data-cursor="label"
                      data-cursor-label="Détails"
                    >
                      <span className="pj-row-n">{String(n).padStart(2, "0")}</span>
                      <span className="pj-row-main">
                        <span className="pj-row-title">{p.title}</span>
                        <span className="pj-row-sub">{p.subtitle}</span>
                      </span>
                      <span className="pj-row-cat q-label">{p.category}</span>
                      <span className={`pj-status tone-${status.tone}`}><i />{status.label}</span>
                      <span className="pj-row-arrow">→</span>
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>

        <Reveal className="pj-cta">
          <p className="q-lead">Vous avez un défi data ou IA ? Construisons-le ensemble.</p>
          <Magnetic strength={0.3}>
            <a href="https://wa.me/2290151344289" target="_blank" rel="noopener noreferrer" className="q-btn q-btn--accent">
              <Roll>Démarrer un projet</Roll> <span className="q-btn-arrow">→</span>
            </a>
          </Magnetic>
        </Reveal>
      </section>

      <FloatingPreview project={selected ? null : hovered} />

      <AnimatePresence>
        {selected && <Drawer key={selected.id} project={selected} onClose={close} />}
      </AnimatePresence>
    </div>
  );
}
