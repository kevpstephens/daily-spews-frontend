import "./HorizontalTopics.css";
import { useRef, useState, useEffect, useCallback } from "react";
import { getTopics } from "../../api/api";
import useFetch from "../../hooks/useFetch";
import TopicCard from "../TopicCard/TopicCard.jsx";
import LoadingScreen from "../LoadingScreen/LoadingScreen.jsx";
import ErrorMessageCard from "../ErrorMessageCard/ErrorMessageCard.jsx";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function HorizontalTopics() {
  const { data, isLoading, error } = useFetch(getTopics);
  const scrollRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [dimOthers, setDimOthers] = useState(false);
  let topics = [];

  if (data && data.topics) {
    topics = data.topics;
  }

  useEffect(() => {
    const node = scrollRef.current;

    const handleScroll = () => {
      if (node) {
        const { scrollLeft, scrollWidth, clientWidth } = node;
        setAtStart(scrollLeft <= 0);
        setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1); // buffer to handle float rounding
      }
    };

    if (node) {
      node.addEventListener("scroll", handleScroll);
      handleScroll(); // initialize scroll positions
    }

    return () => {
      if (node) node.removeEventListener("scroll", handleScroll);
    };
  }, [data]);

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

  const handleMouseEnter = useCallback(() => {
    setDimOthers(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setDimOthers(false);
  }, []);

  return (
    <>
      <section className="horizontal-topics-wrapper">
        <div className="horizontal-topics-heading-container">
          <button onClick={scrollLeft} disabled={atStart}>
            <ArrowLeft id="horizontal-topics-arrow-left" />
          </button>

          <h1 className="horizontal-topics-heading">Topics</h1>

          <button onClick={scrollRight} disabled={atEnd}>
            <ArrowRight id="horizontal-topics-arrow-right" />
          </button>
        </div>

        {isLoading && <LoadingScreen item="topics" />}
        {error && <ErrorMessageCard error={error} />}

        <div
          className={`horizontal-scroll-container${dimOthers ? " topics-dimmed" : ""}`}
          ref={scrollRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {topics.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} type={"horizontal-"} />
          ))}
        </div>
      </section>
    </>
  );
}
