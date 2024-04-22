import styles from "./QuestionFeedCard.module.css";
import { motion } from "framer-motion";
import moreKebab from "../../assets/images/MoreKebab.svg";
import FeedCardDropDown from "../FeedCardDropDown/FeedCardDropDown";

export default function AnswerStatusBar({
  question,
  isAnswerPage,
  onDropdownClick,
  showDropdown,
  dropdownFunctions,
}) {
  const answerStatusMessages = {
    isAnswered: "답변완료",
    notAnswered: "미답변",
  };

  const answerStatusMsg = question.answer
    ? answerStatusMessages.isAnswered
    : answerStatusMessages.notAnswered;
  let answerStatusStyle = styles.notAnswered;
  if (question.answer) {
    answerStatusStyle = styles.isAnswered;
  }
  answerStatusStyle += ` ${styles.answerStatus}`;
  return (
    <div className={styles.answerStatusBar}>
      <span className={answerStatusStyle}>{answerStatusMsg}</span>
      {isAnswerPage && (
        <div className={styles.kebabButtonContainer}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            onHoverStart={(e) => {}}
            onHoverEnd={(e) => {}}
          >
            <button onClick={onDropdownClick} className={styles.kebabButton}>
              <img src={moreKebab} alt="더보기" />
            </button>
          </motion.div>
          {showDropdown && (
            <FeedCardDropDown
              editStartOnclick={dropdownFunctions.handleEditClick}
              question={question}
              onDeleteQuestion={dropdownFunctions.handleDeleteQuestionClick}
              onDeleteAnswer={dropdownFunctions.handleDeleteAnswerClick}
              onReject={dropdownFunctions.handleToggleRejectClick}
            />
          )}
        </div>
      )}
    </div>
  );
}
