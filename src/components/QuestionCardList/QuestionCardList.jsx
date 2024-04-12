import QuestionCard from "../QuestionCard/QuestionCard";
import styles from "./QuestionCardList.module.css";

function QuestionCardList({ lists }) {
  return (
    <ul className={styles.listContainer}>
      {lists &&
        lists.map((list) => (
          <li key={list.id}>
            <QuestionCard list={list} />
          </li>
        ))}
    </ul>
  );
}

export default QuestionCardList;
