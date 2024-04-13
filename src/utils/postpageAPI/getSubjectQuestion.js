const BASE_URL = "https://openmind-api.vercel.app/5-4";
const SUBJECTS_PATH = "/subjects";
const QEUSTIONS_PATH = "questions/";
export default async function getSubjectQuestion(id) {
  const response = await fetch(
    `${BASE_URL}${SUBJECTS_PATH}/${id}/${QEUSTIONS_PATH}`
  );
  const result = await response.json();
  return result.results;
}
