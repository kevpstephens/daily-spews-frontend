// URL: daily-spews.com/

import "./styles/App.css";
import HorizontalTopics from "./components/HorizontalTopics";
import { getArticles } from "./api/api";
import useFetch from "./hooks/useFetch";
import LoadingScreen from "./components/LoadingScreen";
import ArticleCard from "./components/ArticleCard";

export default function HomePage() {
  const { data, isLoading, error } = useFetch(getArticles);
  let articles = [];

  if (data && data.articles) {
    articles = data.articles;
  }
  return (
    <>
      <h3>*Home Page*</h3>

      <main>
        <HorizontalTopics />
        {isLoading && <LoadingScreen item={"articles"} />}
        {error && <ErrorMessageCard error={error} />}

        {!isLoading && !error && (
          <>
            <h1 className="all-articles-page-heading">all articles:</h1>
            <section className="articles-page">
              {articles.map((article) => (
                <ArticleCard key={article.article_id} article={article} />
              ))}
            </section>
          </>
        )}
      </main>
    </>
  );
}
