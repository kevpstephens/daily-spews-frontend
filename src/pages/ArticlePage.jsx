import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api/api";
import PageHeader from "../components/PageHeader";
import CommentCard from "../components/CommentCard";
import { formatDate } from "../utils/formatDate";

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    getArticleById(article_id).then((data) => {
      setArticle(data.article);
    });
  }, [article_id]);

  return (
    <>
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
      <CommentCard />
    </>
  );
}

export default ArticlePage;
