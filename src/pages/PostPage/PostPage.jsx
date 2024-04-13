import { useState, useEffect, useCallback } from "react";
import logoImage from "../../assets/images/logo.png";
import PostProfile from "../../components/PostProfile/PostProfile";
import QuestionFeedList from "../../components/QuestionFeedList/QuestionFeedList";
import styles from "./PostPage.module.css";
import "../../components/FloatingButton/FloatingButton.module.css";
import QuestionModal from "../../components/QuestionModal/QuestionModal";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import getSubjectInfo from "../../utils/postpageAPI/getSubjectInfo";
import getSubjectQuestion from "../../utils/postpageAPI/getSubjectQuestion";

export default function PostPage({ id }) {
  const [showModal, setShowModal] = useState(false);
  const [buttonText, setButtonText] = useState("질문하러 가기");
  const [userProfile, setUserProfile] = useState({});
  const [userQuestions, setUserQuestions] = useState([]);

  const fetchDataAndSetUserProfile = useCallback(async () => {
    try {
      let result = await getSubjectInfo(id);
      setUserProfile(result);
    } catch (error) {
      console.error("피드 페이지를 가져오는 중에 오류가 발생했습니다:");
    }
  }, [id]);

  const fetchDataAndSetUserQuestions = useCallback(async () => {
    try {
      let result = await getSubjectQuestion(id);
      setUserQuestions(result);
    } catch (error) {
      console.error("질문 목록을 가져오는 중에 오류가 발생했습니다:");
    }
  }, [id]);

  const handleLoad = useCallback(async () => {
    await fetchDataAndSetUserProfile(id);
    await fetchDataAndSetUserQuestions(id);
  }, [fetchDataAndSetUserProfile, fetchDataAndSetUserQuestions, id]);

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
    handleLoad();
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [handleLoad, fetchDataAndSetUserProfile, fetchDataAndSetUserQuestions]);

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <h1>
        <span className={styles.blind}>Openmind</span>
        <img className={styles.logoImage} src={logoImage} alt="openmind" />
      </h1>
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
