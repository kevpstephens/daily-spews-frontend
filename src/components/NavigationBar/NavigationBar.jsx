import "./NavigationBar.css";
import { Link } from "react-router-dom";
import { useUser } from "../../context";
import LogoutButton from "../LogoutButton/LogoutButton";
import { Home, User } from "lucide-react";

export default function NavigationBar() {
  const { user } = useUser();

  return (
    <>
      <nav className="navigation-bar-container">
        <Link id="home-button" className="nav-button" to="/">
          <Home size={28} color="white" />
        </Link>
        <Link className="nav-button" to="/articles">
          Articles
        </Link>
        <Link className="nav-button" to="/topics">
          Topics
        </Link>
        <Link
          id="user-profile-button"
          className="nav-button user-profile-nav"
          to={user && user.username ? `/users/${user.username}` : "/login"}
        >
          {user && user.avatar_url ? (
            <div className="nav-avatar-wrapper">
              <img
                className="nav-avatar-icon"
                src={user.avatar_url}
                alt="user-avatar"
              />
              <div className="nav-avatar-dropdown">
                <p className="nav-avatar-username">
                  <strong>@{user.username}</strong>
                </p>
                <LogoutButton id="nav-logout-button" redirectTo="/" />
              </div>
              <div className="nav-avatar-overlay"></div>
            </div>
          ) : (
            <User size={28} color="white" />
          )}
        </Link>
      </nav>
    </>
  );
}
