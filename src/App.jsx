import { useEffect, useState } from "react";
import { getUserByUsername } from "./api";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header"
import ArticleList from "./pages/ArticleList";
import Article from "./pages/Article";
import TopicList from "./pages/TopicList";
import Error from "./components/Error";

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
        <Route path="/topics" element={<TopicList />} />
        <Route path="/topics/:slug" element={<ArticleList />} />
        <Route path="*" element={
          <Error status="404 Not Found" message="The page you requested was not found."/>
        } />
      </Routes>
    </>
  )
}

export default App
