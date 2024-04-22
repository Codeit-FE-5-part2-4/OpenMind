import styles from "./QuestionFeedCard.module.css";
import getTimeDifference from "../../utils/getTimeDifference";
import moreKebab from "../../assets/images/MoreKebab.svg";
import AnswerContainer from "./AnswerContainer";
import { useState } from "react";
import FeedCardDropDown from "../FeedCardDropDown/FeedCardDropDown";
import createAnswer from "../../utils/answerpageAPI/createAnswer";
import editAnswer from "../../utils/answerpageAPI/editAnswer";
import {
  deleteSingleAnswer,
  deleteSingleQuestion,
} from "../../utils/answerpageAPI/deleteAPI";
import { toggleRejectAnswer } from "../../utils/answerpageAPI/toggleRejectAnswer";
import ReactionBar from "../../components/ReactionBar/ReactionBar";
import { motion } from "framer-motion";

export default function QuestionFeedCard({
  question,
  AnswererProfile,
  isAnswerPage,
  updateQuestions,
  modalHandler,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // 드롭다운 토글
  const handleDropdownToggleClick = () => {
    setShowDropdown(!showDropdown);
  };

  // 답변 수정하기
  const handleEditClick = () => {
    setIsEditing(true);
    setShowDropdown(false);
  };

  const handleEditFinish = async (content) => {
    await editAnswer(question.answer.id, content);
    await updateQuestions();
    setIsEditing(false);
  };

  // 답변 생성하기
  const handleCreateAnswer = async (content) => {
    await createAnswer(question.id, content);
    await updateQuestions();
  };

  // 답변 거절하기
  const handleToggleRejectClick = async (question) => {
    const Answer = question.answer;
    const hiddenWord = "&1a3nd8g"; // 아무 문자열이나 가능
    setIsEditing(false);

    if (Answer && Answer.content !== hiddenWord) {
      await toggleRejectAnswer(question.answer.id, true);
      if (Answer.isRejected) {
        setIsEditing(true);
      }
    } else if (Answer == null) {
      await createAnswer(question.id, hiddenWord, true);
    } else if (Answer.content === hiddenWord) {
      await deleteSingleAnswer(question);
    }

    await updateQuestions();
    setShowDropdown(!showDropdown);
  };

  // 개별 질문 삭제
  const handleDeleteQuestionClick = () => {
    modalHandler("정말 질문을 삭제하시겠습니까?", handleDeleteQuestion);
  };

  const handleDeleteQuestion = async (confirmed) => {
    if (confirmed) {
      await deleteSingleAnswer(question);
      await deleteSingleQuestion(question);
      await updateQuestions();
    }
  };

  // 개별 답변 삭제
  const handleDeleteAnswerClick = () => {
    modalHandler("정말 답변을 삭제하시겠습니까?", handleDeleteAnswer);
    setIsEditing(false);
  };

  const handleDeleteAnswer = async (confirmed) => {
    if (confirmed) {
      await deleteSingleAnswer(question);
      await updateQuestions();
      setShowDropdown(!showDropdown);
    }
  };

  const answerStatusMessages = {
    isAnswered: "답변완료",
    notAnswered: "미답변",
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

  answerStatusStyle += " ";
  answerStatusStyle += styles.answerStatus;

  return (
    <motion.div
      className={styles.questionCard}
      initial={{ opacity: 0, y: -20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.1 },
      }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.answerStatusBar}>
        <span className={answerStatusStyle}>{answerStatusMsg}</span>
        {isAnswerPage && (
          <div className={styles.kebabButtonContainer}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              onHoverStart={(e) => {}}
              onHoverEnd={(e) => {}}
            >
              <button
                onClick={handleDropdownToggleClick}
                className={styles.kebabButton}
              >
                <img src={moreKebab} alt="더보기" />
              </button>
            </motion.div>
            {showDropdown && (
              <FeedCardDropDown
                editStartOnclick={handleEditClick}
                question={question}
                onDeleteQuestion={handleDeleteQuestionClick}
                onDeleteAnswer={handleDeleteAnswerClick}
                onReject={handleToggleRejectClick}
              />
            )}
          </div>
        )}
      </div>
      <div className={styles.questionInfo}>
        <span className={styles.createdAt}>{questionCreatedAgo}</span>
        <p className={styles.questionTitle}>{question.content}</p>
      </div>

      {question.answer && (
        <AnswerContainer
          AnswererProfile={AnswererProfile}
          answerCreatedAgo={answerCreatedAgo}
          question={question}
          isAnswered={true}
          isEditing={isEditing}
          editFinishOnClick={handleEditFinish}
        />
      )}
      {!question.answer && isAnswerPage && (
        <AnswerContainer
          AnswererProfile={AnswererProfile}
          isAnswered={false}
          createAnswer={handleCreateAnswer}
        />
      )}
      <ReactionBar question={question} />
    </motion.div>
  );
}
