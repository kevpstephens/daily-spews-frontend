/** ============================================================
 *! TopicCard.jsx

 * A simple component that renders a topic preview card.
 * Each card links to a page of articles under the given topic.
 * Displays the topic name and image (with a fallback if missing).
 *************************************************************/

import "./TopicCard.css";
import { Link } from "react-router-dom";
import defaultImage from "/assets/users/default-user-image-purple.avif";
import { capitaliseFirstLetter } from "../../utils/capitaliseFirstLetter";

export default function TopicCard({ topic }) {
  return (
    <>
      <Link to={`/topics/${topic.slug}`}>
        <article className={"topic-card"}>
          {/* Topic name displayed as a hashtag-style heading */}
          <h3>{`#${topic.slug}`}</h3>

          {/* Show topic image, or fallback to default image if none provided */}
          <img
            src={topic.img_url || defaultImage}
            alt={`${capitaliseFirstLetter(topic.slug)} topic illustration`}
          />
        </article>
      </Link>
    </>
  );
}
