import Header from "./Header";
import NavigationBar from "./NavigationBar";

export default function PageHeader() {
  return (
    <>
      <header className="page-header">
        <img
          src="../src/assets/final-daily-spews-logo.png"
          alt="daily-spews-logo-image"
          className="daily-spews-logo"
        />
        <Header />
        <NavigationBar />
      </header>
    </>
  );
}
