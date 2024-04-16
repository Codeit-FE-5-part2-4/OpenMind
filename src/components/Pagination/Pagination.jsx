import styles from "./Pagination.module.css";

// 번호를 눌렀을 때 엑티브 클래스 추가하는 로직 추후에 구현

function Pagination({
  onNext,
  onPrev,
  totalPages,
  currentPageNumber,
  onNumber,
}) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <section className={styles.paginationWrapper}>
      <button className={styles.paginationArrow} onClick={onPrev}>
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
      <button className={styles.paginationArrow} onClick={onNext}>
        &gt;
      </button>
    </section>
  );
}

export default Pagination;
