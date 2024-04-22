import styles from "../PostPage/PostPage.module.css";
import logoImage from "../../assets/images/logo.png";
import PostProfile from "../../components/PostProfile/PostProfile";
import QuestionFeedList from "../../components/QuestionFeedList/QuestionFeedList";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import ArrowButton from "../../components/ArrowButton/ArrowButton";
import { useParams, useNavigate, Link } from "react-router-dom";
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
  const [onConfirm, setOnConfirm] = useState(() => () => {});
  const navigate = useNavigate();

  const handleDeleteAllClick = () => {
    handleOpenModal("정말로 피드를 삭제하시겠습니까?", handleDeleteAll);
  };

  const handleDeleteAll = async (confirmed) => {
    if (confirmed) {
      await deleteAll(userQuestions, userProfile.id);
      localStorage.removeItem("id");
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
        <Link to="/">
          <h1>
            <span className={styles.blind}>Openmind</span>
            <img className={styles.logoImage} src={logoImage} alt="openmind" />
          </h1>
        </Link>
      </div>
      {showWarning && (
        <>
          <WarningModal
            text={warningMessage}
            onConfirm={onConfirm}
            closeModal={handleCloseModal}
          />
          <div className={styles.overlay}></div>
        </>
      )}
      <PostProfile userProfile={userProfile} />
      <div className={styles.QuestionFeedContainer}>
        <div className={styles.FloatingButtonAtRightSide}>
          <FloatingButton text="피드 삭제" onClick={handleDeleteAllClick} />
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
