import React, { useEffect, useRef } from "react";

/*
  Generative "pulsar" ridgeline (after the CP 1919 plot).
  Each project gets its own signature from a seeded RNG.
  The canvas only animates while visible.
*/

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed) {
  let s = seed || 1;
  return () => {
    s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
    return ((s >>> 0) % 100000) / 100000;
  };
}

export default function PulsarGlyph({ seed = "psi", color = "#d4ff3a", active = false, lines = 26, className = "", style }) {
  const canvasRef = useRef(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const r = rng(hash(seed));
    const rows = Array.from({ length: lines }, () => ({
      peaks: Array.from({ length: 3 + Math.floor(r() * 3) }, () => ({
        x: 0.32 + r() * 0.36,
        w: 0.012 + r() * 0.05,
        a: 0.35 + r() * 0.9,
        f: 0.6 + r() * 1.8,
        p: r() * Math.PI * 2,
      })),
    }));

    let w = 0, h = 0, dpr = 1, raf = 0, visible = true, amp = active ? 1 : 0.55;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const bg = () => getComputedStyle(document.documentElement).getPropertyValue("--q-surface").trim() || "#0f1014";

    const draw = (time) => {
      const t = time / 1000;
      amp += ((activeRef.current ? 1.25 : 0.55) - amp) * 0.06;
      ctx.clearRect(0, 0, w, h);
      const fill = bg();
      const top = h * 0.16;
      const gap = (h * 0.74) / lines;
      const steps = Math.max(60, Math.floor(w / 3));

      for (let i = 0; i < lines; i++) {
        const y0 = top + i * gap;
        const row = rows[i];
        ctx.beginPath();
        for (let s = 0; s <= steps; s++) {
          const u = s / steps;
          let v = 0;
          for (const pk of row.peaks) {
            const d = (u - pk.x) / pk.w;
            v += pk.a * Math.exp(-d * d) * (0.75 + 0.25 * Math.sin(t * pk.f + pk.p));
          }
          // low noise floor
          v += 0.04 * Math.sin(u * 90 + i * 3.1 + t * 2);
          const env = Math.exp(-Math.pow((u - 0.5) / 0.26, 2));
          const y = y0 - v * env * gap * 3.2 * amp;
          const x = u * w;
          s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        // occlude lines behind
        ctx.lineTo(w, y0 + gap * 2);
        ctx.lineTo(0, y0 + gap * 2);
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.lineWidth = 1.1;
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.35 + 0.65 * (i / lines);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    };

    const loop = (time) => {
      if (visible) draw(time);
      if (!reduced) raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(canvas);
    raf = requestAnimationFrame(loop);
    if (reduced) draw(4000);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [seed, color, lines]);

  return <canvas ref={canvasRef} className={className} style={{ width: "100%", height: "100%", display: "block", ...style }} aria-hidden="true" />;
}
