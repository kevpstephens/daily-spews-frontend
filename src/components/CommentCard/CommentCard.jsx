/** ============================================================
 *! CommentCard.jsx

 * Displays an individual comment with voting and delete functionality.
 * Allows the comment author or admin to delete the comment with confirmation.
 *============================================================ */
import { Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { deleteCommentById, patchCommentVotes } from "../../api/api";
import { useUser } from "../../context";
import formatDate from "../../utils/formatDate";
import logger from "../../utils/logger";
import VoteButton from "../VoteButton/VoteButton";
import "./CommentCard.css";

export default function CommentCard({ comment }) {
  const [isDeleting, setIsDeleting] = useState(false); // Track comment deletion status
  const [isDeleted, setIsDeleted] = useState(false); // Track if comment has been removed from view
  const [showConfirm, setShowConfirm] = useState(false); // Track if delete confirmation dialog is shown
  const [canDelete, setCanDelete] = useState(false); // Determine if current user has permission to delete

  const { user } = useUser();

  // Grant delete permission if user is author or admin
  useEffect(() => {
    setCanDelete(
      user?.username === comment?.author || user?.username === "admin"
    );
  }, [user?.username, comment?.author]);

  // If comment is deleted, unmount it from the DOM
  if (isDeleted) {
    return null;
  }

  // Handle delete request and show toast feedback
  async function handleDelete() {
    setIsDeleting(true);
    try {
      await deleteCommentById(comment.comment_id);
      // Delay unmount to allow animation
      setTimeout(() => {
        setIsDeleted(true);
        setShowConfirm(false);
      }, 500); // should match CSS transition duration
      toast.success("Comment deleted successfully!", {
        className: "toast-message",
      });
    } catch (error) {
      logger.error("Failed to delete comment:", error);
      toast.error(
        "Failed to delete comment! Please refresh the page and try again.",
        {
          className: "toast-message",
        }
      );
      setIsDeleting(false);
      setShowConfirm(false);
    }
  }

  return (
    <>
      <article
        className={`comment-card ${isDeleting ? "deleting" : ""} ${
          comment.justPosted ? "animated-comment" : ""
        }`}
      >
        {/* Confirmation overlay for outside click */}
        {showConfirm && (
          <div
            className="overlay-backdrop"
            role="button"
            tabIndex={0}
            onClick={() => setShowConfirm(false)} // Close confirm if user clicks outside dialog
            onKeyDown={(e) => {
              if (e.key === "Escape" || e.key === "Enter") {
                setShowConfirm(false);
              }
            }}
          />
        )}

        {/* Display comment author and timestamp */}
        <h3 className="comment-card-header">
          <Link to={`/users/${comment.author}`}>
            <span className="comment-card-author">@{comment.author}</span>
          </Link>{" "}
          | {formatDate(comment.created_at)}
        </h3>

        {/* Comment text content */}
        <p className="comment-card-body">{comment.body}</p>

        {/* Voting and deletion controls */}
        <div className="comment-actions-container">
          <VoteButton
            className="comment-vote"
            initialVotes={comment.votes}
            item_id={comment.comment_id}
            voteFunction={patchCommentVotes}
          />

          {/* Show deletion message during async request */}
          {isDeleting && <p>Deleting comment...</p>}

          {/* Show delete button and confirmation if allowed */}
          {canDelete && (
            <div className="delete-button-wrapper">
              <button
                aria-label="Delete comment"
                className="delete-comment-button"
                disabled={isDeleting}
                type="button"
                onClick={() => setShowConfirm(true)}
              >
                <Trash2 className="delete-comment-icon" />
              </button>

              {/* Confirmation prompt with cancel option */}
              {showConfirm && (
                <div className="confirm-delete-container">
                  <p className="confirm-delete-message">
                    <strong>Warning:</strong> Deleting this comment is
                    irreversible.
                  </p>
                  <div className="confirm-delete-buttons-container">
                    {/* Confirm deletion */}
                    <button
                      className="confirm-delete-button"
                      disabled={isDeleting}
                      type="button"
                      onClick={handleDelete}
                    >
                      Confirm
                    </button>

                    {/* Cancel deletion */}
                    <button
                      className="cancel-delete-button"
                      disabled={isDeleting}
                      type="button"
                      onClick={() => setShowConfirm(false)}
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

//! ===================================================== */
//! Prop types
//! ===================================================== */
CommentCard.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    comment_id: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    justPosted: PropTypes.bool,
  }).isRequired,
};
