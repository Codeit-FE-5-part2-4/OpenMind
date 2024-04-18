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
