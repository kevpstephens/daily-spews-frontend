import "./CommentButton.css";
import { MessageSquareMore } from "lucide-react";

export default function CommentButton({
  commentCount,
  scrollTargetId = "post-comment-form",
}) {
  const handleClick = () => {
    const element = document.getElementById(scrollTargetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button id="comment-button" onClick={handleClick}>
      <MessageSquareMore className="comment-button-icon" size={25} />
      <span>{commentCount}</span>
    </button>
  );
}
