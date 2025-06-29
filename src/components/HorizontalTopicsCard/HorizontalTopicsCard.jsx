import "./HorizontalTopicsCard.css";
import { Link } from "react-router-dom";

export default function HorizontalTopicsCard({ topic }) {
  return (
    <>
      <Link to={`/topics/${topic.slug}`} className="horizontal-topic-card-link">
        <article className={`horizontal-topic-card`}>
          <h3>{`#${topic.slug}`}</h3>
          <img
            src={topic.img_url || `/assets/users/default-user-image.jpg`}
            alt={`Image for topic ${topic.slug}`}
          />
        </article>
      </Link>
    </>
  );
}
