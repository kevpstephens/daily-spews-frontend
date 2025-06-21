import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { lazy, Suspense } from "react";

import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import ErrorPageNotFound from "./pages/ErrorPageNotFound/ErrorPageNotFound.jsx";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";
import TestPage from "./pages/TestPage";
import TopicsPage from "./pages/TopicsPage/TopicsPage.jsx";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage.jsx";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.jsx";

const HomePage = lazy(() => import("./HomePage.jsx"));
const AllArticlesPage = lazy(() =>
  import("./pages/AllArticlesPage/AllArticlesPage.jsx")
);
const SingleArticlePage = lazy(() =>
  import("./pages/SingleArticlePage/SingleArticlePage.jsx")
);
const TopicArticlesPage = lazy(() =>
  import("./pages/TopicArticlesPage/TopicArticlesPage.jsx")
);

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
      <div className="app-content">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Catch-all 404 route */}
            <Route path="*" element={<ErrorPageNotFound />} />

            {/* Main layout wrapper */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="articles" element={<AllArticlesPage />} />
              <Route
                path="articles/:article_id"
                element={<SingleArticlePage />}
              />
              <Route path="topics" element={<TopicsPage />} />
              <Route
                path="topics/:topic_slug"
                element={<TopicArticlesPage />}
              />
              <Route path="users/:username" element={<UserProfilePage />} />
              <Route path="test" element={<TestPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </>
  );
}
