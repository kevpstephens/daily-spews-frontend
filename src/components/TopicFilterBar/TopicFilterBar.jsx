import "./TopicFilterBar.css";
import { useSearchParams } from "react-router-dom";
import { getTopics } from "../../api/api";
import useFetch from "../../hooks/useFetch";

function formatTopicName(slug) {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

export default function TopicFilterBar() {
  const { data, isLoading, error } = useFetch(getTopics);
  console.log(error, isLoading);
  const [searchParams, setSearchParams] = useSearchParams();
  let topics = [];

  if (data && data.topics) {
    topics = data.topics;
  }

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
        className="sort-bar"
        id="topic-dropdown"
        onChange={handleTopicChange}
      >
        <option value="">--Select Topic--</option>
        {topics.map((topic) => {
          const formattedName = formatTopicName(topic.slug);
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
