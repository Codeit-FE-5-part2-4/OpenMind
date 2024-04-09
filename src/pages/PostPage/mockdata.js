export const mockProfile = {
  id: 2,
  name: "강영훈",
  imageSource:
    "https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8",
  questionCount: 5,
  createdAt: "2023-10-23T05:08:05.825279Z",
};

export const mockQuestions = [
  {
    id: 41,
    subjectId: 23,
    content: "가장 좋아하는 동물이 궁금해요!",
    like: 0,
    dislike: 0,
    createdAt: "2023-10-31T09:27:59.497667Z",
    answer: {
      id: 22,
      content: "강아지를 좋아합니다",
      isRejected: true,
      createdAt: "2023-11-01T00:43:56.863795Z",
    },
  },
];
