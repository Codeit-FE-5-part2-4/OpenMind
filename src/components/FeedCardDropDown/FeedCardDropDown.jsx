import styles from "./FeedCardDropDown.module.css";

export default function FeedCardDropDown({
  editStartOnclick,
  question,
  onDelete,
  isAnswered = false,
}) {
  const handleDeleteQuestionClick = () => {
    onDelete(question);
  };

  const dropdownListStyle = isAnswered
    ? styles.dropdownList
    : styles.dropdownListWithOneElement;

  return (
    <ul className={dropdownListStyle}>
      {isAnswered && (
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
          onClick={handleDeleteQuestionClick}
        >
          <div className={styles.dropdownElementDeleteIcon}></div>
          <span className={styles.dropdownElementText}>삭제하기</span>
        </button>
      </li>
    </ul>
  );
}
