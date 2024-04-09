import { useState } from "react";
import styled from "./SortList.module.css";
import arrowUp from "../../assets/images/icon/Arrow-up.svg";
import arrowDown from "../../assets/images/icon/Arrow-down.svg";

function SortList() {
  const [view, setView] = useState(false); // 드롭다운 토글 useState
  const [title, setTitle] = useState("최신순"); //제목 useState
  const [arrowDirection, setArrowDirection] = useState(arrowDown); // 토글메뉴 화살표 useState

  return (
    <ul className={styled.sortMenu}>
      <li>
        <button
          className={styled.selectSortButton}
          onClick={() => {
            setView(!view);
            view ? setArrowDirection(arrowDown) : setArrowDirection(arrowUp); // 드롭다운 페이지 활성화시 ↑ 비활성화시 ↓
          }}
        >
          {title}
          <img src={arrowDirection} alt={arrowDirection} />
        </button>
      </li>
      {view && (
        <li className={styled.alignButtons}>
          <button
            className={styled.alignButton}
            onClick={() => {
              setTitle("이름순");
            }}
          >
            이름순
          </button>
          <button
            className={styled.alignButton}
            onClick={() => {
              setTitle("최신순");
            }}
          >
            최신순
          </button>
        </li>
      )}
    </ul>
  );
}
export default SortList;
