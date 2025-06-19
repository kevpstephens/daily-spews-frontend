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
      <MessageSquareMore size={25} color="white" />
      <span>{commentCount}</span>
    </button>
  );
}
