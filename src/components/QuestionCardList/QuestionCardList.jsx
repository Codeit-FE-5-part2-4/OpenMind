import { useEffect, useState } from "react";
import QuestionCard from "../QuestionCard/QuestionCard";
import styles from "./QuestionCardList.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { getOffsetByStringUrl } from "../../pages/QuestionCardListPage/getOffsetByStringUrl";

function QuestionCardList({ feeds, currentPage }) {
  const [back, setBack] = useState(false);
  const [searchParams] = useSearchParams();

  const pageTransitionVariants = {
    initial: { opacity: 0, x: 500 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -500, transition: { duration: 0.5 } },
  };

  useEffect(() => {
    const currentOffset = getOffsetByStringUrl();

    console.log(currentOffset);
  }, [searchParams]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={styles.questionCard_wrapper}
        key={currentPage}
        variants={pageTransitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
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
