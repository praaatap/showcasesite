import { memo } from "react";
import { SKILLS, EXPERIENCE } from "../constants/data";
import { Icon } from "../components/icons/Icons";
import { FadeIn } from "../components/ui/FadeIn";
import { Rule } from "../components/ui/Rule";
import { Tag } from "../components/ui/Tag";
import { Chip } from "../components/ui/Chip";
import { SpotlightCard } from "../components/ui/SpotlightCard";
import { SkillRing } from "../components/about/SkillRing";
import { TorusKnotCanvas } from "../components/three/TorusKnotCanvas";

const ABOUT_SECTIONS = [
  { heading: "Background",         text: "I'm a CS student from Delhi with 3+ years of hands-on experience building full-stack systems and AI-powered products. I started with vanilla JS and CSS, moved through the MERN stack, and now spend most of my time thinking about AI architecture, product design, and scalable system design." },
  { heading: "What I'm doing now", text: "Currently interning at Tars Technologies building conversational AI features and React dashboards. I'm joining Deloitte as a software engineer after graduation." },
  { heading: "How I build",        text: "I believe in shipping fast, iterating based on real usage, and writing code that's easy to delete. I think about performance, accessibility, and developer experience from day one — not as afterthoughts." },
];

export const AboutPage = memo(() => (
  <main style={{ paddingTop: "108px", minHeight: "100vh", paddingBottom: "96px" }}>
    <div className="container-sm">
      <FadeIn>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "18px", padding: "22px 24px", borderRadius: "var(--r-lg)", background: "var(--bg-subtle)", border: "1px solid var(--border)", marginBottom: "40px", flexWrap: "wrap" }}>
          <div style={{ width: "52px", height: "52px", flexShrink: 0, borderRadius: "13px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 600, fontSize: "15px", letterSpacing: "-0.02em" }}>Pratap</p>
            <p style={{ fontSize: "13px", color: "var(--text-2)", marginTop: "2px" }}>Full Stack Engineer · AI Builder · Delhi, India</p>
          </div>
          <Tag accent="#16a34a"><Icon.Circle fill="#16a34a" /> Open to work</Tag>
        </div>
      </FadeIn>

      {ABOUT_SECTIONS.map(({ heading, text }, i) => (
        <FadeIn key={heading} delay={i * 0.05}>
          <div style={{ marginBottom: "28px" }}>
            <h2 style={{ fontSize: "17px", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "10px" }}>{heading}</h2>
            <p style={{ fontSize: "14.5px", color: "var(--text-2)", lineHeight: 1.75 }}>{text}</p>
          </div>
          <Rule />
          <div style={{ marginBottom: "28px" }} />
        </FadeIn>
      ))}

      <FadeIn>
        <div style={{ borderRadius: "var(--r-xl)", border: "1px solid var(--border)", background: "var(--bg-subtle)", overflow: "hidden", marginBottom: "48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", alignItems: "center" }}>
            <div style={{ padding: "clamp(20px,4vw,36px)" }}>
              <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "10px" }}>Craft</p>
              <h3 style={{ fontSize: "clamp(1.1rem,2.5vw,1.3rem)", letterSpacing: "-0.03em", marginBottom: "10px" }}>Always learning, always building</h3>
              <p style={{ fontSize: "13.5px", color: "var(--text-2)", lineHeight: 1.7 }}>Every project is a chance to push further. I treat complexity as a puzzle — and document everything so the next builder can move faster.</p>
            </div>
            <div style={{ height: "260px" }}>
              <TorusKnotCanvas />
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn>
        <h2 style={{ fontSize: "17px", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "18px" }}>Technical skills</h2>
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "10px", marginBottom: "48px" }}>
        {SKILLS.map((s, i) => <SkillRing key={s.name} name={s.name} pct={s.pct} delay={i * 0.05} />)}
      </div>

      <Rule />
      <div style={{ marginBottom: "36px" }} />

      <FadeIn>
        <h2 style={{ fontSize: "17px", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "20px" }}>Experience</h2>
      </FadeIn>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {EXPERIENCE.map((exp, i) => (
          <FadeIn key={exp.company} delay={i * 0.06}>
            <SpotlightCard style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "5px", flexWrap: "wrap", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  <p style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "-0.02em" }}>{exp.role}</p>
                  {exp.current && <Tag accent="#16a34a"><Icon.Circle fill="#16a34a" /> Active</Tag>}
                </div>
                <span style={{ fontSize: "11.5px", color: "var(--text-3)", fontFamily: "'SF Mono','Fira Code',monospace" }}>{exp.period}</span>
              </div>
              <p style={{ fontSize: "13px", color: "#7c3aed", fontWeight: 500, marginBottom: "10px" }}>{exp.company}</p>
              <p style={{ fontSize: "13.5px", color: "var(--text-2)", lineHeight: 1.65, marginBottom: "12px" }}>{exp.desc}</p>
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                {exp.skills.map(sk => <Chip key={sk}>{sk}</Chip>)}
              </div>
            </SpotlightCard>
          </FadeIn>
        ))}
      </div>
    </div>
  </main>
));