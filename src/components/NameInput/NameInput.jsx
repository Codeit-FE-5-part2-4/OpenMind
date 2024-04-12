import styles from "./NameInput.module.css";
import personIcon from "../../assets/images/icon/Person.svg";

function NameInput({ placeholder, onChangeInput, value }) {
  return (
    <div className={styles.nameInputBox}>
      <img src={personIcon} alt="" />
      <input type="text" placeholder={placeholder} onChange={onChangeInput} value={value} />
    </div>
  );
}

export default NameInput;
