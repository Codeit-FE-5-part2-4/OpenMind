import React from "react";
import styles from "./WarningModal.module.css";
import BoxButton from "../BoxButton/BoxButton";

export default function WarningModal({ text, onConfirm }) {
  const handleConfirm = (confirmed) => {
    onConfirm(confirmed);
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContainerBar}>
        <div className={styles.barText}>
          <span>{text}</span>
        </div>
        <button className={styles.closeButton}></button>
      </div>
      <ul className={styles.selectButtonContainer}>
        <li>
          <BoxButton text="예" onClick={() => handleConfirm(true)} />
        </li>
        <li>
          <BoxButton text="아니오" onClick={() => handleConfirm(false)} />
        </li>
      </ul>
    </div>
  );
}
