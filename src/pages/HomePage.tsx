import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { ME, TECH_STACK, PROJECTS, POSTS } from "../constants/data";
import { Icon } from "../components/icons/Icons";
import { FadeIn } from "../components/ui/FadeIn";
import { SolidBtn } from "../components/ui/SolidBtn";
import { GhostBtn } from "../components/ui/GhostBtn";
import { SpotlightCard } from "../components/ui/SpotlightCard";
import { Chip } from "../components/ui/Chip";
import { Tag } from "../components/ui/Tag";
import { HeroOrb } from "../components/three/HeroOrb";
import { Typewriter } from "../components/home/Typewriter";
import { Counter } from "../components/home/Counter";
import Tilt from "react-parallax-tilt";

const STAT_ITEMS = [
  { to: 20,  suffix: "+", label: "projects shipped" },
  { to: 500, suffix: "+", label: "GitHub stars"     },
  { to: 3,   suffix: "+", label: "years building"   },
] as const;

const ABOUT_FEATURES = [
  { icon: <Icon.Code />,    title: "Full Stack Engineering", desc: "React, Next.js, Node.js, Python — end-to-end." },
  { icon: <Icon.Brain />,   title: "AI & LLM Integration",   desc: "LangChain, CrewAI, RAG pipelines, GPT-4 tooling." },
  { icon: <Icon.Sparkle />, title: "Product Thinking",        desc: "Ship fast, iterate on usage, write deletable code." },
];

export const HomePage = memo(() => {
  const { scrollY } = useScroll();
  const orbY       = useTransform(scrollY, [0, 600], [0, -60]);
  const orbOpacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  return (
    <>
      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: "88px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)", backgroundSize: "64px 64px", opacity: 0.35, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 55% at 62% 32%, rgba(124,58,237,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "180px", background: "linear-gradient(to top, var(--bg), transparent)", pointerEvents: "none" }} />

        <div className="container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: "40px", alignItems: "center", padding: "60px 0" }}>
            <div>
              <FadeIn>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 12px 5px 8px", borderRadius: "50px", border: "1px solid var(--border)", background: "var(--surface)", fontSize: "12px", fontWeight: 500, color: "var(--text-2)", marginBottom: "28px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "#dcfce7", color: "#16a34a", padding: "2px 8px", borderRadius: "50px", fontSize: "11px", fontWeight: 600 }}>
                    <Icon.Circle fill="#16a34a" /> Available
                  </span>
                  Open to internships &amp; freelance
                </div>
              </FadeIn>

              <FadeIn delay={0.04}>
                <h1 style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)", lineHeight: 1.02, letterSpacing: "-0.04em", marginBottom: "12px", color: "var(--text-1)" }}>
                  Engineering<br />
                  software that<br />
                  <Typewriter />
                </h1>
              </FadeIn>

              <FadeIn delay={0.08}>
                <p style={{ fontSize: "clamp(14px, 1.2vw, 16px)", color: "var(--text-2)", lineHeight: 1.7, maxWidth: "440px", marginBottom: "32px" }}>
                  I'm <strong style={{ color: "var(--text-1)", fontWeight: 600 }}>Pratap</strong>, a full-stack engineer and AI builder from Delhi. I design and ship products end-to-end — from architecture to deployment.
                </p>
              </FadeIn>

              <FadeIn delay={0.12}>
                <div style={{ display: "flex", gap: "10px", marginBottom: "44px", flexWrap: "wrap" }}>
                  <SolidBtn to="/projects">View work <Icon.Arrow /></SolidBtn>
                  <GhostBtn href={ME.github}><Icon.GitHub /> GitHub</GhostBtn>
                </div>
              </FadeIn>

              <FadeIn delay={0.16}>
                <div style={{ display: "flex", gap: "28px", flexWrap: "wrap" }}>
                  {STAT_ITEMS.map(({ to, suffix, label }) => (
                    <div key={label}>
                      <div style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.6rem)", fontWeight: 700, letterSpacing: "-0.04em", fontFamily: "'Cal Sans','Inter',sans-serif", color: "var(--text-1)" }}>
                        <Counter to={to} suffix={suffix} />
                      </div>
                      <div style={{ fontSize: "11.5px", color: "var(--text-3)", marginTop: "2px" }}>{label}</div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <motion.div style={{ y: orbY, opacity: orbOpacity, willChange: "transform, opacity" }} initial={{ opacity: 0, scale: 0.82 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
              <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} perspective={1000} transitionSpeed={2000} scale={1.02} gyroscope={true} style={{ height: "clamp(320px, 45vw, 500px)", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
                <div style={{ position: "absolute", width: "120%", height: "120%", background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 60%)", filter: "blur(40px)", zIndex: 0, pointerEvents: "none" }} />
                <div style={{ width: "100%", height: "100%", zIndex: 1 }}>
                  <HeroOrb />
                </div>
              </Tilt>
            </motion.div>
          </div>
        </div>

        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          style={{ position: "absolute", bottom: "36px", left: "50%", transform: "translateX(-50%)", willChange: "transform" }}>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="var(--border)" strokeWidth="1.5"/>
            <motion.rect x="6.5" y="5" width="3" height="5" rx="1.5" fill="var(--text-3)" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.2 }} />
          </svg>
        </motion.div>
      </section>

      {/* TECH MARQUEE */}
      <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "14px 0", overflow: "hidden", background: "var(--bg-subtle)" }}>
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 26, repeat: Infinity, ease: "linear" }} style={{ display: "flex", width: "max-content", willChange: "transform" }}>
          {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
            <span key={i} style={{ padding: "0 28px", fontSize: "12.5px", fontWeight: 500, color: "var(--text-3)", whiteSpace: "nowrap", borderRight: "1px solid var(--border)" }}>{tech}</span>
          ))}
        </motion.div>
      </div>

      {/* PROJECTS SECTION */}
      <section style={{ padding: "80px 0", borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <FadeIn>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <p style={{ fontSize: "11.5px", fontWeight: 600, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "8px" }}>Work</p>
                <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.03em" }}>Things I've built</h2>
              </div>
              <Link to="/projects" style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-2)", display: "flex", alignItems: "center", gap: "4px", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text-1)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-2)")}>
                All projects <Icon.ArrowUpRight />
              </Link>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "12px" }}>
            {PROJECTS.slice(0, 3).map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.07}>
                <SpotlightCard
                  accent={p.accent.replace("#", "").match(/.{2}/g)!.map(h => parseInt(h, 16)).join(",")}
                  style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px", minHeight: "220px" }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: p.accent, zIndex: 2 }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "9px", background: p.accent + "12", display: "flex", alignItems: "center", justifyContent: "center", color: p.accent }}>
                      <Icon.Code />
                    </div>
                    <div style={{ display: "flex", gap: "4px" }}>
                      <a href={p.github} style={{ width: "26px", height: "26px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-3)", border: "1px solid var(--border)" }}><Icon.GitHub /></a>
                      <a href={p.live}   style={{ width: "26px", height: "26px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-3)", border: "1px solid var(--border)" }}><Icon.ArrowUpRight /></a>
                    </div>
                  </div>
                  <div>
                    <h3 style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "4px" }}>{p.title}</h3>
                    <p style={{ fontSize: "12px", color: p.accent, fontWeight: 500 }}>{p.tagline}</p>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: 1.65, flex: 1 }}>{p.description}</p>
                  <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                    {p.tech.map(t => <Chip key={t}>{t}</Chip>)}
                  </div>
                </SpotlightCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section style={{ padding: "0 0 80px" }}>
        <div className="container">
          <FadeIn>
            <div style={{ borderRadius: "var(--r-xl)", border: "1px solid var(--border)", background: "var(--bg-subtle)", padding: "clamp(28px,5vw,56px) clamp(20px,5vw,64px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "40px", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: "11.5px", fontWeight: 600, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "10px" }}>About</p>
                <h2 style={{ fontSize: "clamp(1.4rem,3vw,2rem)", letterSpacing: "-0.03em", marginBottom: "14px" }}>Building at the intersection of AI and product</h2>
                <p style={{ fontSize: "14px", color: "var(--text-2)", lineHeight: 1.7, marginBottom: "24px" }}>
                  CS student from Delhi with 3+ years building full-stack systems and AI-powered products. Interning at Tars Technologies and joining Deloitte.
                </p>
                <SolidBtn to="/about">Read more <Icon.Arrow /></SolidBtn>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {ABOUT_FEATURES.map(({ icon, title, desc }) => (
                  <div key={title} style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "14px 16px", borderRadius: "var(--r)", background: "var(--surface)", border: "1px solid var(--border)" }}>
                    <div style={{ width: "30px", height: "30px", flexShrink: 0, borderRadius: "8px", background: "var(--bg-muted)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-2)" }}>{icon}</div>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 600, marginBottom: "2px", letterSpacing: "-0.01em" }}>{title}</p>
                      <p style={{ fontSize: "12px", color: "var(--text-3)" }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* LATEST POSTS */}
      <section style={{ padding: "80px 0", borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <FadeIn>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <p style={{ fontSize: "11.5px", fontWeight: 600, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "8px" }}>Writing</p>
                <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", letterSpacing: "-0.03em" }}>Latest posts</h2>
              </div>
              <Link to="/blog" style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-2)", display: "flex", alignItems: "center", gap: "4px", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text-1)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-2)")}>
                All posts <Icon.ArrowUpRight />
              </Link>
            </div>
          </FadeIn>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {POSTS.slice(0, 4).map((post, i) => (
              <FadeIn key={post.id} delay={i * 0.05}>
                <div
                  style={{ padding: "20px 0", borderBottom: i < 3 ? "1px solid var(--border)" : "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px", cursor: "pointer", flexWrap: "wrap", transition: "opacity 0.15s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.6"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                >
                  <div style={{ flex: 1, minWidth: "200px" }}>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px", flexWrap: "wrap" }}>
                      <Tag accent="#52525b">{post.category}</Tag>
                      <span style={{ fontSize: "11.5px", color: "var(--text-3)", display: "flex", alignItems: "center", gap: "3px" }}><Icon.Clock /> {post.readTime}</span>
                    </div>
                    <p style={{ fontSize: "clamp(13.5px,1.2vw,15px)", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--text-1)", lineHeight: 1.35 }}>{post.title}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                    <span style={{ fontSize: "11.5px", color: "var(--text-3)", fontFamily: "'SF Mono','Fira Code',monospace" }}>{post.date}</span>
                    <Icon.ArrowUpRight />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
});