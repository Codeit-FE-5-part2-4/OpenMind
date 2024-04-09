import "./ArrowButton.module.css";
import arrowIcon from "../../assets/images/icon/arrow-right.svg";
import styles from "./ArrowButton.module.css";

function ArrowButton() {
    return (
        <button className={styles.ArrowButton}>
            질문하러 가기 <img src={arrowIcon} alt="" />
        </button>
    );
}

export default ArrowButton;
