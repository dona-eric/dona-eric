import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/*
  Two-part cursor: a precise dot and a lagging ring.
  - over links/buttons → ring expands
  - over [data-cursor="label"] with data-cursor-label → accent disc with text
  - over text inputs → collapses to a thin caret
*/
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState("default"); // default | link | label | text | hidden
  const [label, setLabel] = useState("");
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("q-has-cursor");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const el = e.target.closest?.(
        "[data-cursor], a, button, [role='button'], input, textarea, select, label, summary"
      );
      if (!el) { setMode("default"); return; }
      const c = el.getAttribute("data-cursor");
      if (c === "label") {
        setLabel(el.getAttribute("data-cursor-label") || "Voir");
        setMode("label");
      } else if (c === "hide") {
        setMode("hidden");
      } else if (el.matches("input:not([type=checkbox]):not([type=radio]):not([type=submit]), textarea")) {
        setMode("text");
      } else {
        setMode("link");
      }
    };
    const leave = () => setMode("hidden");
    const enter = () => setMode("default");
    const pd = () => setDown(true);
    const pu = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    window.addEventListener("pointerdown", pd);
    window.addEventListener("pointerup", pu);
    return () => {
      document.documentElement.classList.remove("q-has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
      window.removeEventListener("pointerdown", pd);
      window.removeEventListener("pointerup", pu);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize = { default: 34, link: 64, label: 104, text: 4, hidden: 0 }[mode];
  const ringStyle =
    mode === "label"
      ? { background: "var(--q-accent)", borderColor: "var(--q-accent)" }
      : mode === "link"
      ? { background: "rgba(238,236,228,0.06)", borderColor: "var(--q-ink)" }
      : {};

  return (
    <>
      <motion.div
        className="q-cursor-ring"
        style={{ x: rx, y: ry, ...ringStyle }}
        animate={{
          width: mode === "text" ? 2 : ringSize,
          height: mode === "text" ? 28 : ringSize,
          borderRadius: mode === "text" ? 2 : 999,
          opacity: mode === "hidden" ? 0 : 1,
          scale: down ? 0.82 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        <AnimatePresence>
          {mode === "label" && (
            <motion.span
              key={label}
              className="q-cursor-label"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25 }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="q-cursor-dot"
        style={{ x, y }}
        animate={{ opacity: mode === "default" ? 1 : 0, scale: down ? 1.8 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
