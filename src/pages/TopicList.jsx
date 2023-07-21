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

  if (isLoading) {
    return <div className="py-4 sm:py-8 sm:max-w-2xl mx-auto">
      <div className="mx-4">
        <p className="font-light">Loading...</p>
      </div>
    </div>
  }

  if (hasLoadingError) {
    return <div className="py-4 sm:py-8 sm:max-w-2xl mx-auto">
      <div className="mx-4">
        <span className="font-light">There was an error loading the topics.</span>
      </div>
    </div>;
  }

  return (
    <div className="my-4 sm:my-8 sm:max-w-2xl mx-auto">
      <h2 className="sm:my-4 mx-4 text-2xl sm:text-3xl font-medium">Select a Topic</h2>
      <ul className="mt-2 flex flex-col px-4 space-y-3 sm:space-y-4">
        {
          topics.map((topic) => {
            return (
              <li className="" key={topic.slug}>
                <TopicCard topic={topic} />
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default TopicList;
