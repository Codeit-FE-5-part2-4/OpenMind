import speechBubble from "../../assets/images/icon/speechBubble.svg";
import QuestionFeedCard from "../QuestionFeedCard/QuestionFeedCard";
import styles from "./QuestionFeedList.module.css";
import emptyIcon from "../../assets/images/icon/emptyIcon.svg";

export default function QuestionFeedList({
  questions,
  AnswererProfile,
  isAnswerPage = false,
  updateQuestions,
}) {
  const questionCountMsg =
    questions.length > 0
      ? `${questions.length}개의 질문이 있습니다.`
      : "아직 질문이 없습니다";

  return (
    <div className={styles.container}>
      <div className={styles.questionCount}>
        <img src={speechBubble} alt="말풍선" />

        <span className={styles.questionCountMsg}>{questionCountMsg}</span>
      </div>

      {questions.length > 0 ? (
        <ul className={styles.questionList}>
          {questions.map((question) => {
            return (
              <li key={question.id}>
                <QuestionFeedCard
                  AnswererProfile={AnswererProfile}
                  isAnswerPage={isAnswerPage}
                  question={question}
                  updateQuestions={updateQuestions}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className={styles.questionCardEmpty}>
          <img
            className={styles.questionEmptyImage}
            src={emptyIcon}
            alt="질문없음"
          />
        </div>
      )}
    </div>
  );
}
