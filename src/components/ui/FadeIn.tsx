import { memo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const FadeIn = memo(({ children, delay = 0, y = 22, x = 0 }: {
  children: React.ReactNode; delay?: number; y?: number; x?: number;
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
});