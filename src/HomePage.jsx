/** ============================================================
 *! HomePage.jsx
 *? URL: daily-spews.onrender.com/

 * Main homepage component displaying topic navigation and articles.
 * Features horizontal topic selector and embedded articles page.
 *============================================================ */

import "./styles/App.css";
import HorizontalTopics from "./components/HorizontalTopics/HorizontalTopics.jsx";
import AllArticlesPage from "./pages/AllArticlesPage/AllArticlesPage.jsx";

export default function HomePage() {
  return (
    <>
      <main>
        {/* Horizontal topic navigation bar */}
        <HorizontalTopics />

        {/* Main articles content with its own loading/error handling */}
        <AllArticlesPage />
      </main>
    </>
  );
}
