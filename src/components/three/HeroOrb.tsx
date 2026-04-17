import { memo, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useInView } from "react-intersection-observer";
import { OrbCore } from "./OrbCore";

export const HeroOrb = memo(() => {
  const mouse = useRef<[number, number]>([0, 0]);
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current = [
      ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      -((e.clientY - rect.top) / rect.height - 0.5) * 2,
    ];
  }, []);

  return (
    <div ref={inViewRef} style={{ width: "100%", height: "100%" }} onMouseMove={handleMouseMove}>
      {inView && (
        <Canvas camera={{ position: [0, 0, 6.2], fov: 40 }} gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }} dpr={[1, 1.5]} style={{ width: "100%", height: "100%" }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[6, 8, 5]} intensity={1.4} />
          <pointLight position={[-5, -4, -3]} color="#7c3aed" intensity={4} />
          <pointLight position={[4, 4, 2]} color="#818cf8" intensity={1.5} />
          <pointLight position={[0, -6, 0]} color="#4f46e5" intensity={2} />
          <Environment preset="studio" />
          <OrbCore mouse={mouse} />
        </Canvas>
      )}
    </div>
  );
});