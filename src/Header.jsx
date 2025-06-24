import NavigationBar from "./components/NavigationBar/NavigationBar.jsx";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
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
