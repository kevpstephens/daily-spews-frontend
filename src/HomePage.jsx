//? URL: daily-spews.com/

import "./styles/App.css";
import HorizontalTopics from "./components/HorizontalTopics";
import { getArticles } from "./api/api";
import useFetch from "./hooks/useFetch";
import LoadingScreen from "./components/LoadingScreen";
import AllArticlesPage from "./pages/AllArticlesPage";
import ErrorMessageCard from "./components/ErrorMessageCard";

export default function HomePage() {
  const { isLoading, error } = useFetch(getArticles);

  return (
    <>
      <main>
        <HorizontalTopics />
        {isLoading && <LoadingScreen item={"articles"} />}
        {error && <ErrorMessageCard error={error} />}

        {!isLoading && !error && (
          <>
            <AllArticlesPage />
          </>
        )}
      </main>
    </>
  );
}
