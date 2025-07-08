/** ============================================================
 *! HorizontalTopicsCard.jsx

 * Displays a single topic card with an image and hashtag-styled topic title.
 * Used inside the HorizontalTopics scroll container.
 *============================================================ */

import "./HorizontalTopicsCard.css";
import { Link } from "react-router-dom";
import defaultImage from "/assets/users/default-user-image-purple.avif";
import { capitaliseFirstLetter } from "../../utils/capitaliseFirstLetter";

export default function HorizontalTopicsCard({ topic }) {
  return (
    <>
      <Link to={`/topics/${topic.slug}`} className="horizontal-topic-card-link">
        <article className={`horizontal-topic-card`}>
          {/* Topic slug displayed as a hashtag */}
          <h3>{`#${topic.slug}`}</h3>
          {/* Display topic image or fallback if missing */}
          <img
            src={topic.img_url || defaultImage}
            alt={`${capitaliseFirstLetter(topic.slug)} topic illustration`}
          />
        </article>
      </Link>
    </>
  );
}
