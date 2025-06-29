/** ============================================================
 *! NavigationBar.jsx

 * Main navigation bar for the app, responsive for desktop/mobile.
 * Displays logo, navigation links, and a user avatar dropdown.
 *============================================================ */

import "./NavigationBar.css";
import { Link } from "react-router-dom";
import { useUser } from "../../context";
import LogoutButton from "../LogoutButton/LogoutButton";
import { Home, PencilLine, User, UserCircle } from "lucide-react";

export default function NavigationBar() {
  const { user, isUserLoading } = useUser();
  if (isUserLoading) return null;
  const isMobile = window.innerWidth <= 600;

  return (
    <>
      <nav className="navigation-bar-container">
        {/* Show mobile logo if on homepage and mobile device */}
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
          // Show profile dropdown if logged in, else fallback to login
          to={user && user.username ? `/users/${user.username}` : "/login"}
        >
          {/* Display avatar + dropdown menu if user has avatar
               Otherwise, display generic user icon */}
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
                  {/* Navigation link to user profile */}
                  <Link
                    to={`/users/${user.username}`}
                    className="nav-profile-link"
                  >
                    <span>Profile</span>
                    <UserCircle size={20} />
                  </Link>

                  {/* Navigation link to post new article */}
                  <Link to="/articles/new" className="nav-post-article-link">
                    <span>Post Article</span>
                    <PencilLine size={16} />
                  </Link>

                  {/* Logout button inside user dropdown */}
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
