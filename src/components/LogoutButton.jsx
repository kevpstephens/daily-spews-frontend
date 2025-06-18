import { logoutUser } from "../api/api";
import { useUser } from "../context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function LogoutButton({ redirectTo = "/" }) {
  const { setUser } = useUser();
  const navigate = useNavigate();

  return (
    <button
      className="logout-button"
      onClick={async () => {
        try {
          await logoutUser();
          setUser(null);
          toast.success("Logged out!");
          navigate(redirectTo);
        } catch (err) {
          toast.error("Logout failed!");
          console.error(err);
        }
      }}
    >
      Log Out
    </button>
  );
}
