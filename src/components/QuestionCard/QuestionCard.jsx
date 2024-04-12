import speechBubble from "../../assets/images/icon/speech-bubble.svg";
import styles from "./QuestionCard.module.css";

function QuestionCard({ feed }) {
  const { name, imageSource, questionCount } = feed;

  return (
    <a href="/" className={styles.cardWrapper}>
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
    </a>
  );
}

export default QuestionCard;
