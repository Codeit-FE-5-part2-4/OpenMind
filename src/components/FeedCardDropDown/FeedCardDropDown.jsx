import styles from "./FeedCardDropDown.module.css";

export default function FeedCardDropDown({
  isAnswered = false,
  editStartOnclick,
  question,
  onDelete,
  onReject,
  isRejected,
}) {
  // 수정하기 버튼이 없는 경우 dropdownListShort
  const dropdownListStyle =
    isAnswered && !isRejected ? styles.dropdownList : styles.dropdownListShort;

  const rejectOrNot = isRejected ? "거절풀기" : "거절하기";

  return (
    <ul className={dropdownListStyle}>
      {isAnswered && !isRejected && (
        <li>
          <button className={styles.dropdownElement} onClick={editStartOnclick}>
            <div className={styles.dropdownElementEditIcon}></div>
            <span className={styles.dropdownElementText}>수정하기</span>
          </button>
        </li>
      )}
      <li>
        <button
          className={styles.dropdownElement}
          onClick={() => onDelete(question)}
        >
          <div className={styles.dropdownElementDeleteIcon}></div>
          <span className={styles.dropdownElementText}>삭제하기</span>
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
    </ul>
  );
}
