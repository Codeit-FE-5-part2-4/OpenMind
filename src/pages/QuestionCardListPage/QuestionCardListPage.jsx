import styles from "./QuestionCardListPage.module.css";
import QuestionCardListPageHeader from "../../components/ListHeader/QuestionCardListPageHeader";
import SortList from "../../components/SortList/SortList";

function QuestionCardListPage() {
  return (
    <main>
      <div className={styles.container}>
        <QuestionCardListPageHeader />
        <section>
          <div className={styles.title}>
            <h1>누구에게 질문할까요?</h1>
            <SortList />
          </div>
        </section>
      </div>
    </main>
  );
}

export default QuestionCardListPage;
