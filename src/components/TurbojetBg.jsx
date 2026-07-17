import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function TurbojetTunnel() {
  const groupRef = useRef();

  // Création de 2000 particules formant un tunnel cylindrique
  const particlesCount = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      // Rayon avec une légère variation pour donner de l'épaisseur
      const radius = 5 + Math.random() * 2;
      const x = Math.cos(theta) * radius;
      const y = Math.sin(theta) * radius;
      // Profondeur (z) allant de -50 à 10
      const z = Math.random() * 60 - 50;
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, [particlesCount]);

  // Animation : on déplace les particules vers la caméra (axe Z)
  useFrame((state, delta) => {
    if (groupRef.current) {
      const positions = groupRef.current.geometry.attributes.position.array;
      // Vitesse du turboréacteur (plus c'est élevé, plus ça va vite)
      const speed = 25 * delta;
      
      for (let i = 0; i < particlesCount; i++) {
        positions[i * 3 + 2] += speed;
        // Si la particule dépasse la caméra (Z > 5)
        if (positions[i * 3 + 2] > 5) {
          positions[i * 3 + 2] = -50; // Renvoi au fond
        }
      }
      groupRef.current.geometry.attributes.position.needsUpdate = true;
      groupRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <points ref={groupRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#818cf8" // Indigo (raccord avec MLAcademy / B2B Tech)
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default function TurbojetBg() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)', // Slate-900 à Slate-950
      pointerEvents: 'none'
    }}>
      <Canvas camera={{ position: [0, 0, 0], fov: 75 }}>
        <fog attach="fog" args={['#020617', 10, 45]} />
        <TurbojetTunnel />
      </Canvas>
    </div>
  );
}
