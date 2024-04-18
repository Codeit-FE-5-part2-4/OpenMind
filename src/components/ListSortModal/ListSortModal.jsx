import { useState, useRef, useEffect } from "react";
import styles from "./ListSortModal.module.css";
import arrowUp from "../../assets/images/icon/Arrow-up.svg";
import arrowDown from "../../assets/images/icon/Arrow-down.svg";
import { useSearchParams } from "react-router-dom";

function ListSortModal({ handleSort }) {
  const [searchParams] = useSearchParams();
  const [viewDropdown, setViewDropdown] = useState(false); // 드롭다운 토글 useState
  const [arrowDirection, setArrowDirection] = useState(arrowDown); // 토글메뉴 화살표 useState
  const wrapperRef = useRef(null);

  /** handleClickOutside 마우스다운 이벤트 추가 이벤트 발생 후 이벤트제거로 데이터 누수 방지*/
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  /** 드롭다운 메뉴 이외의 영역을 클릭시 드롭다운 메뉴 닫힘 */
  const handleClickOutside = (e) => {
    if (wrapperRef && !wrapperRef.current.contains(e.target)) {
      setViewDropdown(false);
      setArrowDirection(arrowDown);
    }
  };

  const dropdownToggle = () => {
    setViewDropdown(!viewDropdown);
    viewDropdown ? setArrowDirection(arrowDown) : setArrowDirection(arrowUp); // 드롭다운 페이지 활성화시 ↑ 비활성화시 ↓
  };

  return (
    <div className={styles.sortMenu}>
      <button
        className={styles.selectSortButton}
        onClick={dropdownToggle}
        ref={wrapperRef}
      >
        {searchParams.get("sort") === "time" ? "최신순" : "이름순"}
        <img src={arrowDirection} alt={arrowDirection} />
      </button>
      {viewDropdown && (
        <ul className={styles.alignButtons}>
          <li>
            <button
              className={styles.alignButton}
              onClick={() => handleSort("name")}
            >
              이름순
            </button>
          </li>
          <li>
            <button
              className={styles.alignButton}
              onClick={() => handleSort("time")}
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
