import "./CommentList.css";
import { useEffect } from "react";
import CommentCard from "../CommentCard/CommentCard";
import NoCommentsScreen from "../NoCommentsScreen/NoCommentsScreen";
import { useLocation } from "react-router-dom";

export default function CommentList({ comments, isFetching }) {
  const location = useLocation();

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
      <section id="comments" className="comment-list-container">
        <h2>Comments:</h2>

        {comments.length === 0 && <NoCommentsScreen />}

        <ul className="comment-list">
          {comments.map((comment, index) => (
            <CommentCard
              key={comment.comment_id || `${comment.username}-${index}`}
              comment={comment}
            />
          ))}
        </ul>

        {isFetching && (
          <div className="loading-comments-container">
            <img
              className="loading-comments-spinner"
              src="/src/assets/logo/daily-spews-alt-logo-cropped.png"
              alt="Loading more comments..."
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
