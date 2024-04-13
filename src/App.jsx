import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/styles/global.css";
import "./assets/styles/reset.css";
import Main from "./pages/Main/Main";
import QuestionCardListPage from "./pages/QuestionCardListPage";
import PostPage from "./pages/PostPage/PostPage";
import AnswerPage from "./pages/AnswerPage/AnswerPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/list" element={<QuestionCardListPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/post/:id/answer" element={<AnswerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
