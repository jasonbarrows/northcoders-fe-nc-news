import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api";
import { ago } from "../utils";
import Votes from "../components/Votes";
import CommentCount from "../components/CommentCount";
import CommentList from "../components/CommentList";

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
    <div className="relative mx-auto sm:px-8 my-4 sm:my-8 grid grid-cols-1 lg:grid-cols-2 sm:gap-8 items-start">
      <article className="lg:sticky lg:top-8 mx-4 sm:mx-0 sm:p-8 sm:max-w-7xl sm:border sm:rounded-md sm:shadow-md sm:bg-white">
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
              <div className="mt-1.5 sm:mt-3 flex flex-col space-y-3 sm:space-y-4">
                <h2 className="text-2xl sm:text-3xl font-semibold">{article.title}</h2>
                <p>{article.body}</p>
                <img className="h-auto w-full object-contain rounded-md" src={article.article_img_url} alt={article.title} />
                <div className="pt-1 flex items-center space-x-2 sm:space-x-4">
                  <Votes count={article.votes} />
                  <CommentCount count={article.comment_count} />
                </div>

              </div>
            </>
          )
        }
      </article>
      <section id="comments" className="sm:p-8 sm:border sm:bg-white sm:rounded-md sm:shadow-md">
        <CommentList articleId={article_id} />
      </section>
    </div>
  )
};

export default Article;
