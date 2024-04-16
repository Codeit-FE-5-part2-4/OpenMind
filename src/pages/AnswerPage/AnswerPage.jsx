import styles from "../PostPage/PostPage.module.css";
import logoImage from "../../assets/images/logo.png";
import PostProfile from "../../components/PostProfile/PostProfile";
import QuestionFeedList from "../../components/QuestionFeedList/QuestionFeedList";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
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
  const navigate = useNavigate();

  // 질문자 계정, 해당 질문자에게 달린 질문들, 해당 질문자가 작성한 답변들 일괄 삭제
  const handleDeleteAllClick = () => {
    setWarningMessage("정말로 피드 페이지를 삭제하시겠습니까?");
    setShowWarning(true);
  };

  const handleDeleteAll = async () => {
    setShowWarning(false);
    await deleteAll(userQuestions, userProfile.id);
    navigate("/list");
  };
  const handleCloseModal = () => {
    setShowWarning(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <h1>
        <span className={styles.blind}>Openmind</span>
        <img className={styles.logoImage} src={logoImage} alt="openmind" />
      </h1>
      {showWarning && (
        <WarningModal
          text={warningMessage}
          selectYes={handleDeleteAll}
          selectNo={handleCloseModal}
          closeModal={handleCloseModal}
        />
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
        />
      </div>
    </div>
  );
}
