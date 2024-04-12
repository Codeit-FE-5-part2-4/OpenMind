const BASE_URL = "https://openmind-api.vercel.app/5-4/";

export const postUserInfo = async (value) => {
  try {
    if (!value) return;
    const response = await fetch(`${BASE_URL}subjects/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: value,
      }),
    });

    const nameData = await response.json();
    return nameData;
  } catch (e) {
    alert(e.message);
  }
};
