import { motion } from "framer-motion";
import styles from "./QuestionFeedCard.module.css";

export default function AnimatedDiv({ children }) {
  return (
    <motion.div
      className={styles.questionCard}
      initial={{ opacity: 0, y: -20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.1 },
      }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
