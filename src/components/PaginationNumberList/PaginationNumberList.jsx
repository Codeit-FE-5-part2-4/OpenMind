import styles from "./PaginationNumberList.module.css";
import classNames from "classnames";
import { motion } from "framer-motion";

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

  const PaginationButton = (number) => {
    return (
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
        >
          {number}
        </motion.button>
      </li>
    );
  };

  return (
    <ol className={styles.paginationNumbers}>
      {PaginationButton(1)}
      {currentPage > 3 && <li className={styles.paginationButton}>...</li>}
      {numbers.map((number) => PaginationButton(number))}
      {currentPage < totalPage - 3 && (
        <li className={styles.paginationButton}>...</li>
      )}
      {PaginationButton(totalPage)}
    </ol>
  );
}

export default PaginationNumberList;
