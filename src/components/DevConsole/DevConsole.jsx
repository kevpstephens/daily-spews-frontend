import "./DevConsole.css";
import { useState, useRef, useEffect } from "react";
import { useUser } from "../../context";
import { Link, useLocation } from "react-router-dom";

export default function DevConsole() {
  const { user } = useUser();
  const location = useLocation();

  const consoleRef = useRef(null);
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem("devConsolePosition");
    return saved ? JSON.parse(saved) : { x: 20, y: 20 };
  });

  const [size, setSize] = useState(() => {
    const saved = localStorage.getItem("devConsoleSize");
    return saved ? JSON.parse(saved) : { width: 200, height: 140 };
  });

  const dragOffset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const isResizing = useRef(false);
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0 });

  // Save position and size to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("devConsolePosition", JSON.stringify(position));
  }, [position]);

  useEffect(() => {
    localStorage.setItem("devConsoleSize", JSON.stringify(size));
  }, [size]);

  const handleMouseDown = (e) => {
    // Don't start dragging if clicking on resize handle or links
    if (
      e.target.classList.contains("resize-handle") ||
      e.target.tagName === "A" ||
      e.target.closest(".resize-handle") ||
      e.target.closest("a")
    ) {
      return;
    }

    e.preventDefault();
    isDragging.current = true;
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleResizeStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    isResizing.current = true;
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // In your handleMouseMove function, change this section:

  const handleMouseMove = (e) => {
    e.preventDefault();

    if (isDragging.current) {
      // Constrain to viewport bounds
      const newX = Math.max(
        0,
        Math.min(
          window.innerWidth - size.width,
          e.clientX - dragOffset.current.x
        )
      );
      const newY = Math.max(
        0,
        Math.min(
          window.innerHeight - size.height,
          e.clientY - dragOffset.current.y
        )
      );

      setPosition({ x: newX, y: newY });
    } else if (isResizing.current) {
      const deltaX = e.clientX - resizeStart.current.x;
      const deltaY = e.clientY - resizeStart.current.y;

      // Allow much smaller minimum size - change from 175 to something like 50 or 80
      const newWidth = Math.max(50, resizeStart.current.width + deltaX);
      const newHeight = Math.max(50, resizeStart.current.height + deltaY);

      // Constrain to viewport
      const maxWidth = window.innerWidth - position.x;
      const maxHeight = window.innerHeight - position.y;

      setSize({
        width: Math.min(newWidth, maxWidth),
        height: Math.min(newHeight, maxHeight),
      });
    }
  };

  const handleMouseUp = (e) => {
    e.preventDefault();

    isDragging.current = false;
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Cleanup event listeners on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <aside
      ref={consoleRef}
      className="dev-console"
      onMouseDown={handleMouseDown}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
      }}
    >
      <div className="dev-console-field">
        <strong className="dev-console-label">User:</strong>
        <span className="dev-console-value">
          {user ? user.username : "null"}
        </span>
      </div>

      <div className="dev-console-field">
        <strong className="dev-console-label">Page:</strong>
        <span className="dev-console-value">{location.pathname}</span>
      </div>

      <div className="dev-console-mode">Display Only Mode</div>

      <Link to="/test" className="dev-console-link">
        → Test Page
      </Link>

      <Link to="/login" className="dev-console-link">
        → Login Page
      </Link>

      <div className="resize-handle" onMouseDown={handleResizeStart} />
    </aside>
  );
}
