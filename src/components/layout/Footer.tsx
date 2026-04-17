import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ME } from "../../constants/data";
import { Icon } from "../icons/Icons";

const FOOTER_LINKS = [
  { to: "/about",    label: "About"    },
  { to: "/projects", label: "Projects" },
  { to: "/blog",     label: "Blog"     },
  { to: "/contact",  label: "Contact"  },
];

export const Footer = memo(() => {
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