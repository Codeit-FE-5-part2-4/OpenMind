import QuestionCardList from "../../components/QuestionCardList/QuestionCardList";
import ListHeader from "../../components/ListHeader/ListHeader";
import SortList from "../../components/SortList/SortList";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./QuestionCardListPage.module.css";
import { useCallback, useEffect, useState } from "react";

function QuestionCardListPage() {
  const [feeds, setFeeds] = useState([]);
  const [limit, setLimit] = useState(8);
  const [currentOffset, setCurrentOffset] = useState(0);

  async function getSubjects({ limit, offset }) {
    const response = await (
      await fetch(
        `https://openmind-api.vercel.app/5-4/subjects/?limit=${limit}&offset=${offset}`
      )
    ).json();

    if (!response) return console.error("요청이 실패했습니다.");

    const { results, count } = response;

    return { results, count };
  }

  const displaySubjects = useCallback(async () => {
    try {
      const newFeeds = await getSubjects(limit, currentOffset);
      setFeeds(newFeeds);
    } catch (error) {
      console.error(error);
    }
  }, [limit, currentOffset]);

  useEffect(() => {
    displaySubjects();
  }, [displaySubjects]);

  return (
    <div className={styles.pageContainer}>
      <section className={styles.contentContainer}>
        <ListHeader />
        <div className={styles.titleAndSortBox}>
          <h1 className={styles.title}>누구에게 질문할까요?</h1>
          <SortList />
        </div>
        <div className={styles.listAndPaginationBox}>
          <QuestionCardList feeds={feeds} />
          <Pagination />
        </div>
      </section>
    </div>
  );
}

export default QuestionCardListPage;
