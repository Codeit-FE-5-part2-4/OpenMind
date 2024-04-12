import { useState } from "react";
import styles from "./SortList.module.css";
import arrowUp from "../../assets/images/icon/Arrow-up.svg";
import arrowDown from "../../assets/images/icon/Arrow-down.svg";
import QuestionCardList from "../QuestionCardList/QuestionCardList";
import { List } from "../../pages/QuestionCardListPage/mockDatas";

/* 정렬기능 구현
1. 최신순(기본)  createdAt
2. 이름순   name
*/

function SortList() {
  const [sort, setSort] = useState("createdAt"); // 정렬기준 설정 useState
  const [viewDropdown, setViewDropdown] = useState(false); // 드롭다운 토글 useState
  const [title, setTitle] = useState("최신순"); //제목 useState
  const [arrowDirection, setArrowDirection] = useState(arrowDown); // 토글메뉴 화살표 useState

  const handleSortByNameClick = () => {
    setSort("name");
    setTitle("이름순");
  };
  const handleNewestClick = () => {
    setSort("createdAt");
    setTitle("최신순");
  };

  const sortList = [...List].sort((a, b) =>
    b[sort] < a[sort] ? -1 : b[sort] > a[sort] ? 1 : 0
  );

  const dropdownToggle = () => {
    setViewDropdown(!viewDropdown);
    viewDropdown ? setArrowDirection(arrowDown) : setArrowDirection(arrowUp); // 드롭다운 페이지 활성화시 ↑ 비활성화시 ↓
  };

  return (
    <>
      <ul className={styles.sortMenu}>
        <li>
          <button className={styles.selectSortButton} onClick={dropdownToggle}>
            {title}
            <img src={arrowDirection} alt={arrowDirection} />
          </button>
        </li>
        {viewDropdown && (
          <li className={styles.alignButtons}>
            <button
              className={styles.alignButton}
              onClick={handleSortByNameClick}
            >
              이름순
            </button>
            <button className={styles.alignButton} onClick={handleNewestClick}>
              최신순
            </button>
          </li>
        )}
      </ul>
    </>
  );
}
export default SortList;
