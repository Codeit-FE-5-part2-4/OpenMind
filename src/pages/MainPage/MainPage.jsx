import BoxButton from "../../components/BoxButton/BoxButton";
import styles from "./MainPage.module.css";
import logoImg from "../../assets/images/logo.png";
import NameInput from "../../components/NameInput/NameInput";
import MainHeader from "../../components/MainHeader/MainHeader";
import { useCallback, useState, useEffect } from "react";
import { postUserInfo } from "../../utils/nameApi";
import { useNavigate } from "react-router-dom";
import NameCaution from "../../components/NameCaution/NameCaution";
import MainAni from "../../components/MainAni/MainAni";
import { motion, AnimatePresence } from "framer-motion";

function Main() {
  const [value, setValue] = useState("");
  const [cautionText, setCautionText] = useState("");
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  const navigate = useNavigate();

  //button 이벤트
  const handleNameSubmit = useCallback(async () => {
    try {
      const nameData = await postUserInfo(value, setCautionText);

      const { id } = nameData;
      localStorage.setItem("id", id);
      navigate(`post/${id}/answer`);
    } catch (e) {
      console.error(e);
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

  //애니메이션
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationComplete(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className={styles.mainWrap}>
      <AnimatePresence>
        {!isAnimationComplete && (
          <motion.div
            className={styles.MainAniWrap}
            key="main-ani"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 2.4, duration: 1 }}
            exit={{ opacity: 0 }}
          >
            <MainAni />
          </motion.div>
        )}
      </AnimatePresence>
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
