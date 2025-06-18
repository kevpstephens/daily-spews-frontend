//? URL: daily-spews.com/users/:username

import { useParams } from "react-router-dom";
import { getUsers } from "../api/api";
import useFetch from "../hooks/useFetch";

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
            <div className="user-profile-container" key={user.username}>
              <p>
                <strong>Profile Pic:</strong>
              </p>
              <img
                className="user-avatar-image"
                src={user.avatar_url}
                alt="user-avatar-image"
              />
              <p>
                <strong>Username: </strong>
                {user.username}
              </p>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
            </div>
          );
        } else {
          return null;
        }
      })}
    </>
  );
}
