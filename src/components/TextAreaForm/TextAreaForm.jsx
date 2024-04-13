import React, { useState } from "react";
import styles from "./TextAreaForm.module.css";
import BoxButton from "../BoxButton/BoxButton";
import postQuestion from "../../utils/postQuestion";

export default function TextAreaForm({
  placeholder,
  buttonOnclick,
  buttonText,
  initialText = "",
  answererProfile,
}) {
  const [textValue, setTextValue] = useState(initialText);

  const handleTextareaChange = (event) => {
    setTextValue(event.target.value);
  };

  const isTextareaEmpty = textValue.trim() === "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    buttonOnclick(textValue);
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
      <BoxButton
        text={buttonText}
        onClick={handleSubmit}
        disabled={isTextareaEmpty}
      />
    </>
  );
}
