import speechBubble from "../../assets/images/Messages.svg";
import styles from "./QuestionModal.module.css";
import TextAreaForm from "../TextAreaForm/TextAreaForm";
import postQuestion from "../../utils/postQuestion";

export default function QuestionModal({
  closeModal,
  // sendQuestion,
  answererProfile,
}) {
  const sendQuestion = async (textValue) => {
    const formData = { content: textValue };
    const subjectId = answererProfile.id;
    const response = await postQuestion(formData, subjectId);
  };

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

        <TextAreaForm
          buttonOnclick={sendQuestion}
          placeholder="질문을 입력해주세요"
          buttonText="질문 보내기"
          answererProfile={answererProfile}
        />
      </div>
    </div>
  );
}
