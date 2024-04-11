import styles from '../PostPage/PostPage.module.css';
import logoImage from '../../assets/images/logo.png';
import PostProfile from '../../components/PostProfile/PostProfile';
import QuestionFeedList from '../../components/QuestionFeedList/QuestionFeedList';
import { mockProfile, mockQuestions } from '../PostPage/mockdata';

export default function AnswerPage(params) {
  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <h1>
        <span className={styles.blind}>Openmind</span>
        <img className={styles.logoImage} src={logoImage} alt="openmind" />
      </h1>
      <PostProfile userProfile={mockProfile} />
      <button>삭제하기</button>
      <QuestionFeedList
        questions={mockQuestions}
        AnswererProfile={mockProfile}
        isAnswerPage={true}
      />
    </div>
  );
}
