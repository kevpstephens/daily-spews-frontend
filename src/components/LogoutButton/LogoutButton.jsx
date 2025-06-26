import "./LogoutButton.css";
import { logoutUser } from "../../api/api";
import { useUser } from "../../context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
          localStorage.removeItem("ds-username");
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
      Log Out
    </button>
  );
}
