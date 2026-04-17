import { memo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AI_STATUS_ITEMS = [
  "Model: GPT-4o", "Latency: 1.2s", "Status: Running",
  "Tokens: 4096", "Pipeline: CrewAI", "RAG: Active", "Agents: 3",
];

export const AIStatusBar = memo(() => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % AI_STATUS_ITEMS.length), 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999, height: "28px", background: "#09090b", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "20px", fontSize: "11px", fontFamily: "'SF Mono','Fira Code',monospace" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#a78bfa" }}>
          <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#a78bfa", willChange: "transform" }} />
          AI
        </div>
        <AnimatePresence mode="wait">
          <motion.span key={idx} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }} transition={{ duration: 0.22 }} style={{ color: "#6ee7b7", fontSize: "11px", willChange: "transform, opacity" }}>
            {AI_STATUS_ITEMS[idx]}
          </motion.span>
        </AnimatePresence>
        {AI_STATUS_ITEMS.filter((_, i) => i !== idx).slice(0, 3).map((item, i) => (
          <span key={i} style={{ color: "#3f3f46", fontSize: "11px" }} className="hide-mobile">{item}</span>
        ))}
      </div>
    </div>
  );
});