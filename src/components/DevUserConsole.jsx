import { useEffect, useState } from "react";
import { useUser } from "../context";
import { getUserByUsername } from "../api/api";

export default function DevUserConsole() {
  const { user, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  // Predefined list of test users (null represents not logged in)
  const TEST_USERS = [null, "kevpstephenson", "admin"];
  const [userIndex, setUserIndex] = useState(() => {
    const savedIndex = localStorage.getItem("devUserIndex");
    return savedIndex !== null ? parseInt(savedIndex, 10) : 0;
  });

  // On mount, load user from localStorage and fetch user data if needed
  useEffect(() => {
    const savedIndex = localStorage.getItem("devUserIndex");
    if (savedIndex !== null) {
      const nextUser = TEST_USERS[parseInt(savedIndex, 10)];
      if (nextUser === null) {
        setUser(null);
      } else {
        getUserByUsername(nextUser).then((data) => setUser(data.user));
      }
    }
  }, []);

  // Switch to the next test user and persist index in localStorage
  const handleSwitch = async () => {
    setIsLoading(true);
    const nextIndex = (userIndex + 1) % TEST_USERS.length;
    const nextUser = TEST_USERS[nextIndex];

    try {
      if (nextUser === null) {
        setUser(null);
      } else {
        const data = await getUserByUsername(nextUser);
        setUser(data.user);
      }
      setUserIndex(nextIndex);
      localStorage.setItem("devUserIndex", nextIndex);
    } catch (err) {
      console.error("Failed to switch user:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className="dev-user-console">
      <h4>Debug Console</h4>
      <h5>Current User:</h5>
      <p>{user ? user.username : "Not logged in"}</p>
      <button onClick={handleSwitch} disabled={isLoading}>
        {isLoading ? "Switching..." : "Switch User"}
      </button>
    </aside>
  );
}
