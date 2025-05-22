import { Routes, Route, Navigate } from "react-router-dom";
import AllArticlesPage from "./pages/AllArticlesPage";
import HomePage from "./HomePage";
import TopicsPage from "./pages/TopicsPage";
import UsersPage from "./pages/UsersPage";
import SingleArticlePage from "./pages/SingleArticlePage";
import TopicArticlesPage from "./pages/TopicArticlesPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/" element={<Navigate to="/articles"/>} /> */}
      <Route path="/articles" element={<AllArticlesPage />} />
      <Route path="/articles/:article_id" element={<SingleArticlePage />} />
      <Route path="/topics" element={<TopicsPage />} />
      <Route path="/topics/:topic_slug" element={<TopicArticlesPage />} />
      <Route path="/users" element={<UsersPage />} />
    </Routes>
  );
}

export default AppRouter;
