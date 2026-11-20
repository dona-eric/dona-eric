import React, { Component, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { webglAvailable } from "./utils";

/* ─────────────────────────────────────────────
   Shared plumbing for the inline 3D figures.
   - WebGL detection + error boundary → 2D fallback, never a blank hole
   - mounts only when the figure approaches the viewport
   - renders only while visible (frameloop "never" off-screen)
───────────────────────────────────────────── */

class GLBoundary extends Component {
  constructor(p) {
    super(p);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {}
  render() {
    return this.state.failed ? this.props.fallback ?? null : this.props.children;
  }
}

export function Stage3D({ className = "", label, fallback = null, children, fov = 30, onPointerMissed, ...rest }) {
  const ref = useRef(null);
  const [ok] = useState(webglAvailable);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !ok) return;
    const near = new IntersectionObserver(
      ([e]) => e.isIntersecting && setMounted(true),
      { rootMargin: "400px 0px" }
    );
    const seen = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "60px 0px" });
    near.observe(el);
    seen.observe(el);
    return () => {
      near.disconnect();
      seen.disconnect();
    };
  }, [ok]);

  return (
    <div ref={ref} className={`q3-stage ${className}`} role="img" aria-label={label} {...rest}>
      {!ok && fallback}
      {ok && mounted && (
        <GLBoundary fallback={fallback}>
          <Canvas
            className="q3-canvas"
            dpr={[1, 1.75]}
            frameloop={visible ? "always" : "never"}
            camera={{ fov, near: 0.1, far: 200, position: [0, 0, 12] }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
            onPointerMissed={onPointerMissed}
          >
            {children}
          </Canvas>
        </GLBoundary>
      )}
    </div>
  );
}

/* FitCamera — places the camera so a sphere of `radius` around `target`
   always fits the canvas, whatever its aspect ratio (portrait phones included). */
export function FitCamera({ radius, margin = 1.06, elevation = 0.18, target = [0, 0, 0] }) {
  const get = useThree((s) => s.get);
  const size = useThree((s) => s.size);
  const [tx, ty, tz] = target;
  useLayoutEffect(() => {
    const { camera } = get();
    const aspect = size.width / Math.max(1, size.height);
    const vfov = THREE.MathUtils.degToRad(camera.fov);
    const hfov = 2 * Math.atan(Math.tan(vfov / 2) * aspect);
    const fit = Math.min(vfov, hfov);
    const dist = (radius * margin) / Math.sin(fit / 2);
    camera.position.set(tx, ty + Math.sin(elevation) * dist, tz + Math.cos(elevation) * dist);
    camera.near = Math.max(0.05, dist - radius * 3);
    camera.far = dist + radius * 3;
    camera.lookAt(tx, ty, tz);
    camera.updateProjectionMatrix();
  }, [get, size.width, size.height, radius, margin, elevation, tx, ty, tz]);
  return null;
}

