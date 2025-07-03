/** ============================================================
 *! AllArticlesPage.jsx
*? URL: https://daily-spews.onrender.com/articles

 * Main articles listing page with sorting, filtering, and pagination.
 * Displays all articles or filters by topic based on URL search params.
 * Features mobile-optimised scrolling and responsive pagination.
 *============================================================ */

import "./AllArticlesPage.css";
import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticles } from "../../api/api.js";
import useFetch from "../../hooks/useFetch.js";
import ArticleCard from "../../components/ArticleCard/ArticleCard.jsx";
import ErrorMessageCard from "../../components/ErrorMessageCard/ErrorMessageCard.jsx";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import SortAndTopicBar from "../../components/SortAndTopicBar/SortAndTopicBar.jsx";

export default function AllArticlesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  // Extract URL parameters with defaults
  const sort_by = searchParams.get("sort_by") ?? "created_at";
  const order = searchParams.get("order") ?? "desc";
  const topic = searchParams.get("topic");

  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);

  const headingRef = useRef(null);
  // Prevents multiple scroll adjustments on mobile
  const hasMountedOnce = useRef(false);

  // Mobile scroll optimisation - adjust view after initial render
  useEffect(() => {
    if (window.innerWidth <= 600 && !hasMountedOnce.current) {
      hasMountedOnce.current = true;
      if (headingRef.current) {
        const yOffset = -457.5; // Adjust to height of sticky header
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

  // Handle pagination with smooth scroll to top
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    headingRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Reset all filters and return to page 1
  const handleReset = () => {
    setCurrentPage(1);
    setSearchParams({});
  };

  return (
    <>
      <main className="all-articles-page-main">
        <h1 ref={headingRef}>{!topic ? "All Articles" : `#${topic}`}</h1>

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
    </>
  );
}
