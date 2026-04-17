import { memo, useRef, useState, useCallback } from "react";

export const SpotlightCard = memo(({
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