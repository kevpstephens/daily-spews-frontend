import "./CommentCard.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { dummyUser } from "../../data/dummyUser";
import { deleteCommentById, patchCommentVotes } from "../../api/api";
import VoteButton from "../VoteButton/VoteButton";
import { useState } from "react";

export default function CommentCard({ comment }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const loggedInUser = dummyUser;
  const isLoggedInUsersComment = comment.author === loggedInUser.username;

  if (isDeleted) {
    return null;
  }

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Do you really want to delete your comment? This cannot be undone."
    );
    if (confirmDelete) {
      setIsDeleting(true);
      try {
        await deleteCommentById(comment.comment_id);
        setIsDeleted(true);
        toast.success("Comment deleted successfully.", {
          icon: "💬",
          closeButton: false,
        });
        // window.alert("Comment deleted Succesfully.");
      } catch (error) {
        console.error("Failed to delete comment:", error);
        toast.error("Failed to delete comment.");
      } finally {
        setIsDeleting(false);
      }
    }
  }

  return (
    <>
      <article className={`comment-card ${isDeleting ? "deleting" : ""}`}>
        <p>
          <Link to={`/users/${comment.author}`}>
            <span className="comment-card-author">{comment.author}</span>
          </Link>{" "}
          | {formatDate(comment.created_at)}
        </p>
        <p>{comment.body}</p>
        <div className="comment-actions-container">
          <VoteButton
            className="comment-vote"
            item_id={comment.comment_id}
            initialVotes={comment.votes}
            voteFunction={patchCommentVotes}
          />

          {isDeleting && <p>Deleting comment...</p>}

          {isLoggedInUsersComment && !isDeleted && (
            <button
              onClick={handleDelete}
              className="delete-comment-button"
              disabled={isDeleting}
            >
              Delete
            </button>
          )}
        </div>
      </article>
    </>
  );
}
