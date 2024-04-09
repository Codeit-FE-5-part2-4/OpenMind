import styles from "./FloatingButton.module.css";

function FloatingButton({ text, size }) {
    return (
        <button
            className={`${styles.FloatingButton} ${
                size === "large" ? styles.FloatingButtonLarge : null
            }`}
        >
            {text}
        </button>
    );
}

export default FloatingButton;
