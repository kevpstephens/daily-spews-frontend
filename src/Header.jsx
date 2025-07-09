/** ============================================================
 *! Header.jsx

 * Main site header with responsive design.
 * Renders mobile header for small screens or desktop header with logo and navigation.
 * Uses window width detection for responsive behavior.
 *============================================================ */

import "./styles/components/Header.css";
import { Link } from "react-router-dom";

import MobileHeader from "./components/MobileHeader/MobileHeader";
import NavigationBar from "./components/NavigationBar/NavigationBar";

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
      <Link title="Daily Spews Home" to="/">
        <img
          alt="Daily Spews logo"
          className="daily-spews-logo"
          src="/assets/logo/daily-spews-logo.png"
        />
      </Link>
      <NavigationBar />
    </header>
  );
}
