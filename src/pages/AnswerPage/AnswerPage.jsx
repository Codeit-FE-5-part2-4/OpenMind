import React, { useState, useEffect } from "react";
import styles from "../PostPage/PostPage.module.css";
import logoImage from "../../assets/images/logo.png";
import PostProfile from "../../components/PostProfile/PostProfile";
import QuestionFeedList from "../../components/QuestionFeedList/QuestionFeedList";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import getSubjectInfo from "../../utils/postpageAPI/getSubjectInfo";
import getSubjectQuestion from "../../utils/postpageAPI/getSubjectQuestion";
import { useParams, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import deleteFeed from "../../utils/answerpageAPI/deleteFeed";

export default function AnswerPage() {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState({});
  const [userQuestions, setUserQuestions] = useState([]);

  const navigate = useNavigate();
  const handleDeleteClick = async () => {
    await deleteFeed(userQuestions, userProfile.id);
    navigate("/list");
  };

  const fetchDataAndSetUserProfile = useCallback(async () => {
    try {
      let result = await getSubjectInfo(id);
      setUserProfile(result);
    } catch (error) {
      console.error("피드 페이지를 가져오는 중에 오류가 발생했습니다:", error);
    }
  }, [id]);

  const fetchDataAndSetUserQuestions = useCallback(async () => {
    try {
      let result = await getSubjectQuestion(id);
      setUserQuestions(result);
    } catch (error) {
      console.error("질문 목록을 가져오는 중에 오류가 발생했습니다:", error);
    }
  }, [id]);

  const handleLoad = useCallback(async () => {
    await fetchDataAndSetUserProfile(id);
    await fetchDataAndSetUserQuestions(id);
  }, [fetchDataAndSetUserProfile, fetchDataAndSetUserQuestions, id]);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <h1>
        <span className={styles.blind}>Openmind</span>
        <img className={styles.logoImage} src={logoImage} alt="openmind" />
      </h1>
      <PostProfile userProfile={userProfile} />
      <div className={styles.QuestionFeedContainer}>
        <div className={styles.FloatingButtonAtRightSide}>
          <FloatingButton text="삭제하기" onClick={handleDeleteClick} />
        </div>
        <QuestionFeedList
          questions={userQuestions}
          AnswererProfile={userProfile}
          isAnswerPage={true}
        />
      </div>
    </div>
  );
}
