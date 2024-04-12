import BoxButton from "../../components/BoxButton/BoxButton";
import styles from "./Main.module.css";
import logoImg from "../../assets/images/logo.png";
import NameInput from "../../components/NameInput/NameInput";
import MainHeader from "../../components/MainHeader/MainHeader";
import { useCallback, useState } from "react";
import { postUserInfo } from "../../api/nameApi";
import { useNavigate } from "react-router-dom";

function Main() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  //button 이벤트
  const handleNameSubmit = useCallback(async () => {
    try {
      const nameData = await postUserInfo(value);
      if (!nameData || !nameData.id) {
        throw new Error("Invalid data format");
      }
      const { id } = nameData;
      navigate(`post/${id}/answer`);
    } catch (e) {
      alert(e.message);
    }
  }, [navigate, value]);

  // 인풋 변경
  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  //서브밋
  const onSubmitForm = (e) => {
    e.preventDefault();
    handleNameSubmit();
    setValue("");
  };

  return (
    <main className={styles.mainWrap}>
      <MainHeader />
      <h1 className={styles.logo}>
        <img src={logoImg} alt="" />
      </h1>
      <div className={styles.mainConBox}>
        <form onSubmit={onSubmitForm}>
          <NameInput
            placeholder={"이름을 입력하세요"}
            onChangeInput={onChangeInput}
            value={value}
          />
          <BoxButton text={"질문 받기"} onClick={handleNameSubmit} />
        </form>
      </div>
    </main>
  );
}

export default Main;
