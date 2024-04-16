import BoxButton from "../../components/BoxButton/BoxButton";
import styles from "./MainPage.module.css";
import logoImg from "../../assets/images/logo.png";
import NameInput from "../../components/NameInput/NameInput";
import MainHeader from "../../components/MainHeader/MainHeader";
import { useCallback, useState } from "react";
import { checkNameValidity, postUserInfo } from "../../utils/nameApi";
import { useNavigate } from "react-router-dom";
import NameCaution from "../../components/NameCaution/NameCaution";

function Main() {
  const [value, setValue] = useState("");
  const [cautionText, setCautionText] = useState("");

  const navigate = useNavigate();

  //button 이벤트
  const handleNameSubmit = useCallback(async () => {
    try {
      const nameData = await postUserInfo(value);
      checkNameValidity(value);

      const { id } = nameData;
      navigate(`post/${id}/answer`);
    } catch (e) {
      setCautionText(e.message);
    }
  }, [navigate, value]);

  // 인풋 변경
  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  //서브밋
  const onSubmitForm = (e) => {
    e.preventDefault();
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
          <NameCaution cautionText={cautionText} />
          <BoxButton text={"질문 받기"} onClick={handleNameSubmit} />
        </form>
      </div>
    </main>
  );
}

export default Main;
