import styled from "./QuestionCardListPage.module.css";
import ListHeader from "../../components/ListHeader/ListHeader";
import SortList from "../../components/SortList/SortList";

function QuestionCardListPage() {
  return (
    <div className={styled.container}>
      <ListHeader />
      <section>
        <div className={styled.title}>
          <h1>누구에게 질문할까요?</h1>
          <SortList />
          {}
        </div>
      </section>
    </div>
  );
}

export default QuestionCardListPage;
