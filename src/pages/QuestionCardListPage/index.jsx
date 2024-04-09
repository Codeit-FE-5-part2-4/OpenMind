import QuestionCardList from "../../components/QuestionCardList/QuestionCardList";

function QuestionCardListPage() {
  return (
    <section>
      <div>
        <button>정렬</button>
      </div>
      <QuestionCardList />
      <ol>
        <li>페이지네이션</li>
      </ol>
    </section>
  );
}

export default QuestionCardListPage;
