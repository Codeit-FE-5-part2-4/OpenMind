import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./PostPage.module.css";
import logoImage from "../../assets/images/logo.png";
import PostProfile from "../../components/PostProfile/PostProfile";
import QuestionFeedList from "../../components/QuestionFeedList/QuestionFeedList";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import ArrowButton from "../../components/ArrowButton/ArrowButton";
import QuestionModal from "../../components/QuestionModal/QuestionModal";
import { useUserProfileAndQuestions } from "../../hooks/useUserProfileAndQuestions";
import postQuestion from "../../utils/postpageAPI/postQuestion";

export default function PostPage() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const { userProfile, userQuestions, updateUserQuestions } =
    useUserProfileAndQuestions(id);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSendQuestion = async (textValue) => {
    const formData = { content: textValue };
    const subjectId = id;
    await postQuestion(formData, subjectId);
    handleModalClose();
    updateUserQuestions();
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <div className={styles.headerContainer}>
        <Link to="/">
          <h1>
            <span className={styles.blind}>Openmind</span>
            <img className={styles.logoImage} src={logoImage} alt="openmind" />
          </h1>
        </Link>
      </div>
      <PostProfile userProfile={userProfile} />
      <div className={styles.QuestionFeedContainer}>
        <div className={styles.FloatingButtonAtRightSide}>
          <FloatingButton
            text="질문하기"
            disabled={showModal}
            onClick={handleModalOpen}
          />
        </div>
        <QuestionFeedList
          questions={userQuestions}
          AnswererProfile={userProfile}
        />
      </div>
      {showModal && (
        <>
          <QuestionModal
            closeModal={handleModalClose}
            answererProfile={userProfile}
            sendQuestion={handleSendQuestion}
          />
          <div className={styles.overlay}></div>
        </>
      )}

      <div className={styles.FloatingButtonAtCorner}>
        <ArrowButton text={"리스트로 가기"} size="large" />
      </div>
    </div>
  );
}
