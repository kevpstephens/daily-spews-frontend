import { toast } from "react-toastify";
import "./PostCommentForm.css";
import { useState, useRef } from "react";
import { postComment } from "../../api/api";
import { Link } from "react-router-dom";
import { useUser } from "../../context";

export default function PostCommentForm({ article_id, setComments }) {
  const { user } = useUser();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const textareaRef = useRef(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      const newComment = await postComment(article_id, {
        username: user.username,
        body: comment,
      });

      const now = new Date().toISOString();
      const completeComment = {
        comment_id: newComment.comment_id || Math.random(),
        body: comment,
        created_at: newComment.created_at || now,
        votes: 0,
        author: user.username,
        justPosted: true, // Used for triggering animation
      };

      setComments((prevComments) => [completeComment, ...prevComments]);
      setComment("");
      toast.success("Comment posted successfully!", {
        className: "toast-message",
      });
    } catch (err) {
      console.error("Failed to post comment", err);
      toast.error("Failed to post comment! Please try again.", {
        className: "toast-message",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="post-comment-form-wrapper" onSubmit={handleSubmit}>
      <div className="comment-box-wrapper">
        <textarea
          id="comment"
          ref={textareaRef}
          onInput={handleInput}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder={
            user
              ? "Join the conversation..."
              : "Please log in to leave a comment..."
          }
          rows={1}
          required
          disabled={!user || isSubmitting}
          style={{ overflowY: "hidden" }}
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
        {isSubmitting ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}
