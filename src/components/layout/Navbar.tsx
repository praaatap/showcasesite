import { memo, useState, useEffect, useCallback, useMemo } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ME } from "../../constants/data";
import { Icon } from "../icons/Icons";
import { SolidBtn } from "../ui/SolidBtn";

const NAV_LINKS = [
  { to: "/",         label: "Home"     },
  { to: "/about",    label: "About"    },
  { to: "/projects", label: "Projects" },
  { to: "/blog",     label: "Blog"     },
  { to: "/contact",  label: "Contact"  },
];

export const Navbar = memo(() => {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

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
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "9px", textDecoration: "none" }}>
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="8" fill="#18181b"/>
            <path d="M8 20L14 8L20 20" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 16h8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <span style={{ fontFamily: "'Cal Sans','Inter',sans-serif", fontWeight: 600, fontSize: "15px", letterSpacing: "-0.02em", color: "var(--text-1)" }}>pratap.dev</span>
        </Link>

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

        <button onClick={toggleMobile} className="show-mobile-flex"
          style={{ width: "36px", height: "36px", borderRadius: "9px", border: "1px solid var(--border)", background: "transparent", cursor: "pointer", alignItems: "center", justifyContent: "center", color: "var(--text-1)" }}>
          {mobileOpen ? <Icon.X /> : <Icon.Menu />}
        </button>
      </div>

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