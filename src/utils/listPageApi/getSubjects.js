export async function getSubjects({ limit, offset, sort }) {
  try {
    const response = await fetch(
      `https://openmind-api.vercel.app/5-4/subjects/?limit=${limit}&offset=${offset}&sort=${sort}`
    );

    if (!response.ok) {
      throw new Error(`${response.status}: 요청이 실패했습니다.`);
    }

    const fetchData = await response.json();

    const { results, count, next, previous } = fetchData;

    return { results, count, next, previous };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
