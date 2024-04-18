import arrowIcon from "../../assets/images/icon/arrow-right.svg";
import styles from "./ArrowButton.module.css";
import { useNavigate } from "react-router-dom";

function ArrowButton({ text }) {
  const navigate = useNavigate();

  /** props로 받은 text를 이용하여 클릭시 이동할 페이지 결정(따로 컴포넌트로 뺄지 고민) */
  const handleNavigate = () => {
    const id = localStorage.getItem("id");
    switch (text) {
      case "질문하러 가기":
        navigate("/list");
        break;
      case "리스트로 가기":
        navigate("/list");
        break;
      case "답변하러가기":
        id === null ? navigate("/") : navigate(`/post/${id}/answer`);
        break;
      default:
        navigate("/");
        break;
    }
  };
  return (
    <button className={styles.ArrowButton} onClick={handleNavigate}>
      {text} <img src={arrowIcon} alt="" />
    </button>
  );
}

export default ArrowButton;
