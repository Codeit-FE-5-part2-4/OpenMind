import styles from "./QuestionCardList.module.css";
import { motion, AnimatePresence } from "framer-motion";
import QuestionCard from "../QuestionCard/QuestionCard";

function QuestionCardList({ feeds, currentPage, isBack }) {
  const direction = isBack ? -1 : 1;

  const pageTransitionVariants = {
    initial: {
      opacity: 0,
      x: 700 * direction,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: -700 * direction,
    },
  };

  return (
    <AnimatePresence mode="wait">
      <div className={styles.listContainer}>
        <motion.ul
          className={styles.list}
          key={currentPage}
          variants={pageTransitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          {feeds?.map((feed, id) => (
            <li key={id}>
              <QuestionCard feed={feed} />
            </li>
          ))}
        </motion.ul>
      </div>
    </AnimatePresence>
  );
}

export default QuestionCardList;
