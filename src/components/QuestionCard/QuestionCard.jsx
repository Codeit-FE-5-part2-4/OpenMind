import likeIcon from "../../assets/images/icon/likeIcon.svg";
import dislikeIcon from "../../assets/images/icon/dislikeIcon.svg";
import styles from "./QuestionCard.module.css";

export default function QuestionCard({ question, AnswererProfile }) {
  const answerStatusMsg = {
    isAnswered: "답변완료",
    notAnswered: "미답변",
  };

  let answerStatusStyle = question.answer
    ? styles.isAnswered
    : styles.notAnswered;
  answerStatusStyle += " ";
  answerStatusStyle += styles.answerStatus;
  return (
    <div className={styles.questionCard}>
      <span className={answerStatusStyle}>
        {question.answer
          ? answerStatusMsg.isAnswered
          : answerStatusMsg.notAnswered}
      </span>
      <div className={styles.questionInfo}>
        <span className={styles.createdAt}>{question.createdAt}</span>
        <p className={styles.questionTitle}>{question.content}</p>
      </div>
      <div className={styles.answerContainer}>
        <img
          className={styles.userProfileImage}
          src={AnswererProfile.imageSource}
        />
        <div className={styles.answer}>
          <div className={styles.answerInfo}>
            <span className={styles.answererName}>{AnswererProfile.name}</span>
            <span className={styles.createdAt}>
              {question.answer.createdAt}
            </span>
          </div>
          <p className={styles.answerContent}>{question.answer.content}</p>
        </div>
      </div>
      <div className={styles.judgeAnswerContainer}>
        <div className={styles.judge}>
          <img src={likeIcon} />
          <span>{`좋아요 ${question.like}`}</span>
        </div>
        <div className={styles.judge}>
          <img src={dislikeIcon} />
          <span>{`싫어요 ${question.dislike}`}</span>
        </div>
      </div>
    </div>
  );
}
