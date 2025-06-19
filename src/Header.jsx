// import { useUser } from "./context";
// import LogoutButton from "./components/LogoutButton/LogoutButton.jsx";
import NavigationBar from "./components/NavigationBar/NavigationBar.jsx";
import { Link } from "react-router-dom";

export default function Header() {
  // const { user, isUserLoading } = useUser();

  return (
    <>
      <header className="header-container">
        <h1 className="daily-spews-header-title">Daily Spews</h1>
        <Link to="/" title="Daily Spews Home">
          <img
            src="../src/assets/logo/daily-spews-logo-cropped.png"
            alt="daily-spews-logo-image"
            className="daily-spews-logo"
          />
        </Link>
        <NavigationBar />

        {/* {!isUserLoading && user && (
          <div className="user-info top-right">
            <span className="user-name">{user.username}</span>
            <Link to={`/users/${user.username}`} className="user-avatar-wrapper">
              <img
                src={user.avatar_url}
                alt={user.username}
                className="user-avatar"
              />
              <div className="user-avatar-tooltip">@{user.username}</div>
            </Link>
            <LogoutButton redirectTo="/" />
          </div>
        )} */}
      </header>
    </>
  );
}
