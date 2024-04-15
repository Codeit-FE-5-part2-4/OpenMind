const BASE_URL = "https://openmind-api.vercel.app/5-4";
const QUESTION_PATH = "/questions";
const ANSWER_PATH = "/answers";

export default async function createAnswer(questionId, content) {
  const formData = createAnswerRequestForm(content);

  const response = await fetch(
    `${BASE_URL}${QUESTION_PATH}/${questionId}${ANSWER_PATH}/`,
    formData
  );

  if (!response.ok) {
    throw new Error("답변 생성 실패");
  }

  const result = await response.json();
  return result;
}

function createAnswerRequestForm(content) {
  const formData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: content, isRejected: false }),
  };

  return formData;
}
