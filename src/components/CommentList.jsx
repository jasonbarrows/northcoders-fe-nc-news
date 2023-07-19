import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllCommentsByArticleId } from "../api";
import CommentCard from "./CommentCard";

const CommentList = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllCommentsByArticleId(articleId).then(({ comments }) => {
      setComments(comments);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="m-4 sm:m-0 ">
      <h3 className="text-xl sm:text-2xl font-semibold">Comments</h3>
      <ul className="mt-2 sm:mt-4 flex flex-col space-y-2">
        {
          isLoading
          ? <li className="p-2 sm:p-4 border-t">Loading...</li>
          : comments.map((comment) => (
              <li className="border-t" key={comment.comment_id}>
                <CommentCard comment={comment} />
              </li>
            ))
          }
      </ul>
    </div>
  );
};

export default CommentList;
