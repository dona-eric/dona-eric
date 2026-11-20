import React, { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { FitCamera } from "./Stage3D";
import { useCanvasPointer } from "./utils";
import { BOX, COMPONENTS, sampleMixture } from "./mixture";

/*
  fig. 01 — a 3-component Gaussian mixture in 3D.
  Points are sampled (seeded, so the figure is stable) from three anisotropic
  normals; each component carries its 2σ ellipsoid drawn as three principal
  rings plus its estimated mean. On reveal, every point "is sampled": it flies
  from its component mean to its drawn position.
*/

function ellipseRing(c, a, b, segments = 128) {
  const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(...c.rot));
  const pts = [];
  const axes = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)];
  for (let i = 0; i < segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    const p = new THREE.Vector3()
      .addScaledVector(axes[a], Math.cos(t) * 2 * c.scale[a])
      .addScaledVector(axes[b], Math.sin(t) * 2 * c.scale[b])
      .applyQuaternion(q)
      .add(new THREE.Vector3(...c.mean));
    pts.push(p);
  }
  return new THREE.BufferGeometry().setFromPoints(pts);
}

function axesGeometry() {
  const L = BOX;
  const seg = [];
  const o = [-L, -L, -L];
  // three axes from the back-bottom-left corner
  seg.push(o, [L, -L, -L], o, [-L, L, -L], o, [-L, -L, L]);
  // ticks every 0.5 along each axis
  for (let s = -L + 0.5; s < L; s += 0.5) {
    seg.push([s, -L, -L], [s, -L + 0.06, -L]);
    seg.push([-L, s, -L], [-L + 0.06, s, -L]);
    seg.push([-L, -L, s], [-L, -L + 0.06, s]);
  }
  const flat = new Float32Array(seg.flat());
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(flat, 3));
  return g;
}

function floorGrid() {
  const L = BOX;
  const seg = [];
  for (let s = -L; s <= L + 1e-6; s += L / 4) {
    seg.push([s, -L, -L], [s, -L, L], [-L, -L, s], [L, -L, s]);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(seg.flat()), 3));
  return g;
}

const vertex = /* glsl */ `
  attribute vec3 aStart;
  attribute float aCluster;
  attribute float aJitter;
  uniform float uProgress;
  uniform float uTime;
  uniform vec3 uWeights;
  uniform vec3 uC0;
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform float uSize;
  uniform float uScale;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float t = clamp((uProgress - aJitter * 0.55) / 0.45, 0.0, 1.0);
    t = 1.0 - pow(1.0 - t, 3.0);
    vec3 p = mix(aStart, position, t);
    vec3 d = position - aStart;
    p += d * sin(uTime * 0.9 + aJitter * 6.2831) * 0.025;

    float w = aCluster < 0.5 ? uWeights.x : (aCluster < 1.5 ? uWeights.y : uWeights.z);
    vColor = aCluster < 0.5 ? uC0 : (aCluster < 1.5 ? uC1 : uC2);
    vAlpha = w;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.55 + aJitter * 0.9) * (0.75 + 0.35 * w) * (uScale / -mv.z);
  }
`;

const fragment = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float a = smoothstep(0.5, 0.15, r) * vAlpha * uOpacity;
    gl_FragColor = vec4(vColor, a);
  }
`;

export default function GaussianCloud({ palette, focus = -1, reduced = false, light = false, dense = true }) {
  const group = useRef();
  const mat = useRef();
  const ringMats = useRef([]);
  const meanMats = useRef([]);
  const pointer = useCanvasPointer();
  const { size, camera, gl } = useThree();
  const elapsed = useRef(0);

  const data = useMemo(() => sampleMixture(dense ? 650 : 420), [dense]);
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(data.pos, 3));
    g.setAttribute("aStart", new THREE.BufferAttribute(data.start, 3));
    g.setAttribute("aCluster", new THREE.BufferAttribute(data.cluster, 1));
    g.setAttribute("aJitter", new THREE.BufferAttribute(data.jitter, 1));
    return g;
  }, [data]);

  const rings = useMemo(
    () => COMPONENTS.map((c) => [ellipseRing(c, 0, 1), ellipseRing(c, 1, 2), ellipseRing(c, 0, 2)]),
    []
  );
  const axes = useMemo(axesGeometry, []);
  const grid = useMemo(floorGrid, []);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: reduced ? 1 : 0 },
      uTime: { value: 0 },
      uWeights: { value: new THREE.Vector3(1, 1, 1) },
      uC0: { value: new THREE.Color() },
      uC1: { value: new THREE.Color() },
      uC2: { value: new THREE.Color() },
      uSize: { value: 3.2 },
      uScale: { value: 1 },
      uOpacity: { value: 1 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const colors = [palette.accent, palette.violet, palette.cyan];
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    elapsed.current += dt;
    // Always drive the uniforms the material actually owns (the reconciler may
    // hand the material its own copy of the object passed as a prop).
    const u = mat.current?.uniforms;
    if (!u) return;
    u.uC0.value.copy(colors[0]);
    u.uC1.value.copy(colors[1]);
    u.uC2.value.copy(colors[2]);
    u.uTime.value = reduced ? 0 : elapsed.current;
    if (!reduced) u.uProgress.value = Math.min(1, u.uProgress.value + dt / 2.6);

    // point size relative to the canvas height so the figure reads the same on every screen
    const dist = camera.position.length();
    u.uScale.value = dist * (size.height / 520) * gl.getPixelRatio();

    // focus weights
    target.set(...[0, 1, 2].map((i) => (focus < 0 ? 1 : focus === i ? 1.15 : 0.16)));
    u.uWeights.value.lerp(target, Math.min(1, dt * 6));
    ringMats.current.forEach((m, i) => {
      if (!m) return;
      const comp = Math.floor(i / 3);
      const w = [u.uWeights.value.x, u.uWeights.value.y, u.uWeights.value.z][comp];
      m.opacity = 0.55 * Math.min(1, w) * u.uProgress.value;
    });
    meanMats.current.forEach((m, i) => {
      if (!m) return;
      const w = [u.uWeights.value.x, u.uWeights.value.y, u.uWeights.value.z][i];
      m.opacity = Math.min(1, w) * u.uProgress.value;
    });

    // rotation: slow auto-orbit + pointer parallax
    const g = group.current;
    if (!g) return;
    const p = pointer.current;
    const ry = (reduced ? -0.6 : -0.6 + elapsed.current * 0.12) + p.x * 0.45;
    const rx = 0.12 - p.y * 0.18;
    g.rotation.y += (ry - g.rotation.y) * Math.min(1, dt * 3);
    g.rotation.x += (rx - g.rotation.x) * Math.min(1, dt * 3);
  });

  const blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;

  return (
    <>
      <FitCamera radius={BOX * Math.sqrt(3)} margin={1.02} elevation={0.16} />
      <group ref={group}>
        <lineSegments geometry={grid}>
          <lineBasicMaterial color={palette.ink3} transparent opacity={0.22} depthWrite={false} />
        </lineSegments>
        <lineSegments geometry={axes}>
          <lineBasicMaterial color={palette.ink3} transparent opacity={0.75} depthWrite={false} />
        </lineSegments>

        {rings.map((set, ci) =>
          set.map((g, j) => (
            <lineLoop key={`${ci}-${j}`} geometry={g}>
              <lineBasicMaterial
                ref={(m) => (ringMats.current[ci * 3 + j] = m)}
                color={colors[ci]}
                transparent
                opacity={0}
                depthWrite={false}
              />
            </lineLoop>
          ))
        )}

        {COMPONENTS.map((c, ci) => (
          <mesh key={ci} position={c.mean}>
            <octahedronGeometry args={[0.055, 0]} />
            <meshBasicMaterial ref={(m) => (meanMats.current[ci] = m)} color={colors[ci]} transparent opacity={0} />
          </mesh>
        ))}

        <points geometry={geometry} frustumCulled={false}>
          <shaderMaterial
            ref={mat}
            key={light ? "light" : "dark"}
            vertexShader={vertex}
            fragmentShader={fragment}
            uniforms={uniforms}
            transparent
            depthWrite={false}
            blending={blending}
          />
        </points>
      </group>
    </>
  );
}

