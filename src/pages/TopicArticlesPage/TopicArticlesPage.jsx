//? URL: daily-spews.com/topics/:topic_slug

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

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getArticlesByTopic(topic_slug, 10, page)
      .then((res) => {
        setAllArticles((prev) => [...prev, ...res.articles]);
        if (res.articles.length < 10) setHasMore(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [topic_slug, page]);

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
      {isLoading && (
        <LoadingScreen topicItem={topic_slug} topicArticleLoad={true} />
      )}
      {error && <ErrorMessageCard topicError={error} />}

      {!isLoading && !error && (
        <>
          <h1 className="topic-articles-page-heading">#{topic_slug}</h1>
          <p className="topic-description">{topicDescription}</p>

          <section className="topic-articles-page">
            {allArticles.map((article, index) => {
              if (index === allArticles.length - 1) {
                return (
                  <div ref={lastArticleRef} key={article.article_id}>
                    <ArticleCard article={article} />
                  </div>
                );
              } else {
                return (
                  <ArticleCard key={article.article_id} article={article} />
                );
              }
            })}
          </section>
          {hasMore && (
            <div className="loading-topics-articles-container">
              <img
                className="loading-topics-articles-spinner"
                src="../src/assets/logo/daily-spews-alt-logo-cropped.png"
                alt="Loading more comments..."
              />
              <p className="loading-topics-articles-text">
                Please wait while we spew out some of your lovely little
                articles...
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
}
