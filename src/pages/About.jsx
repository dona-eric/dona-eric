import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useMotionValue, useMotionTemplate, useScroll, useSpring, useTransform } from "framer-motion";
import { Counter, Magnetic, Reveal, Roll, SectionHead, SplitText } from "../quantum/primitives";
import { useMotion } from "../quantum/MotionContext";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { Stage3D } from "../quantum/three/Stage3D";
import { usePalette, webglAvailable } from "../quantum/three/utils";
import GaussianCloud from "../quantum/three/GaussianCloud";
import { sampleMixture } from "../quantum/three/mixture";
import WorldlineHelix from "../quantum/three/WorldlineHelix";
import { STATS, VALUES, EXPERIENCES, EDUCATION } from "../data/profile";
import "../styles/About.css";

function useMedia(query) {
  const get = () => typeof window !== "undefined" && window.matchMedia(query).matches;
  const [match, setMatch] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}

/* ─────────── fig. 01 — Gaussian mixture ─────────── */
const COMPONENT_LEGEND = [
  { key: "accent", en: ["Statistics", "inference · uncertainty"], fr: ["Statistique", "inférence · incertitude"] },
  { key: "violet", en: ["Machine learning", "prediction · validation"], fr: ["Machine learning", "prédiction · validation"] },
  { key: "cyan", en: ["AI systems", "LLM · agents · MLOps"], fr: ["Systèmes IA", "LLM · agents · MLOps"] },
];

function CloudFallback() {
  const pts = useMemo(() => {
    const { pos, cluster, n } = sampleMixture(140);
    return Array.from({ length: n }, (_, i) => ({ x: pos[i * 3], y: pos[i * 3 + 1], c: cluster[i] }));
  }, []);
  const fills = ["var(--q-accent-text)", "var(--q-violet)", "var(--q-cyan)"];
  return (
    <svg className="ab-cloud-fallback" viewBox="-2 -2 4 4" aria-hidden="true">
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={-p.y} r={0.025} fill={fills[p.c]} opacity={0.8} />
      ))}
    </svg>
  );
}

function MixtureFigure({ palette, light, reduced }) {
  const { lang, tr } = useLanguage();
  const [focus, setFocus] = useState(-1);
  const [pinned, setPinned] = useState(-1);
  const shown = pinned >= 0 ? pinned : focus;

  return (
    <figure className="ab-fig ab-fig--cloud">
      <div className="ab-fig-frame">
        <span className="ab-fig-corner ab-fig-corner--tl" aria-hidden="true" />
        <span className="ab-fig-corner ab-fig-corner--br" aria-hidden="true" />
        <Stage3D
          className="ab-cloud"
          label={tr(
            "3D scatter plot: a three-component Gaussian mixture representing statistics, machine learning and AI systems",
            "Nuage de points 3D : un mélange de trois gaussiennes représentant la statistique, le machine learning et les systèmes IA"
          )}
          fallback={<CloudFallback />}
          data-cursor="label"
          data-cursor-label={tr("Orbit", "Orbiter")}
        >
          <GaussianCloud palette={palette} focus={shown} reduced={reduced} light={light} />
        </Stage3D>
        <span className="ab-fig-axis q-label" aria-hidden="true">x₁ · x₂ · x₃</span>
      </div>
      <figcaption className="ab-fig-cap">
        <div className="ab-legend" role="group" aria-label={tr("Mixture components", "Composantes du mélange")}>
          {COMPONENT_LEGEND.map((c, i) => {
            const [name, desc] = lang === "fr" ? c.fr : c.en;
            return (
              <button
                key={c.key}
                type="button"
                className={`ab-legend-item ${shown === i ? "is-on" : ""} ${shown >= 0 && shown !== i ? "is-off" : ""}`}
                aria-pressed={pinned === i}
                onMouseEnter={() => setFocus(i)}
                onMouseLeave={() => setFocus(-1)}
                onFocus={() => setFocus(i)}
                onBlur={() => setFocus(-1)}
                onClick={() => setPinned((p) => (p === i ? -1 : i))}
              >
                <span className={`ab-legend-dot ab-legend-dot--${c.key}`} />
                <span className="ab-legend-name">{name}</span>
                <span className="ab-legend-desc">{desc}</span>
              </button>
            );
          })}
        </div>
        <span className="q-label ab-fig-note">
          {tr("fig. 01 — Gaussian mixture · K = 3 · n = 1,950 · 2σ ellipsoids", "fig. 01 — mélange gaussien · K = 3 · n = 1 950 · ellipsoïdes à 2σ")}
        </span>
      </figcaption>
    </figure>
  );
}

/* ─────────── fig. 02 — portrait card in CSS 3D ─────────── */
function Portrait3D() {
  const { tr } = useLanguage();
  const ref = useRef(null);
  const { reduced } = useMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(30);
  const srx = useSpring(rx, { stiffness: 140, damping: 16, mass: 0.6 });
  const sry = useSpring(ry, { stiffness: 140, damping: 16, mass: 0.6 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scrollTilt = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [9, -9]);
  const rotateX = useTransform([scrollTilt, srx], ([a, b]) => a + b);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.22), transparent 55%)`;

  const onMove = (e) => {
    if (reduced || e.pointerType === "touch") return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 18);
    rx.set(-(py - 0.5) * 14);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(30);
  };

  return (
    <div ref={ref} className="ab-p3d" onPointerMove={onMove} onPointerLeave={reset}>
      <motion.div className="ab-p3d-card" style={{ rotateX, rotateY: sry }}>
        <span className="ab-p3d-back" aria-hidden="true" />
        <div className="ab-p3d-photo">
          <img src="/eric-donerick.jpg" alt={tr("Portrait of Dona Eric KOULODJI", "Portrait de Dona Eric KOULODJI")} loading="lazy" />
          <motion.span className="ab-p3d-glare" style={{ background: glare }} aria-hidden="true" />
        </div>
        <span className="ab-p3d-tag q-label">{tr("fig. 02 — the observer", "fig. 02 — l'observateur")}</span>
        <span className="ab-p3d-coords q-label" aria-hidden="true">6.37°N · 2.39°E</span>
      </motion.div>
    </div>
  );
}

/* ─────────── fig. 03 — worldline ─────────── */
function Worldline({ palette, reduced }) {
  const { tr, tx } = useLanguage();
  const { lenis } = useMotion();
  const wide = useMedia("(min-width: 900px)");
  const [gl] = useState(webglAvailable);
  const [active, setActive] = useState(0);
  const items = useRef([]);
  const currentIndex = EXPERIENCES.findIndex((x) => x.current);
  const total = EXPERIENCES.length;

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index));
        });
      },
      { rootMargin: "-42% 0px -52% 0px" }
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const select = (i) => {
    const el = items.current[i];
    if (!el) return;
    setActive(i);
    const offset = -window.innerHeight * 0.38;
    if (lenis.current) lenis.current.scrollTo(el, { offset, duration: 1.4 });
    else {
      const y = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
    }
  };

  const x = EXPERIENCES[active];

  return (
    <div className={`ab-wl ${gl ? "" : "ab-wl--flat"}`}>
      {gl && (
        <div className="ab-wl-stage">
          <div className="ab-wl-frame">
            <Stage3D
              className="ab-helix"
              label={tr(
                "3D helix: each node is one experience, the axis is time",
                "Hélice 3D : chaque nœud est une expérience, l'axe est le temps"
              )}
            >
              <WorldlineHelix
                count={total}
                active={active}
                currentIndex={currentIndex}
                onSelect={select}
                palette={palette}
                reduced={reduced}
                horizontal={!wide}
              />
            </Stage3D>
            <div className="ab-wl-hud" aria-live="polite">
              <span className="q-label q-label--accent">
                {String(total - active).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="ab-wl-hud-company">{tx(x.company)}</span>
              <span className="q-label">{tx(x.period)}</span>
            </div>
            <span className="ab-wl-hint q-label" aria-hidden="true">
              {wide ? tr("past ↓ · present ↑", "passé ↓ · présent ↑") : tr("past ← · present →", "passé ← · présent →")}
            </span>
          </div>
          <span className="q-label ab-fig-note">
            {tr("fig. 03 — worldline · one node per experience", "fig. 03 — ligne d'univers · un nœud par expérience")}
          </span>
        </div>
      )}

      <ol className="ab-wl-list">
        {EXPERIENCES.map((xp, i) => (
          <li
            key={tx(xp.company) + tx(xp.period)}
            ref={(el) => (items.current[i] = el)}
            data-index={i}
            className={`ab-wl-item ${i === active ? "is-active" : ""}`}
          >
            <div className="ab-wl-when">
              <span className={`ab-wl-dot ${xp.current ? "is-current" : ""}`} aria-hidden="true" />
              <span className="q-label q-label--accent">{tx(xp.period)}</span>
              <span className="q-chip">{tx(xp.type)}</span>
            </div>
            <span className="ab-wl-idx">{String(total - i).padStart(2, "0")}</span>
            <h3 className="ab-wl-role">{tx(xp.role)}</h3>
            <p className="ab-wl-company">
              {tx(xp.company)} <span>· {tx(xp.location)}</span>
            </p>
            <ul className="ab-wl-tasks">
              {xp.tasks.map((t) => (
                <li key={tx(t.tag)}>
                  <span className="ab-wl-tag">{tx(t.tag)}</span>
                  <span>{tx(t.desc)}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ─────────── values: tilt cards ─────────── */
function TiltCard({ children, className = "", delay = 0 }) {
  const { reduced } = useMotion();
  const rx = useSpring(0, { stiffness: 160, damping: 18 });
  const ry = useSpring(0, { stiffness: 160, damping: 18 });
  const onMove = (e) => {
    if (reduced || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };
  return (
    <Reveal delay={delay} className="ab-tilt">
      <motion.div className={className} style={{ rotateX: rx, rotateY: ry }} onPointerMove={onMove} onPointerLeave={reset}>
        {children}
      </motion.div>
    </Reveal>
  );
}

export default function About() {
  const { tr, tx } = useLanguage();
  const { theme } = useTheme();
  const { reduced } = useMotion();
  const palette = usePalette(theme);

  return (
    <div className="ab">
      <Helmet>
        <title>{tr("About", "Profil")} — Dona Eric KOULODJI | {tr("Statistician & AI Engineer", "Statisticien & AI Engineer")}</title>
        <meta
          name="description"
          content={tr(
            "Background, experience and skills of Dona Eric KOULODJI, Statistician & AI Engineer and Master's student in Applied Statistics: statistical modelling, machine learning, LLM/RAG and MLOps.",
            "Parcours, expériences et compétences de Dona Eric KOULODJI, Statisticien & AI Engineer, en Master 1 Statistiques Appliquées au Vivant : modélisation statistique, machine learning, LLM/RAG et MLOps."
          )}
        />
      </Helmet>

      <header className="q-page-hero ab-hero">
        <div className="q-container ab-hero-grid">
          <div className="ab-hero-copy">
            <span className="q-label">
              <span className="q-dot" /> ({tr("Profile", "Profil")}) — Dona Eric KOULODJI
            </span>
            <h1 className="q-page-hero-title ab-title">
              <SplitText as="span" className="ab-title-line">{tr("Statistician,", "Statisticien,")}</SplitText>
              <SplitText as="span" className="ab-title-line q-serif q-accent" delay={0.2}>AI Engineer.</SplitText>
            </h1>
            <Reveal delay={0.35}>
              <p className="ab-hero-lead">
                {tr(
                  "Applied statistics, machine learning and AI in production. Three distributions, one profile: pick a component in the legend to isolate it.",
                  "Statistique appliquée, machine learning et IA en production. Trois distributions, un seul profil : choisissez une composante dans la légende pour l'isoler."
                )}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15} y={30} className="ab-hero-fig">
            <MixtureFigure palette={palette} light={theme === "light"} reduced={reduced} />
          </Reveal>
        </div>
      </header>

      <section className="q-container ab-intro">
        <Portrait3D />
        <div className="ab-intro-text">
          <SectionHead index="01" label={tr("Who I am", "Qui suis-je")} />
          <Reveal>
            <p className="ab-bio-lead">
              {tr("I turn data into ", "Je transforme les données en ")}
              <span className="q-serif q-accent">{tr("reliable decisions", "décisions fiables")}</span>
              {tr(
                ": rigorous statistical models and AI systems that run in production.",
                " : des modèles statistiques rigoureux et des systèmes d'intelligence artificielle qui tournent en production."
              )}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="ab-bio">
              {tr("I currently work as a Statistician & AI Engineer at ", "Je suis aujourd'hui Statisticien & AI Engineer chez ")}
              <strong>Becotrac (Re) Assurances</strong>
              {tr(
                ", applying statistics and artificial intelligence to insurance and reinsurance. Alongside this, I am completing a ",
                ", où je mets la statistique et l'intelligence artificielle au service de l'assurance et de la réassurance. En parallèle, je poursuis un "
              )}
              <strong>{tr("first-year Master's in Applied Statistics for Life Sciences", "Master 1 en Statistiques Appliquées au Vivant")}</strong>.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="ab-bio">
              {tr(
                "My background in theoretical physics (University of Abomey-Calavi) taught me to model, and to trust only what can be measured. I document my projects, publish the code, and teach applied machine learning through MLAcademy.",
                "Ma formation initiale en physique théorique (Université d'Abomey-Calavi) m'a appris à modéliser et à ne croire que ce qui se mesure. Je documente mes projets, je publie le code, et je transmets via MLAcademy, où je forme des apprenants au machine learning appliqué."
              )}
            </p>
          </Reveal>
          <Reveal delay={0.2} className="ab-intro-ctas">
            <Magnetic strength={0.3}>
              <a href="/cv_dona_eric.pdf" target="_blank" rel="noopener noreferrer" className="q-btn q-btn--accent">
                <Roll>{tr("Download CV", "Télécharger le CV")}</Roll> <span className="q-btn-arrow">↗</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <Link to="/projects" className="q-btn">
                <Roll>{tr("See projects", "Voir les projets")}</Roll> <span className="q-btn-arrow">→</span>
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      <section className="q-container ab-stats">
        {STATS.map((s, i) => (
          <Reveal key={tx(s.label)} delay={i * 0.08} className="ab-stat">
            <Counter to={s.value} suffix={s.suffix || ""} pad={2} className="ab-stat-value" />
            <span className="q-label">{tx(s.label)}</span>
            <span className="ab-stat-note">{tx(s.note)}</span>
          </Reveal>
        ))}
      </section>

      <section className="q-section">
        <div className="q-container">
          <SectionHead index="02" label={tr("Worldline — experience", "Ligne d'univers — expériences")} />
          <h2 className="q-title ab-h2">
            <SplitText>{tr("Every mission,", "Chaque mission,")}</SplitText>{" "}
            <SplitText className="q-serif" delay={0.12}>{tr("a measurement.", "une mesure.")}</SplitText>
          </h2>
          <Worldline palette={palette} reduced={reduced} />
        </div>
      </section>

      <section className="q-section ab-edu-section">
        <div className="q-container">
          <SectionHead index="03" label={tr("Education & certifications", "Formation & certifications")} />
          <ul className="ab-edu">
            {EDUCATION.map((e, i) => (
              <Reveal as="li" key={tx(e.title)} delay={i * 0.05} className="ab-edu-row">
                <span className="ab-edu-year">{tx(e.year)}</span>
                <span className="ab-edu-title">{tx(e.title)}</span>
                <span className="ab-edu-org">{tx(e.org)}</span>
                <span className="ab-edu-field">{tx(e.field)}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="q-section">
        <div className="q-container">
          <SectionHead index="04" label={tr("Why work together", "Pourquoi travailler ensemble")} />
          <div className="ab-values">
            {VALUES.map((v, i) => (
              <TiltCard key={v.tag} delay={i * 0.1} className="ab-value">
                <span className="ab-value-num q-serif">{v.tag}</span>
                <h3>{tx(v.title)}</h3>
                <p>{tx(v.desc)}</p>
                <span className="q-chip">→ {tx(v.proof)}</span>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
