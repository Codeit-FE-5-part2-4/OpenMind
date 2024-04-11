import QuestionCardList from "../../components/QuestionCardList/QuestionCardList";
import "../../assets/styles/reset.css";
import "../../assets/styles/global.css";
import ListHeader from "../../components/ListHeader/ListHeader";
import SortList from "../../components/SortList/SortList";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./QuestionCardListPage.module.css";

function QuestionCardListPage() {
  return (
    <main className={styles.mainWrap}>
      <section className={styles.container}>
        <ListHeader />
        <div className={styles.titleBox}>
          <h1 className={styles.title}>누구에게 질문할까요?</h1>
          <SortList />
        </div>
        <div className={styles.listSection}>
          <QuestionCardList />
          <Pagination />
        </div>
      </section>
    </main>
  );
}

export default QuestionCardListPage;
