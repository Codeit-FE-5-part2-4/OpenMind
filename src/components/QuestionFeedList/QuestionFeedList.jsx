import speechBubble from '../../assets/images/icon/speechBubble.svg';
import QuestionFeedCard from '../QuestionFeedCard/QuestionFeedCard';
import styles from './QuestionFeedList.module.css';
import emptyIcon from '../../assets/images/icon/emptyIcon.svg';

export default function QuestionFeedList({
  questions,
  AnswererProfile,
  isAnswerPage = false,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.questionCount}>
        <img src={speechBubble} alt="말풍선" />
        <span>{`${questions.length}개의 질문이 있습니다.`}</span>
      </div>
      {questions.length > 0 ? (
        <ul>
          {questions.map((question) => {
            return (
              <li>
                <QuestionFeedCard
                  question={question}
                  AnswererProfile={AnswererProfile}
                  isAnswerPage={isAnswerPage}
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
