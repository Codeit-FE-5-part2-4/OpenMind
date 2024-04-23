import { motion } from "framer-motion";

export default function HoverAnimationDiv({ children }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      onHoverStart={(e) => {}}
      onHoverEnd={(e) => {}}
    >
      {children}
    </motion.div>
  );
}
