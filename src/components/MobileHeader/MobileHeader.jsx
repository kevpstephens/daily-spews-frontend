import "./MobileHeader.css";
import { useLocation } from "react-router-dom";
import NavigationBar from "../NavigationBar/NavigationBar.jsx";

export default function MobileHeader() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <>
      {isHomePage && (
        <div className="mobile-daily-spews-greeting-container">
          <h1 className="mobile-daily-spews-heading">Daily Spews</h1>

          <img
            className="mobile-daily-spews-logo"
            src="/assets/logo/daily-spews-logo.png"
            alt="daily-spews-logo-image"
          />

          <p>
            your daily dose of news, spews, and <del>highly sought after</del>{" "}
            opinions
          </p>
        </div>
      )}

      <header className="mobile-header-container">
        <div className="mobile-header-navigation-container navigation-bar-container">
          <NavigationBar />
        </div>
      </header>
    </>
  );
}
