/** !============================================================
 *! PostNewArticleButton.jsx
 
 * Button component that allows signed-in users to navigate to the
 * "Post New Article" form.
 * Hidden if user is not authenticated.
 *============================================================ */

import "./PostNewArticleButton.css";
import { useUser } from "../../context";
import { useNavigate } from "react-router-dom";
import { PencilLine } from "lucide-react";

export default function PostNewArticleButton({ className = "" }) {
  const { user } = useUser();
  const navigate = useNavigate();

  // If no user is logged in, hide the button entirely
  if (!user) return null;

  return (
    <>
      {/* Button to navigate to the article creation form */}
      <button
        onClick={() => navigate("/articles/new")}
        className={`post-article-button ${className}`}
      >
        <span>Post Article</span>
        <PencilLine />
      </button>
    </>
  );
}
