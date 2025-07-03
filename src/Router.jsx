/** ============================================================
 *! Router.jsx

 * Main application router defining all page routes and navigation structure.
 * Features nested layout routing, toast notifications, and 404 error handling.
 * All routes use shared Layout component except 404 page.
 *============================================================ */

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import ErrorPageNotFound from "./pages/ErrorPageNotFound/ErrorPageNotFound.jsx";
import FAQsPage from "./pages/FAQsPage/FAQsPage.jsx";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";
import TestPage from "./pages/TestPage";
import TopicsPage from "./pages/TopicsPage/TopicsPage.jsx";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage.jsx";
import HomePage from "./HomePage.jsx";
import AllArticlesPage from "./pages/AllArticlesPage/AllArticlesPage.jsx";
import SingleArticlePage from "./pages/SingleArticlePage/SingleArticlePage.jsx";
import TopicArticlesPage from "./pages/TopicArticlesPage/TopicArticlesPage.jsx";
import PostArticlePage from "./pages/PostArticlePage/PostArticlePage.jsx";

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
          position="top-right"
          autoClose={3000}
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

      {/* Main application content */}
      <div className="app-content">
        <Routes>
          {/* 404 Error page - outside layout to show custom error design */}
          <Route path="*" element={<ErrorPageNotFound />} />

          {/* All main pages use shared Layout (header/footer/nav) */}
          <Route path="/" element={<Layout />}>
            {/* Homepage */}
            <Route index element={<HomePage />} />

            {/* Article routes */}
            <Route path="articles" element={<AllArticlesPage />} />
            <Route path="articles/new" element={<PostArticlePage />} />
            <Route
              path="articles/:article_id"
              element={<SingleArticlePage />}
            />

            {/* Topic routes */}
            <Route path="topics" element={<TopicsPage />} />
            <Route path="topics/:topic_slug" element={<TopicArticlesPage />} />

            {/* User routes */}
            <Route path="users/:username" element={<UserProfilePage />} />

            {/* Utility pages */}
            <Route path="test" element={<TestPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="faqs" element={<FAQsPage />} />

            {/* Authentication pages */}
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}
