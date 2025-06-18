//? URL: daily-spews.com/

import "./styles/App.css";
import HorizontalTopics from "./components/HorizontalTopics/HorizontalTopics.jsx";
import { getArticles } from "./api/api";
import useFetch from "./hooks/useFetch";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.jsx";
import AllArticlesPage from "./pages/AllArticlesPage/AllArticlesPage.jsx";
import ErrorMessageCard from "./components/ErrorMessageCard/ErrorMessageCard.jsx";

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
