import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

function ArticleCard({ article }) {
  return (
    <div className="article-card">
      <Link to={`/articles/${article.article_id}`}>
        <button className="article-card-button">
          <article>
            <h2 className="article-card-heading">{article.title}</h2>
            <p>
              Written by: {article.author} | Topic: {`#${article.topic}`}
            </p>
            <img
              className="article-card-image"
              src={article.article_img_url}
              alt={`${article.title} image`}
            />
            <p>Posted: {formatDate(article.created_at)}</p>
            <p className="likes-and-comments">
              💬 {article.comment_count} | 💜 {article.votes}
            </p>
          </article>
        </button>
      </Link>
    </div>
  );
}

export default ArticleCard;
