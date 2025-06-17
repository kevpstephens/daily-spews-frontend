import NavigationBar from "./components/NavigationBar";

export default function PageHeader() {
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
      </header>
    </>
  );
}
