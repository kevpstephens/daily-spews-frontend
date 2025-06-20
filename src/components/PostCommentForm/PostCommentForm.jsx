import "./PostCommentForm.css";
import { useState } from "react";
import { postComment } from "../../api/api";
import { useUser } from "../../context";
import { Link } from "react-router-dom";

export default function PostCommentForm({ article_id, onNewComment }) {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();

  async function handleSubmit(event) {
    event.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      const newComment = await postComment(article_id, {
        username: user.username,
        body: comment,
      });
      if (onNewComment) {
        onNewComment((prevComments = []) => {
          return [newComment, ...prevComments];
        });
      }
      setComment("");
    } catch (err) {
      console.error("Failed to post comment", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="post-comment-form-wrapper" onSubmit={handleSubmit}>
      <div className="comment-box-wrapper">
        <textarea
          id="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder={
            user
              ? "Join the conversation..."
              : "Please log in to leave a comment..."
          }
          rows="3"
          required
          disabled={!user || isSubmitting}
        />
        {!user && (
          <div className="comment-form-overlay">
            <Link to="/login" className="comment-form-overlay-login-button">
              Login
            </Link>
            <Link to="/signup" className="comment-form-overlay-signup-button">
              Sign-Up
            </Link>
          </div>
        )}
      </div>
      <button
        type="submit"
        className="comment-submit-button"
        disabled={!user || isSubmitting}
      >
        {isSubmitting ? "Posting..." : "Post"}
      </button>
    </form>
  );
}
