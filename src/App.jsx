import Login from "./pages/login/Login";
import { Routes, Route } from "react-router-dom";
import NotFound404 from "./pages/404/NotFound404";
import SearchPage from "./pages/searchPage/SearchPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/searchpage" element={<SearchPage />} />
        <Route path="/userLogin" element={<Login />} />

        <Route path="*" element={<NotFound404 />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
