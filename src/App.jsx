import { Route, Routes } from "react-router-dom";
import Header from "./components/Header"
import ArticleList from "./pages/ArticleList";
import Error from "./pages/Error";
import Article from "./pages/Article";
import { useEffect, useState } from "react";
import { getUserByUsername } from "./api";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserByUsername('weegembump').then((data) => {
      setUser(data.user);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<Article user={user} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  )
}

export default App
