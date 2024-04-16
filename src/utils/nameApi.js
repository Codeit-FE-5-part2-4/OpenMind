import Filter from "badwords-ko";

const BASE_URL = "https://openmind-api.vercel.app/5-4/";

const filter = new Filter();

export const checkNameValidity = (value) => {
  if (filter.isProfane(value)) {
    throw new Error("비속어가 포함되어 있습니다.");
  }
  if (!value) {
    throw new Error("이름이 비어 있습니다.");
  }
  if (value.length > 30) {
    throw new Error("이름의 너무 길어요.");
  }
};

export const postUserInfo = async (value, setCautionText) => {
  try {
    checkNameValidity(value);
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
    setCautionText(e.message);
  }
};
