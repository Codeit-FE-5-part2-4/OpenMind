import styles from './FeedCardDropDown.module.css';

export default function FeedCardDropDown({ editStartOnclick }) {
  return (
    <ul className={styles.dropdownList}>
      <li>
        <button className={styles.dropdownElement} onClick={editStartOnclick}>
          <div className={styles.dropdownElementEditIcon}></div>
          <span className={styles.dropdownElementText}>수정하기</span>
        </button>
      </li>
      <li>
        <button className={styles.dropdownElement}>
          <div className={styles.dropdownElementDeleteIcon}></div>
          <span className={styles.dropdownElementText}>삭제하기</span>
        </button>
      </li>
    </ul>
  );
}
