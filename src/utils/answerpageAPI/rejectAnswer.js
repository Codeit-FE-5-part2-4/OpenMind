const BASE_URL = "https://openmind-api.vercel.app/5-4";

export async function rejectAnswer(answerId, isRejectedValue) {
  try {
    await fetch(`${BASE_URL}/answers/${answerId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isRejected: isRejectedValue }),
    });
    console.log(
      `Toggled whether to reject answer ${answerId} or not successfully.`
    );
  } catch (error) {
    console.error(
      `Error toggling whether to reject answer ${answerId}: ${error}`
    );
  }
}
