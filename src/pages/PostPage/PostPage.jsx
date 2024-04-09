import { useState } from "react";
import logoImage from "../../assets/images/logo.png";
import PostProfile from "../../components/PostProfile/PostProfile";
import QuestionList from "../../components/QuestionList/QuestionList";
import styles from "./PostPage.module.css";
import { mockProfile, mockQuestions } from "./mockdata";
import QuestionModal from "../../components/QuestionModal/QuestionModal";

export default function PostPage() {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <h1>
        <span className={styles.blind}>Openmind</span>
        <img className={styles.logoImage} src={logoImage} alt="openmind" />
      </h1>
      <PostProfile userProfile={mockProfile} />
      <QuestionList questions={mockQuestions} AnswererProfile={mockProfile} />
      {showModal && (
        <>
          <QuestionModal
            closeModal={handleModalClose}
            answererProfile={mockProfile}
          />
          <div className={styles.overlay}></div>
        </>
      )}
      <button disabled={showModal} onClick={handleModalOpen}>
        질문 하러가기
      </button>
    </div>
  );
}
