import React, { useState } from 'react';
import styles from './TextAreaForm.module.css';

export default function TextAreaForm({
  placeholder,
  buttonOnclick,
  buttonText,
}) {
  const [textValue, setTextValue] = useState('');

  const handleTextareaChange = (event) => {
    setTextValue(event.target.value);
  };

  const isTextareaEmpty = textValue.trim() === '';

  return (
    <>
      <textarea
        type="text"
        className={styles.textArea}
        placeholder={placeholder}
        value={textValue}
        onChange={handleTextareaChange}
      />
      <button onClick={buttonOnclick} disabled={isTextareaEmpty}>
        {buttonText}
      </button>
    </>
  );
}
