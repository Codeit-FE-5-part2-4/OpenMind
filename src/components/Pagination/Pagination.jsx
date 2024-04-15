import styles from "./Pagination.module.css";

function Pagination({ onNext, onPrev, totalPage }) {
  return (
    <section className={styles.paginationWrapper}>
      <button className={styles.paginationArrow} onClick={onPrev}>
        &lt;
      </button>
      <ol className={styles.paginationNumbers}>
        {Array.from({ length: totalPage }, (_, index) => index + 1).map(
          (pageNumber) => (
            <li key={pageNumber}>
              <button className={styles.paginationButton}>{pageNumber}</button>
            </li>
          )
        )}
      </ol>
      <button className={styles.paginationArrow} onClick={onNext}>
        &gt;
      </button>
    </section>
  );
}

export default Pagination;
