const BASE_URL = "https://openmind-api.vercel.app/5-4";
const QUESTION_PATH = "/questions";
const ANSWER_PATH = "/answers";

export default async function createAnswer(
  questionId,
  content = "",
  isRejected = false
) {
  function createAnswerRequestForm(content, isRejected) {
    const formData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, isRejected }),
    };

    return formData;
  }

  const response = await fetch(
    `${BASE_URL}${QUESTION_PATH}/${questionId}${ANSWER_PATH}/`,
    createAnswerRequestForm(content, isRejected)
  );

  if (!response.ok) {
    throw new Error("답변 생성 실패");
  }

  const result = await response.json();
  return result;
}
