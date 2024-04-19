import styles from "./FloatingButton.module.css";
import classNames from "classnames";
import { motion } from "framer-motion";

function FloatingButton({ text, size, onClick }) {
  const buttonClass = classNames(styles.FloatingButton, {
    [styles.FloatingButtonLarge]: size === "large",
  });

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      onHoverStart={(e) => {}}
      onHoverEnd={(e) => {}}
    >
      <button onClick={onClick} className={buttonClass}>
        {text}
      </button>
    </motion.div>
  );
}

export default FloatingButton;
