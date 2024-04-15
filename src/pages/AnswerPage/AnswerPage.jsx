import styles from "../PostPage/PostPage.module.css";
import logoImage from "../../assets/images/logo.png";
import PostProfile from "../../components/PostProfile/PostProfile";
import QuestionFeedList from "../../components/QuestionFeedList/QuestionFeedList";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import { useParams, useNavigate } from "react-router-dom";
import {
  deleteAll,
  deleteSingleAnswer,
  deleteSingleQuestion,
} from "../../utils/answerpageAPI/deleteAPI";
import { useUserProfileAndQuestions } from "../../hooks/useUserProfileAndQuestions";

export default function AnswerPage() {
  const { id } = useParams();
  const { userProfile, userQuestions, updateUserQuestions } =
    useUserProfileAndQuestions(id);
  const navigate = useNavigate();

  // 질문자 계정, 해당 질문자에게 달린 질문들, 해당 질문자가 작성한 답변들 일괄 삭제
  const handleDeleteAllClick = async () => {
    await deleteAll(userQuestions, userProfile.id);
    navigate("/list");
  };

  // 개별 질문, 해당 질문에 달린 답변들 삭제
  const handleDeleteQuestionClick = async (question) => {
    await deleteSingleAnswer(question);
    await deleteSingleQuestion(question);
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
          <FloatingButton text="삭제하기" onClick={handleDeleteAllClick} />
        </div>
        <QuestionFeedList
          questions={userQuestions}
          AnswererProfile={userProfile}
          isAnswerPage={true}
          onDelete={handleDeleteQuestionClick}
          updateQuestions={updateUserQuestions}
        />
      </div>
    </div>
  );
}
