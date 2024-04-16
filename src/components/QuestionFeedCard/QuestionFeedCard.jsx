import likeIcon from "../../assets/images/icon/likeIcon.svg";
import likeIconDefault from "../../assets/images/icon/likeIcon-default.svg";
import dislikeIcon from "../../assets/images/icon/dislikeIcon.svg";
import dislikeIconDefault from "../../assets/images/icon/dislikeIcon-default.svg";
import styles from "./QuestionFeedCard.module.css";
import getTimeDifference from "../../utils/getTimeDifference";
import moreKebab from "../../assets/images/MoreKebab.svg";
import AnswerContainer from "./AnswerContainer";
import { useState } from "react";
import FeedCardDropDown from "../FeedCardDropDown/FeedCardDropDown";
import postReaction from "../../utils/postpageAPI/postReaction";
import createAnswer from "../../utils/answerpageAPI/createAnswer";
import editAnswer from "../../utils/answerpageAPI/editAnswer";
import {
  deleteSingleAnswer,
  deleteSingleQuestion,
} from "../../utils/answerpageAPI/deleteAPI";
import { rejectAnswer } from "../../utils/answerpageAPI/rejectAnswer";

export default function QuestionFeedCard({
  question,
  AnswererProfile,
  isAnswerPage,
  updateQuestions,
  modalHandler,
}) {
  const [currentQuestion, setCurrentQuestion] = useState(question);
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


  const handleReactionSubmit = async (newReaction) => {
    try {
      let result = await postReaction(newReaction, question.id);
      setCurrentQuestion(result);
    } catch (error) {
      console.error("질문 목록을 가져오는 중에 오류가 발생했습니다:");
    }

  // 드롭다운에서 거절하기 버튼 클릭 시 질문답변에 거절하기 출력
  const handleToggleRejectClick = async (question) => {
    let isRejected = true; // 기본값 설정

    if (question.answer) {
      isRejected = !question.answer.isRejected;
      await rejectAnswer(question.answer.id, isRejected);
    } else {
      await createAnswer(question.id, "거절된 답변", isRejected);
    }

    await updateQuestions();
    setShowDropdown(!showDropdown);
  };


  // 개별 질문, 해당 질문에 달린 답변들 삭제
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


  const likeIconSrc = currentQuestion.like === 0 ? likeIconDefault : likeIcon;
  const likeTextSrc =
    currentQuestion.like === 0 ? styles.reactionTextDefault : styles.likeText;
  const dislikeIconSrc =
    currentQuestion.dislike === 0 ? dislikeIconDefault : dislikeIcon;
  const dislikeTextSrc =
    currentQuestion.dislike === 0
      ? styles.reactionTextDefault
      : styles.dislikeText;

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
    <div className={styles.questionCard}>
      <div className={styles.answerStatusBar}>
        <span className={answerStatusStyle}>{answerStatusMsg}</span>
        {isAnswerPage && (
          <div className={styles.kebabButtonContainer}>
            <button
              onClick={handleDropdownToggleClick}
              className={styles.kebabButton}
            >
              <img src={moreKebab} alt="더보기" />
            </button>
            {showDropdown &&
              (question.answer ? (
                <FeedCardDropDown
                  isAnswered={true}
                  editStartOnclick={handleEditClick}
                  question={question}
                  onDelete={handleDeleteQuestionClick}
                  isRejected={question.answer.isRejected}
                  onReject={handleToggleRejectClick}
                />
              ) : (
                <FeedCardDropDown
                  editStartOnclick={handleEditClick}
                  question={question}
                  onDelete={handleDeleteQuestionClick}
                  onReject={handleToggleRejectClick}
                />
              ))}
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
          answerContent={question.answer.content}
          isRejected={question.answer.isRejected}
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

      <div className={styles.judgeAnswerContainer}>
        <div className={styles.judgeAnswerWrapper}>
          <button
            onClick={() => handleReactionSubmit("like")}
            type="submit"
            className={styles.judge}
          >
            <img src={likeIconSrc} alt="좋아요버튼" />
          </button>
          <span
            className={likeTextSrc}
          >{`좋아요 ${currentQuestion.like}`}</span>
        </div>
        <div className={styles.judgeAnswerWrapper}>
          <button
            onClick={() => handleReactionSubmit("dislike")}
            type="submit"
            className={styles.judge}
          >
            <img src={dislikeIconSrc} alt="싫아요버튼" />
          </button>
          <span
            className={dislikeTextSrc}
          >{`싫어요 ${currentQuestion.dislike}`}</span>
        </div>
      </div>
    </div>
  );
}
