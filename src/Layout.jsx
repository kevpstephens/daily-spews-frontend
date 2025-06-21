import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import DevConsole from "./components/DevConsole/DevConsole.jsx";
import { useEffect, useState } from "react";

const isDev = import.meta.env.DEV;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsMobile(window.matchMedia("(max-width: 600px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function Layout() {
  const isMobile = useIsMobile();

  return (
    <div className="layout-wrapper">
      <Header />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
      {isDev && !isMobile && <DevConsole />}
    </div>
  );
}
