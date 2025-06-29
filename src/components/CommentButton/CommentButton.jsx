/** ============================================================
 * CommentButton.jsx

 * A button component for jumping to the comment form on the page.
 * Displays the number of existing comments and scrolls to the article's post-comment-form on click.
 *============================================================ */

import "./CommentButton.css";
import { MessageSquareMore } from "lucide-react";

export default function CommentButton({
  commentCount,
  scrollTargetId = "post-comment-form",
}) {
  // Scroll to the comment form when button is clicked
  const handleClick = () => {
    const element = document.getElementById(scrollTargetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Render button with icon and comment count
  return (
    <button id="comment-button" onClick={handleClick}>
      {/* Comment icon */}
      <MessageSquareMore className="comment-button-icon" size={25} />

      {/* Display number of comments */}
      <span>{commentCount}</span>
    </button>
  );
}
