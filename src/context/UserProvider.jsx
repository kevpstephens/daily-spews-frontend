/** ============================================================
 *! UserProvider.jsx

 * Manages user authentication state and localStorage persistence.
 * Implements a two-phase loading strategy for optimal mobile performance:
 * Phase 1: Quick localStorage restore for immediate UI responsiveness
 * Phase 2: Background session validation for security
 *============================================================ */

import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { getUserByUsername, getCurrentUser, logoutUser } from "../api/api";
import logger from "../utils/logger";

import UserContext from "./UserContext";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [hasInitialised, setHasInitialised] = useState(false); // Tracks if initial authentication flow has completed

  // Check if localStorage is available (handles environments where it might not be)
  const isLocalStorageAvailable = () => {
    try {
      const test = "__localStorage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      logger.error("localStorage not available:", e);
      return false;
    }
  };

  // Fetch user with retry logic for unreliable mobile connections
  const fetchUserWithRetry = async (retries = 1) => {
    for (let i = 0; i <= retries; i++) {
      try {
        const data = await getCurrentUser();
        return data;
      } catch (err) {
        if (i === retries) throw err;
        // Short retry delay for mobile optimization
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      // Mobile optimization: small delay to ensure environment is ready
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      const savedUsername = isLocalStorageAvailable()
        ? localStorage.getItem("ds-username")
        : null;

      // PHASE 1: Quick localStorage restore for immediate UI responsiveness
      if (savedUsername) {
        try {
          const { user: quickUser } = await getUserByUsername(savedUsername);
          setUser(quickUser);
          setIsUserLoading(false); // Stop loading immediately for nav responsiveness
        } catch (quickErr) {
          logger.error(quickErr);
          setIsUserLoading(false); // Still stop loading even if localStorage fails
        }
      } else {
        setIsUserLoading(false); // Stop loading if no localStorage
      }

      // PHASE 2: Background session validation for security
      try {
        const data = await fetchUserWithRetry();
        setUser(data.user);

        // Save validated user to localStorage for future quick restores
        if (data.user?.username && isLocalStorageAvailable()) {
          localStorage.setItem("ds-username", data.user.username);
        }
      } catch (err) {
        logger.error(err);
        // If we don't have a user from Phase 1, try localStorage as fallback
        if (!user && savedUsername && isLocalStorageAvailable()) {
          try {
            const { user: fallbackUser } =
              await getUserByUsername(savedUsername);
            setUser(fallbackUser);
          } catch (fallbackErr) {
            // If user doesn't exist anymore, clear localStorage
            if (
              fallbackErr.response?.status === 404 &&
              isLocalStorageAvailable()
            ) {
              localStorage.removeItem("ds-username");
            }
            setUser(null);
          }
        }
        // If we already have user from Phase 1, keep them even if session failed
      } finally {
        setHasInitialised(true); // Mark initialisation as complete
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array is intentional - this should only run once on mount

  // Sync user state to localStorage after initialisation
  useEffect(() => {
    // Only manage localStorage after initial load is complete
    if (!hasInitialised) return;

    if (isLocalStorageAvailable()) {
      if (user?.username) {
        localStorage.setItem("ds-username", user.username);
      } else {
        localStorage.removeItem("ds-username");
      }
    }
  }, [user, hasInitialised]);

  // Logout function to clear both server session and local storage
  const logout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      logger.error("Server logout failed:", err);
    } finally {
      setUser(null);
      if (isLocalStorageAvailable()) {
        localStorage.removeItem("ds-username");
      }
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, isUserLoading, logout }}>
      {children}
    </UserContext.Provider>
  );
}

//! ===================================================== */
//! Prop types
//! ===================================================== */
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
