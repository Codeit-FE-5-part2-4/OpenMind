import { useState, useEffect, useCallback } from "react";
import getSubjectInfo from "../utils/postpageAPI/getSubjectInfo.js";
import getSubjectQuestion from "../utils/postpageAPI/getSubjectQuestion.js";
import { useNavigate } from "react-router-dom";

const useUserProfileAndQuestions = (id) => {
  const [userProfile, setUserProfile] = useState({});
  const [userQuestions, setUserQuestions] = useState([]);
  const navigate = useNavigate();

  const fetchDataAndSetUserProfile = useCallback(async () => {
    try {
      let result = await getSubjectInfo(id);
      setUserProfile(result);
    } catch (error) {
      navigate("/not-found");
    }
  }, [id, navigate]);

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

  const updateUserQuestions = () => {
    fetchDataAndSetUserQuestions();
  };

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  return { userProfile, userQuestions, updateUserQuestions };
};

export { useUserProfileAndQuestions };
