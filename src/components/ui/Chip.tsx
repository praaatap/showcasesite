import { memo } from "react";

export const Chip = memo(({ children }: { children: React.ReactNode }) => (
  <span style={{ padding: "3px 9px", borderRadius: "6px", fontSize: "11.5px", fontWeight: 500, color: "var(--text-2)", background: "var(--bg-muted)", border: "1px solid var(--border)" }}>
    {children}
  </span>
));