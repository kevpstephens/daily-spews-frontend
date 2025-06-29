/** ============================================================
 *! MobileHeader.jsx

 * Renders a mobile-optimized header for the homepage and nav.
 * Displays a welcome message only on the homepage.
 *============================================================ */

import "./MobileHeader.css";
import { useLocation } from "react-router-dom";
import NavigationBar from "../NavigationBar/NavigationBar.jsx";

export default function MobileHeader() {
  const location = useLocation(); // Get current route location
  const isHomePage = location.pathname === "/";
  return (
    <>
      {/* Display greeting only on homepage */}
      {isHomePage && (
        <div className="mobile-daily-spews-greeting-container">
          <h1 className="mobile-daily-spews-heading">Daily Spews</h1>

          <img
            className="mobile-daily-spews-logo"
            src="/assets/logo/daily-spews-logo.png"
            alt="daily-spews-logo-image"
          />

          <p>
            Your daily dose of news, views, and{" "}
            <del>highly regarded opinions</del> spews.
          </p>
        </div>
      )}

      {/* Persistent mobile header containing navigation */}
      <header className="mobile-header-container">
        <div className="mobile-header-navigation-container navigation-bar-container">
          <NavigationBar />
        </div>
      </header>
    </>
  );
}
