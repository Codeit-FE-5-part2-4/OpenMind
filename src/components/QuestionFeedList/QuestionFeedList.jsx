import { motion } from "framer-motion";
import speechBubble from "../../assets/images/icon/speechBubble.svg";
import QuestionFeedCard from "../QuestionFeedCard/QuestionFeedCard";
import styles from "./QuestionFeedList.module.css";
import emptyIcon from "../../assets/images/icon/emptyIcon.svg";

export default function QuestionFeedList({
  questions,
  AnswererProfile,
  isAnswerPage = false,
  updateQuestions,
  modalHandler,
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
        <motion.ul
          className={styles.questionList}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delayChildren: 0.3 }}
        >
          {questions.map((question, index) => (
            <motion.li
              key={question.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <QuestionFeedCard
                AnswererProfile={AnswererProfile}
                isAnswerPage={isAnswerPage}
                question={question}
                updateQuestions={updateQuestions}
                modalHandler={modalHandler}
              />
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <div className={styles.questionCardEmpty}>
          <motion.img
            className={styles.questionEmptyImage}
            src={emptyIcon}
            alt="질문없음"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </div>
      )}
    </div>
  );
}
