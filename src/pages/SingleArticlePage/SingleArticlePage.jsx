//? URL: daily-spews.com/articles/:article_id

import "./SingleArticlePage.css";
import { Link, useParams } from "react-router-dom";
import { getArticleById, patchArticleVotes } from "../../api/api";
import { formatDate } from "../../utils/formatDate";
import CommentList from "../../components/CommentList/CommentList.jsx";
import useFetch from "../../hooks/useFetch";
import ErrorMessageCard from "../../components/ErrorMessageCard/ErrorMessageCard.jsx";
import PostCommentForm from "../../components/PostCommentForm/PostCommentForm.jsx";
import VoteButton from "../../components/VoteButton/VoteButton.jsx";
import ToastTester from "../../components/ToastTester/ToastTester.jsx";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.jsx";
import CommentButton from "../../components/CommentButton/CommentButton.jsx";

export default function SingleArticlePage() {
  const { article_id } = useParams();
  const { data, isLoading, error } = useFetch(
    () => getArticleById(article_id),
    [article_id]
  );

  let article = {};
  if (data && data.article) {
    article = data.article;
  }

  return (
    <>
      <ToastTester />
      <h3>*Single Article Page*</h3>

      {isLoading && <LoadingScreen singleArticleLoad={true} />}
      {error && <ErrorMessageCard articleError={error} />}

      {!isLoading && !error && (
        <>
          <article className="article-page">
            <h2>{article.title}</h2>
            <p>
              Written by:{" "}
              <Link to={`/users/${article.author}`}>{article.author}</Link> |
              Topic: #{article.topic} <br /> Posted:{" "}
              {formatDate(article.created_at)}
            </p>

            <img src={article.article_img_url} alt={`article image`} />
            <p className="article-body">{article.body}</p>
            <section className="likes-and-comments">
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
            <PostCommentForm article_id={article_id} />
          </div>
          <CommentList article_id={article.article_id} />
        </>
      )}
    </>
  );
}
