import styles from "../PostPage/PostPage.module.css";
import logoImage from "../../assets/images/logo.png";
import PostProfile from "../../components/PostProfile/PostProfile";
import QuestionFeedList from "../../components/QuestionFeedList/QuestionFeedList";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import { useParams, useNavigate } from "react-router-dom";
import deleteFeed from "../../utils/answerpageAPI/deleteFeed";
import { useUserProfileAndQuestions } from "../../hooks/useUserProfileAndQuestions";

export default function AnswerPage() {
  const { id } = useParams();
  const { userProfile, userQuestions } = useUserProfileAndQuestions(id);
  const navigate = useNavigate();
  const handleDeleteClick = async () => {
    await deleteFeed(userQuestions, userProfile.id);
    navigate("/list");
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <h1>
        <span className={styles.blind}>Openmind</span>
        <img className={styles.logoImage} src={logoImage} alt="openmind" />
      </h1>
      <PostProfile userProfile={userProfile} />
      <div className={styles.QuestionFeedContainer}>
        <div className={styles.FloatingButtonAtRightSide}>
          <FloatingButton text="삭제하기" onClick={handleDeleteClick} />
        </div>
        <QuestionFeedList
          questions={userQuestions}
          AnswererProfile={userProfile}
          isAnswerPage={true}
        />
      </div>
    </div>
  );
}
