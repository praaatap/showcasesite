import { memo } from "react";

export const Tag = memo(({ children, accent = "#52525b" }: { children: React.ReactNode; accent?: string }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "3px 10px", borderRadius: "6px", fontSize: "11.5px", fontWeight: 500, color: accent, background: accent + "12", border: `1px solid ${accent}22` }}>
    {children}
  </span>
));