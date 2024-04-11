import styles from "./ListHeader.module.css";
import HomeButton from "../HomeButton/HomeButton";
import BoxButton from "../BoxButton/BoxButton";

function QuestionCardListPageHeader() {
  return (
    <header className={styles.header}>
      <HomeButton size="M" />
      <BoxButton />
    </header>
  );
}

export default QuestionCardListPageHeader;
