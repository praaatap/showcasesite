import { memo, useCallback } from "react";
import { Link } from "react-router-dom";

export const SolidBtn = memo(({ children, href, to, onClick, style = {} }: {
  children: React.ReactNode; href?: string; to?: string; onClick?: () => void; style?: React.CSSProperties;
}) => {
  const s: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 18px", borderRadius: "var(--r)", background: "var(--text-1)", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "opacity 0.15s", letterSpacing: "-0.01em", textDecoration: "none", ...style };
  const onEnter = useCallback((e: any) => { e.currentTarget.style.opacity = "0.82"; }, []);
  const onLeave = useCallback((e: any) => { e.currentTarget.style.opacity = "1"; }, []);
  if (to) return <Link to={to} style={s} onMouseEnter={onEnter} onMouseLeave={onLeave}>{children}</Link>;
  if (href) return <a href={href} target="_blank" rel="noreferrer" style={s} onMouseEnter={onEnter} onMouseLeave={onLeave}>{children}</a>;
  return <button onClick={onClick} style={{ ...s, border: "none", outline: "none" }} onMouseEnter={onEnter} onMouseLeave={onLeave}>{children}</button>;
});