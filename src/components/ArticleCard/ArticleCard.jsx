import "./ArticleCard.css";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

export default function ArticleCard({ article }) {
  return (
    <>
      <div className="article-card-container">
        <Link
          to={`/articles/${article.article_id}`}
          className="article-card-link"
        >
          <article className="article-card">
            <h2 className="article-card-heading">{article.title}</h2>
            <p>
              Written by:{" "}
              <Link to={`/users/${article.author}`}>{article.author}</Link> |
              Topic:{" "}
              <Link to={`/topics/${article.topic}`}>{`#${article.topic}`}</Link>
            </p>
            <img
              src={
                article.article_img_url ||
                "src/assets/users/default-user-image.jpg"
              }
              alt={`${article.title} image`}
            />
            <p>Posted: {formatDate(article.created_at)}</p>
          </article>
        </Link>
        <p className="article-card-likes-and-comments">
          <Link
            to={`/articles/${article.article_id}#comments`}
            className="likes-link"
          >
            💬 {article.comment_count}
          </Link>{" "}
          | 💜 {article.votes}
        </p>
      </div>
    </>
  );
}
