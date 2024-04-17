import { type } from "@testing-library/user-event/dist/type";
import styles from "./Pagination.module.css";
import classNames from "classnames";

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

  /** 시작페이지, 마지막페이지 제외하고 렌더링 */
  const pageNumbers = Array.from({ length: last - start }, (_, i) => start + i);

  /** 현재페이지에 active 클래스 추가 */
  const handlePaginationNumber = (number) => {
    return classNames(styles.paginationButton, {
      [styles.active]: currentPageNumber === number,
    });
  };

  /** 페이지번호 렌더링 */
  const pageRenderingNumber = (number) => {
    return (
      <li key={number}>
        <button
          className={handlePaginationNumber(number)}
          onClick={() => {
            onNumber(number);
          }}
        >
          {number}
        </button>
      </li>
    );
  };

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
        {/* 1페이지 */}
        {pageRenderingNumber(1)}
        {currentPageNumber > 3 && (
          <li className={styles.paginationButton}>...</li>
        )}
        {pageNumbers.map((number) => pageRenderingNumber(number))}
        {currentPageNumber < totalPages - 3 && (
          <li className={styles.paginationButton}>...</li>
        )}
        {/* 마지막페이지 */}
        {pageRenderingNumber(totalPages)}
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
