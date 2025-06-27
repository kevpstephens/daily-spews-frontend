import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { getUserByUsername, getCurrentUser, logoutUser } from "../api/api";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Check if localStorage is available
  const isLocalStorageAvailable = () => {
    try {
      const test = "__localStorage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      console.error("❌ localStorage not available:", e);
      return false;
    }
  };

  // Fetch user with retry logic for mobile connections (reduced retries and delays)
  const fetchUserWithRetry = async (retries = 1) => {
    for (let i = 0; i <= retries; i++) {
      try {
        console.log(
          `📡 Attempt ${i + 1}: Trying to restore user from session...`
        );
        const data = await getCurrentUser();
        return data;
      } catch (err) {
        console.log(`❌ Attempt ${i + 1} failed:`, err.response?.status);
        if (i === retries) throw err;
        console.log(`🔄 Retrying in 200ms...`);
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      console.log("🔍 UserProvider: Starting user fetch...");
      console.log("📱 User Agent:", navigator.userAgent);
      console.log("💾 localStorage available:", isLocalStorageAvailable());

      // Small delay on mobile to ensure everything is ready (reduced)
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        console.log("📱 Mobile detected, adding small delay...");
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      const savedUsername = isLocalStorageAvailable()
        ? localStorage.getItem("ds-username")
        : null;
      console.log("💾 Current localStorage username:", savedUsername);

      // PHASE 1: Quick localStorage restore (makes nav responsive immediately)
      if (savedUsername) {
        try {
          console.log("⚡ Quick restore from localStorage:", savedUsername);
          const { user: quickUser } = await getUserByUsername(savedUsername);
          setUser(quickUser);
          setIsUserLoading(false); // ← Stop loading immediately for nav responsiveness
          console.log(
            "⚡ User quickly restored, nav should be responsive now:",
            quickUser.username
          );
        } catch (quickErr) {
          console.log(
            "⚡ Quick restore failed, will try session restore",
            quickErr
          );
          setIsUserLoading(false); // Still stop loading even if localStorage fails
        }
      } else {
        setIsUserLoading(false); // Stop loading if no localStorage
      }

      // PHASE 2: Session validation (happens in background)
      try {
        console.log("🔄 Background session validation...");
        const data = await fetchUserWithRetry();
        setUser(data.user);
        console.log("✅ User validated from session:", data.user?.username);

        // If successful, also save to localStorage for persistence
        if (data.user?.username && isLocalStorageAvailable()) {
          localStorage.setItem("ds-username", data.user.username);
          console.log("💾 Username saved to localStorage");
        }
      } catch (err) {
        console.log("❌ Session validation failed:", {
          status: err.response?.status,
          message: err.message,
          timestamp: new Date().toISOString(),
        });

        // If we don't have a user from Phase 1, try localStorage as fallback
        if (!user && savedUsername && isLocalStorageAvailable()) {
          try {
            console.log("🔄 Trying localStorage fallback for:", savedUsername);
            const { user: fallbackUser } = await getUserByUsername(
              savedUsername
            );
            setUser(fallbackUser);
            console.log(
              "✅ User restored from localStorage:",
              fallbackUser.username
            );
          } catch (fallbackErr) {
            console.error("❌ localStorage fallback failed:", {
              status: fallbackErr.response?.status,
              message: fallbackErr.message,
              username: savedUsername,
            });

            // If user doesn't exist anymore, clear localStorage
            if (
              fallbackErr.response?.status === 404 &&
              isLocalStorageAvailable()
            ) {
              localStorage.removeItem("ds-username");
              console.log("🗑️ Cleared invalid username from localStorage");
            }
            setUser(null);
          }
        }
        // If we already have user from Phase 1, keep them even if session failed
      } finally {
        setHasInitialized(true); // Mark as initialized
        console.log(
          "✅ Background validation complete. Final user state:",
          user?.username || "null"
        );
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    // Only manage localStorage after initial load is complete
    if (!hasInitialized) return;

    if (isLocalStorageAvailable()) {
      if (user?.username) {
        localStorage.setItem("ds-username", user.username);
        console.log(
          "💾 User state changed - saved to localStorage:",
          user.username
        );
      } else {
        localStorage.removeItem("ds-username");
        console.log("🗑️ User state cleared - removed from localStorage");
      }
    }
  }, [user, hasInitialized]);

  // Logout function to clear everything properly
  const logout = async () => {
    console.log("🚪 Logging out user...");
    try {
      await logoutUser();
      console.log("✅ Server logout successful");
    } catch (err) {
      console.error("❌ Server logout failed:", err);
    } finally {
      setUser(null);
      if (isLocalStorageAvailable()) {
        localStorage.removeItem("ds-username");
        console.log("🗑️ Cleared localStorage on logout");
      }
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, isUserLoading, logout }}>
      {children}
    </UserContext.Provider>
  );
};
