import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

function HomeButton({ size }) {
  const SIZE = {
    L: {
      width: 170,
      height: 67,
    },

    M: {
      width: 146,
      height: 57,
    },

    S: {
      width: 124,
      height: 49,
    },
  };

  const Size = SIZE[size];

  return (
    <Link to="/">
      <img
        src={Logo}
        style={{ width: `${Size.width}px`, height: `${Size.height}px` }}
        alt="로고 이미지"
      />
    </Link>
  );
}

export default HomeButton;
