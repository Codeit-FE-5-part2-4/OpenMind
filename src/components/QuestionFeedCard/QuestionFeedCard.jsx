import styles from "./QuestionFeedCard.module.css";
import AnswerContainer from "./AnswerContainer";
import { useState } from "react";
import createAnswer from "../../utils/answerpageAPI/createAnswer";
import editAnswer from "../../utils/answerpageAPI/editAnswer";
import {
  deleteSingleAnswer,
  deleteSingleQuestion,
} from "../../utils/answerpageAPI/deleteAPI";
import { toggleRejectAnswer } from "../../utils/answerpageAPI/toggleRejectAnswer";
import ReactionBar from "../../components/ReactionBar/ReactionBar";
import { motion } from "framer-motion";
import AnswerStatusBar from "./AnswerStatusBar";
import QuestionInfoBar from "./QuestionInfoBar";

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

  const dropdownFunctions = {
    handleEditClick,
    handleDeleteQuestionClick,
    handleDeleteAnswerClick,
    handleToggleRejectClick,
  };

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
      <AnswerStatusBar
        question={question}
        isAnswerPage={isAnswerPage}
        onDropdownClick={handleDropdownToggleClick}
        showDropdown={showDropdown}
        dropdownFunctions={dropdownFunctions}
      />

      <QuestionInfoBar
        questionCreatedAt={question.createAt}
        questionContent={question.content}
      />
      <AnswerContainer
        AnswererProfile={AnswererProfile}
        question={question}
        isEditing={isEditing}
        editFinishOnClick={handleEditFinish}
        createAnswer={handleCreateAnswer}
        isAnswerPage={isAnswerPage}
      />
      <ReactionBar question={question} />
    </motion.div>
  );
}
