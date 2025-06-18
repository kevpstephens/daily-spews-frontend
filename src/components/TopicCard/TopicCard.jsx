import "./TopicCard.css";
import { Link } from "react-router-dom";

export default function TopicCard({ topic, type }) {
  return (
    <>
      <Link to={`/topics/${topic.slug}`} className={`${type}topic-card-link`}>
        <article className={`${type}topic-card`}>
          <h2 className="topic-card-heading">{`#${topic.slug}`}</h2>
          <img
            src={topic.img_url || `src/assets/users/default-user-image.jpg`}
            alt="topic-image"
          />
        </article>
      </Link>
    </>
  );
}
