import styles from "./WarningModal.module.css";
import BoxButton from "../BoxButton/BoxButton";

export default function WarningModal({
  text,
  selectYes,
  selectNo,
  closeModal,
}) {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContainerBar}>
        <div className={styles.barText}>
          <span>{text}</span>
        </div>
        <button onClick={closeModal} className={styles.closeButton}></button>
      </div>
      <ul className={styles.selectButtonContainer}>
        <li>
          <BoxButton text={"예"} onClick={selectYes} />
        </li>
        <li>
          <BoxButton text={"아니오"} onClick={selectNo} />
        </li>
      </ul>
    </div>
  );
}
