import ArrowButton from "../ArrowButton/ArrowButton";
import styles from "./MainHeader.module.css";

function MainHeader() {
    return (
        <header className={styles.MainHeader}>
            <ArrowButton text={"질문하러 가기"} />
        </header>
    );
}

export default MainHeader;
