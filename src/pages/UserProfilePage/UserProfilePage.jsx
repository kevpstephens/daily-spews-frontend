//? URL: daily-spews.com/users/:username

import "./UserProfilePage.css";
import { useParams } from "react-router-dom";
import { getUsers } from "../../api/api";
import useFetch from "../../hooks/useFetch";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import LogoutButton from "../../components/LogoutButton/LogoutButton.jsx";
dayjs.extend(advancedFormat);

export default function UserProfilePage() {
  const { data } = useFetch(getUsers);
  const { username } = useParams();

  let users = [];
  if (data && data.users) {
    users = data.users;
  }

  return (
    <>
      {users.map((user) => {
        if (username === user.username) {
          return (
            <>
              <h1 className="user-username">@{user.username}</h1>
              <div className="user-profile-container" key={user.username}>
                <img
                  className="user-avatar-image"
                  src={user.avatar_url}
                  alt="user-avatar-image"
                />

                <ul className="user-info-list">
                  <li>
                    <strong>Name:</strong> {user.name}
                  </li>
                  <li>
                    <strong>Username:</strong> {user.username}
                  </li>
                  <li>
                    <strong>Email:</strong> {user.email}
                  </li>
                  <li>
                    <strong>Joined:</strong>{" "}
                    {dayjs(user.created_at).format("MMMM Do, YYYY")}
                  </li>
                </ul>
                <LogoutButton
                  className="user-profile-logout-button"
                  redirectTo="/login"
                />
              </div>
            </>
          );
        } else {
          return null;
        }
      })}
    </>
  );
}
