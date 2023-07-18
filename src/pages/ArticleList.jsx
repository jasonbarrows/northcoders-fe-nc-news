import { useEffect, useState } from "react";
import { getAllArticles } from "../api";
import ArticleCard from "../components/ArticleCard";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getAllArticles().then(({ articles }) => {
      setArticles(articles);
    });
  }, []);

  return (
    <div className="sm:my-8 sm:max-w-2xl mx-auto">
      <h2 className="m-3 text-xl font-medium">Articles</h2>
      <ul className=" flex flex-col">
        <li></li>
        {
          articles.map((article) => {
            return (
              <li className="border-t-4 sm:border-t-0" key={article.article_id}>
                <ArticleCard article={article} />
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default ArticleList;
