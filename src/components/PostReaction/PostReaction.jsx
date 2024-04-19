import likeIcon from "../../assets/images/icon/likeIcon.svg";
import likeIconDefault from "../../assets/images/icon/likeIcon-default.svg";
import dislikeIcon from "../../assets/images/icon/dislikeIcon.svg";
import dislikeIconDefault from "../../assets/images/icon/dislikeIcon-default.svg";
import styles from "./PostReaction.module.css";
import postReaction from "../../utils/postpageAPI/postReaction";
import { useState } from "react";

export default function PostReaction({ question }) {
  const [newQuestion, setNewQuestion] = useState(question);

  const likeIconSrc = newQuestion.like === 0 ? likeIconDefault : likeIcon;
  const likeTextSrc =
    newQuestion.like === 0 ? styles.reactionTextDefault : styles.likeText;
  const dislikeIconSrc =
    newQuestion.dislike === 0 ? dislikeIconDefault : dislikeIcon;
  const dislikeTextSrc =
    newQuestion.dislike === 0 ? styles.reactionTextDefault : styles.dislikeText;

  const handleReactionSubmit = async (reaction) => {
    try {
      let result = await postReaction(reaction, question.id);
      setNewQuestion(result);
    } catch (error) {
      console.error("질문 목록을 가져오는 중에 오류가 발생했습니다:");
    }
  };

  return (
    <div className={styles.judgeAnswerContainer}>
      <div>
        <button
          onClick={() => handleReactionSubmit("like")}
          type="submit"
          className={styles.judge}
        >
          <img src={likeIconSrc} alt="좋아요버튼" />
          <span className={likeTextSrc}>{`${newQuestion.like}`}</span>
        </button>
      </div>
      <div>
        <button
          onClick={() => handleReactionSubmit("dislike")}
          type="submit"
          className={styles.judge}
        >
          <img src={dislikeIconSrc} alt="싫아요버튼" />
          <span className={dislikeTextSrc}>{`${newQuestion.dislike}`}</span>
        </button>
      </div>
    </div>
  );
}
