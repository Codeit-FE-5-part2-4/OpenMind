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
import AnswerStatusBar from "./AnswerStatusBar";
import QuestionInfoBar from "./QuestionInfoBar";
import AnimatedDiv from "./AnimatedDiv";

export default function QuestionFeedCard({
  question,
  AnswererProfile,
  isAnswerPage,
  updateQuestions,
  modalHandler,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDropdownToggleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setShowDropdown(false);
  };

  const handleEditFinish = async (content) => {
    await editAnswer(question.answer.id, content);
    await updateQuestions();
    setIsEditing(false);
  };

  const handleCreateAnswer = async (content) => {
    await createAnswer(question.id, content);
    await updateQuestions();
  };

  const handleToggleRejectClick = async (question) => {
    const Answer = question?.answer;
    const hiddenWord = "&1a3nd8g";
    setIsEditing(false);

    if (!Answer) {
      await createAnswer(question.id, hiddenWord, true);
    } else if (Answer.content === hiddenWord) {
      await deleteSingleAnswer(question);
    } else if (Answer.content !== hiddenWord) {
      await toggleRejectAnswer(question.answer.id, !Answer.isRejected);
      if (Answer.isRejected) {
        setIsEditing(true);
      }
    }

    await updateQuestions();
    setShowDropdown(false);
  };

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
    <AnimatedDiv>
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
    </AnimatedDiv>
  );
}
