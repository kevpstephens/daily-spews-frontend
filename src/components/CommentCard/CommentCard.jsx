import "./CommentCard.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { deleteCommentById, patchCommentVotes } from "../../api/api";
import VoteButton from "../VoteButton/VoteButton";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useUser } from "../../context"; // Assuming you have a useUser context that provides current user info

export default function CommentCard({ comment }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { user } = useUser();

  if (isDeleted) {
    return null;
  }

  const canDelete =
    user && (user.username === comment.author || user.username === "admin");

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await deleteCommentById(comment.comment_id);
      // Delay unmount to allow animation
      setTimeout(() => {
        setIsDeleted(true);
      }, 500); // should match CSS transition duration
      toast.success("Comment deleted successfully.", {
        closeButton: false,
      });
    } catch (error) {
      console.error("Failed to delete comment:", error);
      toast.error("Failed to delete comment.");
      setIsDeleting(false);
      setShowConfirm(false);
    }
  }

  return (
    <>
      <article className={`comment-card ${isDeleting ? "deleting" : ""}`}>
        {showConfirm && (
          <div
            className="overlay-backdrop"
            onClick={() => setShowConfirm(false)} // Close confirm if user clicks outside dialog
          />
        )}

        <h2 className="comment-card-header">
          <Link to={`/users/${comment.author}`}>
            <span className="comment-card-author">@{comment.author}</span>
          </Link>{" "}
          | {formatDate(comment.created_at)}
        </h2>

        <p>{comment.body}</p>
        <div className="comment-actions-container">
          <VoteButton
            className="comment-vote"
            item_id={comment.comment_id}
            initialVotes={comment.votes}
            voteFunction={patchCommentVotes}
          />

          {isDeleting && <p>Deleting comment...</p>}

          {canDelete && (
            <div
              className="delete-button-wrapper"
              style={{ position: "relative" }}
            >
              <button
                onClick={() => setShowConfirm(true)}
                className="delete-comment-button"
                disabled={isDeleting}
                aria-label="Delete comment"
              >
                <Trash2 className="delete-comment-icon" />
              </button>

              {showConfirm && (
                <div className="confirm-delete-container">
                  <p className="confirm-delete-message">
                    <strong>Warning:</strong> Deleting this comment is
                    irreversible.
                  </p>
                  <div className="confirm-delete-buttons-container">
                    <button
                      onClick={handleDelete}
                      className="confirm-delete-button"
                      disabled={isDeleting}
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="cancel-delete-button"
                      disabled={isDeleting}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </article>
    </>
  );
}
