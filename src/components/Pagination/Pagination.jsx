import styles from "./Pagination.module.css";

function Pagination() {
  return (
    <ol className={styles.paginationWrapper}>
      <li>
        <button className={styles.paginationArrow}>&lt;</button>
      </li>
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
      <li>
        <button className={styles.paginationArrow}>&gt;</button>
      </li>
    </ol>
  );
}

export default Pagination;
