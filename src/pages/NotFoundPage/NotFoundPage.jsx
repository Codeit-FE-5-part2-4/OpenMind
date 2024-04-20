import styles from "./NotFoundPage.module.css";
import logoImg from "../../assets/images/logo.png";
import notFound from "../../assets/images/not_found_bg.png";
import ArrowButton from "../../components/ArrowButton/ArrowButton";

export default function NotFoundPage() {
  return (
    <main className={styles.mainWrap}>
      <h1 className={styles.logo}>
        <img src={logoImg} alt="" />
      </h1>
      <div className={styles.mainConBox}>
        <span>404 페이지를 찾을수 없습니다</span>
        <img src={notFound} alt="" className={styles.notFoundImg} />
        <ul className={styles.buttonContainer}>
          <li>
            <ArrowButton text={"질문하러 가기"} />
          </li>
          <li>
            <ArrowButton text={"답변하러 가기"} />
          </li>
        </ul>
      </div>
    </main>
  );
}
