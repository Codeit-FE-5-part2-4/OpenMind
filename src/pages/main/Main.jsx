import ArrowButton from "../../components/ArrowButton/ArrowButton";
import BoxButton from "../../components/BoxButton/BoxButton";
import styles from "./Main.module.css";
import logoImg from "../../assets/images/logo.png";
import NameInput from "../../components/NameInput/NameInput";

function Main() {
    return (
        <main className={styles.mainWrap}>
            <header>
                <ArrowButton text={"질문하러 가기"} />
            </header>
            <h1 className={styles.logo}>
                <img src={logoImg} alt="" />
            </h1>
            <div className={styles.mainConBox}>
                <NameInput placeholder={"이름을 입력하세요"} />
                <BoxButton text={"질문 받기"} />
            </div>
        </main>
    );
}

export default Main;
