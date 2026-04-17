import { memo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FadeIn } from "../ui/FadeIn";

export const SkillRing = memo(({ name, pct, delay = 0 }: { name: string; pct: number; delay?: number }) => {
  const r = 28, circ = 2 * Math.PI * r;
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <FadeIn delay={delay}>
      <div ref={ref} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px 16px", borderRadius: "var(--r)", border: "1px solid var(--border)", background: "var(--surface)" }}>
        <div style={{ position: "relative", width: "64px", height: "64px", flexShrink: 0 }}>
          <svg width="64" height="64" viewBox="0 0 64 64" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="32" cy="32" r={r} fill="none" stroke="var(--bg-muted)" strokeWidth="4" />
            <motion.circle cx="32" cy="32" r={r} fill="none" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={inView ? { strokeDashoffset: circ - (pct / 100) * circ } : {}}
              transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "stroke-dashoffset" }}
            />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, fontFamily: "'SF Mono','Fira Code',monospace", color: "var(--text-1)" }}>{pct}%</span>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "4px" }}>{name}</p>
          <div style={{ height: "3px", background: "var(--bg-muted)", borderRadius: "4px", overflow: "hidden" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${pct}%` } : {}}
              transition={{ duration: 1.0, delay: delay + 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: "100%", background: "linear-gradient(90deg, #7c3aed, #a78bfa)", borderRadius: "4px", willChange: "width" }}
            />
          </div>
        </div>
      </div>
    </FadeIn>
  );
});