/** ============================================================
 *! NavigationBar.jsx

 * Main navigation bar for the app, responsive for desktop/mobile.
 * Displays logo, navigation links, and a user avatar dropdown.
 *============================================================ */

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./NavigationBar.css";
import { Link } from "react-router-dom";
import { useUser } from "../../context";
import LogoutButton from "../LogoutButton/LogoutButton";
import { Home, PencilLine, User, UserCircle } from "lucide-react";

export default function NavigationBar() {
  const { user, isUserLoading } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isMobile = window.innerWidth <= 600;
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (dropdownOpen) {
      setShowOverlay(true);
    } else if (showOverlay) {
      // Wait for fade-out before unmounting
      const timeout = setTimeout(() => setShowOverlay(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [dropdownOpen]);

  if (isUserLoading) return null;

  // Handlers for desktop (hover) and mobile (click)
  const handleAvatarEnter = () => {
    if (!isMobile) setDropdownOpen(true);
  };
  const handleAvatarLeave = () => {
    if (!isMobile) setDropdownOpen(false);
  };
  const handleAvatarClick = () => {
    if (isMobile) setDropdownOpen((open) => !open);
  };
  const handleDropdownLinkClick = () => {
    setDropdownOpen(false);
  };

  return (
    <>
      <nav className="navigation-bar-container">
        {/* Show mobile logo if on homepage and mobile device */}
        {isMobile && (
          <Link to="/" title="Daily Spews Home">
            <img
              className="mobile-header-daily-spews-logo"
              src="/assets/logo/daily-spews-logo.png"
              alt="Daily Spews logo"
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

        {/* User profile section - conditional rendering */}
        {user && user.avatar_url ? (
          <div id="user-profile-button" className="nav-button user-profile-nav">
            <div
              className={`nav-avatar-wrapper${
                dropdownOpen && !isMobile ? " open" : ""
              }`}
              onMouseEnter={handleAvatarEnter}
              onMouseLeave={handleAvatarLeave}
              onClick={handleAvatarClick}
            >
              <img
                id="user-avatar"
                className="nav-avatar-icon"
                src={user.avatar_url}
                alt={`${user.username}'s profile picture`}
                role="button"
                aria-expanded={dropdownOpen}
                aria-haspopup="menu"
                aria-label={`${user.username}'s account menu`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAvatarClick();
                  }
                }}
              />

              {dropdownOpen && (
                <div className="nav-avatar-dropdown" role="menu" aria-labelledby="user-avatar">
                  <h2 className="nav-avatar-username">@{user.username}</h2>

                  <div className="nav-avatar-dropdown-buttons-container">
                    <Link
                      to={`/users/${user.username}`}
                      className="nav-profile-link"
                      onClick={handleDropdownLinkClick}
                      role="menuitem"
                    >
                      <span>Profile</span>
                      <UserCircle size={20} />
                    </Link>

                    <Link
                      to="/articles/new"
                      className="nav-post-article-link"
                      onClick={handleDropdownLinkClick}
                      role="menuitem"
                    >
                      <span>Post Article</span>
                      <PencilLine size={16} />
                    </Link>

                    <LogoutButton id="nav-logout-button" redirectTo="/" />
                  </div>
                </div>
              )}
            </div>
            {/* Overlay rendered via portal */}
            {showOverlay &&
              createPortal(
                <div
                  className={`nav-avatar-overlay${
                    dropdownOpen ? " visible" : ""
                  }`}
                  onClick={() => setDropdownOpen(false)}
                />,
                document.body
              )}
          </div>
        ) : (
          <Link
            id="user-profile-button"
            className="nav-button user-profile-nav"
            to="/login"
          >
            <User size={28} color="white" />
          </Link>
        )}
      </nav>
    </>
  );
}
