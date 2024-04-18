import { useSearchParams } from "react-router-dom";
import styles from "./Pagination.module.css";
import { useEffect, useState } from "react";

function Pagination({ onArrow, onPage, currentPage, count }) {
  const [totalPage, setTotalPage] = useState();
  const [numbers, setNumbers] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    try {
      const totalPage = Math.ceil(count / 8);
      const numbers = Array.from({ length: totalPage }, (_, i) => i + 1);
      setTotalPage(totalPage);
      setNumbers(numbers);
    } catch (error) {
      console.error("Error generating pages:", error);
    }
  }, [count, searchParams]);
  
/* import classNames from "classnames";
import { motion } from "framer-motion";

// 번호를 눌렀을 때 엑티브 클래스 추가하는 로직 추후에 구현

function Pagination({ onArrow, totalPages, onNumber, currentPageNumber }) {
  const start = (() => {
    if (currentPageNumber <= 3) {
      //초기페이지 렌더링 조건
      return 2; //초기페이지 렌더링
    } else if (currentPageNumber < totalPages - 3) {
      //중간페이지 렌더링 조건
      return currentPageNumber - 1; //중간페이지 렌더링
    } else return totalPages - 4; //마지막페이지 렌더링
  })();

  const last = (() => {
    if (currentPageNumber <= 3) {
      //초기페이지 렌더링 조건
      return 6; //초기페이지 렌더링
    } else if (currentPageNumber < totalPages - 3) {
      //중간페이지 렌더링 조건
      return currentPageNumber + 2; //중간페이지 렌더링
    } else return totalPages; //마지막페이지 렌더링
  })();
  
  const pageNumbers = Array.from({ length: last - start }, (_, i) => start + i); // 시작페이지, 마지막페이지 제외하고 렌더링

  const handlePaginationNumber = (number) => {
    return classNames(styles.paginationButton, {
      [styles.active]: currentPageNumber === number,
    });
  }; // 현재페이지에 active 클래스 추가

  const pageRenderingNumber = (number) => {
    return (
      <li key={number}>
        <motion.button
          className={handlePaginationNumber(number)}
          onClick={() => {
            onNumber(number);
          }}
          initial={{ y: 0 }}
          animate={
            currentPageNumber === number
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
  }; //페이지번호 렌더링 */

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
        {numbers.map((number) => (
          <li key={number}>
            <button
              className={styles.paginationButton}
              onClick={() => onPage(number)}
            >
              {number}
            </button>
          </li>
        ))}
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
