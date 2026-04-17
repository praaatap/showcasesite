import { memo, useState, useCallback } from "react";
import Tilt from "react-parallax-tilt";
import { PROJECTS } from "../constants/data";
import { Icon } from "../components/icons/Icons";
import { FadeIn } from "../components/ui/FadeIn";
import { SpotlightCard } from "../components/ui/SpotlightCard";
import { Chip } from "../components/ui/Chip";

const PROJECT_FILTERS = ["All", "AI", "SaaS", "Mobile"];

export const ProjectsPage = memo(() => {
  const [filter, setFilter] = useState("All");
  const handleFilter = useCallback((f: string) => setFilter(f), []);

  return (
    <main style={{ paddingTop: "108px", minHeight: "100vh", paddingBottom: "96px" }}>
      <div className="container">
        <FadeIn>
          <div style={{ maxWidth: "600px", marginBottom: "48px" }}>
            <p style={{ fontSize: "11.5px", fontWeight: 600, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px" }}>Projects</p>
            <h1 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", letterSpacing: "-0.04em", marginBottom: "12px" }}>Work that ships.</h1>
            <p style={{ fontSize: "clamp(13px,1vw,15px)", color: "var(--text-2)", lineHeight: 1.65 }}>AI tools, developer utilities, SaaS products, and mobile apps.</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "36px", padding: "5px", background: "var(--bg-muted)", borderRadius: "10px", width: "fit-content", border: "1px solid var(--border)" }}>
            {PROJECT_FILTERS.map(f => (
              <button key={f} onClick={() => handleFilter(f)}
                style={{ padding: "6px 14px", borderRadius: "7px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 500, transition: "all 0.15s", background: filter === f ? "var(--surface)" : "transparent", color: filter === f ? "var(--text-1)" : "var(--text-3)", boxShadow: filter === f ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}>
                {f}
              </button>
            ))}
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "12px" }}>
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.06}>
              <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} perspective={1400} scale={1.012} transitionSpeed={600} glareEnable glareMaxOpacity={0.04} glarePosition="all" style={{ borderRadius: "var(--r-lg)", height: "100%" }}>
                <SpotlightCard accent={p.accent.replace("#", "").match(/.{2}/g)!.map(h => parseInt(h, 16)).join(",")} style={{ padding: "24px", height: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: p.accent, zIndex: 2 }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "9px", background: p.accent + "12", display: "flex", alignItems: "center", justifyContent: "center", color: p.accent }}><Icon.Code /></div>
                    <div style={{ display: "flex", gap: "4px" }}>
                      <a href={p.github} style={{ width: "26px", height: "26px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-3)", border: "1px solid var(--border)" }}><Icon.GitHub /></a>
                      <a href={p.live}   style={{ width: "26px", height: "26px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-3)", border: "1px solid var(--border)" }}><Icon.ArrowUpRight /></a>
                    </div>
                  </div>
                  <div>
                    <h3 style={{ fontSize: "15.5px", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "3px" }}>{p.title}</h3>
                    <p style={{ fontSize: "12px", color: p.accent, fontWeight: 500 }}>{p.tagline}</p>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: 1.65, flex: 1 }}>{p.description}</p>
                  <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                    {p.tech.map(t => <Chip key={t}>{t}</Chip>)}
                  </div>
                </SpotlightCard>
              </Tilt>
            </FadeIn>
          ))}
        </div>
      </div>
    </main>
  );
});