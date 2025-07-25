/** ============================================================
 *! TopicFilterBar.jsx

 * A dropdown filter component that fetches available topics
 * and updates the search parameters in the URL when the user selects a topic.
 * Responsive UI adapts the default dropdown label based on screen width.
 *============================================================ */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getTopics } from "../../api/api";
import useFetch from "../../hooks/useFetch";
import capitaliseFirstLetter from "../../utils/capitaliseFirstLetter";
import "./TopicFilterBar.css";

export default function TopicFilterBar() {
  const { data } = useFetch(getTopics);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  let topics = [];
  if (data && data.topics) {
    topics = data.topics.sort((a, b) => a.slug.localeCompare(b.slug));
  }

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update the URL's topic query parameter based on dropdown selection
  function handleTopicChange(event) {
    const value = event.target.value;
    if (value) {
      searchParams.set("topic", value);
    } else {
      searchParams.delete("topic");
    }
    setSearchParams(searchParams);
  }

  return (
    <>
      {/* Render a dropdown menu populated with topic options */}
      <select
        aria-label="Filter articles by topic"
        className="topic-filter-bar"
        id="topic-dropdown"
        value={searchParams.get("topic") || ""}
        onChange={handleTopicChange}
      >
        <option value="">{isMobile ? "Topic" : "--Select Topic--"}</option>

        {topics.map((topic) => {
          const formattedName = capitaliseFirstLetter(topic.slug);
          return (
            <option key={topic.slug} value={topic.slug}>
              {formattedName}
            </option>
          );
        })}
      </select>
    </>
  );
}
