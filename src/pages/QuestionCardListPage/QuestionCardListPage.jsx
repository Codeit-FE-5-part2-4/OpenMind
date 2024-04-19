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
  page: 1,
};

function QuestionCardListPage() {
  const [datas, setDatas] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isClick, setIsClick] = useState(false);
  const displaySubjects = useCallback(async (params) => {
    const { limit, offset, sort, page } = params;

    try {
      const feedDatas = await getSubjects({ limit, offset, sort });

      setDatas(feedDatas);
      setCurrentPage(parseInt(page)); //params의 page속성은 string이므로 숫자로 변환
    } catch (error) {
      console.error(error);
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
    <div className={styles.pageContainer}>
      <section className={styles.contentContainer}>
        <ListHeader />
        <div className={styles.titleAndSortBox}>
          <h1 className={styles.title}>누구에게 질문할까요?</h1>
          <ListSortModal handleSort={handleSortChange} />
        </div>
        <div className={styles.listAndPaginationBox}>
          <QuestionCardList feeds={datas?.results} />
          <Pagination
            count={datas?.count || 0} // datas가 렌더링되기 전에 0을 전달하여 NaN값이 전달되는 것을 방지
            currentPage={currentPage}
            onArrow={handlePageChangeByArrow}
            onPage={handlePageChangeByPage}
          />
        </div>
      </section>
    </div>
  );
}

export default QuestionCardListPage;
