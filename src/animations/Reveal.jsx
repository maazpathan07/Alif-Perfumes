import { motion } from "framer-motion";

function Reveal({
  children,
  delay = 0,
  direction = "up",
  distance = 40,
  duration = 0.6,
}) {
  const variants = {
    up: {
      x: 0,
      y: distance,
    },

    down: {
      x: 0,
      y: -distance,
    },

    left: {
      x: distance,
      y: 0,
    },

    right: {
      x: -distance,
      y: 0,
    },

    scale: {
      x: 0,
      y: 0,
      scale: 0.92,
    },
  };

  const initial =
    variants[direction] || variants.up;

  return (
    <motion.div
      style={{
        willChange: "transform, opacity",
      }}
      initial={{
        opacity: 0,
        ...initial,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;