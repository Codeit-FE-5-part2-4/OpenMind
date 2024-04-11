import styles from './TextAreaForm.module.css';

export default function TextAreaForm({
  value,
  placeholder,
  onChange,
  buttonOnclick,
  buttonDisabled,
}) {
  return (
    <>
      <textarea
        type="text"
        className={styles.textArea}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button onClick={buttonOnclick} disabled={buttonDisabled}>
        질문 보내기
      </button>
    </>
  );
}
