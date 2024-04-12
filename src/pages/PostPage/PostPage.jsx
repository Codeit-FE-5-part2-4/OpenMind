import { useState, useEffect } from "react";
import logoImage from "../../assets/images/logo.png";
import PostProfile from "../../components/PostProfile/PostProfile";
import QuestionFeedList from "../../components/QuestionFeedList/QuestionFeedList";
import styles from "./PostPage.module.css";
import "../../components/FloatingButton/FloatingButton.module.css";
import { mockProfile, mockQuestions } from "./mockdata";
import QuestionModal from "../../components/QuestionModal/QuestionModal";
import FloatingButton from "../../components/FloatingButton/FloatingButton";

export default function PostPage() {
  const [showModal, setShowModal] = useState(false);
  const [buttonText, setButtonText] = useState("질문하러 가기");

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
      <h1>
        <span className={styles.blind}>Openmind</span>
        <img className={styles.logoImage} src={logoImage} alt="openmind" />
      </h1>
      <PostProfile userProfile={mockProfile} />
      <QuestionFeedList
        questions={mockQuestions}
        AnswererProfile={mockProfile}
      />
      {showModal && (
        <>
          <QuestionModal
            closeModal={handleModalClose}
            answererProfile={mockProfile}
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
