import "./ArticleCard.css";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { MessageSquareMore, Heart } from "lucide-react";

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
        <div className="article-card-likes-and-comments-container">
          <Link
            className="article-card-likes-link"
            to={`/articles/${article.article_id}#comments`}
          >
            <div className="article-card-likes-and-comments-container-item">
              <MessageSquareMore className="article-card-message-square-icon" />
              {article.comment_count}
            </div>
          </Link>
          <div className="article-card-likes-and-comments-container-item">
            <Heart className="article-card-heart-icon" /> {article.votes}
          </div>
        </div>
      </div>
    </>
  );
}
