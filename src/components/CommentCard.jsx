import { useEffect, useState } from "react";
import { ago } from "../utils";
import Votes from "./Votes";
import { getUserByUsername } from "../api";

const CommentCard = ({ comment }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserByUsername(comment.author).then(({ user }) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="mt-2 sm:mt-4 mb-1 sm:mb-2 mx-4 sm:mx-0 flex flex-col space-y-2 sm:space-y-4">
      <div className="flex items-center space-x-2 text-sm sm:text-base">
        {
          user
          ? <img src={user.avatar_url} alt={comment.author} className="w-6 sm:w-8 h-6 sm:h-8 object-contain" />
          : null
        }
        <span className="font-semibold">{comment.author}</span>
        <span> • </span>
        <span className="text-neutral-400 font-light">{ago(comment.created_at)}</span>
      </div>
      <p>
        {comment.body}
      </p>
      <div className="flex">
        <Votes count={comment.votes} />
      </div>
    </div>
  );
}

export default CommentCard;
