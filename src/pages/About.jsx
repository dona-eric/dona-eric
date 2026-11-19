import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
import { Counter, Magnetic, Reveal, Roll, SectionHead, SplitText, EASE } from "../quantum/primitives";
import { useMotion } from "../quantum/MotionContext";
import { STATS, VALUES, EXPERIENCES, EDUCATION } from "../data/profile";
import "../styles/About.css";

function Portrait() {
  const ref = useRef(null);
  const { reduced } = useMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const clip = useTransform(scrollYProgress, [0, 1], ["inset(18% 18% 18% 18% round 24px)", "inset(0% 0% 0% 0% round 24px)"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);

  return (
    <div ref={ref} className="ab-portrait">
      <motion.div className="ab-portrait-frame" style={reduced ? undefined : { clipPath: clip }}>
        <motion.img
          src="/eric-donerick.jpg"
          alt="Portrait de Dona Eric KOULODJI"
          loading="lazy"
          style={reduced ? undefined : { scale }}
        />
        <span className="ab-portrait-tag q-label">fig. 01 — l'observateur</span>
      </motion.div>
    </div>
  );
}

function Worldline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="ab-xp">
      <div className="ab-xp-rail" aria-hidden="true">
        <motion.span style={{ scaleY }} />
      </div>
      {EXPERIENCES.map((x, i) => (
        <motion.article
          key={x.company + x.period}
          className="ab-xp-item"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <motion.span
            className={`ab-xp-dot ${x.current ? "is-current" : ""}`}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          />
          <div className="ab-xp-when">
            <span className="q-label q-label--accent">{x.period}</span>
            <span className="q-chip">{x.type}</span>
          </div>
          <div className="ab-xp-body">
            <span className="ab-xp-idx">{String(EXPERIENCES.length - i).padStart(2, "0")}</span>
            <h3 className="ab-xp-role">{x.role}</h3>
            <p className="ab-xp-company">
              {x.company} <span>· {x.location}</span>
            </p>
            <ul className="ab-xp-tasks">
              {x.tasks.map((t) => (
                <li key={t.tag}>
                  <span className="ab-xp-tag">{t.tag}</span>
                  <span>{t.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

export default function About() {
  return (
    <div className="ab">
      <Helmet>
        <title>Profil — Dona Eric KOULODJI | Statisticien & AI Engineer</title>
        <meta name="description" content="Parcours, expériences et compétences de Dona Eric KOULODJI, Statisticien & AI Engineer, en Master 1 Statistiques Appliquées au Vivant : modélisation statistique, machine learning, LLM/RAG et MLOps." />
      </Helmet>

      <header className="q-page-hero">
        <div className="q-container">
          <span className="q-label"><span className="q-dot" /> (Profil) — Dona Eric KOULODJI</span>
          <h1 className="q-page-hero-title ab-title">
            <SplitText as="span" className="ab-title-line">Statisticien,</SplitText>
            <SplitText as="span" className="ab-title-line q-serif q-accent" delay={0.2}>AI Engineer.</SplitText>
          </h1>
        </div>
      </header>

      <section className="q-container ab-intro">
        <Portrait />
        <div className="ab-intro-text">
          <SectionHead index="01" label="Qui suis-je" />
          <Reveal>
            <p className="ab-bio-lead">
              Je transforme les données en <span className="q-serif q-accent">décisions fiables</span> : des
              modèles statistiques rigoureux et des systèmes d'intelligence artificielle qui tournent en production.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="ab-bio">
              Je suis aujourd'hui Statisticien &amp; AI Engineer chez <strong>Becotrac (Re) Assurances</strong>, où
              je mets la statistique et l'intelligence artificielle au service de l'assurance et de la réassurance.
              En parallèle, je poursuis un <strong>Master 1 en Statistiques Appliquées au Vivant</strong>.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="ab-bio">
              Ma formation initiale en physique théorique (Université d'Abomey-Calavi) m'a appris à modéliser et à
              ne croire que ce qui se mesure. Je documente mes projets, je publie le code, et je transmets via
              MLAcademy, où je forme des apprenants au machine learning appliqué.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="ab-intro-ctas">
            <Magnetic strength={0.3}>
              <a href="/cv_dona_eric.pdf" target="_blank" rel="noopener noreferrer" className="q-btn q-btn--accent">
                <Roll>Télécharger le CV</Roll> <span className="q-btn-arrow">↗</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <Link to="/projects" className="q-btn">
                <Roll>Voir les projets</Roll> <span className="q-btn-arrow">→</span>
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      <section className="q-container ab-stats">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="ab-stat">
            <Counter to={s.value} suffix={s.suffix || ""} pad={2} className="ab-stat-value" />
            <span className="q-label">{s.label}</span>
            <span className="ab-stat-note">{s.note}</span>
          </Reveal>
        ))}
      </section>

      <section className="q-section">
        <div className="q-container">
          <SectionHead index="02" label="Ligne d'univers — expériences" />
          <h2 className="q-title ab-h2">
            <SplitText>Chaque mission,</SplitText>{" "}
            <SplitText className="q-serif" delay={0.12}>une mesure.</SplitText>
          </h2>
          <Worldline />
        </div>
      </section>

      <section className="q-section ab-edu-section">
        <div className="q-container">
          <SectionHead index="03" label="Formation & certifications" />
          <ul className="ab-edu">
            {EDUCATION.map((e, i) => (
              <Reveal as="li" key={e.title} delay={i * 0.05} className="ab-edu-row">
                <span className="ab-edu-year">{e.year}</span>
                <span className="ab-edu-title">{e.title}</span>
                <span className="ab-edu-org">{e.org}</span>
                <span className="ab-edu-field">{e.field}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="q-section">
        <div className="q-container">
          <SectionHead index="04" label="Pourquoi travailler ensemble" />
          <div className="ab-values">
            {VALUES.map((v, i) => (
              <Reveal key={v.tag} delay={i * 0.1} className="ab-value">
                <span className="ab-value-num q-serif">{v.tag}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
                <span className="q-chip">→ {v.proof}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
