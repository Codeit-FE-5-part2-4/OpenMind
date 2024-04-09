import logoImage from "../../assets/images/logo.png";
import PostProfile from "../../components/PostProfile/PostProfile";
import QuestionList from "../../components/QuestionList/QuestionList";
import styles from "./PostPage.module.css";
import { mockProfile, mockQuestions } from "./mockdata";

export default function PostPage() {
  return (
    <div className={styles.container}>
      <h1>
        <span className={styles.blind}>Openmind</span>
        <img className={styles.logoImage} src={logoImage} alt="openmind" />
      </h1>
      <PostProfile userProfile={mockProfile} />
      <QuestionList questions={mockQuestions} AnswererProfile={mockProfile} />
    </div>
  );
}
