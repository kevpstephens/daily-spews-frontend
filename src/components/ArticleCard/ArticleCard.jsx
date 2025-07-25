/** ============================================================
 *! ArticleCard.jsx

 * Displays a summary card for an article, including title, author, topic,
 * image, posted date, comment count, and vote count.
 *============================================================ */

import { Heart, MessageSquareMore } from "lucide-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import formatDate from "../../utils/formatDate";
import "./ArticleCard.css";

export default function ArticleCard({ article }) {
  return (
    <>
      <div className="article-card-container">
        <article className="article-card">
          <div className="article-card-heading-container">
            {/* Article title */}
            <h2 className="article-card-heading">{article.title}</h2>

            {/* Author and topic links */}
            <h3>
              Written by:{" "}
              <Link
                className="article-card-author-and-topic-link"
                to={`/users/${article.author}`}
              >
                @{article.author}
              </Link>{" "}
              | Topic:{" "}
              <Link
                className="article-card-author-and-topic-link"
                to={`/topics/${article.topic}`}
              >
                {`#${article.topic}`}
              </Link>
            </h3>
          </div>

          {/* Article image and posted date */}
          <div className="article-card-image-posted-date-container">
            <Link to={`/articles/${article.article_id}`}>
              <img
                alt={`Illustration for article: ${article.title}`}
                src={
                  article.article_img_url ||
                  "/assets/users/default-user-image-purple.avif"
                }
              />
            </Link>
            <p className="article-card-posted-date">
              <strong>Posted:</strong>{" "}
              <time dateTime={article.created_at}>
                {formatDate(article.created_at)}
              </time>
            </p>
          </div>
        </article>

        <div className="article-card-likes-and-comments-container">
          {/* Link to comments section on article page */}
          <Link
            className="article-card-likes-icon-link"
            to={`/articles/${article.article_id}#comments`}
          >
            <div className="article-card-likes-and-comments-item">
              <MessageSquareMore className="article-card-message-icon" />
              {article.comment_count}
            </div>
          </Link>
          {/* Link to likes section on article page */}
          <Link
            className="article-card-likes-icon-link"
            to={`/articles/${article.article_id}#article-likes`}
          >
            <div className="article-card-likes-and-comments-item">
              <Heart className="article-card-heart-icon" /> {article.votes}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
    article_id: PropTypes.number.isRequired,
    article_img_url: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    comment_count: PropTypes.number.isRequired,
    votes: PropTypes.number.isRequired,
  }).isRequired,
};
