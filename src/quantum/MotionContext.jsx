import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";

const MotionContext = createContext({
  introDone: true,
  setIntroDone: () => {},
  reduced: false,
  lenis: { current: null },
});

const INTRO_KEY = "q_intro_seen";

function getReduced() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function introAlreadySeen() {
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}

export function MotionProvider({ children }) {
  const [reduced] = useState(getReduced);
  const [introDone, setIntroDoneState] = useState(() => reduced || introAlreadySeen());
  const lenis = useRef(null);

  const setIntroDone = (v) => {
    setIntroDoneState(v);
    if (v) {
      try { sessionStorage.setItem(INTRO_KEY, "1"); } catch { /* storage blocked */ }
    }
  };

  // Smooth scroll (desktop pointers only — touch keeps native momentum)
  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const instance = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    lenis.current = instance;
    let raf;
    const loop = (t) => {
      instance.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      instance.destroy();
      lenis.current = null;
    };
  }, [reduced]);

  // Freeze scrolling while the intro plays
  useEffect(() => {
    if (introDone) {
      lenis.current?.start();
      document.documentElement.style.overflow = "";
    } else {
      lenis.current?.stop();
      document.documentElement.style.overflow = "hidden";
    }
  }, [introDone]);

  const value = useMemo(() => ({ introDone, setIntroDone, reduced, lenis }), [introDone, reduced]);
  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export const useMotion = () => useContext(MotionContext);

/** Lock page scroll (modals). Works with or without Lenis. */
export function useScrollLock(locked) {
  const { lenis } = useMotion();
  useEffect(() => {
    if (!locked) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    lenis.current?.stop();
    return () => {
      document.documentElement.style.overflow = prev;
      lenis.current?.start();
    };
  }, [locked, lenis]);
}

/** Global "measure" bus shared by the field, the cursor and the pages. */
export const fieldBus = {
  measure(x, y) {
    window.dispatchEvent(new CustomEvent("q:measure", { detail: { x, y } }));
  },
  on(fn) {
    const h = (e) => fn(e.detail);
    window.addEventListener("q:measure", h);
    return () => window.removeEventListener("q:measure", h);
  },
};
