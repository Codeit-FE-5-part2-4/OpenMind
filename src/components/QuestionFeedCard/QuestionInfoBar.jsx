import styles from "./QuestionFeedCard.module.css";
import getTimeDifference from "../../utils/getTimeDifference";

export default function QuestionInfoBar({
  questionCreatedAt,
  questionContent,
}) {
  const questionCreatedAgo = getTimeDifference(new Date(questionCreatedAt));

  return (
    <div className={styles.questionInfo}>
      <span className={styles.createdAt}>{questionCreatedAgo}</span>
      <p className={styles.questionContent}>{questionContent}</p>
    </div>
  );
}
