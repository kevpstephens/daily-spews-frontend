import { useEffect, useRef, useState } from "react";
import CommentCard from "./CommentCard";
import { getCommentByArticleId } from "../api/api";
import NoCommetsScreen from "./NoCommentsScreen";

export default function CommentList({ article_id }) {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [limit] = useState(10);
  const [isFetching, setIsFetching] = useState(false);
  const loaderRef = useRef(null);

  // Fetch comments
  useEffect(() => {
    let ignore = false;
    const fetchComments = async () => {
      setIsFetching(true);
      try {
        const data = await getCommentByArticleId(
          article_id,
          limit,
          currentPage
        );
        if (!ignore) {
          setComments((prev) => [...prev, ...data.comments]);
          setTotalCount(data.total_count);
        }
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      } finally {
        setIsFetching(false);
      }
    };
    fetchComments();

    return () => {
      ignore = true;
    };
  }, [article_id, limit, currentPage]);

  // Infinite scroll effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && comments.length < totalCount) {
          setCurrentPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [comments, totalCount]);

  return (
    <>
      <section id="comments" className="comment-section">
        <h2>Comments:</h2>

        {comments.length === 0 && <NoCommetsScreen />}

        <ul className="comment-list">
          {comments.map((comment) => (
            <CommentCard key={comment.comment_id} comment={comment} />
          ))}
        </ul>

        {isFetching && (
          <div className="loading-comments-container">
            <img
              className="loading-comments-spinner"
              src="../src/assets/logo/daily-spews-alt-logo-cropped.png"
              alt="Loading more comments..."
            />
            <p className="loading-comments-text">
              Please wait while we spew out some of your lovely comments...
            </p>
          </div>
        )}

        <div ref={loaderRef} className="comment-scroll-loader"></div>
      </section>
    </>
  );
}
