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
  const [searchParams, setSearchParams] = useSearchParams(INITIALQUERY);

  const handleSortList = (e) => {
    e.preventDefault();

    const currentSortValue = e.target.name;

    updateSearchParams("sort", currentSortValue);
  };

  const updateSearchParams = useCallback(
    (key, value) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, value);

      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams]
  );

  const displaySubjects = useCallback(async ({ limit, offset, sort }) => {
    try {
      const newFeeds = await getSubjects({ limit, offset, sort });
      const { results } = newFeeds;

      setSortedFeeds(results);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");
    const sort = searchParams.get("sort");

    displaySubjects({ limit, offset, sort });
  }, [displaySubjects, searchParams, updateSearchParams]);

  return (
    <div className={styles.pageContainer}>
      <section className={styles.contentContainer}>
        <ListHeader />
        <div className={styles.titleAndSortBox}>
          <h1 className={styles.title}>누구에게 질문할까요?</h1>
          <ListSortModal onClick={handleSortList} />
        </div>
        <div className={styles.listAndPaginationBox}>
          <QuestionCardList sortedFeeds={sortedFeeds} />
          <Pagination />
        </div>
      </section>
    </div>
  );
}

export default QuestionCardListPage;
