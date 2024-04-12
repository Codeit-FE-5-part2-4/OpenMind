import styles from "../PostPage/PostPage.module.css";
import logoImage from "../../assets/images/logo.png";
import PostProfile from "../../components/PostProfile/PostProfile";
import QuestionFeedList from "../../components/QuestionFeedList/QuestionFeedList";
import { mockProfile, mockQuestions } from "../PostPage/mockdata";
import FloatingButton from "../../components/FloatingButton/FloatingButton";

export default function AnswerPage(params) {
  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <h1>
        <span className={styles.blind}>Openmind</span>
        <img className={styles.logoImage} src={logoImage} alt="openmind" />
      </h1>
      <PostProfile userProfile={mockProfile} />
      <div className={styles.QuestionFeedContainer}>
        <div className={styles.FloatingButtonAtRightSide}>
          <FloatingButton text="삭제하기" />
        </div>
        <QuestionFeedList
          questions={mockQuestions}
          AnswererProfile={mockProfile}
          isAnswerPage={true}
        />
      </div>
    </div>
  );
}
