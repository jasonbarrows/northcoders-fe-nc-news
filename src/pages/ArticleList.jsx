import { useEffect, useState } from "react";
import { getAllArticles } from "../api";
import ArticleCard from "../components/ArticleCard";
import { useParams } from "react-router-dom";

const ArticleList = () => {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const query = new URLSearchParams;

    if (slug) {
      query.set('topic', slug);
    }

    getAllArticles(query).then(({ articles }) => {
      setArticles(articles);
    }).catch(() => {
      setHasLoadingError(true);
    }).finally(() => {
      setIsLoading(false);
    });;
  }, [slug]);

  return (
    <div className="mb-4 sm:my-8 sm:max-w-2xl mx-auto">
      <h2 className="my-2 mx-4 text-2xl sm:text-3xl font-medium">{
        slug || 'All Articles'
      }</h2>
      <ul className="flex flex-col space-y-2">
      {
        isLoading
        ? <li className="m-4">
          <p className="font-light">Loading...</p>
        </li>
        : hasLoadingError
          ? <li className="m-4">
            <span className="text-rose-700">There was an error loading the topics.</span>
          </li>
          : (
            articles.map((article) => {
              return (
                <li className="border-t-4 sm:border-t-0" key={article.article_id}>
                  <ArticleCard article={article} />
                </li>
              );
            })
          )
        }
      </ul>
    </div>
  );
};

export default ArticleList;
