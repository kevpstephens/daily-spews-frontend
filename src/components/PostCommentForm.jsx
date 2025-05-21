export default function PostCommentForm() {
  return (
    <form className="post-comment-form">
      <textarea id="comment" placeholder="Join the conversation..." />
      <button type="submit">Post</button>
    </form>
  );
}
