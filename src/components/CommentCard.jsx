import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

export default function CommentCard({ comment }) {
  return (
    <article className="comment-card">
      <p>
        <Link to={`/users/${comment.author}`}>
          <span className="comment-card-author">{comment.author}</span>
        </Link>{" "}
        | Posted: {formatDate(comment.created_at)}
      </p>
      <p>{comment.body}</p>
      <p className="comment-votes">💜 {comment.votes}</p>
    </article>
  );
}
