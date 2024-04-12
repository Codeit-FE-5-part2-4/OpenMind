import speechBubble from "../../assets/images/icon/speech-bubble.svg";
import testCatProfile from "../../assets/images/test-cat-profile.png";
import styles from "./QuestionCard.module.css";

function QuestionCard({ list }) {
  return (
    <a href="/" className={styles.cardWrapper}>
      <div className={styles.profileSection}>
        <img
          className={styles.profileImage}
          src={list.imageSource}
          alt="프로필 사진"
        />
        <h2 className={styles.profileName}>{list.name}</h2>
      </div>
      <div className={styles.infoSection}>
        <div className={styles.infoItem}>
          <img className={styles.infoIcon} src={speechBubble} alt="말풍선" />
          <div>받은 질문</div>
        </div>
        <div>9개</div>
      </div>
    </a>
  );
}

export default QuestionCard;
