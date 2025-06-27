import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { getUserByUsername, getCurrentUser, logoutUser } from "../api/api";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

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

  // Fetch user with retry logic for mobile connections
  const fetchUserWithRetry = async (retries = 2) => {
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
        console.log(`🔄 Retrying in ${(i + 1) * 500}ms...`);
        await new Promise((resolve) => setTimeout(resolve, (i + 1) * 500));
      }
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      console.log("🔍 UserProvider: Starting user fetch...");
      console.log("📱 User Agent:", navigator.userAgent);
      console.log("💾 localStorage available:", isLocalStorageAvailable());

      // Small delay on mobile to ensure everything is ready
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        console.log("📱 Mobile detected, adding small delay...");
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      const savedUsername = isLocalStorageAvailable()
        ? localStorage.getItem("ds-username")
        : null;
      console.log("💾 Current localStorage username:", savedUsername);

      try {
        // First, always try to get user from backend session with retry
        const data = await fetchUserWithRetry();
        setUser(data.user);
        console.log("✅ User restored from session:", data.user?.username);

        // If successful, also save to localStorage for persistence
        if (data.user?.username && isLocalStorageAvailable()) {
          localStorage.setItem("ds-username", data.user.username);
          console.log("💾 Username saved to localStorage");
        }
      } catch (err) {
        console.log("❌ Session restore failed after retries:", {
          status: err.response?.status,
          message: err.message,
          timestamp: new Date().toISOString(),
        });

        // Fallback: try localStorage (for both dev and prod)
        if (savedUsername && isLocalStorageAvailable()) {
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
        } else {
          console.log("❌ No saved username found or localStorage unavailable");
          setUser(null);
        }
      } finally {
        setIsUserLoading(false);
        console.log(
          "✅ User loading complete. Final user state:",
          user?.username || "null"
        );
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    // Always persist username to localStorage (both dev and prod)
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
  }, [user]);

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
