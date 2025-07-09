/** ============================================================
 *! TopicCard.jsx

 * A simple component that renders a topic preview card.
 * Each card links to a page of articles under the given topic.
 * Displays the topic name and image (with a fallback if missing).
 *************************************************************/
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import capitaliseFirstLetter from "../../utils/capitaliseFirstLetter";
import "./TopicCard.css";

export default function TopicCard({ topic }) {
  return (
    <>
      <Link to={`/topics/${topic.slug}`}>
        <article className={"topic-card"}>
          {/* Topic name displayed as a hashtag-style heading */}
          <h3>{`#${topic.slug}`}</h3>

          {/* Show topic image, or fallback to default image if none provided */}
          <img
            alt={`${capitaliseFirstLetter(topic.slug)} topic illustration`}
            src={
              topic.img_url || "/assets/users/default-user-image-purple.avif"
            }
          />
        </article>
      </Link>
    </>
  );
}

//! ===================================================== */
//! Prop types
//! ===================================================== */
TopicCard.propTypes = {
  topic: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    img_url: PropTypes.string,
  }).isRequired,
};
