import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./PostPage.module.css";
import logoImage from "../../assets/images/logo.png";
import PostProfile from "../../components/PostProfile/PostProfile";
import QuestionFeedList from "../../components/QuestionFeedList/QuestionFeedList";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import QuestionModal from "../../components/QuestionModal/QuestionModal";
import { useUserProfileAndQuestions } from "../../hooks/useUserProfileAndQuestions";

export default function PostPage() {
  const { id } = useParams(); // Access the id from route parameters
  const [showModal, setShowModal] = useState(false);
  const [buttonText, setButtonText] = useState("질문하러 가기");
  const { userProfile, userQuestions } = useUserProfileAndQuestions(id);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setButtonText("질문 작성");
      } else {
        setButtonText("질문하러 가기");
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <div className={styles.headerContainer}>
        <h1>
          <span className={styles.blind}>Openmind</span>
          <img className={styles.logoImage} src={logoImage} alt="openmind" />
        </h1>
      </div>
      <PostProfile userProfile={userProfile} />
      <QuestionFeedList
        questions={userQuestions}
        AnswererProfile={userProfile}
      />
      {showModal && (
        <>
          <QuestionModal
            closeModal={handleModalClose}
            answererProfile={userProfile}
          />
          <div className={styles.overlay}></div>
        </>
      )}

      <div className={styles.FloatingButtonAtCorner}>
        <FloatingButton
          text={buttonText}
          size="large"
          disabled={showModal}
          onClick={handleModalOpen}
        />
      </div>
    </div>
  );
}
