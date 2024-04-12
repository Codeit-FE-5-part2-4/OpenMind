import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/styles/global.css";
import "./assets/styles/reset.css";
import Main from "./pages/main/Main";
import QuestionCardListPage from "./pages/QuestionCardListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/list" element={<QuestionCardListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
