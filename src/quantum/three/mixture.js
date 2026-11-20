import * as THREE from "three";
import { gaussian, rng } from "./utils";

/* Data behind fig. 01: three anisotropic Gaussian components (seeded, so the figure is stable). */

export const BOX = 1.7; // half-size of the axis cube
export const COMPONENTS = [
  { mean: [-0.95, 0.35, 0.25], scale: [0.5, 0.26, 0.32], rot: [0.4, 0.2, -0.5] },
  { mean: [0.85, 0.55, -0.45], scale: [0.36, 0.46, 0.24], rot: [-0.3, 0.6, 0.25] },
  { mean: [0.1, -0.75, 0.5], scale: [0.56, 0.24, 0.36], rot: [0.15, -0.4, 0.3] },
];

export function sampleMixture(perComponent, seed = 7) {
  const rand = rng(seed);
  const n = perComponent * COMPONENTS.length;
  const pos = new Float32Array(n * 3);
  const start = new Float32Array(n * 3);
  const cluster = new Float32Array(n);
  const jitter = new Float32Array(n);
  const v = new THREE.Vector3();
  let k = 0;
  COMPONENTS.forEach((c, ci) => {
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(...c.rot));
    for (let i = 0; i < perComponent; i++) {
      v.set(gaussian(rand) * c.scale[0], gaussian(rand) * c.scale[1], gaussian(rand) * c.scale[2]).applyQuaternion(q);
      // keep the cloud inside the axis cube
      const x = THREE.MathUtils.clamp(c.mean[0] + v.x, -BOX, BOX);
      const y = THREE.MathUtils.clamp(c.mean[1] + v.y, -BOX, BOX);
      const z = THREE.MathUtils.clamp(c.mean[2] + v.z, -BOX, BOX);
      pos.set([x, y, z], k * 3);
      start.set(c.mean, k * 3);
      cluster[k] = ci;
      jitter[k] = rand();
      k++;
    }
  });
  return { pos, start, cluster, jitter, n };
}

