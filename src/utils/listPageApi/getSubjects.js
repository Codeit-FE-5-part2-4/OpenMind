export async function getSubjects({ limit, offset }) {
  const response = await (
    await fetch(
      `https://openmind-api.vercel.app/5-4/subjects/?limit=${limit}&offset=${offset}`
    )
  ).json();

  if (!response) return console.error("요청이 실패했습니다.");

  const { results, count, next, previous } = response;

  return { results, count, next, previous };
}
