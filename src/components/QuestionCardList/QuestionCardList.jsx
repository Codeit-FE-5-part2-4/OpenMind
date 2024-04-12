/**
 * TODO:
 * -[x] 리스트 데이터로 매핑하여 렌더링하기
 * -[x] api 요청과 유사하게 mock 데이터로 로직 검사
 * -[x] 리스트는 프롭을 받아 렌더링만 담당하게끔 하여 로직과 ui를 분리
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
  * 페이지네이션 구현할 때 고려할 사항 - 각 페이지당 아이템 개수 - limit, 전체 페이지 개수
 */

import QuestionCard from "../QuestionCard/QuestionCard";
import styles from "./QuestionCardList.module.css";

function QuestionCardList({ feeds }) {
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
