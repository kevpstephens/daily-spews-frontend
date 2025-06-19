import "./DevConsole.css";
import { useEffect, useState, useRef } from "react";
import { useUser } from "../../context";
import { getUserByUsername } from "../../api/api";
import { useLocation } from "react-router-dom";

export default function DevConsole() {
  const { user, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const consoleRef = useRef(null);
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem("devConsolePosition");
    return saved ? JSON.parse(saved) : { x: 100, y: 100 };
  });
  const dragOffset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    localStorage.setItem("devConsolePosition", JSON.stringify(position));
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

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
    <aside
      ref={consoleRef}
      className="dev-console"
      onMouseDown={handleMouseDown}
      style={{ left: position.x, top: position.y, position: "fixed" }}
    >
      <h5>Current User:</h5>
      <p>{user ? user.username : "null"}</p>
      <h5>Current Page:</h5>
      <p>{location.pathname}</p>
      <button onClick={handleSwitch} disabled={isLoading}>
        {isLoading ? "Switching..." : "Switch User"}
      </button>
    </aside>
  );
}
