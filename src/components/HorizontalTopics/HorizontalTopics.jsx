import "./HorizontalTopics.css";
import { getTopics } from "../../api/api";
import useFetch from "../../hooks/useFetch";
import TopicCard from "../TopicCard/TopicCard.jsx";
import LoadingScreen from "../LoadingScreen/LoadingScreen.jsx";
import ErrorMessageCard from "../ErrorMessageCard/ErrorMessageCard.jsx";

export default function HorizontalTopics() {
  const { data, isLoading, error } = useFetch(getTopics);
  let topics = [];

  if (data && data.topics) {
    topics = data.topics;
  }

  return (
    <>
      <section className="horizontal-topics-wrapper">
        <h2>
          {" "}
          {`<- `}
          <strong>explore topics</strong>
          {` ->`}
        </h2>
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
