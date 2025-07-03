/** ============================================================
 *! Header.jsx

 * Main site header with responsive design.
 * Renders mobile header for small screens or desktop header with logo and navigation.
 * Uses window width detection for responsive behavior.
 *============================================================ */

import "./styles/components/Header.css";
import { Link } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import MobileHeader from "./components/MobileHeader/MobileHeader";

export default function Header() {
  // Simple responsive breakpoint detection
  const isMobile = window.innerWidth <= 600;

  // Render mobile-specific header for small screens
  if (isMobile) {
    return <MobileHeader />;
  }

  // Desktop header with logo and navigation
  return (
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
  );
}
