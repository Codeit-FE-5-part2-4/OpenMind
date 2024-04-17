import QuestionCard from "../QuestionCard/QuestionCard";
import styles from "./QuestionCardList.module.css";
import ArrowButton from "../ArrowButton/ArrowButton";

function QuestionCardList({ sortedFeeds }) {
  return sortedFeeds && sortedFeeds.length > 0 ? (
    <div className={styles.questionCard_wrapper}>
      <ul className={styles.listContainer}>
        {sortedFeeds?.map((feed, id) => (
          <li key={id}>
            <QuestionCard feed={feed} />
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className={styles.NotFoundPage_wrapper}>
      <div className={styles.NotFoundPage_header}>
        <h1>페이지를 찾을 수 없습니다</h1>
        <ArrowButton text="질문하러 가기" />
      </div>
    </div>
  );
}

export default QuestionCardList;
