import { useState } from "react";
import styled from "./SortList.module.css";
import arrowUp from "../../assets/images/icon/Arrow-up.svg";
import arrowDown from "../../assets/images/icon/Arrow-down.svg";

function SortList() {
  const [view, setView] = useState(false);
  const [title, setTitle] = useState("이름순");
  const [arrowDirection, setArrowDirection] = useState(arrowDown);

  // const onClick = (e) => {
  //   setTitle(e.target);
  // };

  return (
    <ul className={styled.sortMenu}>
      <li>
        <button
          className={styled.selectSortButton}
          onClick={() => {
            setView(!view);
            view ? setArrowDirection(arrowDown) : setArrowDirection(arrowUp);
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
            onClick={() => setTitle("이름순")}
            name="이름순"
          >
            이름순
          </button>
          <button
            className={styled.alignButton}
            onClick={() => setTitle("최신순")}
          >
            최신순
          </button>
        </li>
      )}
    </ul>
  );
}
export default SortList;
