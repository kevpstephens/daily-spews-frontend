import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { getUserByUsername, getCurrentUser, logoutUser } from "../api/api";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // First, always try to get user from backend session (both dev and prod)
        console.log("Trying to restore user from session...");
        const data = await getCurrentUser();
        setUser(data.user);
        console.log("✅ User restored from session:", data.user?.username);

        // If successful, also save to localStorage for persistence
        if (data.user?.username) {
          localStorage.setItem("ds-username", data.user.username);
        }
      } catch (err) {
        console.log("Session restore failed:", err.response?.status);

        // Fallback: try localStorage (for both dev and prod)
        const savedUsername = localStorage.getItem("ds-username");
        if (savedUsername) {
          try {
            console.log("Trying localStorage fallback for:", savedUsername);
            const { user: fallbackUser } = await getUserByUsername(
              savedUsername
            );
            setUser(fallbackUser);
            console.log(
              "✅ User restored from localStorage:",
              fallbackUser.username
            );
          } catch (fallbackErr) {
            console.error("❌ localStorage fallback failed:", fallbackErr);
            // If user doesn't exist anymore, clear localStorage
            if (fallbackErr.response?.status === 404) {
              localStorage.removeItem("ds-username");
            }
            setUser(null);
          }
        } else {
          console.log("No saved username found");
          setUser(null);
        }
      } finally {
        setIsUserLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    // Always persist username to localStorage (both dev and prod)
    if (user?.username) {
      localStorage.setItem("ds-username", user.username);
    } else {
      localStorage.removeItem("ds-username");
    }
  }, [user]);

  // Logout function to clear everything properly
  const logout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Server logout failed:", err);
    } finally {
      setUser(null);
      localStorage.removeItem("ds-username");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, isUserLoading, logout }}>
      {children}
    </UserContext.Provider>
  );
};
