import "./NavigationBar.css";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context";
import LogoutButton from "../LogoutButton/LogoutButton";
import { Home, PencilLine, User } from "lucide-react";

export default function NavigationBar() {
  const { user, isUserLoading } = useUser();
  const navigate = useNavigate();

  if (isUserLoading) return null;
  const isMobile = window.innerWidth <= 600;

  // Handle profile navigation with click handling for dropdown
  const handleProfileClick = (event) => {
    // If clicking on the dropdown or its children, don't navigate
    if (event.target.closest(".nav-avatar-dropdown")) {
      event.preventDefault();
      return;
    }
    // Otherwise, navigate to profile
    if (user && user.username) {
      navigate(`/users/${user.username}`);
    } else {
      navigate("/login");
    }
  };

  const handlePostArticleClick = (event) => {
    event.stopPropagation(); // Prevent the profile click handler
    navigate("/articles/new");
  };

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

        {/* Fixed: Use div with click handler instead of nested Links */}
        <div
          id="user-profile-button"
          className="nav-button user-profile-nav"
          onClick={handleProfileClick}
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
                  <button
                    className="nav-post-article-button"
                    onClick={handlePostArticleClick}
                    type="button"
                  >
                    <span>Post Article</span>
                    <PencilLine size={16} />
                  </button>

                  <LogoutButton id="nav-logout-button" redirectTo="/" />
                </div>
              </div>
              <div className="nav-avatar-overlay"></div>
            </div>
          ) : (
            <User size={28} color="white" />
          )}
        </div>
      </nav>
    </>
  );
}
