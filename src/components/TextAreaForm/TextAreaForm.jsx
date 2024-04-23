import React, { useState } from "react";
import styles from "./TextAreaForm.module.css";
import BoxButton from "../BoxButton/BoxButton";

export default function TextAreaForm({
  placeholder,
  buttonOnclick,
  buttonText,
  initialText = "",
  maxLength = 500,
}) {
  const [textValue, setTextValue] = useState(initialText);
  const [textLength, setTextLength] = useState(initialText.length);

  const handleTextareaChange = (event) => {
    const newTextValue = event.target.value;
    if (newTextValue.length <= maxLength) {
      setTextValue(newTextValue);
      setTextLength(newTextValue.length);
    }
  };

  const handlePaste = (event) => {
    const pastedText = event.clipboardData.getData("text/plain");
    const newTextValue = textValue + pastedText;
    if (newTextValue.length <= maxLength) {
      setTextValue(newTextValue);
      setTextLength(newTextValue.length);
    } else {
      setTextValue(newTextValue.substring(0, maxLength));
      setTextLength(maxLength);
    }
    event.preventDefault();
  };

  const lengthStyle =
    textLength < maxLength ? styles.currentLength : styles.maxLength;

  const isTextareaEmpty = textValue.trim() === "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = textValue;
    setTextValue("");
    buttonOnclick(content);
  };

  return (
    <>
      <textarea
        type="text"
        className={styles.textArea}
        placeholder={placeholder}
        value={textValue}
        onChange={handleTextareaChange}
        onPaste={handlePaste}
      />
      <span className={lengthStyle}>
        {textLength}/{maxLength}
      </span>
      <BoxButton
        text={buttonText}
        onClick={handleSubmit}
        disabled={isTextareaEmpty}
      />
    </>
  );
}
