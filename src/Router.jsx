import { Routes, Route, Navigate } from "react-router-dom";
import AllArticlesPage from "./pages/AllArticlesPage";
import App from "./App";
import TopicsPage from "./pages/TopicsPage";
import UsersPage from "./pages/UsersPage";
import SingleArticlePage from "./pages/SingleArticlePage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      {/* <Route path="/" element={<Navigate to="/articles"/>} /> */}
      <Route path="/articles" element={<AllArticlesPage />} />
      <Route path="/articles/:article_id" element={<SingleArticlePage />} />
      <Route path="/topics" element={<TopicsPage />} />
      <Route path="/users" element={<UsersPage />} />
    </Routes>
  );
}

export default AppRouter;
