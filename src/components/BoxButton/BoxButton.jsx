import styles from "./BoxButton.module.css";

function BoxButton({ text, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} className={styles.BoxButton}>
      {text}
    </button>
  );
}

export default BoxButton;
