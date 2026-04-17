import { memo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { ParticleField } from "./ParticleField";

export const OrbCore = memo(({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) => {
  const groupRef = useRef<THREE.Group>(null);
  const outer    = useRef<THREE.Mesh>(null);
  const inner    = useRef<THREE.Mesh>(null);
  const ring1    = useRef<THREE.Mesh>(null);
  const ring2    = useRef<THREE.Mesh>(null);
  const ring3    = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const [mx, my] = mouse.current;
    if (groupRef.current) {
      groupRef.current.rotation.y += (mx * 0.6 - groupRef.current.rotation.y) * 0.06;
      groupRef.current.rotation.x += (-my * 0.4 - groupRef.current.rotation.x) * 0.06;
    }
    if (outer.current) { outer.current.rotation.y = t * 0.12; outer.current.rotation.z = Math.sin(t * 0.1) * 0.06; }
    if (inner.current) { inner.current.rotation.y = -t * 0.2; inner.current.rotation.x = t * 0.12; }
    if (ring1.current) ring1.current.rotation.z = t * 0.07;
    if (ring2.current) { ring2.current.rotation.z = -t * 0.04; ring2.current.rotation.x = Math.sin(t * 0.08) * 0.04; }
    if (ring3.current) { ring3.current.rotation.y = t * 0.06; ring3.current.rotation.z = t * 0.03; }
  });

  return (
    <group ref={groupRef}>
      <ParticleField />
      <Float speed={1.5} floatIntensity={0.4} rotationIntensity={0.2}>
        <Sphere ref={outer} args={[1.8, 32, 32]}>
          <MeshTransmissionMaterial color="#818cf8" transmission={0.95} thickness={1.2} roughness={0.05} chromaticAberration={0.12} ior={1.4} backside={false} clearcoat={1} clearcoatRoughness={0.1} resolution={256} />
        </Sphere>
      </Float>
      <Float speed={2.0} floatIntensity={0.6} rotationIntensity={0.6}>
        <mesh>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshStandardMaterial color="#06b6d4" wireframe roughness={0.2} metalness={0.8} emissive="#06b6d4" emissiveIntensity={0.4} transparent opacity={0.6} />
        </mesh>
      </Float>
      <Float speed={3.5} floatIntensity={0.3}>
        <Sphere ref={inner} args={[0.8, 32, 32]}>
          <MeshDistortMaterial color="#c4b5fd" distort={0.8} speed={4.5} roughness={0.1} emissive="#4f46e5" emissiveIntensity={2.0} />
        </Sphere>
      </Float>
      <mesh ref={ring1} rotation={[Math.PI / 2.2, 0.4, 0]}>
        <torusGeometry args={[2.5, 0.015, 12, 48]} />
        <meshStandardMaterial color="#2dd4bf" transparent opacity={0.5} emissive="#06b6d4" emissiveIntensity={1.5} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 3, -0.6, Math.PI / 5]}>
        <torusGeometry args={[3.0, 0.01, 12, 48]} />
        <meshStandardMaterial color="#818cf8" transparent opacity={0.3} emissive="#4f46e5" emissiveIntensity={0.8} />
      </mesh>
      <mesh ref={ring3} rotation={[Math.PI / 4, 1.2, Math.PI / 3]}>
        <torusGeometry args={[3.5, 0.008, 12, 48]} />
        <meshStandardMaterial color="#c4b5fd" transparent opacity={0.15} emissive="#7c3aed" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
});