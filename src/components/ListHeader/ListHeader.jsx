import styles from "./ListHeader.module.css";
import HomeButton from "../HomeButton/HomeButton";
import ArrowButton from "../ArrowButton/ArrowButton";

function ListHeader() {
  return (
    <header className={styles.header}>
      <HomeButton size="M" />
      <ArrowButton text="답변하러가기" />
    </header>
  );
}

export default ListHeader;
