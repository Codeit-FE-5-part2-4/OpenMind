import QuestionCardList from "../../components/QuestionCardList/QuestionCardList";
import ListHeader from "../../components/ListHeader/ListHeader";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./QuestionCardListPage.module.css";
import { useEffect, useState } from "react";
import { getSubjects } from "../../utils/listPageApi/getSubjects";
import { useSearchParams } from "react-router-dom";
import ListSortModal from "../../components/ListSortModal/ListSortModal";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const INITIALQUERY = {
  limit: 8,
  offset: 0,
  sort: "time",
  page: 1,
};

function QuestionCardListPage() {
  const [datas, setDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const displaySubjects = async (params) => {
    const { limit, offset, sort, page } = params;

    setIsLoading(true);

    try {
      const feedDatas = await getSubjects({ limit, offset, sort });

      setDatas(feedDatas);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!searchParams.has("sort") || searchParams.get("sort") === "") {
      searchParams.set("sort", INITIALQUERY.sort);
      setSearchParams(searchParams, { replace: true });
    }

    if (!searchParams.has("page") || searchParams.get("page") === "") {
      searchParams.set("page", INITIALQUERY.page);
      setSearchParams(searchParams);
    }

    const limit = INITIALQUERY.limit;
    const offset = searchParams.get("offset") || INITIALQUERY.offset;
    const sort = searchParams.get("sort");
    const page = searchParams.get("page") || INITIALQUERY.page;

    displaySubjects({ limit, offset, sort, page });
  }, [searchParams, setSearchParams]);

  const handleSortChange = (newSort) => {
    searchParams.set("sort", newSort);
    setSearchParams("sort", newSort);
  };

  function getOffsetByStringUrl(urlString) {
    if (!urlString) return null;
    const newUrl = new URL(urlString);
    const params = new URLSearchParams(newUrl.search);
    const offset = params.get("offset");
    return offset;
  }

  const handlePageChangeByArrow = (direction) => {
    if (isLoading) return;
    let newOffset = null;
    let newPageNumber = null;

    if (direction === "next" && datas.next) {
      newOffset = getOffsetByStringUrl(datas.next);
      newPageNumber = parseInt(currentPage) + 1;
    } else if (direction === "previous" && datas.previous) {
      newOffset = getOffsetByStringUrl(datas.previous);
      newPageNumber = parseInt(currentPage) - 1;
    }
    console.log(newOffset, newPageNumber, currentPage);

    if (newPageNumber === 1 && newOffset === null) {
      newOffset = 0;
    }

    if (newOffset !== null && newPageNumber !== null) {
      searchParams.set("offset", newOffset);
      searchParams.set("page", newPageNumber);
      setSearchParams(searchParams);
      setCurrentPage(newPageNumber);
    }
  };

  const handlePageChangeByPage = (page) => {
    const offset = (page - 1) * INITIALQUERY.limit;

    searchParams.set("page", page);
    searchParams.set("offset", offset);
    setSearchParams(searchParams);
  };

  return (
    <>
      {isError ? (
        <NotFoundPage />
      ) : (
        <div className={styles.pageContainer}>
          <section className={styles.contentContainer}>
            <ListHeader />
            <div className={styles.titleAndSortBox}>
              <h1 className={styles.title}>누구에게 질문할까요?</h1>
              <ListSortModal handleSort={handleSortChange} />
            </div>
            {isLoading ? (
              <div className={styles.LoadingBox}>Loading...</div>
            ) : (
              <div className={styles.listAndPaginationBox}>
                <QuestionCardList feeds={datas?.results} />
                <Pagination
                  count={datas?.count}
                  currentPage={currentPage}
                  onArrow={handlePageChangeByArrow}
                  onPage={handlePageChangeByPage}
                />
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}

export default QuestionCardListPage;
