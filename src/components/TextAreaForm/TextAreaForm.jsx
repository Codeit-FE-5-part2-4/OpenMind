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
  const [textlength, setTextLenght] = useState(initialText.length);

  const handleTextareaChange = (event) => {
    const newTextValue = event.target.value;
    if (newTextValue.length <= maxLength) {
      setTextValue(newTextValue);
      setTextLenght(newTextValue.length);
    }
  };

  const lengthStyle =
    textlength < maxLength ? styles.currentLength : styles.maxLength;

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
      />
      <span className={lengthStyle}>
        {textlength}/{maxLength}
      </span>
      <BoxButton
        text={buttonText}
        onClick={handleSubmit}
        disabled={isTextareaEmpty}
      />
    </>
  );
}
