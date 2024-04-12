export const shareKakao = () => {
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init("2bc24641675f91dae9be60e52cab838e"); // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
    }

    kakao.Share.sendDefault({
      objectType: "feed", // 카카오 링크 공유 여러 type들 중 feed라는 타입 -> 자세한 건 카카오에서 확인
      content: {
        title: "test", // 인자값으로 받은 title
        description: "설명", // 인자값으로 받은 title
        imageUrl:
          "https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8",
        link: {
          mobileWebUrl: "https://developers.kakao.com/", // 인자값으로 받은 route(uri 형태)
          webUrl: "https://developers.kakao.com/",
        },
      },
      buttons: [
        {
          title: "title",
          link: {
            mobileWebUrl: "https://developers.kakao.com/",
            webUrl: "https://developers.kakao.com/",
          },
        },
      ],
    });
  }
};
