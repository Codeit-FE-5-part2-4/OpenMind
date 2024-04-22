import styles from "./QuestionFeedCard.module.css";
import TextAreaForm from "../TextAreaForm/TextAreaForm";

export default function AnswerContainer({
  AnswererProfile,
  answerCreatedAgo,
  question,
  isEditing,
  editFinishOnClick,
  createAnswer,
  isAnswerPage,
}) {
  const content = question?.answer?.content;
  const isRejected = question?.answer?.isRejected;
  const isAnswered = question.answer !== null;

  return (
    <div className={styles.answerContainer}>
      <img
        className={styles.userProfileImage}
        src={AnswererProfile.imageSource}
        alt={AnswererProfile.name}
      />
      <div className={styles.answer}>
        <div className={styles.answerInfo}>
          <span className={styles.answererName}>{AnswererProfile.name}</span>
          {isAnswered && (
            <span className={styles.createdAt}>{answerCreatedAgo}</span>
          )}
        </div>
        {isAnswered && isRejected && !isEditing && (
          <span className={styles.answerRejected}>답변거절</span>
        )}

        {isAnswered && !isRejected && !isEditing && (
          <p className={styles.content}>{content}</p>
        )}

        {isAnswered && isEditing && (
          <TextAreaForm
            buttonText="수정완료"
            initialText={content}
            buttonOnclick={editFinishOnClick}
          />
        )}
        {!isAnswered && isAnswerPage && (
          <TextAreaForm
            placeholder="답변을 입력해주세요"
            buttonText="답변완료"
            buttonOnclick={createAnswer}
          />
        )}
      </div>
    </div>
  );
}
