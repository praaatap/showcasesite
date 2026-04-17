import { memo, useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export const ParticleField = memo(() => {
  const ref = useRef<THREE.Points>(null);
  const [positions, setPositions] = useState<Float32Array | null>(null);

  useEffect(() => {
    // Spawning a Web Worker to offload the heavy math calculations
    // This prevents the main rendering thread from dropping frames on startup.
    const worker = new Worker(new URL('./particleWorker.ts', import.meta.url), { type: 'module' });
    
    worker.onmessage = (e: MessageEvent<Float32Array>) => {
      setPositions(e.data);
      worker.terminate();
    };

    // Calculate a huge number of particles that would typically lock the main thread
    worker.postMessage({ count: 1800 });
    
    return () => worker.terminate();
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.04;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.05;
    }
  });

  if (!positions) return null;

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#2dd4bf" size={0.015} sizeAttenuation depthWrite={false} opacity={0.4} />
    </Points>
  );
});