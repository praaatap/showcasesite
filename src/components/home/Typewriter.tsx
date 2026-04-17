import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";

const ROLES = ["Full Stack Engineer", "AI Builder", "LangChain Hacker", "Product Builder"];

export const Typewriter = memo(() => {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = ROLES[roleIdx];
    let timer: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < role.length) {
      timer = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 55);
    } else if (!deleting && displayed.length === role.length) {
      timer = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28);
    } else {
      setDeleting(false);
      setRoleIdx(i => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timer);
  }, [displayed, deleting, roleIdx]);

  return (
    <span style={{ color: "#7c3aed" }}>
      {displayed}
      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.9 }}
        style={{ display: "inline-block", width: "2px", height: "1em", background: "#7c3aed", marginLeft: "2px", verticalAlign: "middle", borderRadius: "1px", willChange: "opacity" }} />
    </span>
  );
});