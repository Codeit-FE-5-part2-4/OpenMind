const BASE_URL = "https://openmind-api.vercel.app/5-4";

export async function toggleRejectAnswer(answerId, isQuestionRejected) {
  try {
    await fetch(`${BASE_URL}/answers/${answerId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isRejected: isQuestionRejected }),
    });
  } catch (error) {
    console.error(
      `Error toggling whether to reject answer ${answerId}: ${error}`
    );
  }
}
