import speechBubble from "../../assets/images/icon/speechBubble.svg";
import QuestionCard from "../QuestionCard/QuestionCard";
import styles from "./QuestionList.module.css";

export default function QuestionList({ questions, AnswererProfile }) {
  return (
    <div>
      <div className={styles.questionCount}>
        <img src={speechBubble} />
        <span>{`${questions.length}개의 질문이 있습니다.`}</span>
      </div>
      <ul>
        {questions.map((question) => {
          return (
            <li>
              <QuestionCard
                question={question}
                AnswererProfile={AnswererProfile}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
