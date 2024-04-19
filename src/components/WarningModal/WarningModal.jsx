import React from "react";
import styles from "./WarningModal.module.css";
import FloatingButton from "../FloatingButton/FloatingButton";

export default function WarningModal({ text, onConfirm, closeModal }) {
  const handleConfirm = (confirmed) => {
    onConfirm(confirmed);
    closeModal();
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContainerBar}>
        <div className={styles.barText}>
          <span>{text}</span>
        </div>
        {/* <button className={styles.closeButton} onClick={closeModal}></button> */}
      </div>
      <ul className={styles.selectButtonContainer}>
        <li className={styles.selectButton}>
          <FloatingButton text="예" onClick={() => handleConfirm(true)} />
        </li>
        <li className={styles.selectButton}>
          <FloatingButton text="아니오" onClick={() => handleConfirm(false)} />
        </li>
      </ul>
    </div>
  );
}
