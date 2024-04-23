import { BASE_URL } from "../constants.js";

export async function getSubjects({ limit, offset, sort }) {
  try {
    const response = await fetch(
      `${BASE_URL}/subjects/?limit=${limit}&offset=${offset}&sort=${sort}`
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
