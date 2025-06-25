import NavigationBar from "./components/NavigationBar/NavigationBar.jsx";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const isMobile = window.innerWidth <= 600;
  const isHomePage = location.pathname === "/";

  return (
    <>
      {isMobile && isHomePage && (
        <>
          <div className="mobile-daily-spews-greeting-container">
            <h1 className="mobile-daily-spews-heading">Daily Spews</h1>
            <img
              className="mobile-daily-spews-logo"
              src="/assets/logo/daily-spews-logo.png"
              alt="daily-spews-logo-image"
            />
            <p>your daily dose of news, spews, and opinions</p>
          </div>
        </>
      )}

      <header className="header-container">
        <h1>Daily Spews</h1>
        <Link to="/" title="Daily Spews Home">
          <img
            className="daily-spews-logo navigation-bar-container"
            src="/assets/logo/daily-spews-logo.png"
            alt="daily-spews-logo-image"
          />
        </Link>
        <NavigationBar />
      </header>
    </>
  );
}
