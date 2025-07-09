/** ============================================================
 *! HorizontalTopics.jsx

 * Renders a horizontally scrollable list of topic cards with arrow navigation.
 * Handles scroll tracking, dimming animation, and async topic loading.
 *============================================================ */
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { getTopics } from "../../api/api";
import useFetch from "../../hooks/useFetch";
import ErrorMessageCard from "../ErrorMessageCard/ErrorMessageCard.jsx";
import HorizontalTopicsCard from "../HorizontalTopicsCard/HorizontalTopicsCard.jsx";
import LoadingScreen from "../LoadingScreen/LoadingScreen.jsx";
import "./HorizontalTopics.css";

export default function HorizontalTopics() {
  const { data, isLoading, error } = useFetch(getTopics); // Fetch topics from API using custom hook
  const scrollRef = useRef(null); // Ref for the horizontal scroll container

  const [atStart, setAtStart] = useState(true); // Track if scroll is at start of container
  const [atEnd, setAtEnd] = useState(false); // Track if scroll is at end of container
  const [dimOthers, setDimOthers] = useState(false); // Toggle dim effect on hover
  let topics = [];

  // Extract topics from API response if available and sort alphabetically
  if (data && data.topics) {
    topics = data.topics.sort((a, b) => a.slug.localeCompare(b.slug));
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
      <section className="horizontal-topics-wrapper">
        <div className="horizontal-topics-heading-container">
          {/* Scroll left button */}
          <button
            aria-label="Scroll topics left"
            disabled={atStart}
            type="button"
            onClick={scrollLeft}
          >
            <ArrowLeft id="horizontal-topics-arrow-left" />
          </button>

          <h1 className="horizontal-topics-heading">Topics</h1>

          {/* Scroll right button */}
          <button
            aria-label="Scroll topics right"
            disabled={atEnd}
            type="button"
            onClick={scrollRight}
          >
            <ArrowRight id="horizontal-topics-arrow-right" />
          </button>
        </div>

        {isLoading && <LoadingScreen item="topics" />}
        {error && <ErrorMessageCard error={error} />}

        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          ref={scrollRef}
          className={`horizontal-scroll-container${
            dimOthers ? " topics-dimmed" : ""
          }`}
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
