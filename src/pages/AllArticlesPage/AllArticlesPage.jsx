//? URL: daily-spews.com/articles

import "./AllArticlesPage.css";
import { useState } from "react";
import { getArticles } from "../../api/api.js";
import ArticleCard from "../../components/ArticleCard/ArticleCard.jsx";
import SortBar from "../../components/SortBar/SortBar.jsx";
import TopicFilterBar from "../../components/TopicFilterBar/TopicFilterBar.jsx";
import useFetch from "../../hooks/useFetch.js";
import ErrorMessageCard from "../../components/ErrorMessageCard/ErrorMessageCard.jsx";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination.jsx";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.jsx";

export default function AllArticlesPage() {
  const [searchParams] = useSearchParams();
  let sort_by = searchParams.get("sort_by") || "created_at";
  let order = searchParams.get("order") || "desc";
  const topic = searchParams.get("topic");

  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading, error } = useFetch(
    () => getArticles(sort_by, order, topic, limit, currentPage),
    [sort_by, order, topic, limit, currentPage]
  );

  const articles = data?.articles || [];
  const totalCount = data?.total_count || 0;

  return (
    <>
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
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCount={totalCount}
        limit={limit}
      />
    </>
  );
}
