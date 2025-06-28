import "./TopicFilterBar.css";
import { useSearchParams } from "react-router-dom";
import { getTopics } from "../../api/api";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { capitaliseFirstLetter } from "../../utils/capitaliseFirstLetter";

export default function TopicFilterBar() {
  const { data } = useFetch(getTopics);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  let topics = [];
  if (data && data.topics) {
    topics = data.topics;
  }

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <select
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
