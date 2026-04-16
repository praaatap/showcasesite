import {
  useEffect, useRef, useState, useCallback, useMemo,
  memo,
} from "react";
import {
  BrowserRouter, Routes, Route, Link, NavLink, useLocation,
} from "react-router-dom";
import {
  motion, AnimatePresence, useScroll, useTransform,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  MeshDistortMaterial, Sphere, Float, Environment,
  Points, PointMaterial, MeshTransmissionMaterial,
} from "@react-three/drei";
import Tilt from "react-parallax-tilt";
import Lenis from "lenis";
import * as THREE from "three";
import "./index.css";

// ─────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────
const Icon = {
  Arrow: memo(() => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )),
  ArrowUpRight: memo(() => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M2 11L11 2M11 2H4.5M11 2V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )),
  GitHub: memo(() => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )),
  LinkedIn: memo(() => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )),
  Twitter: memo(() => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )),
  Mail: memo(() => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )),
  Code: memo(() => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/>
    </svg>
  )),
  Layers: memo(() => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12,2 2,7 12,12 22,7"/><polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/>
    </svg>
  )),
  Zap: memo(() => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
    </svg>
  )),
  Star: memo(() => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
    </svg>
  )),
  Circle: memo(({ fill = "currentColor" }: { fill?: string }) => (
    <svg width="7" height="7" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill={fill}/></svg>
  )),
  Check: memo(() => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  )),
  Clock: memo(() => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
    </svg>
  )),
  X: memo(() => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  )),
  Menu: memo(() => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  )),
  Brain: memo(() => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.44-4.24z"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.44-4.24z"/>
    </svg>
  )),
  Sparkle: memo(() => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
    </svg>
  )),
};

// ─────────────────────────────────────────────────────────
// DATA — GSoC, APIash, APIDash all removed
// ─────────────────────────────────────────────────────────
const ME = {
  name: "Pratap",
  role: "Full Stack Engineer",
  location: "Delhi, India",
  bio: "I build AI-powered products and full-stack systems end to end.",
  github:   "https://github.com/pratap",
  linkedin: "https://linkedin.com/in/pratap",
  twitter:  "https://twitter.com/pratap",
  email:    "pratap@email.com",
};

const TECH_STACK = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "FastAPI",
  "LangChain", "CrewAI", "MongoDB", "PostgreSQL", "Docker", "Flutter",
  "Redis", "GraphQL", "Tailwind CSS", "Framer Motion",
];

const PROJECTS = [
  {
    id: "ai-studio",
    title: "AI Workflow Studio",
    tagline: "No-code multi-agent AI pipeline builder",
    description: "A visual platform to design, test and deploy multi-agent AI workflows using CrewAI and LangChain. Supports real-time streaming, RAG pipelines, and team sharing.",
    tech: ["React", "FastAPI", "CrewAI", "LangChain", "MongoDB"],
    github: "#", live: "#", accent: "#7c3aed",
  },
  {
    id: "saas-analytics",
    title: "Insight",
    tagline: "SaaS business intelligence dashboard",
    description: "Real-time analytics for SaaS companies — MRR, churn prediction, cohort analysis and usage tracking with AI-generated weekly summaries.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Recharts"],
    github: "#", live: "#", accent: "#b45309",
  },
  {
    id: "fintrack",
    title: "Fintrack",
    tagline: "AI-powered mobile finance tracker",
    description: "Personal finance app with smart budgeting, spending pattern recognition, and AI recommendations. Built with Flutter for cross-platform mobile.",
    tech: ["Flutter", "Dart", "Firebase", "Python"],
    github: "#", live: "#", accent: "#be185d",
  },
  {
    id: "collabboard",
    title: "CollabBoard",
    tagline: "Real-time multiplayer whiteboard",
    description: "Figma-inspired collaborative canvas with live cursors, voice annotations, and AI-powered sticky note clustering.",
    tech: ["React", "Socket.io", "Node.js", "Redis"],
    github: "#", live: "#", accent: "#1d4ed8",
  },
  {
    id: "prbot",
    title: "PRBot",
    tagline: "AI pull request reviewer",
    description: "GitHub App that automatically reviews PRs, detects bugs, and suggests improvements using GPT-4.",
    tech: ["Python", "OpenAI", "GitHub API", "FastAPI"],
    github: "#", live: "#", accent: "#374151",
  },
  {
    id: "mcpdash",
    title: "MCPDash",
    tagline: "Dashboard for testing MCP servers",
    description: "An Electron + React desktop app for inspecting, testing, and debugging Model Context Protocol servers with live request/response tracing.",
    tech: ["Electron", "React", "TypeScript", "MCP"],
    github: "https://github.com/praaatap/mcpdash", live: "#", accent: "#0f766e",
  },
];

const SKILLS = [
  { name: "React / Next.js",      pct: 95, cat: "Frontend"  },
  { name: "TypeScript",           pct: 91, cat: "Frontend"  },
  { name: "Node.js / Express",    pct: 92, cat: "Backend"   },
  { name: "Python / FastAPI",     pct: 86, cat: "Backend"   },
  { name: "LangChain / CrewAI",   pct: 88, cat: "AI/ML"     },
  { name: "MongoDB / PostgreSQL", pct: 87, cat: "Database"  },
  { name: "Docker / DevOps",      pct: 79, cat: "DevOps"    },
  { name: "Flutter",              pct: 81, cat: "Mobile"    },
];

const EXPERIENCE = [
  {
    company: "Tars Technologies",
    role: "Full Stack Engineer Intern",
    period: "2025 – Present",
    desc: "Building AI-powered chatbot features, React component libraries, and Node.js REST APIs for a conversational SaaS platform.",
    skills: ["React", "Node.js", "MongoDB", "TypeScript"],
    current: true,
  },
  {
    company: "Deloitte",
    role: "Associate Software Engineer (Incoming)",
    period: "Starting 2025",
    desc: "Confirmed offer. Enterprise-scale software solutions in the technology consulting division.",
    skills: ["Enterprise", "Cloud", "Java"],
    current: false,
  },
];

const POSTS = [
  { id: "crewai-rag",         title: "Building a Production RAG Pipeline with CrewAI",   excerpt: "A comprehensive walkthrough of combining Retrieval-Augmented Generation with multi-agent workflows — from chunking strategy to production deployment.", date: "April 10, 2026",    readTime: "8 min",  category: "AI Engineering" },
  { id: "mern-saas",          title: "Shipping a MERN SaaS Solo in 30 Days",              excerpt: "Everything I learned building and launching a SaaS product alone — architecture, auth, Stripe integration, and the mistakes I made.",                  date: "March 24, 2026",   readTime: "12 min", category: "Product"        },
  { id: "typescript-patterns",title: "TypeScript Patterns That Actually Matter",          excerpt: "Discriminated unions, branded types, template literal types, and other advanced patterns I use in every serious TypeScript project.",                   date: "March 8, 2026",    readTime: "6 min",  category: "TypeScript"     },
  { id: "flutter-arch",       title: "Clean Architecture in Large Flutter Applications",  excerpt: "How I structure complex Flutter projects using feature-first clean architecture, Riverpod state management, and proper dependency injection.",          date: "February 2, 2026", readTime: "9 min",  category: "Flutter"        },
  { id: "openai-tools",       title: "OpenAI Function Calling: A Practical Guide",        excerpt: "Everything you need to build reliable AI agents using OpenAI's function calling and tool use — with real code examples and production patterns.",        date: "January 15, 2026", readTime: "7 min",  category: "AI Engineering" },
];

// ─────────────────────────────────────────────────────────
// LENIS — memoized raf loop
// ─────────────────────────────────────────────────────────
const useLenis = () => {
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

// ─────────────────────────────────────────────────────────
// GRAIN OVERLAY — static, never re-renders
// ─────────────────────────────────────────────────────────
const GrainOverlay = memo(() => (
  <div style={{ position: "fixed", inset: 0, zIndex: 9990, pointerEvents: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "180px 180px", opacity: 0.022 }} />
));

// ─────────────────────────────────────────────────────────
// AI STATUS BAR
// ─────────────────────────────────────────────────────────
const AI_STATUS_ITEMS = [
  "Model: GPT-4o", "Latency: 1.2s", "Status: Running",
  "Tokens: 4096", "Pipeline: CrewAI", "RAG: Active", "Agents: 3",
];

const AIStatusBar = memo(() => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % AI_STATUS_ITEMS.length), 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999, height: "28px", background: "#09090b", display: "flex", alignItems: "center", justifyContent: "center", gap: "0", overflow: "hidden", willChange: "contents" }}>
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

// ─────────────────────────────────────────────────────────
// TYPEWRITER
// ─────────────────────────────────────────────────────────
const ROLES = ["Full Stack Engineer", "AI Builder", "LangChain Hacker", "Product Builder"];

const Typewriter = memo(() => {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = ROLES[roleIdx];
    let timer: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < role.length) {
      timer = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 55);
    } else if (!deleting && displayed.length === role.length) {
      timer = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28);
    } else {
      setDeleting(false);
      setRoleIdx(i => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timer);
  }, [displayed, deleting, roleIdx]);

  return (
    <span style={{ color: "#7c3aed" }}>
      {displayed}
      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.9 }}
        style={{ display: "inline-block", width: "2px", height: "1em", background: "#7c3aed", marginLeft: "2px", verticalAlign: "middle", borderRadius: "1px", willChange: "opacity" }} />
    </span>
  );
});

// ─────────────────────────────────────────────────────────
// SPOTLIGHT CARD
// ─────────────────────────────────────────────────────────
const SpotlightCard = memo(({
  children, style = {}, accent = "124,58,237",
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  accent?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleEnter = useCallback(() => setHovered(true), []);
  const handleLeave = useCallback(() => { setHovered(false); setPos(null); }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        position: "relative", borderRadius: "var(--r-lg)",
        border: "1px solid var(--border)", background: "var(--surface)",
        overflow: "hidden", transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: hovered ? "0 6px 28px rgba(0,0,0,0.07)" : "none",
        willChange: "box-shadow",
        ...style,
      }}
    >
      {pos && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, rgba(${accent},0.07) 0%, transparent 65%)`, zIndex: 0 }} />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────
// 3D — PARTICLES
// ─────────────────────────────────────────────────────────
const PARTICLE_POSITIONS = (() => {
  const pos = new Float32Array(320 * 3);
  for (let i = 0; i < 320; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 14;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }
  return pos;
})();

const ParticleField = memo(() => {
  const ref = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.04;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.05;
    }
  });
  return (
    <Points ref={ref} positions={PARTICLE_POSITIONS} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#9333ea" size={0.032} sizeAttenuation depthWrite={false} opacity={0.55} />
    </Points>
  );
});

// ─────────────────────────────────────────────────────────
// 3D — ORB
// ─────────────────────────────────────────────────────────
const OrbCore = memo(({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) => {
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
      <Float speed={1.2} floatIntensity={0.3} rotationIntensity={0.1}>
        <Sphere ref={outer} args={[1.75, 128, 128]}>
          <MeshTransmissionMaterial color="#7c3aed" transmission={0.6} thickness={1.2} roughness={0.05} chromaticAberration={0.06} distortionScale={0.2} temporalDistortion={0.08} backside />
        </Sphere>
      </Float>
      <Float speed={2} floatIntensity={0.4} rotationIntensity={0.15}>
        <Sphere args={[1.3, 96, 96]}>
          <MeshDistortMaterial color="#6d28d9" distort={0.38} speed={2.5} roughness={0} metalness={0.2} transparent opacity={0.92} />
        </Sphere>
      </Float>
      <Float speed={3} floatIntensity={0.2}>
        <Sphere ref={inner} args={[0.7, 64, 64]}>
          <MeshDistortMaterial color="#c4b5fd" distort={0.65} speed={3.5} roughness={0} transparent opacity={0.35} />
        </Sphere>
      </Float>
      <mesh ref={ring1} rotation={[Math.PI / 2.2, 0.4, 0]}>
        <torusGeometry args={[2.4, 0.022, 14, 140]} />
        <meshStandardMaterial color="#8b5cf6" transparent opacity={0.22} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 3, -0.6, Math.PI / 5]}>
        <torusGeometry args={[2.9, 0.014, 14, 140]} />
        <meshStandardMaterial color="#a78bfa" transparent opacity={0.14} />
      </mesh>
      <mesh ref={ring3} rotation={[Math.PI / 4, 1.2, Math.PI / 3]}>
        <torusGeometry args={[3.3, 0.01, 12, 140]} />
        <meshStandardMaterial color="#ddd6fe" transparent opacity={0.09} />
      </mesh>
    </group>
  );
});

// ─────────────────────────────────────────────────────────
// HERO ORB — only mounts when section is in view
// ─────────────────────────────────────────────────────────
const HeroOrb = memo(() => {
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
        <Canvas camera={{ position: [0, 0, 6.2], fov: 40 }} gl={{ antialias: true, alpha: true }} style={{ width: "100%", height: "100%" }}>
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

// ─────────────────────────────────────────────────────────
// TORUS KNOT (About page) — lazy mounted
// ─────────────────────────────────────────────────────────
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

const TorusKnotCanvas = memo(() => {
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

// ─────────────────────────────────────────────────────────
// COUNTER
// ─────────────────────────────────────────────────────────
const Counter = memo(({ to, suffix = "" }: { to: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const dur = 1400, step = 16, inc = to / (dur / step);
    const timer = setInterval(() => {
      start += inc;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, to]);
  return <span ref={ref}>{count}{suffix}</span>;
});

// ─────────────────────────────────────────────────────────
// SKILL RING
// ─────────────────────────────────────────────────────────
const SkillRing = memo(({ name, pct, delay = 0 }: { name: string; pct: number; delay?: number }) => {
  const r = 28, circ = 2 * Math.PI * r;
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <FI delay={delay}>
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
    </FI>
  );
});

// ─────────────────────────────────────────────────────────
// FI — fade-in on scroll
// ─────────────────────────────────────────────────────────
const FI = memo(({ children, delay = 0, y = 22, x = 0 }: {
  children: React.ReactNode; delay?: number; y?: number; x?: number;
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
});

// ─────────────────────────────────────────────────────────
// UI ATOMS
// ─────────────────────────────────────────────────────────
const Tag = memo(({ children, accent = "#52525b" }: { children: React.ReactNode; accent?: string }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "3px 10px", borderRadius: "6px", fontSize: "11.5px", fontWeight: 500, color: accent, background: accent + "12", border: `1px solid ${accent}22` }}>
    {children}
  </span>
));

const Chip = memo(({ children }: { children: React.ReactNode }) => (
  <span style={{ padding: "3px 9px", borderRadius: "6px", fontSize: "11.5px", fontWeight: 500, color: "var(--text-2)", background: "var(--bg-muted)", border: "1px solid var(--border)" }}>
    {children}
  </span>
));

const Rule = memo(() => <div style={{ height: "1px", background: "var(--border)", width: "100%" }} />);

const GhostBtn = memo(({ children, href, onClick, style = {} }: {
  children: React.ReactNode; href?: string; onClick?: () => void; style?: React.CSSProperties;
}) => {
  const s: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "var(--r)", border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-1)", fontSize: "13px", fontWeight: 500, cursor: "pointer", transition: "border-color 0.15s", textDecoration: "none", ...style };
  const onEnter = useCallback((e: any) => (e.currentTarget.style.borderColor = "var(--border-strong)"), []);
  const onLeave = useCallback((e: any) => (e.currentTarget.style.borderColor = "var(--border)"), []);
  if (href) return <a href={href} target="_blank" rel="noreferrer" style={s} onMouseEnter={onEnter} onMouseLeave={onLeave}>{children}</a>;
  return <button onClick={onClick} style={{ ...s, border: "1px solid var(--border)", outline: "none" }} onMouseEnter={onEnter} onMouseLeave={onLeave}>{children}</button>;
});

const SolidBtn = memo(({ children, href, to, onClick, style = {} }: {
  children: React.ReactNode; href?: string; to?: string; onClick?: () => void; style?: React.CSSProperties;
}) => {
  const s: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 18px", borderRadius: "var(--r)", background: "var(--text-1)", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "opacity 0.15s", letterSpacing: "-0.01em", textDecoration: "none", ...style };
  const onEnter = useCallback((e: any) => { e.currentTarget.style.opacity = "0.82"; }, []);
  const onLeave = useCallback((e: any) => { e.currentTarget.style.opacity = "1"; }, []);
  if (to) return <Link to={to} style={s} onMouseEnter={onEnter} onMouseLeave={onLeave}>{children}</Link>;
  if (href) return <a href={href} target="_blank" rel="noreferrer" style={s} onMouseEnter={onEnter} onMouseLeave={onLeave}>{children}</a>;
  return <button onClick={onClick} style={{ ...s, border: "none", outline: "none" }} onMouseEnter={onEnter} onMouseLeave={onLeave}>{children}</button>;
});

// ─────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────
const NAV_LINKS = [
  { to: "/",         label: "Home"     },
  { to: "/about",    label: "About"    },
  { to: "/projects", label: "Projects" },
  { to: "/blog",     label: "Blog"     },
  { to: "/contact",  label: "Contact"  },
];

const Navbar = memo(() => {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Debounced scroll
  useEffect(() => {
    let ticking = false;
    const fn = () => {
      if (!ticking) {
        requestAnimationFrame(() => { setScrolled(window.scrollY > 24); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const toggleMobile = useCallback(() => setMobileOpen(o => !o), []);

  const socialLinks = useMemo(() => [
    { href: ME.github,   icon: <Icon.GitHub /> },
    { href: ME.linkedin, icon: <Icon.LinkedIn /> },
    { href: ME.twitter,  icon: <Icon.Twitter /> },
  ], []);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed", top: "28px", left: 0, right: 0, zIndex: 998,
        background: scrolled || mobileOpen ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled || mobileOpen ? "blur(24px) saturate(180%)" : "none",
        borderBottom: scrolled || mobileOpen ? "1px solid var(--border)" : "none",
        transition: "background 0.25s ease, border-color 0.25s ease",
        willChange: "backdrop-filter",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "9px", textDecoration: "none" }}>
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="8" fill="#18181b"/>
            <path d="M8 20L14 8L20 20" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 16h8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <span style={{ fontFamily: "'Cal Sans','Inter',sans-serif", fontWeight: 600, fontSize: "15px", letterSpacing: "-0.02em", color: "var(--text-1)" }}>pratap.dev</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          {NAV_LINKS.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <NavLink key={to} to={to}
                style={{ padding: "6px 12px", borderRadius: "8px", fontSize: "13.5px", fontWeight: active ? 600 : 400, color: active ? "var(--text-1)" : "var(--text-2)", background: active ? "var(--bg-muted)" : "transparent", transition: "all 0.15s", textDecoration: "none" }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = "var(--text-1)"; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; }}>
                {label}
              </NavLink>
            );
          })}
        </nav>

        {/* Desktop right */}
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {socialLinks.map(({ href, icon }) => (
            <a key={href} href={href} target="_blank" rel="noreferrer"
              style={{ width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-3)", transition: "color 0.15s, background 0.15s", textDecoration: "none" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-1)"; (e.currentTarget as HTMLElement).style.background = "var(--bg-muted)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
              {icon}
            </a>
          ))}
          <div style={{ width: "1px", height: "16px", background: "var(--border)", margin: "0 6px" }} />
          <SolidBtn to="/contact">Hire me</SolidBtn>
        </div>

        {/* Hamburger */}
        <button onClick={toggleMobile} className="show-mobile-flex"
          style={{ width: "36px", height: "36px", borderRadius: "9px", border: "1px solid var(--border)", background: "transparent", cursor: "pointer", alignItems: "center", justifyContent: "center", color: "var(--text-1)" }}>
          {mobileOpen ? <Icon.X /> : <Icon.Menu />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden", borderTop: "1px solid var(--border)", background: "rgba(255,255,255,0.98)", backdropFilter: "blur(24px)" }}
          >
            <div className="container" style={{ paddingTop: "16px", paddingBottom: "20px", display: "flex", flexDirection: "column", gap: "4px" }}>
              {NAV_LINKS.map(({ to, label }) => {
                const active = location.pathname === to;
                return (
                  <NavLink key={to} to={to}
                    style={{ padding: "11px 12px", borderRadius: "8px", fontSize: "15px", fontWeight: active ? 600 : 400, color: active ? "var(--text-1)" : "var(--text-2)", background: active ? "var(--bg-muted)" : "transparent", textDecoration: "none", display: "block" }}>
                    {label}
                  </NavLink>
                );
              })}
              <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid var(--border)", display: "flex", gap: "8px", alignItems: "center" }}>
                {socialLinks.map(({ href, icon }) => (
                  <a key={href} href={href} target="_blank" rel="noreferrer"
                    style={{ width: "36px", height: "36px", borderRadius: "9px", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-2)", textDecoration: "none" }}>
                    {icon}
                  </a>
                ))}
                <SolidBtn to="/contact" style={{ marginLeft: "auto" }}>Hire me</SolidBtn>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
});

// ─────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────
const STAT_ITEMS = [
  { to: 20,  suffix: "+", label: "projects shipped" },
  { to: 500, suffix: "+", label: "GitHub stars"     },
  { to: 3,   suffix: "+", label: "years building"   },
] as const;

const ABOUT_FEATURES = [
  { icon: <Icon.Code />,   title: "Full Stack Engineering", desc: "React, Next.js, Node.js, Python — end-to-end." },
  { icon: <Icon.Brain />,  title: "AI & LLM Integration",   desc: "LangChain, CrewAI, RAG pipelines, GPT-4 tooling." },
  { icon: <Icon.Sparkle />, title: "Product Thinking",       desc: "Ship fast, iterate on usage, write deletable code." },
];

const HomePage = memo(() => {
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
            {/* Text */}
            <div>
              <FI>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 12px 5px 8px", borderRadius: "50px", border: "1px solid var(--border)", background: "var(--surface)", fontSize: "12px", fontWeight: 500, color: "var(--text-2)", marginBottom: "28px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "#dcfce7", color: "#16a34a", padding: "2px 8px", borderRadius: "50px", fontSize: "11px", fontWeight: 600 }}>
                    <Icon.Circle fill="#16a34a" /> Available
                  </span>
                  Open to internships &amp; freelance
                </div>
              </FI>

              <FI delay={0.04}>
                <h1 style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)", lineHeight: 1.02, letterSpacing: "-0.04em", marginBottom: "12px", color: "var(--text-1)" }}>
                  Engineering<br />
                  software that<br />
                  <Typewriter />
                </h1>
              </FI>

              <FI delay={0.08}>
                <p style={{ fontSize: "clamp(14px, 1.2vw, 16px)", color: "var(--text-2)", lineHeight: 1.7, maxWidth: "440px", marginBottom: "32px" }}>
                  I'm <strong style={{ color: "var(--text-1)", fontWeight: 600 }}>Pratap</strong>, a full-stack engineer and AI builder from Delhi. I design and ship products end-to-end — from architecture to deployment.
                </p>
              </FI>

              <FI delay={0.12}>
                <div style={{ display: "flex", gap: "10px", marginBottom: "44px", flexWrap: "wrap" }}>
                  <SolidBtn to="/projects">View work <Icon.Arrow /></SolidBtn>
                  <GhostBtn href={ME.github}><Icon.GitHub /> GitHub</GhostBtn>
                </div>
              </FI>

              <FI delay={0.16}>
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
              </FI>
            </div>

            {/* Orb */}
            <motion.div style={{ y: orbY, opacity: orbOpacity, willChange: "transform, opacity" }} initial={{ opacity: 0, scale: 0.82 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
              <div style={{ height: "clamp(320px, 45vw, 500px)" }}>
                <HeroOrb />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
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
          <FI>
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
          </FI>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "12px" }}>
            {PROJECTS.slice(0, 3).map((p, i) => (
              <FI key={p.id} delay={i * 0.07}>
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
              </FI>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section style={{ padding: "0 0 80px" }}>
        <div className="container">
          <FI>
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
          </FI>
        </div>
      </section>

      {/* LATEST POSTS */}
      <section style={{ padding: "0 0 80px", borderTop: "1px solid var(--border)", paddingTop: "80px" }}>
        <div className="container">
          <FI>
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
          </FI>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {POSTS.slice(0, 4).map((post, i) => (
              <FI key={post.id} delay={i * 0.05}>
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
              </FI>
            ))}
          </div>
        </div>
      </section>
    </>
  );
});

// ─────────────────────────────────────────────────────────
// ABOUT PAGE
// ─────────────────────────────────────────────────────────
const ABOUT_SECTIONS = [
  { heading: "Background",       text: "I'm a CS student from Delhi with 3+ years of hands-on experience building full-stack systems and AI-powered products. I started with vanilla JS and CSS, moved through the MERN stack, and now spend most of my time thinking about AI architecture, product design, and scalable system design." },
  { heading: "What I'm doing now", text: "Currently interning at Tars Technologies building conversational AI features and React dashboards. I'm joining Deloitte as a software engineer after graduation." },
  { heading: "How I build",      text: "I believe in shipping fast, iterating based on real usage, and writing code that's easy to delete. I think about performance, accessibility, and developer experience from day one — not as afterthoughts." },
];

const AboutPage = memo(() => (
  <main style={{ paddingTop: "108px", minHeight: "100vh", paddingBottom: "96px" }}>
    <div className="container-sm">
      <FI>
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
      </FI>

      {ABOUT_SECTIONS.map(({ heading, text }, i) => (
        <FI key={heading} delay={i * 0.05}>
          <div style={{ marginBottom: "28px" }}>
            <h2 style={{ fontSize: "17px", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "10px" }}>{heading}</h2>
            <p style={{ fontSize: "14.5px", color: "var(--text-2)", lineHeight: 1.75 }}>{text}</p>
          </div>
          <Rule />
          <div style={{ marginBottom: "28px" }} />
        </FI>
      ))}

      {/* Torus knot */}
      <FI>
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
      </FI>

      {/* Skills */}
      <FI>
        <h2 style={{ fontSize: "17px", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "18px" }}>Technical skills</h2>
      </FI>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "10px", marginBottom: "48px" }}>
        {SKILLS.map((s, i) => <SkillRing key={s.name} name={s.name} pct={s.pct} delay={i * 0.05} />)}
      </div>

      <Rule />
      <div style={{ marginBottom: "36px" }} />

      {/* Experience — GSoC removed */}
      <FI>
        <h2 style={{ fontSize: "17px", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "20px" }}>Experience</h2>
      </FI>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {EXPERIENCE.map((exp, i) => (
          <FI key={exp.company} delay={i * 0.06}>
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
          </FI>
        ))}
      </div>
    </div>
  </main>
));

// ─────────────────────────────────────────────────────────
// PROJECTS PAGE
// ─────────────────────────────────────────────────────────
const PROJECT_FILTERS = ["All", "AI", "SaaS", "Mobile"];

const ProjectsPage = memo(() => {
  const [filter, setFilter] = useState("All");
  const handleFilter = useCallback((f: string) => setFilter(f), []);

  return (
    <main style={{ paddingTop: "108px", minHeight: "100vh", paddingBottom: "96px" }}>
      <div className="container">
        <FI>
          <div style={{ maxWidth: "600px", marginBottom: "48px" }}>
            <p style={{ fontSize: "11.5px", fontWeight: 600, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px" }}>Projects</p>
            <h1 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", letterSpacing: "-0.04em", marginBottom: "12px" }}>Work that ships.</h1>
            <p style={{ fontSize: "clamp(13px,1vw,15px)", color: "var(--text-2)", lineHeight: 1.65 }}>AI tools, developer utilities, SaaS products, and mobile apps.</p>
          </div>
        </FI>

        <FI delay={0.05}>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "36px", padding: "5px", background: "var(--bg-muted)", borderRadius: "10px", width: "fit-content", border: "1px solid var(--border)" }}>
            {PROJECT_FILTERS.map(f => (
              <button key={f} onClick={() => handleFilter(f)}
                style={{ padding: "6px 14px", borderRadius: "7px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 500, transition: "all 0.15s", background: filter === f ? "var(--surface)" : "transparent", color: filter === f ? "var(--text-1)" : "var(--text-3)", boxShadow: filter === f ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}>
                {f}
              </button>
            ))}
          </div>
        </FI>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "12px" }}>
          {PROJECTS.map((p, i) => (
            <FI key={p.id} delay={i * 0.06}>
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
            </FI>
          ))}
        </div>
      </div>
    </main>
  );
});

// ─────────────────────────────────────────────────────────
// BLOG PAGE
// ─────────────────────────────────────────────────────────
const BLOG_CATS = ["All", "AI Engineering", "Product", "TypeScript", "Flutter"];

const BlogPage = memo(() => {
  const [cat, setCat] = useState("All");
  const filtered = useMemo(() => cat === "All" ? POSTS : POSTS.filter(p => p.category === cat), [cat]);

  return (
    <main style={{ paddingTop: "108px", minHeight: "100vh", paddingBottom: "96px" }}>
      <div className="container-sm">
        <FI>
          <p style={{ fontSize: "11.5px", fontWeight: 600, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px" }}>Writing</p>
          <h1 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", letterSpacing: "-0.04em", marginBottom: "10px" }}>Notes on building.</h1>
          <p style={{ fontSize: "clamp(13px,1vw,15px)", color: "var(--text-2)", lineHeight: 1.65, marginBottom: "36px" }}>AI engineering, full-stack dev, and building products as a student in India.</p>
        </FI>

        <FI delay={0.04}>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "40px" }}>
            {BLOG_CATS.map(c => (
              <button key={c} onClick={() => setCat(c)}
                style={{ padding: "5px 14px", borderRadius: "50px", border: `1px solid ${cat === c ? "var(--text-1)" : "var(--border)"}`, background: cat === c ? "var(--text-1)" : "transparent", color: cat === c ? "#fff" : "var(--text-2)", fontSize: "12.5px", fontWeight: 500, cursor: "pointer", transition: "all 0.15s" }}>
                {c}
              </button>
            ))}
          </div>
        </FI>

        <FI delay={0.06}>
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
        </FI>

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

// ─────────────────────────────────────────────────────────
// CONTACT PAGE
// ─────────────────────────────────────────────────────────
const ContactPage = memo(() => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  }, []);

  const setName    = useCallback((e: React.ChangeEvent<HTMLInputElement>)    => setForm(f => ({ ...f, name: e.target.value })), []);
  const setEmail   = useCallback((e: React.ChangeEvent<HTMLInputElement>)    => setForm(f => ({ ...f, email: e.target.value })), []);
  const setMessage = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => setForm(f => ({ ...f, message: e.target.value })), []);

  const inputStyle: React.CSSProperties = useMemo(() => ({
    width: "100%", padding: "10px 14px", borderRadius: "var(--r)",
    border: "1px solid var(--border)", fontSize: "14px",
    background: "var(--bg-subtle)", color: "var(--text-1)",
    outline: "none", fontFamily: "inherit",
    transition: "border-color 0.15s, background 0.15s",
    letterSpacing: "-0.01em", boxSizing: "border-box" as const,
  }), []);

  const CONTACT_LINKS = useMemo(() => [
    { icon: <Icon.Mail />,     label: "Email",    value: ME.email,               href: `mailto:${ME.email}` },
    { icon: <Icon.GitHub />,   label: "GitHub",   value: "github.com/pratap",    href: ME.github },
    { icon: <Icon.LinkedIn />, label: "LinkedIn", value: "linkedin.com/in/pratap", href: ME.linkedin },
  ], []);

  return (
    <main style={{ paddingTop: "108px", minHeight: "100vh", paddingBottom: "96px" }}>
      <div className="container-sm">
        <FI>
          <p style={{ fontSize: "11.5px", fontWeight: 600, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px" }}>Contact</p>
          <h1 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", letterSpacing: "-0.04em", marginBottom: "10px" }}>Get in touch.</h1>
          <p style={{ fontSize: "clamp(13px,1vw,15px)", color: "var(--text-2)", lineHeight: 1.65, marginBottom: "40px" }}>Reach out for internship opportunities, project collaborations, or just to say hello.</p>
        </FI>

        <FI delay={0.05}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))", gap: "10px", marginBottom: "40px" }}>
            {CONTACT_LINKS.map(({ icon, label, value, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "16px 18px", borderRadius: "var(--r-lg)", border: "1px solid var(--border)", background: "var(--bg-subtle)", transition: "border-color 0.15s, background 0.15s", textDecoration: "none" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)"; (e.currentTarget as HTMLElement).style.background = "var(--surface)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)"; }}>
                <div style={{ color: "var(--text-3)" }}>{icon}</div>
                <div>
                  <p style={{ fontSize: "11px", color: "var(--text-3)", marginBottom: "2px", fontWeight: 500 }}>{label}</p>
                  <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-1)", letterSpacing: "-0.01em" }}>{value}</p>
                </div>
              </a>
            ))}
          </div>
        </FI>

        <Rule />
        <div style={{ marginBottom: "28px" }} />

        <FI delay={0.08}>
          <h2 style={{ fontSize: "17px", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "18px" }}>Send a message</h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)", display: "block", marginBottom: "6px" }}>Name</label>
                <input placeholder="John Smith" value={form.name} onChange={setName} required style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.background = "var(--surface)"; }}
                  onBlur={e                  => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--bg-subtle)"; }} />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)", display: "block", marginBottom: "6px" }}>Email</label>
                <input type="email" placeholder="john@company.com" value={form.email} onChange={setEmail} required style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.background = "var(--surface)"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--bg-subtle)"; }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)", display: "block", marginBottom: "6px" }}>Message</label>
              <textarea placeholder="Tell me about the project or opportunity..." value={form.message} onChange={setMessage} rows={6} required style={{ ...inputStyle, resize: "vertical" }}
                onFocus={e => { e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.background = "var(--surface)"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--bg-subtle)"; }} />
            </div>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="ok"
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", borderRadius: "var(--r)", border: "1px solid #86efac", background: "#f0fdf4", color: "#15803d", fontSize: "13.5px", fontWeight: 500 }}>
                  <Icon.Check /> Message sent — I'll reply within 24 hours.
                </motion.div>
              ) : (
                <motion.button key="btn" type="submit" whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.995 }}
                  style={{ padding: "11px 20px", borderRadius: "var(--r)", background: "var(--text-1)", color: "#fff", border: "none", fontSize: "14px", fontWeight: 600, cursor: "pointer", letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: "6px", width: "fit-content", willChange: "transform" }}>
                  Send message <Icon.Arrow />
                </motion.button>
              )}
            </AnimatePresence>
          </form>
        </FI>
      </div>
    </main>
  );
});

// ─────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────
const FOOTER_LINKS = [
  { to: "/about",    label: "About"    },
  { to: "/projects", label: "Projects" },
  { to: "/blog",     label: "Blog"     },
  { to: "/contact",  label: "Contact"  },
];

const Footer = memo(() => {
  const socials = useMemo(() => [
    { href: ME.github,            icon: <Icon.GitHub />,   label: "GitHub"    },
    { href: ME.linkedin,          icon: <Icon.LinkedIn />, label: "LinkedIn"  },
    { href: ME.twitter,           icon: <Icon.Twitter />,  label: "Twitter/X" },
    { href: `mailto:${ME.email}`, icon: <Icon.Mail />,     label: "Email"     },
  ], []);

  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "48px 0 28px" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))", gap: "36px", marginBottom: "36px" }}>

          {/* Brand */}
          <div>
            <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none", marginBottom: "12px" }}>
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="8" fill="var(--text-1)"/>
                <path d="M8 20L14 8L20 20" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 16h8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <span style={{ fontFamily: "'Cal Sans','Inter',sans-serif", fontWeight: 600, fontSize: "14px", letterSpacing: "-0.02em", color: "var(--text-1)" }}>pratap.dev</span>
            </Link>
            <p style={{ fontSize: "13px", color: "var(--text-3)", lineHeight: 1.65 }}>
              Full-stack engineer and AI builder from Delhi.
            </p>
          </div>

          {/* Pages */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px" }}>Pages</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {FOOTER_LINKS.map(({ to, label }) => (
                <Link key={to} to={to}
                  style={{ fontSize: "13.5px", color: "var(--text-2)", textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-1)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-2)")}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px" }}>Connect</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {socials.map(({ href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  style={{ fontSize: "13.5px", color: "var(--text-2)", textDecoration: "none", transition: "color 0.15s", display: "flex", alignItems: "center", gap: "4px" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-1)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-2)")}>
                  {label} <Icon.ArrowUpRight />
                </a>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px" }}>Status</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 2 }}
                  style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#16a34a", willChange: "transform", flexShrink: 0 }} />
                <span style={{ fontSize: "12.5px", color: "var(--text-2)" }}>Available for work</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7c3aed", flexShrink: 0 }} />
                <span style={{ fontSize: "12.5px", color: "var(--text-2)" }}>@ Tars Technologies</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#b45309", flexShrink: 0 }} />
                <span style={{ fontSize: "12.5px", color: "var(--text-2)" }}>Deloitte incoming</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: "1px", background: "var(--border)", marginBottom: "20px" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontSize: "12px", color: "var(--text-3)", fontFamily: "'SF Mono','Fira Code',monospace" }}>
            © {new Date().getFullYear()} Pratap. Built with React + Three.js.
          </p>
          <div style={{ display: "flex", gap: "4px" }}>
            {socials.slice(0, 3).map(({ href, icon }) => (
              <a key={href} href={href} target="_blank" rel="noreferrer"
                style={{ width: "30px", height: "30px", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-3)", transition: "color 0.15s, background 0.15s", textDecoration: "none" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-1)"; (e.currentTarget as HTMLElement).style.background = "var(--bg-muted)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
});

// ─────────────────────────────────────────────────────────
// PAGE TRANSITION
// ─────────────────────────────────────────────────────────
const PageTransition = memo(({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
});

// ─────────────────────────────────────────────────────────
// LAYOUT
// ─────────────────────────────────────────────────────────
const Layout = memo(() => {
  useLenis();
  return (
    <>
      <GrainOverlay />
      <AIStatusBar />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/"         element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/about"    element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
          <Route path="/blog"     element={<PageTransition><BlogPage /></PageTransition>} />
          <Route path="/contact"  element={<PageTransition><ContactPage /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
});

// ─────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}