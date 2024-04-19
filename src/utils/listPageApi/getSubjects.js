export async function getSubjects({ limit, offset, sort }) {
  try {
    const response = await fetch(
      `https://openmind-api.vercel.app/5-4/subjects/?limit=${limit}&offset=${offset}&sort=${sort}`
    );

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `${response.status} ${response.statusText}: ${errorBody}`
      );
    }

    const fetchData = await response.json();

    const { results, count, next, previous } = fetchData;

    return { results, count, next, previous };
  } catch (error) {
    throw error;
  }
}
