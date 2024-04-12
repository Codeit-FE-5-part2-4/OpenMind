import React, { useState } from "react";
import styles from "./TextAreaForm.module.css";
import BoxButton from "../BoxButton/BoxButton";

export default function TextAreaForm({
  placeholder,
  buttonOnclick,
  buttonText,
  initialText = "",
}) {
  const [textValue, setTextValue] = useState(initialText);

  const handleTextareaChange = (event) => {
    setTextValue(event.target.value);
  };

  const isTextareaEmpty = textValue.trim() === "";

  return (
    <>
      <textarea
        type="text"
        className={styles.textArea}
        placeholder={placeholder}
        value={textValue}
        onChange={handleTextareaChange}
      />
      <BoxButton
        text={buttonText}
        onClick={buttonOnclick}
        disabled={isTextareaEmpty}
      />
    </>
  );
}
