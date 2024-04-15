import speechBubble from "../../assets/images/icon/speech-bubble.svg";
import styles from "./QuestionCard.module.css";
import { Link } from "react-router-dom";

function QuestionCard({ feed }) {
  const { name, imageSource, questionCount, id } = feed;

  let userName = "";

  if (name.length > 8) {
    userName = name.slice(0, 8) + "...";
  } else userName = name;

  return (
    <Link to={`/post/${id}`} className={styles.cardWrapper}>
      <div className={styles.profileSection}>
        <img
          className={styles.profileImage}
          src={imageSource}
          alt="프로필 사진"
        />
        <h2 className={styles.profileName}>{userName}</h2>
        {userName.length > 8 && (
          <span className={styles.fullUserName__hover}>{name}</span>
        )}
      </div>
      <div className={styles.infoSection}>
        <div className={styles.infoItem}>
          <img className={styles.infoIcon} src={speechBubble} alt="말풍선" />
          <div>받은 질문</div>
        </div>
        <div>{questionCount}개</div>
      </div>
    </Link>
  );
}

export default QuestionCard;
