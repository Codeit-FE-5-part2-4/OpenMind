import styles from "./FloatingButton.module.css";
import classNames from "classnames";
import HoverAnimationDiv from "../HoverAnimationDiv/HoverAnimationDiv";

function FloatingButton({ text, size, onClick }) {
  const buttonClass = classNames(styles.FloatingButton, {
    [styles.FloatingButtonLarge]: size === "large",
  });

  return (
    <HoverAnimationDiv>
      {" "}
      <button onClick={onClick} className={buttonClass}>
        {text}
      </button>
    </HoverAnimationDiv>
  );
}

export default FloatingButton;
