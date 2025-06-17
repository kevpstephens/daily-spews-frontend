import { Routes, Route, Navigate } from "react-router-dom";
import AllArticlesPage from "./pages/AllArticlesPage";
import HomePage from "./HomePage";
import TopicsPage from "./pages/TopicsPage";
import SingleArticlePage from "./pages/SingleArticlePage";
import TopicArticlesPage from "./pages/TopicArticlesPage";
import LoggedInUsersPage from "./pages/LoggedInUsersPage";
import OtherUserPage from "./pages/OtherUserPage";
import ErrorPageNotFound from "./pages/ErrorPageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestPage from "./pages/TestPage";
import Layout from "./Layout";

function AppRouter() {
  return (
    <>
      <div className="toast-wrapper">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          // autoClose={false}
          icon={true}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastClassName="daily-spews-toast"
          bodyClassName="daily-spews-toast-body"
        />
      </div>
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<ErrorPageNotFound />} />
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/" element={<Navigate to="/articles"/>} /> */}
            <Route path="/articles" element={<AllArticlesPage />} />
            <Route
              path="/articles/:article_id"
              element={<SingleArticlePage />}
            />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="/topics/:topic_slug" element={<TopicArticlesPage />} />
            <Route path="/user-profile-page" element={<LoggedInUsersPage />} />
            <Route path="/users/:username" element={<OtherUserPage />} />
            <Route path="/test" element={<TestPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default AppRouter;
