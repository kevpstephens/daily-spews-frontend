import "./NavigationBar.css";
import { Link } from "react-router-dom";
import { useUser } from "../../context";
import LogoutButton from "../LogoutButton/LogoutButton";
import { Home, PencilLine, User } from "lucide-react";

export default function NavigationBar() {
  const { user, isUserLoading } = useUser();
  if (isUserLoading) return null;
  const isMobile = window.innerWidth <= 600;

  return (
    <>
      <nav className="navigation-bar-container">
        {isMobile && (
          <Link to="/" title="Daily Spews Home">
            <img
              className="mobile-header-daily-spews-logo"
              src="/assets/logo/daily-spews-logo.png"
              alt="daily-spews-logo-image"
            />
          </Link>
        )}

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
                <h2 className="nav-avatar-username">@{user.username}</h2>

                <div className="nav-avatar-dropdown-buttons-container">
                  <Link to="/articles/new" className="nav-post-article-link">
                    <span>Post Article</span>
                    <PencilLine size={16} />
                  </Link>

                  <LogoutButton id="nav-logout-button" redirectTo="/" />
                </div>
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
