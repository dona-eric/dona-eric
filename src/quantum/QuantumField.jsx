import React, { Component, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { fieldBus } from "./MotionContext";

/*
  Quantum interference field.
  A grid of points whose height is the sum of two circular waves
  (double-slit interference) + a gaussian lift under the pointer
  + expanding rings each time the wavefunction is "measured" (click).
*/

const MAX_RIPPLES = 5;

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uMouseStrength;
  uniform vec4  uRipples[${MAX_RIPPLES}];
  uniform float uPixelRatio;
  uniform float uSize;
  varying float vAmp;
  varying float vFade;

  float wave(vec2 p, vec2 src, float k, float w) {
    float d = length(p - src);
    return sin(d * k - uTime * w) / (1.0 + d * 0.12);
  }

  void main() {
    vec2 p = position.xy;

    vec2 s1 = vec2(-9.0 + sin(uTime * 0.11) * 3.0, -10.0);
    vec2 s2 = vec2( 9.0, -10.0 + cos(uTime * 0.13) * 3.0);
    float z = 0.75 * wave(p, s1, 0.95, 1.1) + 0.75 * wave(p, s2, 0.95, 1.1);

    // pointer: a soft lift with a small standing ring
    vec2 dm = p - uMouse;
    float md = dot(dm, dm);
    z += uMouseStrength * (2.2 * exp(-md * 0.06) + 0.35 * sin(sqrt(md) * 1.6 - uTime * 4.0) * exp(-md * 0.02));

    // measurements: expanding rings that decay
    for (int i = 0; i < ${MAX_RIPPLES}; i++) {
      vec4 r = uRipples[i];
      float age = uTime - r.z;
      if (age > 0.0 && age < 4.5) {
        float d = length(p - r.xy);
        float front = d - age * 7.5;
        z += r.w * 2.4 * exp(-front * front * 0.35) * (1.0 - age / 4.5);
      }
    }

    vAmp = z;
    vec3 pos = vec3(p, z * 0.85);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float depth = -mv.z;
    vFade = smoothstep(46.0, 10.0, depth);
    gl_PointSize = uSize * uPixelRatio * (1.0 + abs(z) * 0.55) * (16.0 / depth);
  }
`;

const fragment = /* glsl */ `
  uniform vec3  uColorA;
  uniform vec3  uColorB;
  uniform vec3  uColorBase;
  uniform float uOpacity;
  varying float vAmp;
  varying float vFade;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float disc = smoothstep(0.5, 0.1, r);

    float pos = smoothstep(0.25, 1.6, vAmp);
    float neg = smoothstep(0.25, 1.6, -vAmp);
    vec3 col = uColorBase;
    col = mix(col, uColorA, pos);
    col = mix(col, uColorB, neg);

    float a = (0.22 + 0.78 * max(pos, neg)) * disc * vFade * uOpacity;
    gl_FragColor = vec4(col, a);
  }
`;

function readColor(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return new THREE.Color(v || fallback);
}

function Field({ theme, intensity, reduced }) {
  const pointsRef = useRef();
  const groupRef = useRef();
  const { camera, size, gl, invalidate } = useThree();

  const ndc = useRef(new THREE.Vector2(0, -0.4));
  const lastMove = useRef(-10);
  const rippleIdx = useRef(0);
  const pendingMeasures = useRef([]);
  const scrollFade = useRef(1);

  const isSmall = size.width < 768;
  const cols = isSmall ? 110 : 190;
  const rows = isSmall ? 80 : 120;
  const W = 56;
  const H = 36;

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(cols * rows * 3);
    let k = 0;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        pos[k++] = (i / (cols - 1) - 0.5) * W;
        pos[k++] = (j / (rows - 1) - 0.5) * H;
        pos[k++] = 0;
      }
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [cols, rows]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, -4) },
      uMouseStrength: { value: 0 },
      uRipples: { value: Array.from({ length: MAX_RIPPLES }, () => new THREE.Vector4(0, 0, -100, 0)) },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.75) },
      uSize: { value: isSmall ? 2.4 : 2.1 },
      uColorA: { value: new THREE.Color("#d4ff3a") },
      uColorB: { value: new THREE.Color("#8f7dff") },
      uColorBase: { value: new THREE.Color("#2a2b33") },
      uOpacity: { value: 1 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // theme → colours + blending
  useEffect(() => {
    // data-theme is applied by the ThemeProvider effect, which runs after ours.
    const id = requestAnimationFrame(() => {
      uniforms.uColorA.value = readColor("--q-field-a", "#d4ff3a");
      uniforms.uColorB.value = readColor("--q-field-b", "#8f7dff");
      uniforms.uColorBase.value = readColor("--q-field-base", "#2a2b33");
      if (pointsRef.current) {
        pointsRef.current.material.blending = theme === "light" ? THREE.NormalBlending : THREE.AdditiveBlending;
        pointsRef.current.material.needsUpdate = true;
      }
      invalidate();
    });
    return () => cancelAnimationFrame(id);
  }, [theme, uniforms, invalidate]);

  // pointer + measurements
  useEffect(() => {
    const toNdc = (x, y) => new THREE.Vector2((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1);
    const onMove = (e) => {
      ndc.current.copy(toNdc(e.clientX, e.clientY));
      lastMove.current = performance.now() / 1000;
    };
    const onDown = (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      pendingMeasures.current.push({ ndc: toNdc(e.clientX, e.clientY), strength: 1 });
    };
    const off = fieldBus.on((d) => {
      const n = d && d.x != null ? toNdc(d.x, d.y) : new THREE.Vector2(0, -0.1);
      pendingMeasures.current.push({ ndc: n, strength: 1.3 });
    });
    const onScroll = () => {
      const h = window.innerHeight || 1;
      scrollFade.current = Math.max(0.35, 1 - window.scrollY / (h * 1.4));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("scroll", onScroll);
      off();
    };
  }, []);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const plane = useMemo(() => new THREE.Plane(), []);
  const hit = useMemo(() => new THREE.Vector3(), []);
  const normal = useMemo(() => new THREE.Vector3(), []);

  const projectToField = (n, out) => {
    const g = groupRef.current;
    if (!g) return false;
    normal.set(0, 0, 1).applyQuaternion(g.quaternion);
    plane.setFromNormalAndCoplanarPoint(normal, g.position);
    raycaster.setFromCamera(n, camera);
    if (!raycaster.ray.intersectPlane(plane, hit)) return false;
    out.copy(g.worldToLocal(hit.clone()));
    return true;
  };

  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const u = uniforms;
    u.uTime.value = reduced ? 4 : t;

    // pointer
    if (projectToField(ndc.current, tmp)) {
      u.uMouse.value.lerp(new THREE.Vector2(tmp.x, tmp.y), 0.12);
    }
    const idle = performance.now() / 1000 - lastMove.current;
    const targetStrength = reduced ? 0 : idle < 1.6 ? 1 : 0;
    u.uMouseStrength.value += (targetStrength - u.uMouseStrength.value) * Math.min(1, delta * 3);

    // measurements → ripples
    while (pendingMeasures.current.length) {
      const m = pendingMeasures.current.shift();
      if (reduced) continue;
      if (projectToField(m.ndc, tmp)) {
        const r = u.uRipples.value[rippleIdx.current % MAX_RIPPLES];
        r.set(tmp.x, tmp.y, t, m.strength);
        rippleIdx.current++;
      }
    }

    // opacity: route intensity × scroll fade
    const targetOpacity = intensity * scrollFade.current;
    u.uOpacity.value += (targetOpacity - u.uOpacity.value) * Math.min(1, delta * 2.5);

    // slow camera drift for depth
    if (!reduced) {
      camera.position.x = Math.sin(t * 0.05) * 1.2 + ndc.current.x * 0.6;
      camera.position.y = 2.4 + ndc.current.y * 0.4;
      camera.lookAt(0, 0, 0);
    }
  });

  useEffect(() => {
    gl.setClearColor(0x000000, 0);
  }, [gl]);

  return (
    <group ref={groupRef} rotation={[-1.08, 0, 0]} position={[0, -1.6, 0]}>
      <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

class GLBoundary extends Component {
  constructor(p) { super(p); this.state = { failed: false }; }
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() {}
  render() { return this.state.failed ? null : this.props.children; }
}

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}

export default function QuantumField({ theme = "dark", intensity = 1, reduced = false }) {
  const ok = useMemo(webglAvailable, []);
  return (
    <div className="q-field-bg" aria-hidden="true">
      {ok && (
        <GLBoundary>
          <Canvas
            dpr={[1, 1.75]}
            camera={{ position: [0, 2.4, 13], fov: 50, near: 0.1, far: 100 }}
            gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
            frameloop={reduced ? "demand" : "always"}
          >
            <Field theme={theme} intensity={intensity} reduced={reduced} />
          </Canvas>
        </GLBoundary>
      )}
      <div className="q-field-vignette" />
    </div>
  );
}
