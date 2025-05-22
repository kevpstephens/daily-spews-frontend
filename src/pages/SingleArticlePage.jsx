import { useParams } from "react-router-dom";
import { getArticleById, patchArticleVotes } from "../api/api";
import PageHeader from "../components/PageHeader";
import { formatDate } from "../utils/formatDate";
import CommentList from "../components/CommentList";
import useFetch from "../hooks/useFetch";
import LoadingScreen from "../components/LoadingScreen";
import ErrorMessageCard from "../components/ErrorMessageCard";
import PostCommentForm from "../components/PostCommentForm";
import VoteButton from "../components/VoteButton";

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
      <h3>*Single Article Page*</h3>
      <PageHeader />

      {isLoading && <LoadingScreen />}
      {error && <ErrorMessageCard error={error} />}

      {!isLoading && !error && (
        <>
          <article className="article-page">
            <h2>{article.title}</h2>
            <p>
              Written by: {article.author} | Topic: #{article.topic} <br />{" "}
              Posted: {formatDate(article.created_at)}
            </p>

            <img src={article.article_img_url} alt={`article image`} />
            <p className="article-body">{article.body}</p>
            <section className="likes-and-comments">
              <button className="comment-button">
                💬 {article.comment_count}
              </button>
              <VoteButton
                className="article-vote"
                item_id={article_id}
                initialVotes={article.votes}
                voteFunction={patchArticleVotes}
              />
            </section>
          </article>
          <PostCommentForm article_id={article_id} />
          <CommentList article_id={article.article_id} />
        </>
      )}
    </>
  );
}
