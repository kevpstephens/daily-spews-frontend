/** ============================================================
 *! SingleArticlePage.jsx
 *? URL: daily-spews.onrender.com/articles/:article_id

 * Individual article display page with infinite scroll comments.
 * Features article content, voting system, and paginated comment loading.
 * Includes smooth scrolling to likes section and intersection observer.
 *============================================================ */
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import {
  getArticleById,
  getCommentByArticleId,
  patchArticleVotes,
} from "../../api/api";
import CommentButton from "../../components/CommentButton/CommentButton";
import CommentList from "../../components/CommentList/CommentList";
import ErrorMessageCard from "../../components/ErrorMessageCard/ErrorMessageCard";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import PostCommentForm from "../../components/PostCommentForm/PostCommentForm";
import VoteButton from "../../components/VoteButton/VoteButton";
import useFetch from "../../hooks/useFetch";
import formatDate from "../../utils/formatDate";
import logger from "../../utils/logger";
import "./SingleArticlePage.css";

export default function SingleArticlePage() {
  const { article_id } = useParams();
  const location = useLocation();
  const { data, isLoading, error } = useFetch(
    () => getArticleById(article_id),
    [article_id]
  );

  // Comment pagination and infinite scroll states
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [limit] = useState(10);
  const [isFetching, setIsFetching] = useState(false);
  const loaderRef = useRef(null); // Ref for intersection observer target

  // Fetch comments with pagination - triggered by page changes
  useEffect(() => {
    let ignore = false;
    const fetchInitialComments = async () => {
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
        logger.error("Failed to fetch comments", err);
      } finally {
        setIsFetching(false);
      }
    };
    fetchInitialComments();

    return () => {
      ignore = true;
    };
  }, [article_id, limit, currentPage]);

  // Infinite scroll implementation using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && comments.length < totalCount) {
          setCurrentPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 } // Trigger when 100% of the element is visible
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [comments, totalCount]);

  // Extract article data from useFetch response
  let article = {};
  if (data && data.article) {
    article = data.article;
  }

  // Handle smooth scroll to likes section when URL contains hash
  useEffect(() => {
    if (!isLoading && location.hash === "#article-likes") {
      const el = document.getElementById("article-likes");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
    }
  }, [location, isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen singleArticleLoad={true} />}
      {error && <ErrorMessageCard articleError={error} />}

      {!isLoading && !error && (
        <>
          {/* Main article content */}
          <article className="article-page">
            <h2>{article.title}</h2>
            <div className="article-header-container">
              <h3>
                <strong>Written by:</strong>{" "}
                <Link to={`/users/${article.author}`}>@{article.author}</Link> |
                <strong> Topic:</strong>{" "}
                <Link to={`/topics/${article.topic}`}>#{article.topic}</Link> |{" "}
                <strong>Posted:</strong> {formatDate(article.created_at)}
              </h3>
            </div>

            <img
              alt={`Illustration for article: ${article.title}`}
              src={article.article_img_url}
            />

            <p className="article-body">{article.body}</p>

            {/* Article interaction section - votes and comments */}
            <section className="likes-and-comments" id="article-likes">
              <CommentButton
                commentCount={article.comment_count}
                scrollTargetId="post-comment-form"
              />
              <VoteButton
                className="article-vote"
                initialVotes={article.votes}
                item_id={article_id}
                voteFunction={patchArticleVotes}
              />
            </section>
          </article>

          {/* Comment posting form */}
          <div id="post-comment-form">
            <PostCommentForm
              article_id={article_id}
              setComments={setComments}
            />
          </div>

          {/* Comments list with infinite scroll */}
          <CommentList
            article_id={article_id}
            comments={comments}
            isFetching={isFetching}
            setComments={setComments}
          />

          {/* Intersection observer target for infinite scroll */}
          <div ref={loaderRef} className="comment-scroll-loader" />
        </>
      )}
    </>
  );
}
