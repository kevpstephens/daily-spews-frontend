import "./TopicCard.css";
import { Link } from "react-router-dom";
import defaultImage from "/assets/users/default-user-image-purple.avif";

export default function TopicCard({ topic }) {
  return (
    <>
      <Link to={`/topics/${topic.slug}`}>
        <article className={"topic-card"}>
          <h3>{`#${topic.slug}`}</h3>
          <img
            src={topic.img_url || defaultImage}
            alt={`Image for topic ${topic.slug}`}
          />
        </article>
      </Link>
    </>
  );
}
