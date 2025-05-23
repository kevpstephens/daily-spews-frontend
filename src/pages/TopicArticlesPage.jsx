import { useParams } from "react-router-dom";
import { getArticlesByTopic } from "../api/api";
import ArticleCard from "../components/ArticleCard";
import PageHeader from "../components/PageHeader";
import useFetch from "../hooks/useFetch";
import LoadingScreen from "../components/LoadingScreen";
import ErrorMessageCard from "../components/ErrorMessageCard";
import TopicFilterBar from "../components/TopicFilterBar";

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
      <PageHeader />
      {isLoading && <LoadingScreen item={`${topic_slug} articles`} />}
      {error && <ErrorMessageCard error={error} />}

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
