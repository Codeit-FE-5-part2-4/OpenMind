import { useState } from "react";
import speechBubble from "../../assets/images/Messages.svg";
import styles from "./QuestionModal.module.css";

export default function QuestionModal({
  closeModal,
  sendQuestion,
  answererProfile,
}) {
  const [questionText, setQuestionText] = useState("");

  const handleQuestionChange = (event) => {
    setQuestionText(event.target.value);
  };

  const isQuestionEmpty = questionText.trim() === "";

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContainerBar}>
        <div className={styles.barText}>
          <img src={speechBubble} alt="말풍선사진" />
          <span>질문을 작성하세요</span>
        </div>
        <button onClick={closeModal} className={styles.closeButton}></button>
      </div>

      <div className={styles.modalInputContainer}>
        <div className={styles.modalReceiverInfo}>
          <span className={styles.toText}>To.</span>
          <img
            src={answererProfile.imageSource}
            alt="프로필 사진"
            className={styles.modalProfileImage}
          />
          <span>{answererProfile.name}</span>
        </div>

        <textarea
          type="text"
          className={styles.modalInput}
          placeholder="질문을 입력해주세요"
          value={questionText}
          onChange={handleQuestionChange}
        />
        <button onClick={sendQuestion} disabled={isQuestionEmpty}>
          질문 보내기
        </button>
      </div>
    </div>
  );
}
