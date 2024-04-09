import QuestionCardList from "../../components/QuestionCardList/QuestionCardList";
import "../../assets/styles/reset.css";
import "../../assets/styles/global.css";
import Pagination from "../../components/Pagination/Pagination";

function QuestionCardListPage() {
  return (
    <section>
      <div>
        <button>정렬</button>
      </div>
      <QuestionCardList />
      <Pagination />
    </section>
  );
}

export default QuestionCardListPage;
