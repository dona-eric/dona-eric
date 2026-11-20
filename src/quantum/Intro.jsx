import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fieldBus, useMotion } from "./MotionContext";
import { EASE, EASE_IO } from "./primitives";
import { useLanguage } from "../context/LanguageContext";

const NAME = "DONA ERIC KOULODJI";
const GLYPHS = "ψΦΣΩλ∂∇∫≈ħ01⟩⟨";
const DURATION = 2300;

/* First-visit sequence: the name sits in superposition, then collapses. */
export default function Intro() {
  const { tr } = useLanguage();
  const { introDone, setIntroDone } = useMotion();
  const [visible, setVisible] = useState(!introDone);
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState(() => NAME.replace(/\S/g, "·"));
  const raf = useRef(0);

  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - t, 2.2);
      setProgress(Math.round(eased * 100));

      // each letter collapses at its own (pseudo-random) moment
      let s = "";
      for (let i = 0; i < NAME.length; i++) {
        const ch = NAME[i];
        const collapseAt = 0.35 + ((i * 37) % 11) / 22; // 0.35 → 0.85
        if (ch === " ") s += " ";
        else if (t >= collapseAt) s += ch;
        else s += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      setName(s);

      if (t < 1) raf.current = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          fieldBus.measure(window.innerWidth / 2, window.innerHeight * 0.55);
          setIntroDone(true);
          setVisible(false);
        }, 260);
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="q-intro"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 1.1, ease: EASE_IO }}
          aria-hidden="true"
        >
          <div className="q-intro-top">
            <span className="q-label"><span className="q-dot" /> ψ — LAB/01</span>
            <span className="q-label">Cotonou · 6.37°N 2.39°E</span>
          </div>

          <div className="q-intro-center">
            <motion.div
              className="q-intro-eq"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              |ψ⟩ = α<span className="q-accent">|{tr("statistics", "statistique")}⟩</span> + β<span style={{ color: "var(--q-violet)" }}>|{tr("AI", "IA")}⟩</span>
            </motion.div>
            <div className="q-intro-name">{name}</div>
            <motion.div
              className="q-intro-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.2, ease: "linear" }}
            />
            <div className="q-intro-sub q-label">
              {progress < 100 ? tr("superposed state — measuring", "état superposé — mesure en cours") : tr("wavefunction measured ✓", "fonction d'onde mesurée ✓")}
            </div>
          </div>

          <div className="q-intro-count">
            {String(progress).padStart(3, "0")}
            <span>%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
