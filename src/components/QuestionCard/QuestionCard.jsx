import speechBubble from "../../assets/images/icon/speech-bubble.svg";
import styles from "./QuestionCard.module.css";
import { Link } from "react-router-dom";

function QuestionCard({ feed }) {
  const { name, imageSource, questionCount, id } = feed;

  return (
    <Link href={`/post/${id}`} className={styles.cardWrapper}>
      <div className={styles.profileSection}>
        <img
          className={styles.profileImage}
          src={imageSource}
          alt="프로필 사진"
        />
        <h2 className={styles.profileName}>{name}</h2>
      </div>
      <div className={styles.infoSection}>
        <div className={styles.infoItem}>
          <img className={styles.infoIcon} src={speechBubble} alt="말풍선" />
          <div>받은 질문</div>
        </div>
        <div>{questionCount}</div>
      </div>
    </Link>
  );
}

export default QuestionCard;
