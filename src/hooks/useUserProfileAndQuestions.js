import { useState, useEffect, useCallback } from "react";
import getSubjectInfo from "../utils/postpageAPI/getSubjectInfo.js";
import getSubjectQuestion from "../utils/postpageAPI/getSubjectQuestion.js";

const useUserProfileAndQuestions = (id) => {
  const [userProfile, setUserProfile] = useState({});
  const [userQuestions, setUserQuestions] = useState([]);

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

  return { userProfile, userQuestions };
};

export { useUserProfileAndQuestions };
