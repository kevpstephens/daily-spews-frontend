//? URL: daily-spews.com/topics

import { getTopics } from "../api/api";
import TopicCard from "../components/TopicCard";
import useFetch from "../hooks/useFetch";
import LoadingScreen from "../components/LoadingScreen";
import ErrorMessageCard from "../components/ErrorMessageCard";

export default function TopicsPage() {
  const { data, isLoading, error } = useFetch(getTopics);
  let topics = [];

  if (data && data.topics) {
    topics = data.topics;
  }

  return (
    <>
      <h3>*Topics Page*</h3>

      {isLoading && <LoadingScreen item={"topics"} />}
      {error && <ErrorMessageCard error={error} />}

      {!isLoading && !error && (
        <>
          <h1 className="topics-articles-page-heading">all topics:</h1>
          <section className="topics-page-container">
            {topics.map((topic) => (
              <TopicCard key={topic.slug} topic={topic} type={"normal-"} />
            ))}
          </section>
        </>
      )}
    </>
  );
}
