import likeIcon from "../../assets/images/icon/likeIcon.svg";
import dislikeIcon from "../../assets/images/icon/dislikeIcon.svg";

export default function QuestionCard({ question, AnswererProfile }) {
  const answerStatusMsg = {
    isAnswered: "답변완료",
    notAnswered: "미답변",
  };

  return (
    <div>
      <span>
        {question.answer
          ? answerStatusMsg.isAnswered
          : answerStatusMsg.notAnswered}
      </span>
      <div>
        <span>{question.createdAt}</span>
        <p>{question.content}</p>
      </div>
      <div>
        <img src={AnswererProfile.imageSource} />
        <div>
          <span>{AnswererProfile.name}</span>
          <span>{question.answer.createdAt}</span>
          <p>{question.answer.content}</p>
        </div>
      </div>
      <div>
        <div>
          <img src={likeIcon} />
          <span>{`좋아요 ${question.like}`}</span>
        </div>
        <div>
          <img src={dislikeIcon} />
          <span>{`싫어요 ${question.dislike}`}</span>
        </div>
      </div>
    </div>
  );
}
