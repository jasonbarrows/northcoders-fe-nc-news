import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addUserCommentToArticle, getAllCommentsByArticleId } from "../api";
import CommentCard from "./CommentCard";

const CommentList = ({ articleId, user }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  const [newComment, setNewComment] = useState('');
  const [isPostingNewComment, setIsPostingNewComment] = useState(false);
  const [hasNewCommentError, setHasNewCommentError] = useState(false);

  useEffect(() => {
    getAllCommentsByArticleId(articleId).then(({ comments }) => {
      setComments(comments);
      setIsLoading(false);
    }).catch((err) => {
      setHasLoadingError(true);
      setIsLoading(false);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPostingNewComment(true);
    setHasNewCommentError(false);

    const requestBody = {
      username: user.username,
      bodys: newComment,
    };

    addUserCommentToArticle(articleId, requestBody).then((data) => {
      setComments((prev) => [data.comment, ...prev]);
      setNewComment('');
    }).catch(() => {
      setHasNewCommentError(true);
    }).finally(() => {
      setIsPostingNewComment(false);
    });
  };

  return (
    <div className="m-4 sm:m-0 ">
      {/* <h3 className="text-xl sm:text-2xl font-semibold">Comments</h3> */}
      <form className="" onSubmit={handleSubmit}>
        <label className="sm:text-lg font-semibold" htmlFor="newComment">Add a comment</label>
        <textarea
          id="newComment"
          className="mt-1 sm:mt-2 p-2 w-full border rounded-md"
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value)
          }}
        />
        {
          hasNewCommentError
          ? <p className="text-xs sm:text-sm text-rose-600">There was an error adding your comment.</p>
          : null
        }
        <div className="mt-1 sm:mt-2 mr-2 flex justify-end">
          <button
            disabled={isPostingNewComment || !newComment.length}
            className={`px-4 py-1 font-medium rounded-full text-rose-50 ${
              isPostingNewComment || !newComment.length
              ? 'bg-rose-300'
              : 'bg-rose-600 hover:bg-rose-500 active:bg-rose-700 shadow shadow-rose-300'
            }`}
          >Post</button>
        </div>
      </form>
      <ul className="mt-3 sm:mt-4 flex flex-col space-y-2">
        {
          isLoading
          ? <li className="py-2 sm:py-4 border-t"><span>Loading...</span></li>
          : hasLoadingError
            ? <li className="py-2 sm:py-4 border-t text-rose-700"><span>There was an error loading the comments.</span></li>
            : comments
              ? comments.map((comment) => (
                <li className="border-t" key={comment.comment_id}>
                  <CommentCard comment={comment} />
                </li>
              ))
              : <li className="py-2 sm:py-4 border-t">
                  <p>Be the first to add a comment.</p>
                </li>
          }
      </ul>
    </div>
  );
};

export default CommentList;
