import styled from "./ListHeader.module.css";
import HomeButton from "../HomeButton/HomeButton";
import BoxButton from "../BoxButton/BoxButton";

function ListHeader() {
  return (
    <header className={styled.header}>
      <HomeButton />
      <BoxButton />
    </header>
  );
}

export default ListHeader;
