import { useEffect, useState } from "react";
import { getTopics } from "../api/api";

function TopicFilterBar() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((data) => {
      setTopics(data.topics);
    });
  }, []);

  return (
    <select name="Topic" id="topic-dropdown">
      <option value="">--Select Topic--</option>(
      {topics.map((topic) => {
        const capitalisedFirstLetter = topic.slug.slice(0, 1).toUpperCase();
        const remaniningLetters = topic.slug.slice(1);
        return (
          <option value={topic.slug}>
            {capitalisedFirstLetter + remaniningLetters}
          </option>
        );
      })}
      )
    </select>
  );
}

export default TopicFilterBar;
