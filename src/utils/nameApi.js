import Filter from "badwords-ko";
import { BASE_URL } from "./constants.js";

const filter = new Filter();

export const checkNameValidity = (value) => {
  if (filter.isProfane(value)) {
    throw new Error("비속어가 포함되어 있어요.");
  }
  if (!value) {
    throw new Error("이름이 비어 있어요.");
  }
  if (value.length > 30) {
    throw new Error("이름이 너무 길어요.");
  }
};

export const postUserInfo = async (value, setCautionText) => {
  try {
    checkNameValidity(value);
    const response = await fetch(`${BASE_URL}/subjects/`, {
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
