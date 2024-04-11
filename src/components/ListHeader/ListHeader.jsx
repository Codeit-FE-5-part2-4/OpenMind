import styles from "./ListHeader.module.css";
import HomeButton from "../HomeButton/HomeButton";
import BoxButton from "../BoxButton/BoxButton";

function ListHeader() {
  return (
    <header className={styles.header}>
      <HomeButton size="M" />
      <BoxButton />
    </header>
  );
}

export default ListHeader;
