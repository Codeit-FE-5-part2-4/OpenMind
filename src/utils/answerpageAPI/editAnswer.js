const BASE_URL = "https://openmind-api.vercel.app/5-4";
const ANSWER_PATH = "/answers";

export default async function editAnswer(answerId, content) {
  const formData = createEditRequestForm(content);

  const response = await fetch(
    `${BASE_URL}${ANSWER_PATH}/${answerId}/`,
    formData
  );

  if (!response.ok) {
    throw new Error("답변 수정 실패");
  }

  const result = await response.json();
  return result;
}

function createEditRequestForm(content) {
  const formData = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: content }),
  };

  return formData;
}
