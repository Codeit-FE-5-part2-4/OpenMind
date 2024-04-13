const BASE_URL = "https://openmind-api.vercel.app/5-4";
const SUBJECTS_PATH = "/subjects";

export default async function getSubjectInfo(id) {
  const response = await fetch(`${BASE_URL}${SUBJECTS_PATH}/${id}/`);
  const result = await response.json();
  return result;
}
