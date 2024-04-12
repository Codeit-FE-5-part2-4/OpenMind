import React, { useState } from "react";
import styles from "./PostProfile.module.css";
import faceBookImage from "../../assets/images/shareicon/Facebook.svg";
import kakaoImage from "../../assets/images/shareicon/Kakao.svg";
import linkShareImage from "../../assets/images/shareicon/Link.svg";

const POST_BASE_URL = "https://openmind-api.vercel.app/5-4/post";

export default function PostProfile({ userProfile }) {
  const [showToast, setShowToast] = useState(false);

  const handleCopyLinkClipBoard = async () => {
    const copiedLink = `${POST_BASE_URL}/${userProfile.id}`;
    try {
      await navigator.clipboard.writeText(copiedLink);
      setShowToast(true); // 토스트 메시지 표시
      setTimeout(() => setShowToast(false), 3000); // 5초 후에 토스트 메시지 숨김
    } catch (err) {
      console.log(err);
    }
  };

  const SHARE_BUTTON_INFO = [
    {
      altMessage: "copy link",
      imgSource: linkShareImage,
      onClick: handleCopyLinkClipBoard,
    },
    { altMessage: "link to facebook", imgSource: faceBookImage },
    { altMessage: "link to kakao", imgSource: kakaoImage },
  ];

  return (
    <div className={styles.profileContainer}>
      <img
        className={styles.profileImage}
        src={userProfile.imageSource}
        alt={userProfile.name}
      />
      <span className={styles.profileUserName}>{userProfile.name}</span>
      <ul className={styles.shareButtonBox}>
        {SHARE_BUTTON_INFO.map((item, index) => (
          <li key={index}>
            <button className={styles.shareButton} onClick={item.onClick}>
              <img alt={item.altMessage} src={item.imgSource} />
            </button>
          </li>
        ))}
      </ul>
      <div className={`${styles.toast} ${showToast ? styles.show : ""}`}>
        URL이 복사되었습니다
      </div>
    </div>
  );
}
