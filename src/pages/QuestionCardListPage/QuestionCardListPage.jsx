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
  const [sortedFeeds, setSortedFeeds] = useState([]);
  const [currentSortValue, setCurrentSortValue] = useState();
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState(null);
  const [totalPage, setTotalPage] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  
  /*const [limit, setLimit] = useState(() => (window.innerWidth <= 870 ? 6 : 8)); // 브라우저 너비를 감지하여 870px이하에서 6개
  const [width, setWidth] = useState(window.innerWidth); // 브라우저 너비 감지 useState
  const [currentOffset, setCurrentOffset] = useState(0); */
  /**윈도우 객체를 받아서 width에 저장하는 함수 */
//   const handleResize = () => {
//     setWidth(window.innerWidth);
//     if (window.innerWidth <= 870) {
//       setLimit(6);
//     } else setLimit(8);
//   };

//   useEffect(() => {
//     window.addEventListener("resize", handleResize);
//   }, [width]);

  const getQueryParams = (url) => {
    const urlObj = new URL(url);
    return {
      limit: urlObj.searchParams.get("limit"),
      offset: urlObj.searchParams.get("offset"),
    };
  }; // api요청으로 받은 다음 페이지와 이전 페이지의 스트링 타입 url에서 key를 받아주는 함수

  const handleSortList = (e) => {
    e.preventDefault();

    const currentSortValue = e.target.name;

    updateSearchParams("sort", currentSortValue);
  }; // 모달창의 버튼에 해당하는 값에 따라 sort값을 바꿔 정렬 렌더링의 트리거가 되주는 함수

  const handlePageChange = useCallback(
    async (url) => {
      if (!url) return;
      
      try {
        const { limit, offset } = getQueryParams(url);
        const newFeeds = await getSubjects({
          limit: parseInt(limit, 10),
          offset: parseInt(offset, 10),
          sort: currentSortValue,
        });

        setSortedFeeds(newFeeds.results);
        setNextPage(newFeeds.next);
        setPrevPage(newFeeds.previous);
        console.log(`Loaded page with limit: ${limit} and offset: ${offset}`);
      } catch (error) {
        console.error(error);
      }
    },
    [currentSortValue]
  ); // api요청으로 받은 다음 페이지와 이전 페이지의 url로 페이지네이션 컴포넌트로 동작을 전달하는 함수

  const updateSearchParams = useCallback(
    (key, value) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, value);

      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams]
  ); // 쿼리파라미터를 설정해주는 함수


  const displaySubjects = useCallback(async () => {
    const limit = searchParams.get("limit") || INITIALQUERY.limit;
    const offset = searchParams.get("offset") || INITIALQUERY.offset;
    const sort = searchParams.get("sort") || INITIALQUERY.sort;

    try {
      const currentFeeds = await getSubjects({
        limit,
        offset,
        sort,
      });
      const { results, next, previous, count } = currentFeeds;

      setSortedFeeds(results);
      setNextPage(next);
      setPrevPage(previous);
      setTotalPage(Math.ceil(count / 8));
      setCurrentSortValue(sort);
    } catch (error) {
      console.error(error);
    }
  }, [searchParams]); // api요청의 결과값을 렌더링해주는 함수

  useEffect(() => {
    displaySubjects();
  }, [displaySubjects, searchParams, updateSearchParams]);

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
            onNext={() => handlePageChange(nextPage)}
            onPrev={() => handlePageChange(prevPage)}
            totalPage={totalPage}
          />
          {/** 기본적으로 각 페이지당 8개 */}
        </div>
      </section>
    </div>
  );
}

export default QuestionCardListPage;
