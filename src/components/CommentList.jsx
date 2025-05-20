import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { getCommentByArticleId } from "../api/api";

export default function CommentList({ article_id }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCommentByArticleId(article_id).then((data) => {
      setComments(data.comments);
    });
  }, [article_id]);

  return (
    <section id="comments" className="comment-section">
      <h2>Comments:</h2>

      <ul className="comment-list">
        {comments.map((comment) => (
          <CommentCard key={comment.comment_id} comment={comment} />
        ))}
      </ul>
    </section>
  );
}
