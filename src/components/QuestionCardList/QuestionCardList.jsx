/**
 * TODO:
 * -[x] 리스트 데이터로 매핑하여 렌더링하기
 * -[x] api 요청과 유사하게 mock 데이터로 로직 검사
 * -[] 페이지네이션 한다면 태블릿 사이즈일 때 9개가 되야하므로 이정도 고려
 * {
  count*	integer required - 서브젝트 총 갯수
  next	string($uri) - 다음 페이지
  previous	string($uri) - 이전 페이지
  results* required - 서브젝트(피드아이템) [Subject{
                  id	ID[...] - 피드 아이디
                  name* required	Name[...] - 피드 이름 필수
                  imageSource	Imagesource[...] - 피드 이미지
                  questionCount	Questioncount[...] - 피드의 질문 갯수
                  createdAt	CreatedAt[...] - 피드 만든 시간
                  team* required	Team[...]} - 코드잇 팀 말하는 듯
  ]}
  * FIXME:
  * -[] 반응형 디자인 적용됬을 때 타이틀 사라지는 문제
  * -[] 피드의 개수가 정확히 박스 안에 들어가게 해야함
  * -[] 이미지가 동그란 박스에 들어가도록 해야함
 */

import QuestionCard from "../QuestionCard/QuestionCard";
import styles from "./QuestionCardList.module.css";
import { useCallback, useEffect, useState } from "react";

function QuestionCardList() {
  const [feeds, setFeeds] = useState([]);

  async function getSubjects() {
    const response = await (
      await fetch("https://openmind-api.vercel.app/5-4/subjects/")
    ).json();

    if (!response) return console.error("요청이 실패했습니다.");

    const { results } = response;

    return results;
  }

  const displaySubjects = useCallback(async () => {
    try {
      const newFeeds = await getSubjects();
      setFeeds(newFeeds);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    displaySubjects();
  }, [displaySubjects]);

  return (
    <ul className={styles.listContainer}>
      {feeds?.map((feed, id) => (
        <li key={id}>
          <QuestionCard feed={feed} />
        </li>
      ))}
    </ul>
  );
}

export default QuestionCardList;
