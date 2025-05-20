import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <nav className="navigation-bar-container">
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/articles">
        <button>Articles</button>
      </Link>
      <Link to="/topics">
        <button>Topics</button>
      </Link>
      <Link to="/users">
        <button>Users</button>
      </Link>
    </nav>
  );
}
