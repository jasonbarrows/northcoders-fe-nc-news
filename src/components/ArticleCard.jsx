import { ago } from "../utils";
import CommentCount from "./CommentCount";
import Votes from "./Votes";

const ArticleListCard = ({ article }) => {
  return (
    <article className="mt-1.5 mb-2 mx-3 sm:p-4 sm:border sm:rounded-md sm:shadow-md sm:bg-white">
      <div className="text-sm">
        <span className="font-semibold">{article.topic}</span>
        <span> • </span>
        <span className="text-neutral-400 font-light">{ago(article.created_at)}</span>
      </div>
      <div className="text-sm">
        <span>Posted by </span>
        <span className="font-medium">{article.author}</span>
      </div>
      <div className="mt-1 w-full flex justify-between">
        <p className="pr-1 sm:text-xl">{article.title}</p>
        <img className="h-20 sm:h-32 w-35 sm:w-42 object-contain" src={article.article_img_url} alt="article.title" />
      </div>
      <div className="flex space-x-3">
        <Votes count={article.votes} />
        <CommentCount count={article.comment_count} />
      </div>
    </article>
  );
};

export default ArticleListCard;
