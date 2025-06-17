import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <>
      <nav className="navigation-bar-container">
        <Link id="home-button" className="nav-button" to="/">
          🏠
        </Link>
        <Link className="nav-button" to="/articles">
          Articles
        </Link>
        <Link className="nav-button" to="/topics">
          Topics
        </Link>
        <Link
          id="user-profile-button"
          className="nav-button"
          to="/userProfilePage"
        >
          👤
        </Link>
      </nav>
    </>
  );
}
