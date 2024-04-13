import React, { useState, useEffect } from "react";
import styles from "../PostPage/PostPage.module.css";
import logoImage from "../../assets/images/logo.png";
import PostProfile from "../../components/PostProfile/PostProfile";
import QuestionFeedList from "../../components/QuestionFeedList/QuestionFeedList";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import getSubjectInfo from "../../utils/postpageAPI/getSubjectInfo";
import getSubjectQuestion from "../../utils/postpageAPI/getSubjectQuestion";
import { useParams } from "react-router-dom";

export default function AnswerPage() {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState({});
  const [userQuestions, setUserQuestions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const userProfileData = await getSubjectInfo(id);
        setUserProfile(userProfileData);

        const userQuestionsData = await getSubjectQuestion(id);
        setUserQuestions(userQuestionsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // Call the fetchData function when the component mounts
  }, [id]);

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
          <FloatingButton text="삭제하기" />
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
