import styles from "./ListHeader.module.css";
import HomeButton from "../../../../components/HomeButton/HomeButton";
import ArrowButton from "../../../../components/ArrowButton/ArrowButton";

function ListHeader() {
  return (
    <header className={styles.header}>
      <HomeButton size="M" />
      <ArrowButton text="답변하러 가기" />
    </header>
  );
}

export default ListHeader;
