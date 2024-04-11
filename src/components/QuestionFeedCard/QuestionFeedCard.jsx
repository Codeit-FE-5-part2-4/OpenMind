import likeIcon from '../../assets/images/icon/likeIcon.svg';
import dislikeIcon from '../../assets/images/icon/dislikeIcon.svg';
import styles from './QuestionFeedCard.module.css';
import getTimeDifference from '../../utils/getTimeDifference';
import moreKebab from '../../assets/images/MoreKebab.svg';
import TextAreaForm from '../TextAreaForm/TextAreaForm';

export default function QuestionFeedCard({
  question,
  AnswererProfile,
  isAnswerPage,
}) {
  const answerStatusMessages = {
    isAnswered: '답변완료',
    notAnswered: '미답변',
  };
  const answerStatusMsg = question.answer
    ? answerStatusMessages.isAnswered
    : answerStatusMessages.notAnswered;

  const questionCreatedAgo = getTimeDifference(new Date(question.createdAt));

  let answerCreatedAgo;
  let answerStatusStyle = styles.notAnswered;
  if (question.answer) {
    answerStatusStyle = styles.isAnswered;
    answerCreatedAgo = getTimeDifference(new Date(question.answer.createdAt));
  }

  answerStatusStyle += ' ';
  answerStatusStyle += styles.answerStatus;
  return (
    <div className={styles.questionCard}>
      <div className={styles.answerStatusBar}>
        <span className={answerStatusStyle}>{answerStatusMsg}</span>
        {isAnswerPage && (
          <button>
            <img src={moreKebab} alt="더보기" />
          </button>
        )}
      </div>
      <div className={styles.questionInfo}>
        <span className={styles.createdAt}>{questionCreatedAgo}</span>
        <p className={styles.questionTitle}>{question.content}</p>
      </div>

      {question.answer ? (
        <div className={styles.answerContainer}>
          <img
            className={styles.userProfileImage}
            src={AnswererProfile.imageSource}
            alt={AnswererProfile.name}
          />
          <div className={styles.answer}>
            <div className={styles.answerInfo}>
              <span className={styles.answererName}>
                {AnswererProfile.name}
              </span>
              <span className={styles.createdAt}>{answerCreatedAgo}</span>
            </div>
            {question.answer.isRejected ? (
              <span className={styles.answerRejected}>답변거절</span>
            ) : (
              <p className={styles.answerContent}>{question.answer.content}</p>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.answerContainer}>
          <img
            className={styles.userProfileImage}
            src={AnswererProfile.imageSource}
            alt={AnswererProfile.name}
          />
          <div className={styles.answer}>
            <div className={styles.answerInfo}>
              <span className={styles.answererName}>
                {AnswererProfile.name}
              </span>
              <span className={styles.createdAt}>{answerCreatedAgo}</span>
            </div>
            <TextAreaForm buttonText="답변 완료" />
          </div>
        </div>
      )}

      <div className={styles.judgeAnswerContainer}>
        <div className={styles.judge}>
          <img src={likeIcon} alt="좋아요버튼" />
          <span>{`좋아요 ${question.like}`}</span>
        </div>
        <div className={styles.judge}>
          <img src={dislikeIcon} alt="싫어요버튼" />
          <span>{`싫어요 ${question.dislike}`}</span>
        </div>
      </div>
    </div>
  );
}
