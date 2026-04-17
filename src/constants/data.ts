export const ME = {
  name: "Pratap",
  role: "Full Stack Engineer",
  location: "Delhi, India",
  bio: "I build AI-powered products and full-stack systems end to end.",
  github:   "https://github.com/pratap",
  linkedin: "https://linkedin.com/in/pratap",
  twitter:  "https://twitter.com/pratap",
  email:    "pratap@email.com",
};

export const TECH_STACK = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "FastAPI",
  "LangChain", "CrewAI", "MongoDB", "PostgreSQL", "Docker", "Flutter",
  "Redis", "GraphQL", "Tailwind CSS", "Framer Motion",
];

export const PROJECTS = [
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

export const SKILLS = [
  { name: "React / Next.js",      pct: 95, cat: "Frontend"  },
  { name: "TypeScript",           pct: 91, cat: "Frontend"  },
  { name: "Node.js / Express",    pct: 92, cat: "Backend"   },
  { name: "Python / FastAPI",     pct: 86, cat: "Backend"   },
  { name: "LangChain / CrewAI",   pct: 88, cat: "AI/ML"     },
  { name: "MongoDB / PostgreSQL", pct: 87, cat: "Database"  },
  { name: "Docker / DevOps",      pct: 79, cat: "DevOps"    },
  { name: "Flutter",              pct: 81, cat: "Mobile"    },
];

export const EXPERIENCE = [
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

export const POSTS = [
  { id: "crewai-rag",          title: "Building a Production RAG Pipeline with CrewAI",   excerpt: "A comprehensive walkthrough of combining Retrieval-Augmented Generation with multi-agent workflows — from chunking strategy to production deployment.", date: "April 10, 2026",    readTime: "8 min",  category: "AI Engineering" },
  { id: "mern-saas",           title: "Shipping a MERN SaaS Solo in 30 Days",              excerpt: "Everything I learned building and launching a SaaS product alone — architecture, auth, Stripe integration, and the mistakes I made.",                  date: "March 24, 2026",   readTime: "12 min", category: "Product"        },
  { id: "typescript-patterns", title: "TypeScript Patterns That Actually Matter",           excerpt: "Discriminated unions, branded types, template literal types, and other advanced patterns I use in every serious TypeScript project.",                   date: "March 8, 2026",    readTime: "6 min",  category: "TypeScript"     },
  { id: "flutter-arch",        title: "Clean Architecture in Large Flutter Applications",   excerpt: "How I structure complex Flutter projects using feature-first clean architecture, Riverpod state management, and proper dependency injection.",          date: "February 2, 2026", readTime: "9 min",  category: "Flutter"        },
  { id: "openai-tools",        title: "OpenAI Function Calling: A Practical Guide",         excerpt: "Everything you need to build reliable AI agents using OpenAI's function calling and tool use — with real code examples and production patterns.",        date: "January 15, 2026", readTime: "7 min",  category: "AI Engineering" },
];