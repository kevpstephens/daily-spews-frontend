import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

export default function ArticleCard({ article }) {
  return (
    <div className="article-card-container">
      <Link
        to={`/articles/${article.article_id}`}
        className="article-card-link"
      >
        <article className="article-card">
          <h2 className="article-card-heading">{article.title}</h2>
          <p>
            Written by: {article.author} | Topic: {`#${article.topic}`}
          </p>
          <img src={article.article_img_url} alt={`${article.title} image`} />
          <p>Posted: {formatDate(article.created_at)}</p>
        </article>
      </Link>
      <p className="likes-and-comments">
        <Link to={`/articles/${article.article_id}#comments`} className="likes-link">
          💬 {article.comment_count}
        </Link>{" "}
        | 💜 {article.votes}
      </p>
    </div>
  );
}
