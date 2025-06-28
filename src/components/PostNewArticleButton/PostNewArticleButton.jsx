import "./PostNewArticleButton.css";
import { useUser } from "../../context";
import { useNavigate } from "react-router-dom";
import { PencilLine } from "lucide-react";

export default function PostNewArticleButton({ className = "" }) {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <>
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
