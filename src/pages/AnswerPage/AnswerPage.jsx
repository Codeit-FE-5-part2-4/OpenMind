import styles from "../PostPage/PostPage.module.css";
import logoImage from "../../assets/images/logo.png";
import PostProfile from "../../components/PostProfile/PostProfile";
import QuestionFeedList from "../../components/QuestionFeedList/QuestionFeedList";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import ArrowButton from "../../components/ArrowButton/ArrowButton";
import { useParams, useNavigate } from "react-router-dom";
import { deleteAll } from "../../utils/answerpageAPI/deleteAPI";
import { useUserProfileAndQuestions } from "../../hooks/useUserProfileAndQuestions";
import { useState } from "react";
import WarningModal from "../../components/WarningModal/WarningModal";

export default function AnswerPage() {
  const { id } = useParams();
  const { userProfile, userQuestions, updateUserQuestions } =
    useUserProfileAndQuestions(id);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState(() => () => {}); // 초기값으로 빈 함수 설정
  const navigate = useNavigate();

  // 질문자 계정, 해당 질문자에게 달린 질문들, 해당 질문자가 작성한 답변들 일괄 삭제
  const handleDeleteAllClick = () => {
    handleOpenModal("정말로 피드 페이지를 삭제하시겠습니까?", handleDeleteAll);
  };

  const handleDeleteAll = async (confirmed) => {
    if (confirmed) {
      await deleteAll(userQuestions, userProfile.id);
      navigate("/list");
    }
  };

  const handleCloseModal = () => {
    setShowWarning(false);
  };

  const handleOpenModal = (msg, handler) => {
    setShowWarning(true);
    setWarningMessage(msg);
    setOnConfirm(() => handler);
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <div className={styles.headerContainer}>
        <h1>
          <span className={styles.blind}>Openmind</span>
          <img className={styles.logoImage} src={logoImage} alt="openmind" />
        </h1>
      </div>
      {showWarning && (
        <>
          <WarningModal
            text={warningMessage}
            onConfirm={onConfirm} // 상태로 설정된 함수 사용
            closeModal={handleCloseModal}
          />
          <div className={styles.overlay}></div>
        </>
      )}
      <PostProfile userProfile={userProfile} />
      <div className={styles.QuestionFeedContainer}>
        <div className={styles.FloatingButtonAtRightSide}>
          <FloatingButton text="삭제하기" onClick={handleDeleteAllClick} />
        </div>
        <QuestionFeedList
          questions={userQuestions}
          AnswererProfile={userProfile}
          isAnswerPage={true}
          updateQuestions={updateUserQuestions}
          modalHandler={handleOpenModal}
        />
      </div>

      <div className={styles.FloatingButtonAtCorner}>
        <ArrowButton text={"리스트로 가기"} size="large" />
      </div>
    </div>
  );
}
