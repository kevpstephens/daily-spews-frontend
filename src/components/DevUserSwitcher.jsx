import { useUser } from "../context";

const mockUsers = [
  {
    username: "kevpstephenson",
    name: "Kevin Stephenson",
    avatar_url: "/images/users/kevin.jpeg",
  },
  {
    username: "guest_user",
    name: "Guest User",
    avatar_url: "/images/users/guest_user.jpeg",
  },
  {
    username: "admin",
    name: "Site Admin",
    avatar_url: "/images/users/admin.jpeg",
  },
];

const DevUserSwitcher = () => {
  const { user, setUser } = useUser();

  return (
    <div className="fixed top-4 right-4 z-50 bg-white border rounded shadow px-4 py-2 text-sm">
      <label htmlFor="user-select" className="block font-semibold mb-1">
        Logged in as:
      </label>
      <select
        id="user-select"
        value={user?.username || ""}
        onChange={(e) => {
          const selected = mockUsers.find((u) => u.username === e.target.value);
          setUser(selected);
        }}
        className="border rounded px-2 py-1"
      >
        <option value="">None</option>
        {mockUsers.map((u) => (
          <option key={u.username} value={u.username}>
            {u.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DevUserSwitcher;
