import { useEffect, useState } from "react";
import { useUser } from "../context";
import { getUsers } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function DevLoginForm() {
  const [users, setUsers] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data.users);
    });
  }, []);

  // Temporary development login form
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
    <form onSubmit={handleDevLogin} className="dev-login-form">
      <label htmlFor="user-select">
        <strong>Note:</strong> This is a temporary development feature. Real
        user login form below.
      </label>
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
      <button type="submit" disabled={!selectedUsername}>
        Dev Login
      </button>
    </form>
  );
}
