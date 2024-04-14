import { useState } from "react";
import styles from "./ListSortModal.module.css";
import arrowUp from "../../assets/images/icon/Arrow-up.svg";
import arrowDown from "../../assets/images/icon/Arrow-down.svg";

function ListSortModal({ onClickSort, currentSortValue }) {
  const [viewDropdown, setViewDropdown] = useState(false); // 드롭다운 토글 useState
  const [arrowDirection, setArrowDirection] = useState(arrowDown); // 토글메뉴 화살표 useState

  const dropdownToggle = () => {
    setViewDropdown(!viewDropdown);
    viewDropdown ? setArrowDirection(arrowDown) : setArrowDirection(arrowUp); // 드롭다운 페이지 활성화시 ↑ 비활성화시 ↓
  };

  return (
    <div className={styles.sortMenu}>
      <button className={styles.selectSortButton} onClick={dropdownToggle}>
        {currentSortValue === "time" ? "최신순" : "이름순"}
        <img src={arrowDirection} alt={arrowDirection} />
      </button>
      {viewDropdown && (
        <ul className={styles.alignButtons}>
          <li>
            <button
              name="name"
              className={styles.alignButton}
              onClick={onClickSort}
            >
              이름순
            </button>
          </li>
          <li>
            <button
              name="time"
              className={styles.alignButton}
              onClick={onClickSort}
            >
              최신순
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
export default ListSortModal;
