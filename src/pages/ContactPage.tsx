import { memo, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ME } from "../constants/data";
import { Icon } from "../components/icons/Icons";
import { FadeIn } from "../components/ui/FadeIn";
import { Rule } from "../components/ui/Rule";
import { SolidBtn } from "../components/ui/SolidBtn";

export const ContactPage = memo(() => {
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
    width: "100%",
    padding: "10px 14px",
    borderRadius: "var(--r)",
    border: "1px solid var(--border)",
    fontSize: "14px",
    background: "var(--bg-subtle)",
    color: "var(--text-1)",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.15s, background 0.15s",
    letterSpacing: "-0.01em",
    boxSizing: "border-box" as const,
  }), []);

  const CONTACT_LINKS = useMemo(() => [
    { icon: <Icon.Mail />,     label: "Email",    value: ME.email,                 href: `mailto:${ME.email}` },
    { icon: <Icon.GitHub />,   label: "GitHub",   value: "github.com/pratap",      href: ME.github            },
    { icon: <Icon.LinkedIn />, label: "LinkedIn", value: "linkedin.com/in/pratap", href: ME.linkedin          },
  ], []);

  return (
    <main style={{ paddingTop: "108px", minHeight: "100vh", paddingBottom: "96px" }}>
      <div className="container-sm">

        {/* ── Header ── */}
        <FadeIn>
          <p style={{ fontSize: "11.5px", fontWeight: 600, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px" }}>
            Contact
          </p>
          <h1 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", letterSpacing: "-0.04em", marginBottom: "10px" }}>
            Get in touch.
          </h1>
          <p style={{ fontSize: "clamp(13px,1vw,15px)", color: "var(--text-2)", lineHeight: 1.65, marginBottom: "40px" }}>
            Reach out for internship opportunities, project collaborations, or just to say hello.
          </p>
        </FadeIn>

        {/* ── Contact link cards ── */}
        <FadeIn delay={0.05}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))", gap: "10px", marginBottom: "40px" }}>
            {CONTACT_LINKS.map(({ icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "16px 18px", borderRadius: "var(--r-lg)", border: "1px solid var(--border)", background: "var(--bg-subtle)", transition: "border-color 0.15s, background 0.15s", textDecoration: "none" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
                  (e.currentTarget as HTMLElement).style.background   = "var(--surface)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.background   = "var(--bg-subtle)";
                }}
              >
                <div style={{ color: "var(--text-3)" }}>{icon}</div>
                <div>
                  <p style={{ fontSize: "11px", color: "var(--text-3)", marginBottom: "2px", fontWeight: 500 }}>{label}</p>
                  <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-1)", letterSpacing: "-0.01em" }}>{value}</p>
                </div>
              </a>
            ))}
          </div>
        </FadeIn>

        <Rule />
        <div style={{ marginBottom: "28px" }} />

        {/* ── Contact Form ── */}
        <FadeIn delay={0.08}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

            {/* Name + Email row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "14px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)", display: "block", marginBottom: "6px" }}>
                  Name
                </label>
                <input
                  value={form.name}
                  onChange={setName}
                  placeholder="Your name"
                  required
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = "var(--text-1)")}
                  onBlur={e  => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)", display: "block", marginBottom: "6px" }}>
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={setEmail}
                  placeholder="your@email.com"
                  required
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = "var(--text-1)")}
                  onBlur={e  => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-2)", display: "block", marginBottom: "6px" }}>
                Message
              </label>
              <textarea
                value={form.message}
                onChange={setMessage}
                placeholder="Tell me what you're working on..."
                required
                rows={5}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: "120px",
                  lineHeight: 1.65,
                }}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--text-1)")}
                onBlur={e  => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>

            {/* Submit row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <SolidBtn onClick={() => {}}>
                Send message <Icon.Arrow />
              </SolidBtn>

              {/* Success toast */}
              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 14px",
                      borderRadius: "var(--r)",
                      background: "#dcfce7",
                      border: "1px solid #bbf7d0",
                      color: "#15803d",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    <Icon.Check /> Message sent — I'll reply soon!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </form>
        </FadeIn>

        {/* ── Availability note ── */}
        <FadeIn delay={0.14}>
          <div style={{ marginTop: "48px", padding: "18px 20px", borderRadius: "var(--r-lg)", border: "1px solid var(--border)", background: "var(--bg-subtle)", display: "flex", gap: "14px", alignItems: "flex-start" }}>
            <motion.div
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#16a34a", flexShrink: 0, marginTop: "4px", willChange: "transform" }}
            />
            <div>
              <p style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--text-1)", marginBottom: "3px" }}>
                Currently available
              </p>
              <p style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: 1.65 }}>
                Open to internship roles, freelance projects, and interesting collabs. I typically respond within 24 hours.
              </p>
            </div>
          </div>
        </FadeIn>

      </div>
    </main>
  );
});