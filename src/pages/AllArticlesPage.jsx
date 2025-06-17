import PageHeader from "../components/PageHeader";
import { getArticles } from "../api/api";
import ArticleCard from "../components/ArticleCard";
import SortBar from "../components/SortBar";
import TopicFilterBar from "../components/TopicFilterBar";
import useFetch from "../hooks/useFetch";
import ErrorMessageCard from "../components/ErrorMessageCard";
import LoadingScreen from "../components/LoadingScreen";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

export default function AllArticlesPage() {
  const [searchParams] = useSearchParams();
  let sort_by = searchParams.get("sort_by") || "created_at";
  let order = searchParams.get("order") || "desc";
  const topic = searchParams.get("topic");

  const { data, isLoading, error } = useFetch(
    () => getArticles(sort_by, order, topic),
    [sort_by, order, topic]
  );
  let articles = [];

  if (data && data.articles) {
    articles = data.articles;
  }

  return (
    <>
      <h3>*All Articles Page*</h3>
      <PageHeader />

      <div className="sort-and-topic-bar-container">
        <SortBar sort_by={sort_by} order={order} />
        <TopicFilterBar />
        <Link to="/articles" id="reset-button">
          Reset
        </Link>
      </div>

      {isLoading && <LoadingScreen item={"articles"} />}
      {error && <ErrorMessageCard error={error} />}

      {!isLoading && !error && (
        <>
          <h1 className="all-articles-page-heading">
            {!topic ? "all articles:" : `#${topic}`}
          </h1>
          <section className="articles-page">
            {articles.map((article) => (
              <ArticleCard key={article.article_id} article={article} />
            ))}
          </section>
        </>
      )}
      <Pagination articles={articles} />
    </>
  );
}
