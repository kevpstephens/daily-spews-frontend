//? URL: daily-spews.com/articles/:article_id

import "./SingleArticlePage.css";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  getArticleById,
  patchArticleVotes,
  getCommentByArticleId,
} from "../../api/api";
import { useState, useEffect, useRef } from "react";
import { formatDate } from "../../utils/formatDate";
import CommentList from "../../components/CommentList/CommentList.jsx";
import useFetch from "../../hooks/useFetch";
import ErrorMessageCard from "../../components/ErrorMessageCard/ErrorMessageCard.jsx";
import PostCommentForm from "../../components/PostCommentForm/PostCommentForm.jsx";
import VoteButton from "../../components/VoteButton/VoteButton.jsx";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.jsx";
import CommentButton from "../../components/CommentButton/CommentButton.jsx";

export default function SingleArticlePage() {
  const { article_id } = useParams();
  const location = useLocation();
  const { data, isLoading, error } = useFetch(
    () => getArticleById(article_id),
    [article_id]
  );

  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [limit] = useState(10);
  const [isFetching, setIsFetching] = useState(false);
  const loaderRef = useRef(null);

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
        console.error("Failed to fetch comments", err);
      } finally {
        setIsFetching(false);
      }
    };
    fetchInitialComments();

    return () => {
      ignore = true;
    };
  }, [article_id, limit, currentPage]);

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

  let article = {};
  if (data && data.article) {
    article = data.article;
  }

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
          <article className="article-page">
            <h2>{article.title}</h2>
            <div className="article-header-container">
              <p>
                <strong>Written by:</strong>{" "}
                <Link to={`/users/${article.author}`}>@{article.author}</Link> |
                <strong> Topic:</strong>{" "}
                <Link to={`/topics/${article.topic}`}>#{article.topic}</Link> |{" "}
                <strong>Posted:</strong> {formatDate(article.created_at)}
              </p>
            </div>

            <img src={article.article_img_url} alt={`article image`} />

            <p className="article-body">{article.body}</p>

            <section id="article-likes" className="likes-and-comments">
              <CommentButton
                commentCount={article.comment_count}
                scrollTargetId="post-comment-form"
              />
              <VoteButton
                className="article-vote"
                item_id={article_id}
                initialVotes={article.votes}
                voteFunction={patchArticleVotes}
              />
            </section>
          </article>

          <div id="post-comment-form">
            <PostCommentForm
              article_id={article_id}
              setComments={setComments}
            />
          </div>
          <CommentList
            article_id={article_id}
            comments={comments}
            setComments={setComments}
            isFetching={isFetching}
          />
          <div ref={loaderRef} className="comment-scroll-loader"></div>
        </>
      )}
    </>
  );
}
