import likeIcon from "../../assets/images/icon/likeIcon.svg";
import likeIconDefault from "../../assets/images/icon/likeIcon-default.svg";
import dislikeIcon from "../../assets/images/icon/dislikeIcon.svg";
import dislikeIconDefault from "../../assets/images/icon/dislikeIcon-default.svg";
import styles from "./PostReaction.module.css";

export default function PostReaction({ question, onReaction }) {
  // '좋아요''싫어요'가 0일때, 0이상일 때 각기 다른 스타일 적용
  const likeIconSrc = question.like === 0 ? likeIconDefault : likeIcon;
  const likeTextSrc =
    question.like === 0 ? styles.reactionTextDefault : styles.likeText;
  const dislikeIconSrc =
    question.dislike === 0 ? dislikeIconDefault : dislikeIcon;
  const dislikeTextSrc =
    question.dislike === 0 ? styles.reactionTextDefault : styles.dislikeText;

  return (
    <div className={styles.judgeAnswerContainer}>
      <div>
        <button
          onClick={() => onReaction("like")}
          type="submit"
          className={styles.judge}
        >
          <img src={likeIconSrc} alt="좋아요버튼" />
          <span className={likeTextSrc}>{`좋아요 ${question.like}`}</span>
        </button>
      </div>
      <div>
        <button
          onClick={() => onReaction("dislike")}
          type="submit"
          className={styles.judge}
        >
          <img src={dislikeIconSrc} alt="싫아요버튼" />
          <span className={dislikeTextSrc}>{`싫어요 ${question.dislike}`}</span>
        </button>
      </div>
    </div>
  );
}
