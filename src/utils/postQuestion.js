const BASE_URL = "https://openmind-api.vercel.app/5-4";

export default async function postQuestion(formData, subjectId) {
  const response = await fetch(`${BASE_URL}/subjects/${subjectId}/questions/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    return;
  }
  const body = response.json();
  return body;
}
