import { useEffect, useState } from "react";
import { getAllTopics } from "../api";
import TopicCard from "../components/TopicCard";

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  useEffect(() => {
    getAllTopics().then((data) => {
      setTopics(data.topics);
    }).catch(() => {
      setHasLoadingError(true);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="mb-4 sm:my-8 sm:max-w-xl mx-auto">
      <h2 className="my-2 sm:my-4 mx-4 text-2xl sm:text-3xl font-medium">Select a Topic</h2>
      <ul className="flex flex-col px-4 space-y-3 sm:space-y-4">
      {
        isLoading
        ? <li>
          <p className="font-light">Loading...</p>
        </li>
        : hasLoadingError
          ? <li>
            <span className="text-rose-700">There was an error loading the topics.</span>
          </li>
          : (
            topics.map((topic) => {
              return (
                <li className="" key={topic.slug}>
                  <TopicCard topic={topic} />
                </li>
              );
            })
          )
        }
      </ul>
    </div>
  );
};

export default TopicList;
