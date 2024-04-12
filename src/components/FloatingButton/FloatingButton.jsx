import styles from "./FloatingButton.module.css";
import classNames from "classnames";

function FloatingButton({ text, size, onClick }) {
  const buttonClass = classNames(styles.FloatingButton, {
    [styles.FloatingButtonLarge]: size === "large",
  });

  return (
    <button onClick={onClick} className={buttonClass}>
      {text}
    </button>
  );
}

export default FloatingButton;
