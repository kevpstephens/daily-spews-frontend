/** ============================================================
 *! NavigationBar.jsx

 * Main navigation bar for the app, responsive for desktop/mobile.
 * Displays logo, navigation links, and a user avatar dropdown.
 *============================================================ */

import { Home, PencilLine, User, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

import { useUser } from "../../context";
import useDropdown from "../../hooks/useDropdown";
import useResponsive from "../../hooks/useResponsive";
import LogoutButton from "../LogoutButton/LogoutButton";

export default function NavigationBar() {
  const { user, isUserLoading } = useUser();
  const { isMobile } = useResponsive();
  const {
    isOpen: dropdownOpen,
    keyboardNavigation,
    dropdownRef,
    triggerRef,
    open,
    close,
    toggle,
    handleKeyboardOpen,
  } = useDropdown();

  if (isUserLoading) return null;

  // Handlers for desktop (hover) and mobile (click)
  const handleAvatarEnter = () => {
    if (!isMobile) open();
  };
  const handleAvatarLeave = () => {
    if (!isMobile && !keyboardNavigation) close();
  };
  const handleAvatarClick = () => {
    if (isMobile) toggle();
  };
  const handleDropdownLinkClick = () => {
    close();
  };

  // Enhanced keyboard handler for avatar
  const handleAvatarKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleKeyboardOpen();
      // Focus first menu item after dropdown opens - increased timeout for reliability
      setTimeout(() => {
        const firstMenuItem = document.querySelector(".nav-profile-link");
        if (firstMenuItem) firstMenuItem.focus();
      }, 100);
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
          <div
            ref={triggerRef}
            aria-expanded={dropdownOpen}
            aria-haspopup="menu"
            aria-label={`${user.username}'s account menu`}
            className={`nav-avatar-wrapper${dropdownOpen ? " open" : ""}`}
            id="user-profile-button"
            role="button"
            tabIndex={0}
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
                ref={dropdownRef}
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
                        e.target.click();
                        handleDropdownLinkClick();
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
                        e.target.click();
                        handleDropdownLinkClick();
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
                        e.target.click();
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            className="user-profile-nav"
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
