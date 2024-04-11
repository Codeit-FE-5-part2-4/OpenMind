import styles from './QuestionFeedCard.module.css';
import TextAreaForm from '../TextAreaForm/TextAreaForm';

export default function AnswerContainer({
  AnswererProfile,
  answerCreatedAgo,
  isRejected,
  answerContent,
  isAnswered,
}) {
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
        {isAnswered && isRejected ? (
          <span className={styles.answerRejected}>답변거절</span>
        ) : (
          <p className={styles.answerContent}>{answerContent}</p>
        )}
        {!isAnswered && (
          <TextAreaForm
            placeholder="답변을 입력해주세요"
            buttonText="답변완료"
          />
        )}
      </div>
    </div>
  );
}
