import { mockProfile } from "./mockdata";
import styles from "./PostProfile.module.css";
import faceBookImage from "../../assets/images/shareicon/Facebook.svg";
import kakaoImage from "../../assets/images/shareicon/Kakao.svg";
import linkShareImage from "../../assets/images/shareicon/Link.svg";

const Icons = [
  { altMessage: "copy link", imgSource: linkShareImage },
  { altMessage: "link to facebook", imgSource: faceBookImage },
  { altMessage: "link to kakao", imgSource: kakaoImage },
];

export default function PostProfile(params) {
  return (
    <div className={styles.profileContainer}>
      <img className={styles.profileImage} src={mockProfile.imageSource} />
      <span className={styles.profileUserName}>{mockProfile.name}</span>
      <ul className={styles.shareButtonBox}>
        {Icons.map((item, index) => (
          <li key={index}>
            <button className={styles.shareButton}>
              <img alt={item.altMessage} src={item.imgSource} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* const linkShareIcon = {
  altMessage: "copy link",
  imgSource: linkShareImage,
};

const faceBookIcon = {
  altMessage: "link to facebook",
  imgSource: faceBookImage,
};

const kakaoIcon = {
  altMessage: "link to kakao",
  imgSource: kakaoImage,
}; */
