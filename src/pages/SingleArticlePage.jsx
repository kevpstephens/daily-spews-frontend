import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api/api";
import PageHeader from "../components/PageHeader";
import { formatDate } from "../utils/formatDate";
import CommentList from "../components/CommentList";

export default function SingleArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    getArticleById(article_id).then((data) => {
      setArticle(data.article);
    });
  }, [article_id]);

  return (
    <>
      <h3>*Single Article Page*</h3>
      <PageHeader />
      <article className="article-page">
        <h2>{article.title}</h2>
        <p>
          Written by: {article.author} | Topic: #{article.topic} <br /> Posted:{" "}
          {formatDate(article.created_at)}
        </p>

        <img src={article.article_img_url} alt={`${article.title} image`} />
        <p className="article-body">{article.body}</p>
        <p className="likes-and-comments">
          💬 {article.comment_count} | 💜 {article.votes}
        </p>
      </article>
      <CommentList article_id={article.article_id} />
    </>
  );
}
