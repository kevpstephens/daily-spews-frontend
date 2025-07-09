/** ============================================================
 *! Layout.jsx

 * Root layout component providing consistent structure across all pages.
 * Features responsive header/footer, React Router outlet for page content,
 * and conditional dev console for desktop development.
 *============================================================ */

import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import DevConsole from "./components/DevConsole/DevConsole.jsx";
import Footer from "./Footer";
import Header from "./Header";

const isDev = import.meta.env.DEV; // Check if running in development mode

// Custom hook for responsive mobile detection with resize listener
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsMobile(window.matchMedia("(max-width: 600px)").matches);
    check(); // Initial check
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function Layout() {
  const isMobile = useIsMobile();

  return (
    <div className="layout-container">
      {/* Skip navigation for keyboard users */}
      <a className="skip-navigation" href="#main-content">
        Skip to main content
      </a>

      {/* Site header with navigation */}
      <Header />

      {/* Main content area - React Router renders page components here */}
      <main className="layout-main" id="main-content">
        <Outlet />
      </main>

      {/* Site footer */}
      <Footer />

      {/* Development console - only shows in dev mode on desktop */}
      {isDev && !isMobile && <DevConsole />}
    </div>
  );
}
