/** ============================================================
 *! Router.jsx

 * Main application router defining all page routes and navigation structure.
 * Features nested layout routing, toast notifications, and 404 error handling.
 * All routes use shared Layout component except 404 page.
 *============================================================ */

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./HomePage.jsx";
import Layout from "./Layout";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import AllArticlesPage from "./pages/AllArticlesPage/AllArticlesPage.jsx";
import ErrorPageNotFound from "./pages/ErrorPageNotFound/ErrorPageNotFound.jsx";
import FAQsPage from "./pages/FAQsPage/FAQsPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import PostArticlePage from "./pages/PostArticlePage/PostArticlePage.jsx";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";
import SingleArticlePage from "./pages/SingleArticlePage/SingleArticlePage.jsx";
import TestPage from "./pages/TestPage";
import TopicArticlesPage from "./pages/TopicArticlesPage/TopicArticlesPage.jsx";
import TopicsPage from "./pages/TopicsPage/TopicsPage.jsx";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage.jsx";

// Protected route component for authenticated-only pages
// function ProtectedRoute({ children }) {
//   const { user } = useUser();

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

export default function AppRouter() {
  return (
    <>
      {/* Global toast notification container */}
      <div className="toast-wrapper">
        <ToastContainer
          autoClose={3000}
          bodyClassName="daily-spews-toast-body"
          hideProgressBar={false}
          icon={true}
          position="top-right"
          rtl={false}
          toastClassName="daily-spews-toast"
          closeOnClick
          draggable
          newestOnTop
          pauseOnFocusLoss
          pauseOnHover
        />
      </div>

      {/* Main application content */}
      <div className="app-content">
        <Routes>
          {/* 404 Error page - outside layout to show custom error design */}
          <Route element={<ErrorPageNotFound />} path="*" />

          {/* All main pages use shared Layout (header/footer/nav) */}
          <Route element={<Layout />} path="/">
            {/* Homepage */}
            <Route element={<HomePage />} index />

            {/* Article routes */}
            <Route element={<AllArticlesPage />} path="articles" />
            <Route element={<PostArticlePage />} path="articles/new" />
            <Route
              element={<SingleArticlePage />}
              path="articles/:article_id"
            />

            {/* Topic routes */}
            <Route element={<TopicsPage />} path="topics" />
            <Route element={<TopicArticlesPage />} path="topics/:topic_slug" />

            {/* User routes */}
            <Route element={<UserProfilePage />} path="users/:username" />

            {/* Utility pages */}
            <Route element={<TestPage />} path="test" />
            <Route element={<AboutPage />} path="about" />
            <Route element={<FAQsPage />} path="faqs" />

            {/* Authentication pages */}
            <Route element={<LoginPage />} path="login" />
            <Route element={<SignupPage />} path="signup" />
          </Route>
        </Routes>
      </div>
    </>
  );
}
