import styles from "./PaginationNumberList.module.css";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";

function PaginationButton({ number, onPage, currentPage }) {
  return (
    <AnimatePresence mode="sync">
      <li key={number}>
        <motion.button
          className={classNames(styles.paginationButton, {
            [styles.active]: currentPage === number,
          })}
          onClick={() => {
            onPage(number);
          }}
          initial={{ y: 0 }}
          animate={
            currentPage === number
              ? {
                  y: [0, "-50%", 0],
                }
              : {}
          }
          exit={{ opacity: 0 }}
        >
          {number}
        </motion.button>
      </li>
    </AnimatePresence>
  );
}
function PaginationNumberList({ onPage, currentPage, totalPage }) {
  const start = (() => {
    if (currentPage <= 3) {
      //초기페이지 렌더링 조건
      return 2; //초기페이지 렌더링
    } else if (currentPage < totalPage - 3) {
      //중간페이지 렌더링 조건
      return currentPage - 1; //중간페이지 렌더링
    } else return totalPage - 4; //마지막페이지 렌더링
  })();

  const last = (() => {
    if (currentPage <= 3) {
      //초기페이지 렌더링 조건
      return 6; //초기페이지 렌더링
    } else if (currentPage < totalPage - 3) {
      //중간페이지 렌더링 조건
      return currentPage + 2; //중간페이지 렌더링
    } else return totalPage; //마지막페이지 렌더링
  })();

  const numbers = Array.from({ length: last - start }, (_, i) => start + i);

  return (
    <ol className={styles.paginationNumbers}>
      <PaginationButton number={1} onPage={onPage} currentPage={currentPage} />
      {currentPage > 3 && <li className={styles.paginationButton}>...</li>}
      {numbers?.map((number) => (
        <PaginationButton
          key={number}
          number={number}
          onPage={onPage}
          currentPage={currentPage}
        />
      ))}
      {currentPage < totalPage - 3 && (
        <li className={styles.paginationButton}>...</li>
      )}
      <PaginationButton
        number={totalPage}
        onPage={onPage}
        currentPage={currentPage}
      />
    </ol>
  );
}

export default PaginationNumberList;
