import { memo, useCallback } from "react";

export const GhostBtn = memo(({ children, href, onClick, style = {} }: {
  children: React.ReactNode; href?: string; onClick?: () => void; style?: React.CSSProperties;
}) => {
  const s: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "var(--r)", border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-1)", fontSize: "13px", fontWeight: 500, cursor: "pointer", transition: "border-color 0.15s", textDecoration: "none", ...style };
  const onEnter = useCallback((e: any) => (e.currentTarget.style.borderColor = "var(--border-strong)"), []);
  const onLeave = useCallback((e: any) => (e.currentTarget.style.borderColor = "var(--border)"), []);
  if (href) return <a href={href} target="_blank" rel="noreferrer" style={s} onMouseEnter={onEnter} onMouseLeave={onLeave}>{children}</a>;
  return <button onClick={onClick} style={{ ...s, border: "1px solid var(--border)", outline: "none" }} onMouseEnter={onEnter} onMouseLeave={onLeave}>{children}</button>;
});