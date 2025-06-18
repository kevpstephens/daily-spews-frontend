import "./CommentButton.css";

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
      💬 {commentCount}
    </button>
  );
}
