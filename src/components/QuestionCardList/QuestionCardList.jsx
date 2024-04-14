import QuestionCard from "../QuestionCard/QuestionCard";
import styles from "./QuestionCardList.module.css";

function QuestionCardList({ sortedFeeds }) {
  return (
    <ul className={styles.listContainer}>
      {sortedFeeds?.map((feed, id) => (
        <li key={id}>
          <QuestionCard feed={feed} />
        </li>
      ))}
    </ul>
  );
}

export default QuestionCardList;
