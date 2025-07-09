/** ============================================================
 *! DevLoginForm.jsx

 * Temporary development login component.
 * Allows selecting a user from the database and simulates a login.
 *============================================================ */

import "./DevLoginForm.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUsers } from "../../api/api";
import { useUser } from "../../context";

export default function DevLoginForm() {
  const [users, setUsers] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  // Fetch user list on component mount
  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data.users);
    });
  }, []);

  // Handle form submission to simulate login
  const handleDevLogin = (event) => {
    event.preventDefault();
    const selectedUser = users.find(
      (user) => user.username === selectedUsername
    );
    if (selectedUser) {
      setUser(selectedUser);
      navigate(`/users/${selectedUser.username}`);
    }
  };

  return (
    <form className="dev-login-form" onSubmit={handleDevLogin}>
      {/* Development-only notice */}
      <label htmlFor="user-select">
        <strong>Note:</strong> This is a temporary development feature. Real
        user login form below.
      </label>

      {/* Dropdown menu to choose a user */}
      <select
        id="user-select"
        value={selectedUsername}
        onChange={(event) => setSelectedUsername(event.target.value)}
      >
        <option value="">-- Choose a user --</option>
        {users.map((user) => (
          <option key={user.username} value={user.username}>
            {user.name} ({user.username})
          </option>
        ))}
      </select>

      {/* Submit button for login */}
      <button disabled={!selectedUsername} type="submit">
        Dev Login
      </button>
    </form>
  );
}
