import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useAnimationFrame,
} from "framer-motion";
import { useMotion } from "./MotionContext";

export const EASE = [0.22, 1, 0.36, 1];
export const EASE_IO = [0.76, 0, 0.24, 1];

/* ─────────────────────────────────────────────
   SplitText — words rise from behind a mask.
   `as` = tag, `delay` = start delay, `stagger` per word.
   `play` lets the caller gate the reveal (e.g. after the intro).
───────────────────────────────────────────── */
export function SplitText({
  children,
  as: Tag = "span",
  className = "",
  style,
  delay = 0,
  stagger = 0.06,
  duration = 1,
  once = true,
  play,
  by = "word",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "0px 0px -10% 0px" });
  const { reduced } = useMotion();
  const active = play === undefined ? inView : play && inView;
  const text = typeof children === "string" ? children : String(children ?? "");
  const MotionTag = motion[Tag] || motion.span;

  const units = by === "char" ? Array.from(text) : text.split(" ");

  return (
    <MotionTag ref={ref} className={className} style={style} aria-label={text}>
      {units.map((u, i) => (
        <span key={i} className="q-mask" aria-hidden="true">
          <motion.span
            style={{ display: "inline-block", whiteSpace: "pre" }}
            initial={reduced ? false : { y: "110%", rotate: 4 }}
            animate={active || reduced ? { y: "0%", rotate: 0 } : { y: "110%", rotate: 4 }}
            transition={{ duration, ease: EASE, delay: delay + i * stagger }}
          >
            {u}
            {by === "word" && i < units.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/* Reveal — fade + rise for any block */
export function Reveal({ children, delay = 0, y = 40, className = "", style, as = "div", once = true, amount = 0.2 }) {
  const { reduced } = useMotion();
  const M = motion[as] || motion.div;
  return (
    <M
      className={className}
      style={style}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

/* ScrubWords — paragraph whose words light up as you scroll through it */
export function ScrubWords({ text, className = "", style, highlight = [] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.35"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className} style={{ ...style, color: "var(--q-ink)" }}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <ScrubWord
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            hl={highlight.includes(w.replace(/[.,;:!?]/g, ""))}
          >
            {w}
          </ScrubWord>
        );
      })}
    </p>
  );
}

function ScrubWord({ children, progress, range, hl }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <span style={{ position: "relative", display: "inline-block", marginRight: "0.25em" }}>
      <motion.span
        style={{ opacity, color: hl ? "var(--q-accent-text)" : undefined }}
        className={hl ? "q-serif" : undefined}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* Magnetic — element is attracted towards the pointer */
export function Magnetic({ children, strength = 0.35, className = "", style }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const { reduced } = useMotion();

  const onMove = (e) => {
    if (reduced) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy, display: "inline-flex", ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Scramble — text decodes from random glyphs into its final value */
const GLYPHS = "ψΦΣΩλ∂∇∫≈01<>/{}#*+=";
export function Scramble({ text, className = "", style, trigger = "view", duration = 900, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: trigger === "view" });
  const [out, setOut] = useState(text);
  const { reduced } = useMotion();
  const frame = useRef(0);

  const run = () => {
    if (reduced) { setOut(text); return; }
    cancelAnimationFrame(frame.current);
    const start = performance.now() + delay;
    const tick = (now) => {
      const t = Math.max(0, Math.min(1, (now - start) / duration));
      const revealed = Math.floor(t * text.length);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") s += " ";
        else if (i < revealed) s += text[i];
        else s += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      setOut(s);
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (trigger === "view" && inView) run();
    return () => cancelAnimationFrame(frame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, text]);

  return (
    <span
      ref={ref}
      className={className}
      style={style}
      onMouseEnter={trigger === "hover" ? run : undefined}
      aria-label={text}
    >
      <span aria-hidden="true">{out}</span>
    </span>
  );
}

/* Marquee — infinite strip, speeds up with scroll velocity */
export function Marquee({ children, speed = 40, reverse = false, className = "", style }) {
  const x = useMotionValue(0);
  const trackRef = useRef(null);
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const boost = useRef(0);
  const { reduced } = useMotion();

  useAnimationFrame((_, delta) => {
    if (reduced || !trackRef.current) return;
    const w = trackRef.current.scrollWidth / 2;
    if (!w) return;
    const y = scrollY.get();
    const v = Math.abs(y - lastY.current);
    lastY.current = y;
    boost.current += (Math.min(v, 80) * 0.12 - boost.current) * 0.08;
    const dir = reverse ? 1 : -1;
    let next = x.get() + dir * (speed + boost.current * 60) * (delta / 1000);
    if (next <= -w) next += w;
    if (next > 0) next -= w;
    x.set(next);
  });

  return (
    <div className={`q-marquee ${className}`} style={style}>
      <motion.div ref={trackRef} className="q-marquee-track" style={{ x }}>
        <div className="q-marquee-track">{children}</div>
        <div className="q-marquee-track" aria-hidden="true">{children}</div>
      </motion.div>
    </div>
  );
}

/* Counter — counts up when in view */
export function Counter({ to, prefix = "", suffix = "", duration = 1.6, className = "", style, pad = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [v, setV] = useState(0);
  const { reduced } = useMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) { setV(to); return; }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const e = 1 - Math.pow(1 - t, 4);
      setV(Math.round(to * e));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduced]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{String(v).padStart(pad, "0")}{suffix}
    </span>
  );
}

/* Roll — label with hover roll-up (pure CSS, see .q-roll) */
export function Roll({ children }) {
  return (
    <span className="q-roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

/* SectionHead — "(01) LABEL ———" */
export function SectionHead({ index, label }) {
  const { reduced } = useMotion();
  return (
    <div className="q-head">
      <span className="q-head-idx">({index})</span>
      <span className="q-label">{label}</span>
      <motion.span
        className="q-rule"
        style={{ transformOrigin: "left" }}
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE }}
      />
    </div>
  );
}

/* Parallax — translate on scroll */
export function Parallax({ children, offset = 80, className = "", style }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return (
    <motion.div ref={ref} className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  );
}
