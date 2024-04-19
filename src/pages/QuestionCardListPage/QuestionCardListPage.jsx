import QuestionCardList from "../../components/QuestionCardList/QuestionCardList";
import ListHeader from "../../components/ListHeader/ListHeader";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./QuestionCardListPage.module.css";
import { useCallback, useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const displaySubjects = useCallback(async (params) => {
    const { limit, offset, sort, page } = params;

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
  }, []);

  useEffect(() => {
    if (!searchParams.has("sort") || searchParams.get("sort") === "") {
      searchParams.set("sort", INITIALQUERY.sort);
      setSearchParams(searchParams, { replace: true });
    }

    if (!searchParams.has("page")) {
      searchParams.set("page", INITIALQUERY.page);
    }

    const limit = INITIALQUERY.limit;
    const offset = searchParams.get("offset") || INITIALQUERY.offset;
    const sort = searchParams.get("sort");
    const page = searchParams.get("page") || INITIALQUERY.page;

    displaySubjects({ limit, offset, sort, page });
  }, [searchParams, setSearchParams, displaySubjects]);

  const handleSortChange = (newSort) => {
    searchParams.set("sort", newSort);
    setSearchParams(searchParams);
  };

  function getOffsetByStringUrl(urlString) {
    if (!urlString) return null;
    const newUrl = new URL(urlString);
    const params = new URLSearchParams(newUrl.search);
    const offset = params.get("offset");
    return offset;
  }

  const handlePageChangeByArrow = (direction) => {
    const { next, previous } = datas;
    const nextOffset = getOffsetByStringUrl(next);
    const prevOffset = getOffsetByStringUrl(previous);
    const currentPage = Number(searchParams.get("page"));

    if (direction === "next") {
      searchParams.set("offset", nextOffset);
      searchParams.set("page", currentPage + 1);
    } else {
      searchParams.set("offset", prevOffset || 0);
      searchParams.set("page", currentPage - 1);
    }

    setSearchParams(searchParams);
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
