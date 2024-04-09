import styled from "./ListHeader.module.css";
import HomeButton from "../HomeButton/HomeButton";
// import ArrowButton from "../ArrowButton/ArrowButton";
import BoxButton from "../../components/BoxButton/BoxButton";

function ListHeader() {
  return (
    <header className={styled.header}>
      <HomeButton />
      {/* <ArrowButton /> */}
      <BoxButton />
    </header>
  );
}

export default ListHeader;
