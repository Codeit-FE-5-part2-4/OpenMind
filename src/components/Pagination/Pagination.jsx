import styles from "./Pagination.module.css";

function Pagination() {
  return (
    <section className={styles.paginationWrapper}>
      <button className={styles.paginationArrow}>&lt;</button>
      <ol className={styles.paginationNumbers}>
        <li>
          <button className={styles.paginationButton}>1</button>
        </li>
        <li>
          <button className={styles.paginationButton}>2</button>
        </li>
        <li>
          <button className={styles.paginationButton}>3</button>
        </li>
        <li>
          <button className={styles.paginationButton}>4</button>
        </li>
        <li>
          <button className={styles.paginationButton}>5</button>
        </li>
      </ol>
      <button className={styles.paginationArrow}>&gt;</button>
    </section>
  );
}

export default Pagination;
