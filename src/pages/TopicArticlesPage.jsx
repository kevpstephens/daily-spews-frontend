//? URL: daily-spews.com/topics/:topic_slug

import { useParams } from "react-router-dom";
import { getArticlesByTopic } from "../api/api";
import ArticleCard from "../components/ArticleCard/ArticleCard.jsx";
import useFetch from "../hooks/useFetch";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen.jsx";
import ErrorMessageCard from "../components/ErrorMessageCard/ErrorMessageCard.jsx";

export default function TopicArticlesPage() {
  const { topic_slug } = useParams();
  const { data, isLoading, error } = useFetch(
    () => getArticlesByTopic(topic_slug),
    [topic_slug]
  );

  let articles = [];
  if (data && data.articles) {
    articles = data.articles;
  }

  return (
    <>
      {isLoading && (
        <LoadingScreen topicItem={topic_slug} topicArticleLoad={true} />
      )}
      {error && <ErrorMessageCard topicError={error} />}

      {!isLoading && !error && (
        <>
          <h1 className="topics-articles-page-heading">topic: #{topic_slug}</h1>
          {/* <p>{topic.description}</p> */}
          <section className="articles-page">
            {articles.map((article) => (
              <ArticleCard key={article.article_id} article={article} />
            ))}
          </section>
        </>
      )}
    </>
  );
}
