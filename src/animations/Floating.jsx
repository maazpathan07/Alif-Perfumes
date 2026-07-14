import { motion } from "framer-motion";

function Floating({
  children,
  duration = 4,
  distance = 12,
}) {
  return (
    <motion.div
      style={{
        willChange: "transform",
      }}
      animate={{
        y: [0, -distance, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: [0.42, 0, 0.58, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default Floating;