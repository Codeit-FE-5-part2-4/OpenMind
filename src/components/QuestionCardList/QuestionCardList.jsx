import { useLocation } from "react-router-dom";
import QuestionCard from "../QuestionCard/QuestionCard";
import styles from "./QuestionCardList.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

function QuestionCardList({ feeds, currentPage }) {
  const [direction, setDirection] = useState(0);
  const location = useLocation();
  const [prevPage, setPrevPage] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const currentPage = parseInt(searchParams.get("page") || "1", 10);

    console.log(currentPage);

    if (prevPage !== null && currentPage !== prevPage) {
      setDirection(currentPage > prevPage ? 1 : -1);
    } else {
      setDirection(0);
    }
    setPrevPage(currentPage);
  }, [location, prevPage]);

  const pageTransitionVariants = {
    initial: { opacity: 0, x: 300 * direction },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -300 * direction },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={styles.questionCard_wrapper}
        key={currentPage}
        variants={pageTransitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        <ul className={styles.listContainer}>
          {feeds?.map((feed, id) => (
            <li key={id}>
              <QuestionCard feed={feed} />
            </li>
          ))}
        </ul>
      </motion.div>
    </AnimatePresence>
  );
}

export default QuestionCardList;
