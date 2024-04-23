import styles from "./FeedCardDropDown.module.css";

export default function FeedCardDropDown({
  editStartOnclick,
  question,
  onDeleteQuestion,
  onDeleteAnswer,
  onReject,
  isEditing,
  onCancelEdit,
}) {
  let rejectOrNot = "거절하기";
  if (question.answer && question.answer.isRejected) {
    rejectOrNot = "거절풀기";
  }

  if (isEditing) {
    return (
      <ul className={styles.dropdownList}>
        <li>
          <button className={styles.dropdownElement} onClick={onCancelEdit}>
            <div className={styles.dropdownElementDeleteIcon}></div>
            <span className={styles.dropdownElementText}>수정취소</span>
          </button>
        </li>
      </ul>
    );
  }

  return (
    <ul className={styles.dropdownList}>
      <li>
        <button
          className={styles.dropdownElement}
          onClick={() => onDeleteQuestion(question)}
        >
          <div className={styles.dropdownElementDeleteIcon}></div>
          <span className={styles.dropdownElementText}>질문삭제</span>
        </button>
      </li>
      <li>
        <button
          className={styles.dropdownElement}
          onClick={() => {
            onReject(question);
          }}
        >
          <div className={styles.dropdownElementRejectIcon}></div>
          <span className={styles.dropdownElementText}>{rejectOrNot}</span>
        </button>
      </li>
      {question.answer && !question.answer.isRejected && (
        <>
          <li>
            <button
              className={styles.dropdownElement}
              onClick={editStartOnclick}
            >
              <div className={styles.dropdownElementEditIcon}></div>
              <span className={styles.dropdownElementText}>답변수정</span>
            </button>
          </li>
          <li>
            <button
              className={styles.dropdownElement}
              onClick={() => onDeleteAnswer(question)}
            >
              <div className={styles.dropdownElementDeleteIcon}></div>
              <span className={styles.dropdownElementText}>답변삭제</span>
            </button>
          </li>
        </>
      )}
    </ul>
  );
}
