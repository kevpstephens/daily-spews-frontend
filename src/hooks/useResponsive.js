import { useState, useEffect } from "react";

const BREAKPOINTS = {
  mobile: 600,
  tablet: 900,
  desktop: 1200,
};

export default function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Debounce resize events for better performance
    let timeoutId;
    const debouncedHandleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const isMobile = windowSize.width <= BREAKPOINTS.mobile;
  const isTablet =
    windowSize.width > BREAKPOINTS.mobile &&
    windowSize.width <= BREAKPOINTS.tablet;
  const isDesktop = windowSize.width > BREAKPOINTS.tablet;

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    breakpoints: BREAKPOINTS,
  };
}
