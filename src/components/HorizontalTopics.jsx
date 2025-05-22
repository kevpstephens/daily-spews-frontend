import { getTopics } from "../api/api";
import useFetch from "../hooks/useFetch";
import TopicCard from "./TopicCard";
import LoadingScreen from "./LoadingScreen";
import ErrorMessageCard from "./ErrorMessageCard";

export default function HorizontalTopics() {
  const { data, isLoading, error } = useFetch(getTopics);
  let topics = [];

  if (data && data.topics) {
    topics = data.topics;
  }

  return (
    <>
      <h2 className="horizontal-topics-title"> {`<- explore topics ->`} </h2>
      <section className="horizontal-topics-wrapper">
        {isLoading && <LoadingScreen item="topics" />}
        {error && <ErrorMessageCard error={error} />}

        <div className="horizontal-scroll-container">
          {topics.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} type={"horizontal-"} />
          ))}
        </div>
      </section>
    </>
  );
}
