import NavigationBar from "./components/NavigationBar";
import { useUser } from "./context";
import LogoutButton from "./components/LogoutButton";

export default function Header() {
  const { user, isUserLoading } = useUser();

  return (
    <>
      <header className="header-container">
        <h1 className="daily-spews-header-title">Daily Spews</h1>
        <img
          src="../src/assets/logo/daily-spews-logo-cropped.png"
          alt="daily-spews-logo-image"
          className="daily-spews-logo"
        />
        <NavigationBar />

        {!isUserLoading && user && (
          <div className="user-info">
            <img
              src={user.avatar_url}
              alt={user.username}
              className="user-avatar"
            />
            <span className="user-name">{user.name}</span>
            <LogoutButton redirectTo="/" />
          </div>
        )}
      </header>
    </>
  );
}
