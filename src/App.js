import "./assets/styles/global.css";
import "./assets/styles/reset.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
