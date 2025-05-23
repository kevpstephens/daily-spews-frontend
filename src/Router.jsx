import { Routes, Route, Navigate } from "react-router-dom";
import AllArticlesPage from "./pages/AllArticlesPage";
import HomePage from "./HomePage";
import TopicsPage from "./pages/TopicsPage";
import SingleArticlePage from "./pages/SingleArticlePage";
import TopicArticlesPage from "./pages/TopicArticlesPage";
import LoggedInUsersPage from "./pages/LoggedInUsersPage";
import OtherUserPage from "./pages/OtherUserPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/" element={<Navigate to="/articles"/>} /> */}
      <Route path="/articles" element={<AllArticlesPage />} />
      <Route path="/articles/:article_id" element={<SingleArticlePage />} />
      <Route path="/topics" element={<TopicsPage />} />
      <Route path="/topics/:topic_slug" element={<TopicArticlesPage />} />
      <Route path="/userProfilePage" element={<LoggedInUsersPage />} />
      <Route path="/users/:username" element={<OtherUserPage />} />
    </Routes>
  );
}

export default AppRouter;
