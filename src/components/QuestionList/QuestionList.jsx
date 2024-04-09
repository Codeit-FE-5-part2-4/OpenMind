import speechBubble from "../../assets/images/icon/speechBubble.svg";
import { mockQuestions } from "../PostProfile/mockdata";
import styles from "./QuestionList.module.css";

export default function QuestionList({ questions }) {
  return (
    <div>
      <div className={styles.questionCount}>
        <img src={speechBubble} />
        <span>{`${mockQuestions.length}개의 질문이 있습니다.`}</span>
      </div>

      <ul></ul>
    </div>
  );
}
