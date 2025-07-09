/** ============================================================
 *! CommentList.jsx

 * Displays a list of article comments.
 * Handles smooth scrolling into view if URL hash is "#comments".
 * Shows a loading spinner when comments are being fetched.
 *============================================================ */

import "./CommentList.css";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import CommentCard from "../CommentCard/CommentCard";
import NoCommentsScreen from "../NoCommentsScreen/NoCommentsScreen";

export default function CommentList({ comments, isFetching }) {
  // Get current URL location to detect hash for scroll behavior
  const location = useLocation();

  // Smooth scroll to comments section if "#comments" is in URL
  useEffect(() => {
    if (location.hash === "#comments") {
      const el = document.getElementById("comments");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
    }
  }, [location]);

  return (
    <>
      {/* Comments section */}
      <section className="comment-list-container" id="comments">
        <h2>Comments:</h2>

        {/* Show placeholder when no comments are available */}
        {comments.length === 0 && <NoCommentsScreen />}

        {/* List of comment cards */}
        <ul className="comment-list">
          {comments.map((comment, index) => (
            <CommentCard
              key={comment.comment_id || `${comment.username}-${index}`}
              comment={comment}
            />
          ))}
        </ul>

        {/* Show loading spinner while fetching more comments */}
        {isFetching && (
          <div className="loading-comments-container">
            <img
              alt="Loading spinner"
              className="loading-comments-spinner"
              src="/src/assets/logo/daily-spews-alt-logo-cropped.png"
            />
            <p className="loading-comments-text">
              Please wait while we spew out some of your lovely comments...
            </p>
          </div>
        )}
      </section>
    </>
  );
}

//! ===================================================== */
//! Prop types
//! ===================================================== */
CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      comment_id: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
      username: PropTypes.string,
      justPosted: PropTypes.bool,
    })
  ).isRequired,
  isFetching: PropTypes.bool.isRequired,
};
