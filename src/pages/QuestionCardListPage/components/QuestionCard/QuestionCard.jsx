import styles from "./QuestionCard.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import speechBubble from "../../../../assets/images/icon/speechBubble.svg";

function QuestionCard({ feed }) {
  const { name, imageSource, questionCount, id } = feed;

  const MotionLink = motion(Link);

  const nameRef = useRef();
  const [isEllipsis, setIsEllipsis] = useState(false);

  const handleMouseOver = () => {
    if (nameRef.current) {
      const containerWidth = nameRef.current.offsetWidth;
      const scrollWidth = nameRef.current.scrollWidth;

      setIsEllipsis(scrollWidth > containerWidth);
    }
  };

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
        <h2
          className={styles.profileName}
          ref={nameRef}
          onMouseOver={handleMouseOver}
        >
          {name}
        </h2>
        {isEllipsis && (
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
