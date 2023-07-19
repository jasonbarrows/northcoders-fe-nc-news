import { Link } from "react-router-dom";
import { ago } from "../utils";
import CommentCount from "./CommentCount";
import Votes from "./Votes";
import { useState } from "react";
import { patchArticleById } from "../api";

const ArticleListCard = ({ article }) => {
  const [userVote, setUserVote] = useState(0);
  const [hasVoteError, setHasVoteError] = useState(false);

  const handleVote = (vote) => {
    setUserVote(prev => prev + vote)

    patchArticleById(article.article_id, { inc_votes: vote }).then((data) => {
      setHasVoteError(false);
    }).catch((err) => {
      setHasVoteError(true);
      setUserVote(prev => prev - vote);
    });
  };

  return (
    <article className="mt-2 mb-1 mx-4 sm:mx-0 sm:p-8 sm:border sm:rounded-md sm:shadow-md sm:bg-white">
      <Link to={`/articles/${article.article_id}`}>
        <div className="text-sm sm:text-base">
          <span className="font-semibold">{article.topic}</span>
          <span> • </span>
          <span className="text-neutral-400 font-light">{ago(article.created_at)}</span>
        </div>
        <div className="text-sm sm:text-base">
          <span className="hidden sm:inline">Posted </span>
          <span>by </span>
          <span className="font-medium">{article.author}</span>
        </div>
        <div className="mt-1 w-full flex sm:flex-col justify-between sm:space-y-2">
          <p className="pr-1 sm:text-xl">{article.title}</p>
          <img className="h-20 sm:h-auto w-35 sm:w-full object-contain rounded-sm sm:rounded-md" src={article.article_img_url} alt="article.title" />
        </div>
      </Link>
      <div className="mt-2 sm:mt-4 flex items-center space-x-2 sm:space-x-4">
        <Votes count={article.votes} userVote={userVote} handleVote={handleVote} />
        <CommentCount count={article.comment_count} />
      </div>
      {
        hasVoteError
        ? <p className="mt-1.5 text-rose-600 text-xs">There was an error applying your vote!</p>
        : null
      }
    </article>
  );
};

export default ArticleListCard;
