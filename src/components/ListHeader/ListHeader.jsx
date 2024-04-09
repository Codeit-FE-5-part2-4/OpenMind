import styled from "./ListHeader.module.css";
import HomeButton from "../HomeButton/HomeButton";
import BoxButton from "../../components/BoxButton/BoxButton";

function ListHeader() {
  return (
    <header className={styled.header}>
      <HomeButton size="M" />
      <BoxButton />
    </header>
  );
}

export default ListHeader;
