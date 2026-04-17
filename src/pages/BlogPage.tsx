import { memo, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { POSTS } from "../constants/data";
import { Icon } from "../components/icons/Icons";
import { FadeIn } from "../components/ui/FadeIn";
import { SpotlightCard } from "../components/ui/SpotlightCard";
import { Tag } from "../components/ui/Tag";

const BLOG_CATS = ["All", "AI Engineering", "Product", "TypeScript", "Flutter"];

export const BlogPage = memo(() => {
  const [cat, setCat] = useState("All");
  const filtered = useMemo(() => cat === "All" ? POSTS : POSTS.filter(p => p.category === cat), [cat]);

  return (
    <main style={{ paddingTop: "108px", minHeight: "100vh", paddingBottom: "96px" }}>
      <div className="container-sm">
        <FadeIn>
          <p style={{ fontSize: "11.5px", fontWeight: 600, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px" }}>Writing</p>
          <h1 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", letterSpacing: "-0.04em", marginBottom: "10px" }}>Notes on building.</h1>
          <p style={{ fontSize: "clamp(13px,1vw,15px)", color: "var(--text-2)", lineHeight: 1.65, marginBottom: "36px" }}>AI engineering, full-stack dev, and building products as a student in India.</p>
        </FadeIn>

        <FadeIn delay={0.04}>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "40px" }}>
            {BLOG_CATS.map(c => (
              <button key={c} onClick={() => setCat(c)}
                style={{ padding: "5px 14px", borderRadius: "50px", border: `1px solid ${cat === c ? "var(--text-1)" : "var(--border)"}`, background: cat === c ? "var(--text-1)" : "transparent", color: cat === c ? "#fff" : "var(--text-2)", fontSize: "12.5px", fontWeight: 500, cursor: "pointer", transition: "all 0.15s" }}>
                {c}
              </button>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.06}>
          <SpotlightCard style={{ padding: "28px", marginBottom: "32px", cursor: "pointer" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "14px", flexWrap: "wrap" }}>
              <Tag accent="#7c3aed">{POSTS[0].category}</Tag>
              <span style={{ fontSize: "12px", color: "var(--text-3)", display: "flex", alignItems: "center", gap: "4px" }}><Icon.Clock /> {POSTS[0].readTime} read</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.1rem,3vw,1.5rem)", letterSpacing: "-0.03em", marginBottom: "10px", lineHeight: 1.28 }}>{POSTS[0].title}</h2>
            <p style={{ fontSize: "13.5px", color: "var(--text-2)", lineHeight: 1.7, marginBottom: "18px" }}>{POSTS[0].excerpt}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
              <span style={{ fontSize: "11.5px", color: "var(--text-3)", fontFamily: "'SF Mono','Fira Code',monospace" }}>{POSTS[0].date}</span>
              <span style={{ fontSize: "13px", color: "var(--text-1)", fontWeight: 500, display: "flex", alignItems: "center", gap: "4px" }}>Read article <Icon.Arrow /></span>
            </div>
          </SpotlightCard>
        </FadeIn>

        <AnimatePresence>
          {filtered.slice(1).map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, delay: i * 0.04 }}>
              <div
                style={{ padding: "18px 0", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", cursor: "pointer", flexWrap: "wrap", transition: "opacity 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.62")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "5px", flexWrap: "wrap" }}>
                    <Tag accent="#52525b">{post.category}</Tag>
                  </div>
                  <h3 style={{ fontSize: "clamp(13px,1vw,15px)", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "3px", lineHeight: 1.35 }}>{post.title}</h3>
                  <p style={{ fontSize: "12.5px", color: "var(--text-3)", lineHeight: 1.55 }}>{post.excerpt.slice(0, 85)}…</p>
                </div>
                <div style={{ flexShrink: 0, textAlign: "right" }}>
                  <p style={{ fontSize: "11px", color: "var(--text-3)", fontFamily: "'SF Mono','Fira Code',monospace", marginBottom: "3px" }}>{post.date}</p>
                  <p style={{ fontSize: "11px", color: "var(--text-3)", display: "flex", alignItems: "center", gap: "3px", justifyContent: "flex-end" }}><Icon.Clock /> {post.readTime}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
});