import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <nav className="navigation-bar-container">
      <Link className="nav-button" to="/">
        Home
      </Link>
      <Link className="nav-button" to="/articles">
        Articles
      </Link>
      <Link className="nav-button" to="/topics">
        Topics
      </Link>
      <Link className="nav-button" to="/users">
        Users
      </Link>
    </nav>
  );
}
