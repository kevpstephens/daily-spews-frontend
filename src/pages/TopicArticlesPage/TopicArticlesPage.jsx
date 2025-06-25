import "./TopicArticlesPage.css";
import { useParams } from "react-router-dom";
import { getArticlesByTopic, getTopics } from "../../api/api";
import { useEffect, useRef, useCallback, useState } from "react";
import ArticleCard from "../../components/ArticleCard/ArticleCard.jsx";
import ErrorMessageCard from "../../components/ErrorMessageCard/ErrorMessageCard.jsx";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.jsx";
import useFetch from "../../hooks/useFetch.js";

export default function TopicArticlesPage() {
  const { topic_slug } = useParams();
  const [page, setPage] = useState(1);
  const [allArticles, setAllArticles] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (hasMountedRef.current) return;
    setAllArticles([]);
    setHasMore(true);
    setPage(1);
    hasMountedRef.current = true;
  }, [topic_slug]);

  useEffect(() => {
    let ignore = false;
    if (page !== 1) {
      setIsLoading(true);
    }
    setError(null);
    getArticlesByTopic(topic_slug, 10, page)
      .then((res) => {
        if (!ignore) {
          setAllArticles((prev) => {
            const newArticles = res.articles.filter(
              (article) =>
                !prev.some((a) => a.article_id === article.article_id)
            );
            return [...prev, ...newArticles];
          });
          if (res.articles.length < 10) setHasMore(false);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        if (!ignore) {
          setError(err);
          setIsLoading(false);
        }
      });
    return () => {
      ignore = true;
    };
  }, [page, topic_slug]);

  const observer = useRef();
  const lastArticleRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const { data: topicData } = useFetch(getTopics, []);
  const topic = topicData?.topics?.find((topic) => topic.slug === topic_slug);
  const topicDescription = topic?.description || "";

  return (
    <>
      <div className="topic-articles-page-heading-container">
        <h1 className="topic-articles-page-heading">#{topic_slug}</h1>
        <p className="topic-description">{topicDescription}</p>
      </div>

      <section className="topic-articles-page">
        {allArticles.map((article, index) => {
          if (index === allArticles.length - 1) {
            return (
              <div ref={lastArticleRef} key={article.article_id}>
                <ArticleCard article={article} />
              </div>
            );
          } else {
            return <ArticleCard key={article.article_id} article={article} />;
          }
        })}
      </section>

      {isLoading && (
        <LoadingScreen topicItem={topic_slug} topicArticleLoad={true} />
      )}
      {error && <ErrorMessageCard topicError={error} />}

      {hasMore && !error && (
        <div className="loading-topics-articles-container">
          <img
            className="loading-topics-articles-spinner"
            src="/assets/mascot/mascot-spewing-loading.png"
            alt="Loading more comments..."
          />
          <p className="loading-topics-articles-text">
            Please wait while we spew out some of your lovely little articles...
          </p>
        </div>
      )}
    </>
  );
}
