/** ============================================================
 *! NavigationBar.jsx

 * Main navigation bar for the app, responsive for desktop/mobile.
 * Displays logo, navigation links, and a user avatar dropdown.
 *============================================================ */

import { Home, PencilLine, User, UserCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

import { useUser } from "../../context";
import LogoutButton from "../LogoutButton/LogoutButton";

export default function NavigationBar() {
  const { user, isUserLoading } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isMobile = window.innerWidth <= 600;
  const [showOverlay, setShowOverlay] = useState(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);

  useEffect(() => {
    if (dropdownOpen) {
      setShowOverlay(true);
    } else if (showOverlay) {
      // Wait for fade-out before unmounting
      const timeout = setTimeout(() => setShowOverlay(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [dropdownOpen, showOverlay]);

  if (isUserLoading) return null;

  // Handlers for desktop (hover) and mobile (click)
  const handleAvatarEnter = () => {
    if (!isMobile) setDropdownOpen(true);
  };
  const handleAvatarLeave = () => {
    if (!isMobile && !keyboardNavigation) setDropdownOpen(false);
  };
  const handleAvatarClick = () => {
    if (isMobile) setDropdownOpen((open) => !open);
  };
  const handleDropdownLinkClick = () => {
    setDropdownOpen(false);
    setKeyboardNavigation(false);
  };

  // Enhanced keyboard handler for avatar
  const handleAvatarKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setKeyboardNavigation(true);
      setDropdownOpen(true);
      // Focus first menu item after dropdown opens - increased timeout for reliability
      setTimeout(() => {
        const firstMenuItem = document.querySelector(".nav-profile-link");
        if (firstMenuItem) firstMenuItem.focus();
      }, 100);
    } else if (e.key === "Escape") {
      setDropdownOpen(false);
      setKeyboardNavigation(false);
    }
  };

  // Enhanced overlay keyboard handler
  const handleOverlayKeyDown = (e) => {
    if (e.key === "Escape") {
      setDropdownOpen(false);
      setKeyboardNavigation(false);
      // Return focus to avatar button
      const avatarWrapper = document.querySelector(".nav-avatar-wrapper");
      if (avatarWrapper) avatarWrapper.focus();
    }
  };

  return (
    <>
      <nav className="navigation-bar-container">
        {/* Show mobile logo if on homepage and mobile device */}
        {isMobile && (
          <Link title="Daily Spews Home" to="/">
            <img
              alt="Daily Spews"
              className="mobile-header-daily-spews-logo"
              src="/assets/logo/daily-spews-logo.png"
            />
          </Link>
        )}
        <Link className="nav-button" id="home-button" to="/">
          <Home color="white" size={28} />
        </Link>
        <Link className="nav-button" to="/articles">
          Articles
        </Link>
        <Link className="nav-button" to="/topics">
          Topics
        </Link>

        {/* User profile section - conditional rendering */}
        {user && user.avatar_url ? (
          <div className="nav-button user-profile-nav" id="user-profile-button">
            <div
              aria-expanded={dropdownOpen}
              aria-haspopup="menu"
              aria-label={`${user.username}'s account menu`}
              role="button"
              tabIndex={0}
              className={`nav-avatar-wrapper${
                dropdownOpen && (!isMobile || keyboardNavigation) ? " open" : ""
              }`}
              onClick={handleAvatarClick}
              onKeyDown={handleAvatarKeyDown}
              onMouseEnter={handleAvatarEnter}
              onMouseLeave={handleAvatarLeave}
            >
              <img
                alt={`${user.username}'s profile`}
                className="nav-avatar-icon"
                id="user-avatar"
                src={user.avatar_url}
              />

              {dropdownOpen && (
                <div
                  aria-labelledby="user-avatar"
                  className="nav-avatar-dropdown"
                  role="menu"
                >
                  <h2 className="nav-avatar-username">@{user.username}</h2>

                  <div className="nav-avatar-dropdown-buttons-container">
                    <Link
                      className="nav-profile-link"
                      role="menuitem"
                      tabIndex={0}
                      to={`/users/${user.username}`}
                      onClick={handleDropdownLinkClick}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          // Trigger the Link's click to navigate
                          e.target.click();
                          handleDropdownLinkClick();
                        } else if (e.key === "Escape") {
                          setDropdownOpen(false);
                          setKeyboardNavigation(false);
                          document
                            .querySelector(".nav-avatar-wrapper")
                            ?.focus();
                        }
                      }}
                    >
                      <span>Profile</span>
                      <UserCircle size={20} />
                    </Link>

                    <Link
                      className="nav-post-article-link"
                      role="menuitem"
                      tabIndex={0}
                      to="/articles/new"
                      onClick={handleDropdownLinkClick}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          // Trigger the Link's click to navigate
                          e.target.click();
                          handleDropdownLinkClick();
                        } else if (e.key === "Escape") {
                          setDropdownOpen(false);
                          setKeyboardNavigation(false);
                          document
                            .querySelector(".nav-avatar-wrapper")
                            ?.focus();
                        }
                      }}
                    >
                      <span>Post Article</span>
                      <PencilLine size={16} />
                    </Link>

                    <LogoutButton
                      id="nav-logout-button"
                      redirectTo="/"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          // Trigger the button click for logout
                          e.target.click();
                        } else if (e.key === "Escape") {
                          setDropdownOpen(false);
                          setKeyboardNavigation(false);
                          document
                            .querySelector(".nav-avatar-wrapper")
                            ?.focus();
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            {/* Overlay rendered via portal */}
            {showOverlay &&
              createPortal(
                <div
                  role="button"
                  tabIndex={-1}
                  className={`nav-avatar-overlay${
                    dropdownOpen ? " visible" : ""
                  }`}
                  onKeyDown={handleOverlayKeyDown}
                  onClick={() => {
                    setDropdownOpen(false);
                    setKeyboardNavigation(false);
                  }}
                />,
                document.body
              )}
          </div>
        ) : (
          <Link
            className="nav-button user-profile-nav"
            id="user-profile-button"
            to="/login"
          >
            <User color="white" size={28} />
          </Link>
        )}
      </nav>
    </>
  );
}
