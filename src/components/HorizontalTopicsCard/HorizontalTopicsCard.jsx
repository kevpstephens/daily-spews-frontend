/** ============================================================
 *! HorizontalTopicsCard.jsx

 * Displays a single topic card with an image and hashtag-styled topic title.
 * Used inside the HorizontalTopics scroll container.
 *============================================================ */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import capitaliseFirstLetter from "../../utils/capitaliseFirstLetter";
import "./HorizontalTopicsCard.css";

export default function HorizontalTopicsCard({ topic }) {
  return (
    <>
      <Link className="horizontal-topic-card-link" to={`/topics/${topic.slug}`}>
        <article className={`horizontal-topic-card`}>
          {/* Topic slug displayed as a hashtag */}
          <h3>{`#${topic.slug}`}</h3>
          {/* Display topic image or fallback if missing */}
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

HorizontalTopicsCard.propTypes = {
  topic: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    img_url: PropTypes.string,
  }).isRequired,
};
