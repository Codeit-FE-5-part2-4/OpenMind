export const shareKakao = (route) => {
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init("2bc24641675f91dae9be60e52cab838e"); // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
    }

    kakao.Share.sendDefault({
      objectType: "feed", // 카카오 링크 공유 여러 type들 중 feed라는 타입 -> 자세한 건 카카오에서 확인
      content: {
        title: "Openmind", // 인자값으로 받은 title
        description: "무엇이든 물어보세요", // 인자값으로 받은 title
        imageUrl: "https://ifh.cc/g/k2Wdn3.png",
        link: {
          mobileWebUrl: route, // 인자값으로 받은 route(uri 형태)
          webUrl: route,
        },
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            mobileWebUrl: route,
            webUrl: route,
          },
        },
      ],

      installTalk: true,
    });
  }
};
