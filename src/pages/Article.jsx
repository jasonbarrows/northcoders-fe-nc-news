import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api";
import { ago } from "../utils";
import Votes from "../components/Votes";
import CommentCount from "../components/CommentCount";

const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticleById(article_id).then(({ article }) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="my-4 sm:my-8 sm:max-w-2xl mx-auto">
      <article className="mx-4 sm:mx-0 sm:p-8 sm:border sm:rounded-md sm:shadow-md sm:bg-white">
        {
          isLoading
          ? <p className="font-light">Loading...</p>
          : (
            <>
              <div className="text-sm">
                <span className="font-semibold">{article.topic}</span>
                <span> • </span>
                <span className="text-neutral-400 font-light">{ago(article.created_at)}</span>
              </div>
              <div className="text-sm">
                <span>by </span>
                <span className="font-medium">{article.author}</span>
              </div>
              <div className="flex flex-col space-y-2 sm:space-y-4">
                <h2 className="mt-1.5 sm:mt-3 text-2xl sm:text-3xl font-semibold">{article.title}</h2>
                <p>{article.body}</p>
                <img className="h-auto w-full object-contain rounded-md" src={article.article_img_url} alt="article.title" />
                <div className="flex space-x-2 sm:space-x-4">
                  <Votes count={article.votes} />
                  <CommentCount count={article.comment_count} />
                </div>
              </div>
            </>
          )
        }
      </article>
    </div>
  )
};

export default Article;
