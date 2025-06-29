/** ============================================================
 *! HorizontalTopics.jsx

 * Renders a horizontally scrollable list of topic cards with arrow navigation.
 * Handles scroll tracking, dimming animation, and async topic loading.
 *============================================================ */

import "./HorizontalTopics.css";
import { useRef, useState, useEffect, useCallback } from "react";
import { getTopics } from "../../api/api";
import useFetch from "../../hooks/useFetch";
import HorizontalTopicsCard from "../HorizontalTopicsCard/HorizontalTopicsCard.jsx";
import LoadingScreen from "../LoadingScreen/LoadingScreen.jsx";
import ErrorMessageCard from "../ErrorMessageCard/ErrorMessageCard.jsx";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function HorizontalTopics() {
  const { data, isLoading, error } = useFetch(getTopics); // Fetch topics from API using custom hook
  const scrollRef = useRef(null); // Ref for the horizontal scroll container

  const [atStart, setAtStart] = useState(true); // Track if scroll is at start of container
  const [atEnd, setAtEnd] = useState(false); // Track if scroll is at end of container
  const [dimOthers, setDimOthers] = useState(false); // Toggle dim effect on hover
  let topics = [];

  // Extract topics from API response if available
  if (data && data.topics) {
    topics = data.topics;
  }

  // Monitor scroll position to enable/disable navigation buttons
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
      handleScroll(); // Initialise scroll positions
    }

    return () => {
      if (node) node.removeEventListener("scroll", handleScroll);
    };
  }, [data]);

  // Scroll right by fixed amount
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 425, behavior: "smooth" });
    }
  };

  // Scroll left by fixed amount
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -425, behavior: "smooth" });
    }
  };

  // Dim other items on hover
  const handleMouseEnter = useCallback(() => {
    setDimOthers(true);
  }, []);

  // Remove dim effect when mouse leaves
  const handleMouseLeave = useCallback(() => {
    setDimOthers(false);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen item="topics" />}
      {error && <ErrorMessageCard error={error} />}

      <section className="horizontal-topics-wrapper">
        <div className="horizontal-topics-heading-container">
          {/* Scroll left button */}
          <button onClick={scrollLeft} disabled={atStart}>
            <ArrowLeft id="horizontal-topics-arrow-left" />
          </button>

          <h1 className="horizontal-topics-heading">Topics</h1>

          {/* Scroll right button */}
          <button onClick={scrollRight} disabled={atEnd}>
            <ArrowRight id="horizontal-topics-arrow-right" />
          </button>
        </div>

        <div
          className={`horizontal-scroll-container${
            dimOthers ? " topics-dimmed" : ""
          }`}
          ref={scrollRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Render a HorizontalTopicsCard for each topic */}
          {topics.map((topic) => (
            <HorizontalTopicsCard key={topic.slug} topic={topic} />
          ))}
        </div>
      </section>
    </>
  );
}
