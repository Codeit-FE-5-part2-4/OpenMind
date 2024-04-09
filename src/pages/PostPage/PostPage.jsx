import logoImage from "../../assets/images/logo.png";
import PostProfile from "../../components/PostProfile/PostProfile";

export default function PostPage() {
  return (
    <div>
      <img src={logoImage} alt="openmind" />
      <PostProfile />
    </div>
  );
}
