import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import DevConsole from "./components/DevConsole/DevConsole.jsx";

const Layout = () => {
  return (
    <div className="layout-wrapper">
      <Header />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
      {import.meta.env.DEV && <DevConsole />}
    </div>
  );
};

export default Layout;
