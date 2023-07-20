import { Link } from "react-router-dom";

const TopicCard = ({ topic }) => {
  return (
    <article className="py-1 sm:py-2 px-4 border rounded-md shadow-md bg-white">
      <Link to={`/topics/${topic.slug}`}>
        <div className="w-full flex flex-col justify-between sm:space-y-1">
          <h3 className="text-xl sm:text-2xl text-rose-700">{topic.slug}</h3>
          <p className="px-2">{topic.description}</p>
        </div>
      </Link>
    </article>
  );
};

export default TopicCard;
