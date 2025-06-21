import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import DevConsole from "./components/DevConsole/DevConsole.jsx";

const isDev = import.meta.env.DEV;

const Layout = () => {
  return (
    <div className="layout-wrapper">
      <Header />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
      {isDev && <DevConsole />}
    </div>
  );
};

export default Layout;
