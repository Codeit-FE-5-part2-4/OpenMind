import { type } from "@testing-library/user-event/dist/type";
import styles from "./Pagination.module.css";
import { useState } from "react";

// 번호를 눌렀을 때 엑티브 클래스 추가하는 로직 추후에 구현

function Pagination({
  onNext,
  onPrev,
  totalPages,
  currentPageNumber,
  onNumber,
}) {
  const start =
    currentPageNumber <= 3 //초기페이지 렌더링 조건
      ? Math.max(2, currentPageNumber - 4)
      : currentPageNumber < totalPages - 3 //마지막페이지 렌더링 조건
      ? Math.max(2, currentPageNumber - 1)
      : totalPages - 4; //중간페이지 렌더링

  const last =
    currentPageNumber <= 3 //초기페이지 렌더링 조건
      ? Math.min(totalPages, currentPageNumber + (6 - currentPageNumber))
      : currentPageNumber < totalPages - 3 //마지막페이지 렌더링 조건
      ? Math.min(totalPages, currentPageNumber + 2)
      : Math.min(totalPages, currentPageNumber + 3); //중간페이지 렌더링

  const pageNumbers = Array.from({ length: last - start }, (_, i) => start + i);

  return (
    <section className={styles.paginationWrapper}>
      <button
        className={styles.paginationArrow}
        onClick={() => {
          onPrev();
        }}
      >
        &lt;
      </button>
      <ol className={styles.paginationNumbers}>
        <li key={1}>
          <button
            className={
              currentPageNumber === 1
                ? styles.paginationButton__active
                : styles.paginationButton
            }
            onClick={() => onNumber(1)}
          >
            1
          </button>
        </li>
        {currentPageNumber > 3 && (
          <li className={styles.paginationButton}>...</li>
        )}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={
                currentPageNumber === number
                  ? styles.paginationButton__active
                  : styles.paginationButton
              }
              onClick={() => onNumber(number)}
            >
              {number}
            </button>
          </li>
        ))}
        {currentPageNumber < totalPages - 3 && (
          <li className={styles.paginationButton}>...</li>
        )}
        <li key={totalPages}>
          <button
            className={
              currentPageNumber === totalPages
                ? styles.paginationButton__active
                : styles.paginationButton
            }
            onClick={() => onNumber(totalPages)}
          >
            {totalPages}
          </button>
        </li>
      </ol>
      <button
        className={styles.paginationArrow}
        onClick={() => {
          onNext();
        }}
      >
        &gt;
      </button>
    </section>
  );
}

export default Pagination;
