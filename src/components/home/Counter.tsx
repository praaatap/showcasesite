import { memo, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const Counter = memo(({ to, suffix = "" }: { to: number; suffix?: string }) => {
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