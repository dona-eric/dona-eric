import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Magnetic, Reveal, Roll, Scramble, EASE } from "../quantum/primitives";
import { fieldBus } from "../quantum/MotionContext";
import { useLanguage } from "../context/LanguageContext";
import "../styles/NotFound.css";

export default function NotFound() {
  const location = useLocation();
  const { tr } = useLanguage();
  const [tries, setTries] = useState(0);

  const measure = (e) => {
    fieldBus.measure(e.clientX, e.clientY);
    setTries((t) => t + 1);
  };

  return (
    <div className="nf">
      <Helmet>
        <title>{tr("404 — Page not found", "404 — Page introuvable")} | Dona Eric KOULODJI</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="q-container nf-inner">
        <span className="q-label"><span className="q-dot" /> {tr("Error 404 — unobserved state", "Erreur 404 — état non observé")}</span>

        <button className="nf-code" onClick={measure} data-cursor="label" data-cursor-label={tr("Measure", "Mesurer")} aria-label={tr("Measure the particle", "Mesurer la particule")}>
          <span>4</span>
          <motion.span
            className="nf-psi q-serif"
            key={tries}
            initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            ψ
          </motion.span>
          <span>4</span>
        </button>

        <Reveal>
          <h1 className="nf-title">{tr("Particle not found.", "Particule introuvable.")}</h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="q-lead">
            {tr(
              "This page is in a superposed state: it exists and does not exist at the same time.",
              "Cette page est dans un état superposé : elle existe et n'existe pas à la fois."
            )}
            {tries > 0 && (
              <> {tr("Measurements taken:", "Mesures effectuées :")} <span className="q-accent">{tries}</span>. {tr("Result: still nothing.", "Résultat : toujours rien.")}</>
            )}
          </p>
        </Reveal>
        <Reveal delay={0.12} className="nf-path">
          <span className="q-label">{tr("Requested path", "Chemin demandé")}</span>
          <code><Scramble text={location.pathname} /></code>
        </Reveal>
        <Reveal delay={0.16} className="nf-ctas">
          <Magnetic strength={0.3}>
            <Link to="/" className="q-btn q-btn--accent">
              <Roll>{tr("Back to home", "Retour à l'accueil")}</Roll> <span className="q-btn-arrow">→</span>
            </Link>
          </Magnetic>
          <Magnetic strength={0.3}>
            <Link to="/projects" className="q-btn"><Roll>{tr("See projects", "Voir les projets")}</Roll></Link>
          </Magnetic>
        </Reveal>
      </div>
    </div>
  );
}
