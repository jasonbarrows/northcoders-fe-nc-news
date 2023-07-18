import { Route, Routes } from "react-router-dom";
import Header from "./components/Header"
import ArticleList from "./pages/ArticleList";
import Error from "./pages/Error";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  )
}

export default App
