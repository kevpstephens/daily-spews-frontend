/** ============================================================
 *! LogoutButton.jsx

 * Button component for logging out the user.
 * Clears user context and localStorage, shows toast, then navigates.
 *============================================================ */

import "./LogoutButton.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context";
import { toast } from "react-toastify";
import { LogOutIcon } from "lucide-react";
import { logoutUser } from "../../api/api";

export default function LogoutButton({ redirectTo = "/", id }) {
  const { setUser } = useUser();
  const navigate = useNavigate();

  return (
    <button
      id={id}
      className="logout-button"
      onClick={async () => {
        try {
          await logoutUser();
          setUser(null);
          localStorage.removeItem("ds-username"); // Remove cached username
          toast.success("Logged out successfully!", {
            className: "toast-message",
          });
          navigate(redirectTo);
        } catch (err) {
          toast.error("Logout failed! Please refresh the page and try again.", {
            className: "toast-message",
          });
          console.error(err);
        }
      }}
    >
      <div className="logout-button-content">
        Log Out
        <LogOutIcon size={16} />
      </div>
    </button>
  );
}
