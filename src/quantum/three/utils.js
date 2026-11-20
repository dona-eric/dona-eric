import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

/* Helpers shared by the inline 3D figures (no components here). */

let glSupport;
export function webglAvailable() {
  if (glSupport !== undefined) return glSupport;
  try {
    const c = document.createElement("canvas");
    glSupport = !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    glSupport = false;
  }
  return glSupport;
}

/* Theme palette read from the CSS tokens (re-read when the theme changes). */
const TOKENS = {
  accent: ["--q-accent-text", "#d4ff3a"],
  violet: ["--q-violet", "#8f7dff"],
  cyan: ["--q-cyan", "#5ee6ff"],
  warm: ["--q-warm", "#ff7a45"],
  ink: ["--q-ink", "#eeece4"],
  ink3: ["--q-ink-3", "#6f6e69"],
};

function readPalette() {
  const cs = getComputedStyle(document.documentElement);
  const out = {};
  for (const [k, [name, fb]] of Object.entries(TOKENS)) {
    out[k] = new THREE.Color(cs.getPropertyValue(name).trim() || fb);
  }
  return out;
}

export function usePalette(theme) {
  const [pal, setPal] = useState(readPalette);
  useEffect(() => {
    // data-theme is set by the ThemeProvider effect; read on the next frame.
    const id = requestAnimationFrame(() => setPal(readPalette()));
    return () => cancelAnimationFrame(id);
  }, [theme]);
  return pal;
}

/* Normalised pointer position over the canvas, −1…1 (0 when the pointer leaves).
   Must be called inside a <Canvas>. Mouse/pen only: on touch, a finger means scroll. */
export function useCanvasPointer() {
  const { gl } = useThree();
  const p = useRef({ x: 0, y: 0, active: false });
  useEffect(() => {
    const el = gl.domElement;
    if (!el) return;
    const move = (e) => {
      if (e.pointerType === "touch") return;
      const r = el.getBoundingClientRect();
      p.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      p.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
      p.current.active = true;
    };
    const leave = () => {
      p.current.x = 0;
      p.current.y = 0;
      p.current.active = false;
    };
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [gl]);
  return p;
}

/* Seeded RNG (mulberry32) + standard normal (Box–Muller). */
export function rng(seed = 1) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function gaussian(rand) {
  let u = 0;
  while (u === 0) u = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand());
}
