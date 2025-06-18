import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { getUserByUsername } from "../api/api";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores the currently logged-in user
  const [isUserLoading, setIsUserLoading] = useState(true); // Controls loading state while user is being fetched

  useEffect(() => {
    // In development, try to retrieve the last used username from localStorage
    const savedUsername = import.meta.env.DEV
      ? localStorage.getItem("ds-username")
      : null;

    const fetchUser = async () => {
      try {
        let userData;

        if (savedUsername) {
          // In dev mode, fetch mock/test user by username
          const { user } = await getUserByUsername(savedUsername);
          userData = user;
        } else {
          // In production, attempt to retrieve authenticated user from secure cookie
          const res = await fetch("/api/users/me", { credentials: "include" });
          if (!res.ok) throw new Error("Not authenticated");
          const data = await res.json();
          userData = data.user;
        }

        setUser(userData); // Set the retrieved user into global context
      } catch (err) {
        console.error("Failed to restore user:", err);
        setUser(null); // If anything goes wrong, assume no user is logged in
      } finally {
        setIsUserLoading(false); // Loading complete regardless of outcome
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    // In development, persist the username to localStorage for reload persistence
    if (import.meta.env.DEV) {
      if (user?.username) {
        localStorage.setItem("ds-username", user.username);
      } else {
        localStorage.removeItem("ds-username");
      }
    }
  }, [user]);

  // Provide user state and updater through context to the rest of the app
  return (
    <UserContext.Provider value={{ user, setUser, isUserLoading }}>
      {children}
    </UserContext.Provider>
  );
};
