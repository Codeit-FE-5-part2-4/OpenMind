import { mockProfile } from "./mockdata";
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
    <div>
      <img src={mockProfile.imageSource} />
      <span>{mockProfile.name}</span>
      <ul>
        {Icons.map((item, index) => (
          <li key={index}>
            <button>
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
