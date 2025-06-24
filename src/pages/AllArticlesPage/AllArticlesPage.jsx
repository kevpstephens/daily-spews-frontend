import "./AllArticlesPage.css";
import { useState, useEffect } from "react";
import { getArticles } from "../../api/api.js";
import ArticleCard from "../../components/ArticleCard/ArticleCard.jsx";
import SortBar from "../../components/SortBar/SortBar.jsx";
import TopicFilterBar from "../../components/TopicFilterBar/TopicFilterBar.jsx";
import useFetch from "../../hooks/useFetch.js";
import ErrorMessageCard from "../../components/ErrorMessageCard/ErrorMessageCard.jsx";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination.jsx";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.jsx";

export default function AllArticlesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort_by = searchParams.get("sort_by") ?? "created_at";
  const order = searchParams.get("order") ?? "desc";
  const topic = searchParams.get("topic");

  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading, error } = useFetch(
    () => getArticles(sort_by, order, topic, limit, currentPage),
    [sort_by, order, topic, limit, currentPage]
  );

  const { articles = [], total_count: totalCount = 0 } = data || {};

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleReset = () => {
    setCurrentPage(1);
    setSearchParams({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="all-articles-page-main">
      <h1 className="all-articles-page-heading">
        {!topic ? "all articles:" : `#${topic}`}
      </h1>

      <div className="sort-and-topic-bar-container">
        <SortBar sort_by={sort_by} order={order} />
        <TopicFilterBar />
        <button id="reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>

      {isLoading && <LoadingScreen item="articles" />}
      {error && <ErrorMessageCard error={error} />}

      {!isLoading && !error && (
        <section className="all-articles-list">
          {articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
        </section>
      )}

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={totalCount}
        limit={limit}
      />
    </main>
  );
}
