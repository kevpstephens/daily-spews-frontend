import "./PostCommentForm.css";
import { useState } from "react";
import { postComment } from "../../api/api";

export default function PostCommentForm({ article_id }) {
  const [comment, setComment] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    postComment(article_id, {
      username: "dummyUser",
      body: comment,
    });
  }

  return (
    <>
      <form className="post-comment-form-wrapper" onSubmit={handleSubmit}>
        <textarea
          id="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Join the conversation..."
          rows="3"
          required
        />
        <button type="submit" className="comment-submit-button">
          Post
        </button>
      </form>
    </>
  );
}
