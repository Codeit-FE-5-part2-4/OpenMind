import styles from "./Pagination.module.css";

// 번호를 눌렀을 때 엑티브 클래스 추가하는 로직 추후에 구현

function Pagination({ onArrow, totalPages, onNumber }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <section className={styles.paginationWrapper}>
      <button
        name="previous"
        className={styles.paginationArrow}
        onClick={(e) => onArrow(e)}
      >
        &lt;
      </button>
      <ol className={styles.paginationNumbers}>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={`${styles.paginationButton} ${styles.active}`}
              onClick={() => onNumber(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ol>
      <button
        name="next"
        className={styles.paginationArrow}
        onClick={(e) => onArrow(e)}
      >
        &gt;
      </button>
    </section>
  );
}

export default Pagination;
