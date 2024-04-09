import speechBubble from "../../assets/images/icon/speech-bubble.svg";
import testCatProfile from "../../assets/images/test-cat-profile.png";

function QuestionCardList() {
  return (
    <ul>
      <li>
        <a href="/">
          <img src={testCatProfile} alt="프로필 사진" />
          <h2>이름</h2>
          <div>
            <img src={speechBubble} alt="말풍선" />
            <div>받은 질문</div>
            <div>9개</div>
          </div>
        </a>
      </li>
    </ul>
  );
}

export default QuestionCardList;
