import QuestionCard from "../QuestionCard/QuestionCard";
import styles from "./QuestionCardList.module.css";

function QuestionCardList() {
  return (
    <ul className={styles.listContainer}>
      <li>
        <QuestionCard />
      </li>
      <li>
        <QuestionCard />
      </li>
      <li>
        <QuestionCard />
      </li>
      <li>
        <QuestionCard />
      </li>
      <li>
        <QuestionCard />
      </li>
      <li>
        <QuestionCard />
      </li>
      <li>
        <QuestionCard />
      </li>
      <li>
        <QuestionCard />
      </li>
    </ul>
  );
}

export default QuestionCardList;
