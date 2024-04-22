import styles from "./ListErrorBox.module.css";

function ListErrorBox({ dataFetch }) {
  return (
    <div className={styles.errorBox}>
      <h2 className={styles.errorMessage}>데이터를 불러오는데 실패했습니다.</h2>
      <button onClick={dataFetch} className={styles.errorButton}>
        다시 시도
      </button>
    </div>
  );
}

export default ListErrorBox;
