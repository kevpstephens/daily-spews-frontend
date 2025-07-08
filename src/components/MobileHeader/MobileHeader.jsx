/** ============================================================
 *! MobileHeader.jsx
 * Mobile-optimized header with conditional homepage greeting.
 * Features a welcome section that only appears on the homepage,
 * plus a persistent sticky navigation bar for all mobile pages.
 * Animation only plays on first visit - subsequent visits scroll past.
 *============================================================ */

import "./MobileHeader.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import NavigationBar from "../NavigationBar/NavigationBar.jsx";

export default function MobileHeader() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const greetingRef = useRef(null);

  useEffect(() => {
    // Check if user has seen the animation before
    const hasSeenAnimation = localStorage.getItem("dailySpewsAnimationSeen");

    if (hasSeenAnimation) {
      setIsFirstVisit(false);
      // If not first visit and on homepage, scroll past the greeting
      if (isHomePage) {
        // Use requestAnimationFrame for better timing with DOM rendering
        requestAnimationFrame(() => {
          setTimeout(() => {
            if (greetingRef.current) {
              const greetingHeight = greetingRef.current.offsetHeight;
              const extraOffset = 40;
              window.scrollTo({
                top: greetingHeight + extraOffset,
                behavior: "smooth",
              });
            }
          }, 100); // Delay for DOM measurement
        });
      }
    } else {
      // Mark animation as seen after it completes (about 5 seconds)
      if (isHomePage) {
        const timer = setTimeout(() => {
          localStorage.setItem("dailySpewsAnimationSeen", "true");
        }, 5000);

        // Cleanup timer if component unmounts
        return () => clearTimeout(timer);
      }
    }
  }, [isHomePage]);

  return (
    <>
      {/* Homepage-only greeting section with logo and tagline */}
      {isHomePage && (
        <div
          ref={greetingRef}
          className="mobile-daily-spews-greeting-container"
        >
          <h1 className="mobile-daily-spews-heading">Daily Spews</h1>

          <img
            className={`mobile-daily-spews-logo ${
              !isFirstVisit ? "skip-animation" : ""
            }`}
            src="/assets/logo/daily-spews-logo.png"
            alt="Daily Spews logo"
          />

          <p
            className={`animated-tagline ${
              !isFirstVisit ? "skip-animation" : ""
            }`}
          >
            <span className="line-one">
              Your daily dose of news, views, and
            </span>
            <br />
            <span className="line-two">
              <span className="strike-container">
                <span className="strike-text">highly esteemed expert cues</span>
              </span>
            </span>
            <br />
            <span className="line-three"> spews.</span>
          </p>
        </div>
      )}

      {/* Persistent sticky navigation for all mobile pages */}
      <header className="mobile-header-container">
        <div className="mobile-header-navigation-container navigation-bar-container">
          <NavigationBar />
        </div>
      </header>
    </>
  );
}
