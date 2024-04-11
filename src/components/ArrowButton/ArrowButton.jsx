import arrowIcon from "../../assets/images/icon/arrow-right.svg";
import styles from "./ArrowButton.module.css";

function ArrowButton({ text }) {
    return (
        <button className={styles.ArrowButton}>
            {text} <img src={arrowIcon} alt="" />
        </button>
    );
}

export default ArrowButton;
