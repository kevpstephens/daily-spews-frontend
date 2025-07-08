/** ============================================================
 *! TopicsPage.jsx

 * Displays all available topics in a grid layout.
 * Simple page that fetches and renders topic cards with loading/error states.
 *============================================================ */

//? URL: daily-spews.com/topics

import "./TopicsPage.css";
import { getTopics } from "../../api/api";
import TopicCard from "../../components/TopicCard/TopicCard.jsx";
import useFetch from "../../hooks/useFetch";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.jsx";
import ErrorMessageCard from "../../components/ErrorMessageCard/ErrorMessageCard.jsx";

export default function TopicsPage() {
  const { data, isLoading, error } = useFetch(getTopics);

  // Early returns for loading and error states
  if (isLoading) return <LoadingScreen item={"Topics"} />;
  if (error) return <ErrorMessageCard error={error} />;

  // Extract topics array with fallback and sort alphabetically by slug
  const topics = (data?.topics || []).sort((a, b) =>
    a.slug.localeCompare(b.slug)
  );

  return (
    <main>
      <h1 className="topics-articles-page-heading">All Topics</h1>

      {/* Topics grid container */}
      <section className="topics-page-container">
        {topics.map((topic) => (
          <TopicCard key={topic.slug} topic={topic} type={"normal-"} />
        ))}
      </section>
    </main>
  );
}
