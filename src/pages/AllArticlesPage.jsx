import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { getArticles } from "../api/api";
import ArticleCard from "../components/ArticleCard";
import SortBar from "../components/SortBar";
import TopicFilterBar from "../components/TopicFilterBar";

function AllArticlesPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((data) => {
      setArticles(data.articles);
    });
  }, []);

  return (
    <>
      <h3>Articles Page</h3>
      <PageHeader />
      <div className="sort-and-topic-bar-container">
        <SortBar />
        <TopicFilterBar />
      </div>
      {/* <div className="articles-wrapper"> */}
        <main className="articles-page">
          {articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
        </main>
      {/* </div> */}
    </>
  );
}

export default AllArticlesPage;
