import QuestionCardList from "../../components/QuestionCardList/QuestionCardList";
import "../../assets/styles/reset.css";
import "../../assets/styles/global.css";
import ListHeader from "../../components/ListHeader/ListHeader";
import SortList from "../../components/SortList/SortList";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./QuestionCardListPage.module.css";
import SortList from "../../components/SortList/SortList";
import ListHeader from "../../components/ListHeader/ListHeader";

function QuestionCardListPage() {
  return (
    <div className={styles.pageContainer}>
      <section className={styles.contentContainer}>
        <ListHeader />
        <div className={styles.titleAndSortBox}>
          <h1 className={styles.title}>누구에게 질문할까요?</h1>
          <SortList />
        </div>
        <div className={styles.listAndPaginationBox}>
          <QuestionCardList />
          <Pagination />
        </div>
      </section>
    </div>
  );
}

export default QuestionCardListPage;
