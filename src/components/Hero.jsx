import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useMotion } from "../quantum/MotionContext";
import { Magnetic, Roll, SplitText, EASE } from "../quantum/primitives";
import "../styles/Hero.css";

const EQUATIONS = [
  { tex: "y = Xβ + ε", note: "modèle linéaire · expliquer avant de prédire" },
  { tex: "P(y|x) ∝ P(x|y)·P(y)", note: "Bayes · raisonner sous incertitude" },
  { tex: "S/P = Σ sinistres / Σ primes", note: "assurance · piloter le risque par la donnée" },
  { tex: "L(θ) = −Σ y·log ŷ", note: "apprentissage · mesurer l'erreur" },
  { tex: "agent.invoke(query)", note: "IA · réponses sourcées en production" },
  { tex: "iħ ∂ψ/∂t = Ĥψ", note: "physique théorique · là où tout a commencé" },
];
const GLYPHS = "ψΦΣΩλ∂∇∫≈ħ01<>{}";

function EquationMorph({ play }) {
  const [idx, setIdx] = useState(0);
  const [out, setOut] = useState(EQUATIONS[0].tex);
  const { reduced } = useMotion();
  const raf = useRef(0);

  useEffect(() => {
    if (!play || reduced) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % EQUATIONS.length), 3200);
    return () => clearInterval(id);
  }, [play, reduced]);

  useEffect(() => {
    const target = EQUATIONS[idx].tex;
    if (reduced) { setOut(target); return; }
    const start = performance.now();
    const dur = 700;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      let s = "";
      for (let i = 0; i < target.length; i++) {
        if (target[i] === " ") s += " ";
        else if (i / target.length < t) s += target[i];
        else s += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      setOut(s);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [idx, reduced]);

  return (
    <div className="hq-eq" aria-live="off">
      <span className="hq-eq-tex">{out}</span>
      <motion.span
        key={idx}
        className="hq-eq-note"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
      >
        {EQUATIONS[idx].note}
      </motion.span>
    </div>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const { introDone } = useMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  const [measured, setMeasured] = useState(0);
  const onMeasure = (e) => {
    if (e.target.closest("a, button")) return;
    setMeasured((m) => m + 1);
  };

  const fade = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 1.1, ease: EASE, delay },
  });

  return (
    <section ref={ref} className="hq" onPointerDown={onMeasure}>
      <motion.div className="q-container hq-inner" style={{ y, opacity, scale }}>
        <motion.div className="hq-top" {...fade(0.1)}>
          <span className="q-label"><span className="q-dot" /> {t("home.badge")}</span>
          <span className="q-label hq-coords">Cotonou, Bénin — 6.37°N · 2.39°E</span>
        </motion.div>

        <h1 className="hq-name" aria-label="Dona Eric Koulodji">
          <SplitText as="span" by="char" className="hq-line" play={introDone} stagger={0.035} delay={0.05} duration={1.2}>
            Dona Eric
          </SplitText>
          <span className="hq-line hq-line--2">
            <SplitText as="span" by="char" play={introDone} stagger={0.035} delay={0.3} duration={1.2}>
              KOULODJI
            </SplitText>
            <motion.span className="hq-psi q-serif" {...fade(0.9)} aria-hidden="true">ψ</motion.span>
          </span>
        </h1>

        <motion.div className="hq-role" {...fade(0.55)}>
          <span className="q-serif">Statisticien</span>
          <span className="hq-role-amp">&amp;</span>
          <span>AI Engineer</span>
        </motion.div>

        <div className="hq-bottom">
          <motion.div className="hq-eq-wrap" {...fade(0.7)}>
            <span className="q-label">// statistique · machine learning · IA</span>
            <EquationMorph play={introDone} />
          </motion.div>

          <motion.div className="hq-side" {...fade(0.8)}>
            <p className="hq-lead">{t("home.heroSubtitle")}</p>
            <div className="hq-ctas">
              <Magnetic strength={0.3}>
                <Link to="/projects" className="q-btn q-btn--accent">
                  <Roll>{t("home.btnProjects")}</Roll>
                  <span className="q-btn-arrow">→</span>
                </Link>
              </Magnetic>
              <Magnetic strength={0.3}>
                <a href="/cv_dona_eric.pdf" target="_blank" rel="noopener noreferrer" className="q-btn">
                  <Roll>CV PDF</Roll>
                  <span className="q-btn-arrow">↗</span>
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        <motion.div className="hq-foot" {...fade(1)}>
          <span className="hq-scroll">
            <span className="hq-scroll-line" />
            <span className="q-label">Défiler</span>
          </span>
          <span className="q-label hq-measure">
            {measured === 0 ? (
              <>Cliquez n'importe où pour mesurer <span className="q-accent">ψ</span></>
            ) : (
              <>Mesures effectuées : <span className="q-accent">{String(measured).padStart(2, "0")}</span></>
            )}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
