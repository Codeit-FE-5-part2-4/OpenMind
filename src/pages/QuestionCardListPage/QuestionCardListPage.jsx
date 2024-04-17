import QuestionCardList from "../../components/QuestionCardList/QuestionCardList";
import ListHeader from "../../components/ListHeader/ListHeader";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./QuestionCardListPage.module.css";
import { useCallback, useEffect, useState } from "react";
import { getSubjects } from "../../utils/listPageApi/getSubjects";
import { useSearchParams } from "react-router-dom";
import ListSortModal from "../../components/ListSortModal/ListSortModal";

const INITIALQUERY = {
  limit: 8,
  offset: 0,
  sort: "time",
};

function QuestionCardListPage() {
  const [currentNearPage, setCurrentNearPage] = useState({});
  const [currentSortValue, setCurrentSortValue] = useState();
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortedFeeds, setSortedFeeds] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams(INITIALQUERY);

  const updateSearchParams = useCallback(
    (params) => {
      const newSearchParams = new URLSearchParams(searchParams);

      Object.keys(params).forEach((key) => {
        newSearchParams.set(key, params[key]);
      });

      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams]
  ); // 현재 파라미터의 객체를 받아 쿼리파라미터를 설정해주는 함수

  const getOffsetByParams = (url) => {
    if (!url) return;

    const urlObj = new URL(url);
    return urlObj.searchParams.get("offset");
  }; // api요청으로 받은 다음 페이지와 이전 페이지의 스트링 타입 url에서 key를 받아주는 함수

  const displaySubjects = useCallback(
    async ({ offset, sort, pageNumber }) => {
      try {
        const currentPage = await getSubjects({
          limit: INITIALQUERY.limit,
          offset,
          sort,
        });
        const { results, count, next, previous } = currentPage;

        setCurrentNearPage({ next, previous });
        setSortedFeeds(results);
        setTotalPages(Math.ceil(count / 8));
        setCurrentSortValue(sort);
        setCurrentPageNumber(pageNumber);
        updateSearchParams({ limit: INITIALQUERY.limit, offset, sort });
      } catch (error) {
        console.error(error);
      }
    },
    [updateSearchParams]
  ); // api요청의 결과값을 렌더링해주는 함수

  const handleSortList = useCallback(
    (e) => {
      const currentSortValue = e.target.name;
      displaySubjects({ offset: INITIALQUERY.offset, sort: currentSortValue });
      console.log(
        `Page changed to sort with offset: ${INITIALQUERY.offset} sort: ${currentSortValue}`
      );
    },
    [displaySubjects]
  ); // 정렬방식으로 페이지 변경

  const handlePageChangeByNumber = useCallback(
    (pageNumber) => {
      const newOffset = (pageNumber - 1) * INITIALQUERY.limit;
      setCurrentPageNumber(pageNumber);
      displaySubjects({
        offset: newOffset,
        sort: currentSortValue,
        pageNumber,
      });
      console.log(`Page changed to: ${pageNumber} with offset: ${newOffset}`);
    },
    [displaySubjects, currentSortValue]
  ); // 번호로 페이지 이동

  const handlePageChangeByArrow = useCallback(
    (e) => {
      const direction = e.target.name;

      const { next, previous } = currentNearPage;
      const url = direction === "next" ? next : previous;
      console.log(url);
      if (url === null) return;

      const newOffset = getOffsetByParams(url) || 0;
      console.log(newOffset);

      if (url !== null) {
        const pageNumber = Math.floor(newOffset / INITIALQUERY.limit) + 1;
        displaySubjects({
          offset: newOffset,
          sort: currentSortValue,
          pageNumber,
        });
      }
      console.log(
        `Page changed to arrow: ${direction} with offset: ${newOffset}`
      );
    },
    [currentSortValue, currentNearPage, displaySubjects]
  ); // 화살표로 페이지 이동

  useEffect(() => {
    const offset = searchParams.get("offset") || INITIALQUERY.offset;
    const sort = searchParams.get("sort") || INITIALQUERY.sort;
    const limit = INITIALQUERY.limit;
    const pageNumber = Math.floor(offset / limit) + 1;

    displaySubjects({ offset, sort, pageNumber });
  }, [displaySubjects, searchParams]);

  return (
    <div className={styles.pageContainer}>
      <section className={styles.contentContainer}>
        <ListHeader />
        <div className={styles.titleAndSortBox}>
          <h1 className={styles.title}>누구에게 질문할까요?</h1>
          <ListSortModal
            onClickSort={handleSortList}
            currentSortValue={currentSortValue}
          />
        </div>
        <div className={styles.listAndPaginationBox}>
          <QuestionCardList sortedFeeds={sortedFeeds} />
          <Pagination
            onArrow={handlePageChangeByArrow}
            onNumber={handlePageChangeByNumber}
            currentPageNumber={currentPageNumber}
            totalPages={totalPages}
          />
        </div>
      </section>
    </div>
  );
}

export default QuestionCardListPage;
