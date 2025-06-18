import { Link } from "react-router-dom";
import { useUser } from "../context";

export default function NavigationBar() {
  const { user } = useUser();

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
          to={
            user && user.username !== "guest_user"
              ? `/users/${user.username}`
              : "/login"
          }
        >
          👤
        </Link>
      </nav>
    </>
  );
}
