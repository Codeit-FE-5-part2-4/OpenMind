import { useSearchParams } from "react-router-dom";
import styles from "./Pagination.module.css";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { motion } from "framer-motion";

function Pagination({ onArrow, onPage, currentPage, count }) {
  const [isClicking, setIsClicking] = useState(false);
  const [totalPage, setTotalPage] = useState();
  const [numbers, setNumbers] = useState([]);
  const [searchParams] = useSearchParams();

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

  useEffect(() => {
    try {
      const totalPage = Math.ceil(count / 8);
      const numbers = Array.from({ length: last - start }, (_, i) => start + i);
      setTotalPage(totalPage);
      setNumbers(numbers);
    } catch (error) {
      console.error("Error generating pages:", error);
    }
  }, [start, last, count, searchParams]);

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
  const handleArrowClick = (arrowDirection) => {
    if (!isClicking) {
      setIsClicking(true);
      onArrow(arrowDirection);
      setTimeout(() => {
        setIsClicking(false);
      }, 300);
    }
  };
  return (
    <section className={styles.paginationWrapper}>
      <button
        className={styles.paginationArrow}
        onClick={() => handleArrowClick("previous")}
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
        onClick={() => handleArrowClick("next")}
        disabled={currentPage >= totalPage}
      >
        &gt;
      </button>
    </section>
  );
}

export default Pagination;
