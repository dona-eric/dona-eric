import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCanvasPointer } from "./utils";

/*
  fig. 02 — the career as a worldline.
  One node per experience on a helix whose axis is time (most recent first).
  The helix turns so the active experience faces the viewer; particles flow
  along the curve. Vertical on tall canvases, horizontal on wide ones, and the
  camera is fitted to the helix bounding cylinder so nothing is ever cropped.
*/

const R = 1.25; // helix radius
const STEP = 0.95; // axial spacing between experiences (vertical)
const STEP_H = 0.62; // tighter when the helix lies horizontally (phones)
const TURN = 1.15; // radians between consecutive experiences
const FLOW = 70;

function layout(n, step) {
  const half = ((n - 1) * step) / 2;
  const at = (i) => {
    const a = i * TURN;
    return new THREE.Vector3(R * Math.cos(a), half - i * step, R * Math.sin(a));
  };
  const nodes = Array.from({ length: n }, (_, i) => at(i));
  const ctrl = [];
  for (let s = -0.7; s <= n - 1 + 0.7 + 1e-6; s += 0.1) ctrl.push(at(s));
  const curve = new THREE.CatmullRomCurve3(ctrl);
  return { nodes, curve, halfLength: half + 0.7 * step };
}

/* Fit the camera to a box (halfW × halfH on screen, halfD towards the camera). */
function FitBox({ halfW, halfH, halfD, margin = 1.03, elevation = 0.34 }) {
  const get = useThree((s) => s.get);
  const size = useThree((s) => s.size);
  useLayoutEffect(() => {
    const { camera } = get();
    const aspect = size.width / Math.max(1, size.height);
    const vfov = THREE.MathUtils.degToRad(camera.fov);
    const hfov = 2 * Math.atan(Math.tan(vfov / 2) * aspect);
    // projected half-height of the box seen from `elevation` (conservative)
    const effH = halfH * Math.cos(elevation) + halfD * Math.sin(elevation);
    const dist = Math.max(effH / Math.tan(vfov / 2), halfW / Math.tan(hfov / 2)) * margin + halfD;
    camera.position.set(0, Math.sin(elevation) * dist, Math.cos(elevation) * dist);
    camera.near = Math.max(0.05, dist - halfD * 4);
    camera.far = dist + halfD * 4;
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [get, size.width, size.height, halfW, halfH, halfD, margin, elevation]);
  return null;
}

function Node({ position, active, current, color, dim, onSelect, index }) {
  const mesh = useRef();
  const halo = useRef();
  const [hover, setHover] = useState(false);
  const { camera } = useThree();
  useEffect(() => () => { document.body.style.cursor = ""; }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const s = active ? 1.7 : hover ? 1.35 : 1;
    if (mesh.current) {
      const k = mesh.current.scale.x + (s - mesh.current.scale.x) * Math.min(1, dt * 8);
      mesh.current.scale.setScalar(k);
    }
    if (halo.current) {
      halo.current.quaternion.copy(camera.quaternion);
      const t = state.clock.elapsedTime;
      const pulse = current ? 1 + ((t * 0.7) % 1) * 1.6 : active ? 1.25 : 0.001;
      halo.current.scale.setScalar(pulse);
      halo.current.material.opacity = current ? 0.6 * (1 - ((t * 0.7) % 1)) : active ? 0.45 : 0;
    }
  });

  return (
    <group position={position}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[0.075, 2]} />
        <meshBasicMaterial color={active || hover ? color : dim} />
      </mesh>
      <mesh ref={halo}>
        <ringGeometry args={[0.13, 0.15, 48]} />
        <meshBasicMaterial color={color} transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      {/* generous invisible hit area — small nodes are hard to tap */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.(index);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHover(false);
          document.body.style.cursor = "";
        }}
      >
        <sphereGeometry args={[0.32, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

export default function WorldlineHelix({ count, active = 0, currentIndex = -1, onSelect, palette, reduced = false, horizontal = false }) {
  const spin = useRef();
  const flowRef = useRef();
  const pointer = useCanvasPointer();
  const { nodes, curve, halfLength } = useMemo(() => layout(count, horizontal ? STEP_H : STEP), [count, horizontal]);

  const tube = useMemo(() => new THREE.TubeGeometry(curve, 360, 0.012, 6, false), [curve]);
  const spokes = useMemo(() => {
    const seg = [];
    nodes.forEach((p) => seg.push(0, p.y, 0, p.x, p.y, p.z));
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(seg), 3));
    return g;
  }, [nodes]);
  const axis = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array([0, halfLength, 0, 0, -halfLength, 0]), 3));
    return g;
  }, [halfLength]);

  // one horizontal "time slice" ring per experience — the depth cue that makes the helix read as 3D
  const slice = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 96; i++) {
      const a = (i / 96) * Math.PI * 2;
      pts.push(new THREE.Vector3(R * Math.cos(a), 0, R * Math.sin(a)));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);
  const sliceMats = useRef([]);

  const flow = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(FLOW * 3), 3));
    return g;
  }, []);
  const offsets = useMemo(() => Array.from({ length: FLOW }, (_, i) => i / FLOW), []);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  // rotation that brings node i to the front (+z, facing the camera)
  const targetFor = (i) => Math.PI / 2 - i * TURN;
  const angle = useRef(targetFor(active));

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const g = spin.current;
    if (!g) return;
    const p = pointer.current;
    const want = targetFor(active) + p.x * 0.35;
    angle.current += (want - angle.current) * Math.min(1, dt * (reduced ? 20 : 3.2));
    g.rotation.y = angle.current;
    g.rotation.x = -p.y * 0.12;

    sliceMats.current.forEach((m, i) => {
      if (!m) return;
      const want = i === active ? 0.5 : 0.1;
      m.opacity += (want - m.opacity) * Math.min(1, dt * 5);
      m.color.copy(i === active ? palette.accent : palette.ink3);
    });

    // particles flowing along the worldline (past → present)
    // write through the rendered object (not the memoised geometry) — keeps React's rules happy
    const attr = flowRef.current?.geometry.attributes.position;
    if (!attr) return;
    const pos = attr.array;
    const t = reduced ? 0 : state.clock.elapsedTime * 0.035;
    for (let i = 0; i < FLOW; i++) {
      const u = 1 - ((offsets[i] + t) % 1);
      curve.getPointAt(u, tmp);
      pos[i * 3] = tmp.x;
      pos[i * 3 + 1] = tmp.y;
      pos[i * 3 + 2] = tmp.z;
    }
    attr.needsUpdate = true;
  });

  const halfW = horizontal ? halfLength : R;
  const halfH = horizontal ? R : halfLength;

  return (
    <>
      <FitBox halfW={halfW + 0.15} halfH={halfH + 0.15} halfD={R + 0.2} />
      <group rotation={[0, 0, horizontal ? -Math.PI / 2 : 0]}>
        <group ref={spin}>
          <lineSegments geometry={axis}>
            <lineBasicMaterial color={palette.ink3} transparent opacity={0.5} depthWrite={false} />
          </lineSegments>
          <lineSegments geometry={spokes}>
            <lineBasicMaterial color={palette.ink3} transparent opacity={0.28} depthWrite={false} />
          </lineSegments>
          {nodes.map((p, i) => (
            <lineLoop key={`slice-${i}`} geometry={slice} position={[0, p.y, 0]}>
              <lineBasicMaterial ref={(m) => (sliceMats.current[i] = m)} color={palette.ink3} transparent opacity={0.1} depthWrite={false} />
            </lineLoop>
          ))}
          <mesh geometry={tube}>
            <meshBasicMaterial color={palette.violet} transparent opacity={0.85} />
          </mesh>
          <points ref={flowRef} geometry={flow} frustumCulled={false}>
            <pointsMaterial color={palette.accent} size={0.045} sizeAttenuation transparent opacity={0.9} depthWrite={false} />
          </points>
          {nodes.map((p, i) => (
            <Node
              key={i}
              index={i}
              position={p}
              active={i === active}
              current={i === currentIndex}
              color={palette.accent}
              dim={palette.ink}
              onSelect={onSelect}
            />
          ))}
        </group>
      </group>
    </>
  );
}
