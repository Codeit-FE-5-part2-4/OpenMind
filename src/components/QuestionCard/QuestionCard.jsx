import speechBubble from "../../assets/images/icon/speech-bubble.svg";
import styles from "./QuestionCard.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function QuestionCard({ feed }) {
  const { name, imageSource, questionCount, id } = feed;

  let userName = "";

  if (name.length > 8) {
    userName = name.slice(0, 8) + "...";
  } else userName = name;

  const MotionLink = motion(Link);

  return (
    <MotionLink
      to={`/post/${id}`}
      className={styles.cardWrapper}
      whileHover={{
        scale: 1.1,
        boxShadow: "0 0 10px 4px var(--brownColor200)",
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
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
    </MotionLink>
  );
}

export default QuestionCard;
