import { motion } from "framer-motion";

function Hover({
  children,
  y = -6,
  scale = 1.02,
  duration = 0.25,
}) {
  return (
    <motion.div
      style={{
        willChange: "transform",
      }}
      whileHover={{
        y,
        scale,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default Hover;