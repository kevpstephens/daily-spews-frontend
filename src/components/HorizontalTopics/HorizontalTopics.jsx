import "./HorizontalTopics.css";
import { useRef } from "react";
import { getTopics } from "../../api/api";
import useFetch from "../../hooks/useFetch";
import TopicCard from "../TopicCard/TopicCard.jsx";
import LoadingScreen from "../LoadingScreen/LoadingScreen.jsx";
import ErrorMessageCard from "../ErrorMessageCard/ErrorMessageCard.jsx";

export default function HorizontalTopics() {
  const { data, isLoading, error } = useFetch(getTopics);
  const scrollRef = useRef(null);
  let topics = [];

  if (data && data.topics) {
    topics = data.topics;
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 425, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -425, behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="horizontal-topics-wrapper">
        <h2>
          <button
            className="horizontal-topics-scroll-button"
            onClick={scrollLeft}
          >{`<-`}</button>
          <strong>explore topics</strong>
          <button
            className="horizontal-topics-scroll-button"
            onClick={scrollRight}
          >{`->`}</button>
        </h2>
        {isLoading && <LoadingScreen item="topics" />}
        {error && <ErrorMessageCard error={error} />}

        <div className="horizontal-scroll-container" ref={scrollRef}>
          {topics.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} type={"horizontal-"} />
          ))}
        </div>
      </section>
    </>
  );
}
