import styles from "./Pagination.module.css";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { motion } from "framer-motion";

function Pagination({ onArrow, onPage, currentPage, count }) {
  const [totalPage, setTotalPage] = useState(0);

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

  useEffect(() => {
    if (!isNaN(count) && count > 0)
      try {
        const totalPage = Math.ceil(count / 8);
        setTotalPage(totalPage);
      } catch (error) {
        console.error("Error generating pages:", error);
      }
  }, [count]);

  /** 현재페이지에 active 클래스 추가 */
  const handlePaginationNumber = (number) => {
    return classNames(styles.paginationButton, {
      [styles.active]: currentPage === number,
    });
  };

  const PaginationButton = (number) => {
    return (
      <li key={number}>
        <motion.button
          className={handlePaginationNumber(number)}
          onClick={() => onPage(number)}
          initial={{ y: 0 }}
          animate={
            currentPage === number
              ? {
                  y: ["-100%", 0, 0],
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
    <section className={styles.paginationWrapper}>
      <button
        className={styles.paginationArrow}
        onClick={() => onArrow("previous")}
        disabled={currentPage <= 1}
      >
        &lt;
      </button>
      <ol className={styles.paginationNumbers}>
        {PaginationButton(1)}
        {currentPage > 3 && <li className={styles.paginationButton}>...</li>}
        {numbers.map((number) => PaginationButton(number))}
        {currentPage < totalPage - 3 && (
          <li className={styles.paginationButton}>...</li>
        )}
        {PaginationButton(totalPage)}
      </ol>
      <button
        className={styles.paginationArrow}
        onClick={() => onArrow("next")}
        disabled={currentPage >= totalPage}
      >
        &gt;
      </button>
    </section>
  );
}

export default Pagination;
