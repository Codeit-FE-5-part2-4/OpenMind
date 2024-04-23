import React, { useState } from "react";
import styles from "./PostProfile.module.css";
import faceBookImage from "../../assets/images/shareicon/Facebook.svg";
import kakaoImage from "../../assets/images/shareicon/Kakao.svg";
import linkShareImage from "../../assets/images/shareicon/Link.svg";
import { shareKakao } from "../../utils/shareKakao";

import { shareFacebook } from "../../utils/shareFacebook";

export default function PostProfile({ userProfile }) {
  const [showToast, setShowToast] = useState(false);

  const SHARE_URL = `https://openmind5-4.netlify.app/post/${userProfile.id}`;

  const handleCopyLinkClipBoard = async () => {
    const copiedLink = SHARE_URL;
    try {
      await navigator.clipboard.writeText(copiedLink);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
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
    {
      altMessage: "link to kakao",
      imgSource: kakaoImage,
      onClick: () => shareKakao(userProfile.name, SHARE_URL),
    },
    {
      altMessage: "link to facebook",
      imgSource: faceBookImage,
      onClick: () => shareFacebook(SHARE_URL),
    },
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
