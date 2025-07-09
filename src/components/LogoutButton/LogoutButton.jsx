/** ============================================================
 *! LogoutButton.jsx

 * Button component for logging out the user.
 * Clears user context and localStorage, shows toast, then navigates.
 *============================================================ */

import "./LogoutButton.css";
import { LogOutIcon } from "lucide-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { logoutUser } from "../../api/api";
import { useUser } from "../../context";
import logger from "../../utils/logger";

export default function LogoutButton({ redirectTo = "/", id, onKeyDown }) {
  const { setUser } = useUser();
  const navigate = useNavigate();

  return (
    <button
      className="logout-button"
      id={id}
      type="button"
      onKeyDown={onKeyDown}
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
          logger.error("Logout failed:", err);
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

//! ===================================================== */
//! Prop types
//! ===================================================== */
LogoutButton.propTypes = {
  redirectTo: PropTypes.string,
  id: PropTypes.string,
  onKeyDown: PropTypes.func,
};

LogoutButton.defaultProps = {
  redirectTo: "/",
  id: undefined,
  onKeyDown: undefined,
};
