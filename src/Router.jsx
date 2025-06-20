import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import AllArticlesPage from "./pages/AllArticlesPage/AllArticlesPage.jsx";
import ErrorPageNotFound from "./pages/ErrorPageNotFound/ErrorPageNotFound.jsx";
import HomePage from "./HomePage";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";
import SingleArticlePage from "./pages/SingleArticlePage/SingleArticlePage.jsx";
import TestPage from "./pages/TestPage";
import TopicsPage from "./pages/TopicsPage/TopicsPage.jsx";
import TopicArticlesPage from "./pages/TopicArticlesPage/TopicArticlesPage.jsx";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage.jsx";

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
            <Route path="/users/:username" element={<UserProfilePage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default AppRouter;
