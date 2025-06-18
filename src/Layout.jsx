import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import DevUserConsole from "./components/DevUserConsole/DevUserConsole.jsx";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* This renders the current route page */}
      </main>
      <Footer />
      {import.meta.env.DEV && <DevUserConsole />}
    </div>
  );
};

export default Layout;
