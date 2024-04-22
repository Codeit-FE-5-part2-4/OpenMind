import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/styles/global.css";
import "./assets/styles/reset.css";
import MainPage from "./pages/MainPage/MainPage";
import QuestionCardListPage from "./pages/QuestionCardListPage/QuestionCardListPage";
import PostPage from "./pages/PostPage/PostPage";
import AnswerPage from "./pages/AnswerPage/AnswerPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/list" element={<QuestionCardListPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/post/:id/answer" element={<AnswerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
