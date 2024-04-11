import styles from "./BoxButton.module.css";

function BoxButton({ text }) {
  return <button className={styles.BoxButton}>{text}</button>;
}

export default BoxButton;
