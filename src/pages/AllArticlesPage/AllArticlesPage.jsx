import "./AllArticlesPage.css";
import { useRef, useState, useEffect } from "react";
import { getArticles } from "../../api/api.js";
import ArticleCard from "../../components/ArticleCard/ArticleCard.jsx";
import useFetch from "../../hooks/useFetch.js";
import ErrorMessageCard from "../../components/ErrorMessageCard/ErrorMessageCard.jsx";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination.jsx";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.jsx";
import SortAndTopicBar from "../../components/SortAndTopicBar.jsx";

export default function AllArticlesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort_by = searchParams.get("sort_by") ?? "created_at";
  const order = searchParams.get("order") ?? "desc";
  const topic = searchParams.get("topic");

  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);

  const headingRef = useRef(null);
  const hasMountedOnce = useRef(false);

  useEffect(() => {
    if (window.innerWidth <= 600 && !hasMountedOnce.current) {
      hasMountedOnce.current = true;
      if (headingRef.current) {
        const yOffset = -470; // adjust to height of your sticky header
        const y =
          headingRef.current.getBoundingClientRect().top +
          window.scrollY +
          yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, []);

  const { data, isLoading, error } = useFetch(
    () => getArticles(sort_by, order, topic, limit, currentPage),
    [sort_by, order, topic, limit, currentPage]
  );

  const { articles = [], total_count: totalCount = 0 } = data || {};

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    headingRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleReset = () => {
    setCurrentPage(1);
    setSearchParams({});
  };

  return (
    <main className="all-articles-page-main">
      <h1 ref={headingRef} className="all-articles-page-heading">
        {!topic ? "All Articles" : `#${topic}`}
      </h1>

      <SortAndTopicBar handleReset={handleReset} />

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
        setCurrentPage={handlePageChange}
        totalCount={totalCount}
        limit={limit}
      />
    </main>
  );
}
