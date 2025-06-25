import "./styles/components/Header.css";
import { Link } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import MobileHeader from "./components/MobileHeader/MobileHeader";

export default function Header() {
  const isMobile = window.innerWidth <= 600;

  if (isMobile) {
    return <MobileHeader />;
  }

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
