import { useEffect, useState } from "react";
import { ago } from "../utils";
import Votes from "./Votes";
import { deleteUserCommentById, getUserByUsername } from "../api";

const CommentCard = ({ comment, user, setComments }) => {
  const [author, setAuthor] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasDeleteError, setHasDeleteError] = useState(false);

  useEffect(() => {
    getUserByUsername(comment.author).then(({ user }) => {
      setAuthor(user);
    });
  }, []);

  const handleDeleteComment = () => {
    setHasDeleteError(false);
    setIsDeleting(true);
    deleteUserCommentById(comment.comment_id).then(() => {
      setComments((prev) => {
        return prev.filter((stateComment) => {
          return stateComment.comment_id !== comment.comment_id;
        });
      });
    }).catch(() => {
      setHasDeleteError(true);
    }).finally(() => {
      setIsDeleting(false);
    });
  };

  return (
    <div className="mt-2 sm:mt-4 mb-1 sm:mb-2 mx-2 sm:mx-0 flex flex-col space-y-2 sm:space-y-4">
      <div className="flex items-center space-x-2 text-sm sm:text-base">
        {
          author
          ? <img src={author.avatar_url} alt={comment.author} className="w-6 sm:w-8 h-6 sm:h-8 object-contain" />
          : null
        }
        <span className="font-semibold">{comment.author}</span>
        <span> • </span>
        <span className="text-neutral-400 font-light">{ago(comment.created_at)}</span>
      </div>
      <p>
        {comment.body}
      </p>
      <div className="flex justify-between items-center">
        <Votes count={comment.votes} />
        {
          user && comment.author === user.username
          ? <button
              onClick={handleDeleteComment}
              disabled={isDeleting}
              className={`px-4 py-1 text-sm sm:text-base font-medium leading-5 sm:leading-5 rounded-full text-fuchsia-700 border border-fuchsia-200 ${isDeleting ? null : 'hover:border-fuchsia-700 hover:bg-fuchsia-100 active:text-fuchsia-800 active:bg-fuchsia-200'}`}
            >Delete</button>
          : null
        }
      </div>
      {
        hasDeleteError
        ? <p className="text-right text-xs sm:text-sm text-fuchsia-500">There was an issue deleting your comment.</p>
        : null
      }
    </div>
  );
}

export default CommentCard;
