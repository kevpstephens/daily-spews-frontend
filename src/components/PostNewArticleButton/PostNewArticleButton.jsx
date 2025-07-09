/** !============================================================
 *! PostNewArticleButton.jsx
 
 * Button component that allows signed-in users to navigate to the
 * "Post New Article" form.
 * Hidden if user is not authenticated.
 *============================================================ */

import { PencilLine } from "lucide-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../context";
import "./PostNewArticleButton.css";

export default function PostNewArticleButton({ className = "" }) {
  const { user } = useUser();
  const navigate = useNavigate();

  // If no user is logged in, hide the button entirely
  if (!user) return null;

  return (
    <>
      {/* Button to navigate to the article creation form */}
      <button
        className={`post-article-button ${className}`}
        type="button"
        onClick={() => navigate("/articles/new")}
      >
        <span>Post Article</span>
        <PencilLine />
      </button>
    </>
  );
}

//! ===================================================== */
//! Prop types
//! ===================================================== */
PostNewArticleButton.propTypes = {
  className: PropTypes.string,
};

PostNewArticleButton.defaultProps = {
  className: "",
};
