//? URL: daily-spews.com/topics

import "./TopicsPage.css";
import { getTopics } from "../../api/api";
import TopicCard from "../../components/TopicCard/TopicCard.jsx";
import useFetch from "../../hooks/useFetch";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.jsx";
import ErrorMessageCard from "../../components/ErrorMessageCard/ErrorMessageCard.jsx";

export default function TopicsPage() {
  const { data, isLoading, error } = useFetch(getTopics);
  let topics = [];

  if (data && data.topics) {
    topics = data.topics;
  }

  return (
    <>
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
