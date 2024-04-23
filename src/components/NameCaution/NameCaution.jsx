import styles from "./NameCaution.module.css";

function NameCaution({ cautionText }) {
  return <div className={styles.nameCaution}>{cautionText}</div>;
}

export default NameCaution;
