import PageHeader from "../components/PageHeader";
import { getArticles } from "../api/api";
import ArticleCard from "../components/ArticleCard";
import SortBar from "../components/SortBar";
import TopicFilterBar from "../components/TopicFilterBar";
import useFetch from "../hooks/useFetch";
import ErrorMessageCard from "../components/ErrorMessageCard";
import LoadingScreen from "../components/LoadingScreen";

export default function AllArticlesPage() {
  const { data, isLoading, error } = useFetch(getArticles);
  let articles = [];

  if (data && data.articles) {
    articles = data.articles;
  }

  return (
    <>
      <h3>*Articles Page*</h3>
      <PageHeader />
      <div className="sort-and-topic-bar-container">
        <SortBar />
        <TopicFilterBar />
      </div>

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
    </>
  );
}
