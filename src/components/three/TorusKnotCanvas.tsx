import { memo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import { useInView } from "react-intersection-observer";
import * as THREE from "three";

const TorusKnotScene = memo(() => {
  const mesh = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mesh.current) { mesh.current.rotation.x = t * 0.18; mesh.current.rotation.y = t * 0.22; }
    if (wire.current) { wire.current.rotation.x = t * 0.18; wire.current.rotation.y = t * 0.22; }
  });
  return (
    <group>
      <Float speed={1.4} floatIntensity={0.5}>
        <mesh ref={mesh}>
          <torusKnotGeometry args={[0.9, 0.3, 200, 30, 2, 3]} />
          <MeshDistortMaterial color="#7c3aed" distort={0.15} speed={1.5} roughness={0.02} metalness={0.4} transparent opacity={0.82} />
        </mesh>
        <mesh ref={wire}>
          <torusKnotGeometry args={[0.9, 0.31, 80, 12, 2, 3]} />
          <meshStandardMaterial color="#a78bfa" wireframe transparent opacity={0.15} />
        </mesh>
      </Float>
    </group>
  );
});

export const TorusKnotCanvas = memo(() => {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "100px" });
  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      {inView && (
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }} gl={{ antialias: true, alpha: true }} style={{ width: "100%", height: "100%" }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <pointLight position={[-4, -4, -4]} color="#7c3aed" intensity={3} />
          <Environment preset="studio" />
          <TorusKnotScene />
        </Canvas>
      )}
    </div>
  );
});