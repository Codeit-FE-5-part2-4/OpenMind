import styles from "./ListSortModal.module.css";
import { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import arrowDown from "../../../../assets/images/icon/Arrow-down.svg";
import arrowUp from "../../../../assets/images/icon/Arrow-up.svg";

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

  const dropdownToggle = useCallback(() => {
    setViewDropdown(!viewDropdown);
    viewDropdown ? setArrowDirection(arrowDown) : setArrowDirection(arrowUp); // 드롭다운 페이지 활성화시 ↑ 비활성화시 ↓
  }, [viewDropdown]);

  return (
    <div className={styles.sortMenu}>
      <motion.button
        className={styles.selectSortButton}
        onClick={dropdownToggle}
        ref={wrapperRef}
        whileTap={{ scale: 0.95 }}
      >
        {searchParams.get("sort") === "time" ? "최신순" : "이름순"}
        <img src={arrowDirection} alt={arrowDirection} />
      </motion.button>
      <AnimatePresence mode="wait">
        {viewDropdown && (
          <motion.ul
            className={styles.alignButtons}
            key={viewDropdown ? "open" : "closed"}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
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
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
export default ListSortModal;
