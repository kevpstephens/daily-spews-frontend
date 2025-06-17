import Header from "./Header";
import NavigationBar from "./NavigationBar";

export default function PageHeader() {
  return (
    <>
      <header className="page-header">
        <Header />
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
