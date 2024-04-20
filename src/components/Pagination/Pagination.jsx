import styles from "./Pagination.module.css";
import { useEffect, useState } from "react";
import PaginationNumberList from "../PaginationNumberList/PaginationNumberList";

function Pagination({ onArrow, onPage, currentPage, count }) {
  const [totalPage, setTotalPage] = useState();

  const numbers = Array.from({ length: last - start }, (_, i) => start + i);

  useEffect(() => {
    try {
      const totalPage = Math.ceil(count / 8);
      setTotalPage(totalPage);
    } catch (error) {
      console.error("Error generating pages:", error);
    }
  }, [count]);

  return (
    <section className={styles.paginationWrapper}>
      <button
        className={styles.paginationArrow}
        onClick={() => onArrow("previous")}
        disabled={currentPage <= 1}
      >
        &lt;
      </button>
      <PaginationNumberList
        onPage={onPage}
        currentPage={currentPage}
        totalPage={totalPage}
      />
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
