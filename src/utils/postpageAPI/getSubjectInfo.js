const BASE_URL = "https://openmind-api.vercel.app/5-4";
const SUBJECTS_PATH = "/subjects";

export default async function getSubjectInfo(id) {
  const response = await fetch(`${BASE_URL}${SUBJECTS_PATH}/${id}/`);
  if (!response.ok) {
    throw new Error("피드 페이지 조회를 실패했습니다!");
  }
  const result = await response.json();
  return result;
}
