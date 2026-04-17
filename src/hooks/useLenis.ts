import { useEffect } from "react";
import Lenis from "lenis";

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    } as any);
    let rafId: number;
    const tick = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(tick); };
    rafId = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);
};