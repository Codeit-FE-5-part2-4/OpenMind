import QuestionCard from "../QuestionCard/QuestionCard";
import styles from "./QuestionCardList.module.css";

function QuestionCardList({ feeds }) {
  return (
    <div className={styles.questionCard_wrapper}>
      <ul className={styles.listContainer}>
        {feeds?.map((feed, id) => (
          <li key={id}>
            <QuestionCard feed={feed} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionCardList;
