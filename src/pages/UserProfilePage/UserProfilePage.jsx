import "./UserProfilePage.css";
import { useParams } from "react-router-dom";
import { getUsers } from "../../api/api";
import useFetch from "../../hooks/useFetch";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import LogoutButton from "../../components/LogoutButton/LogoutButton.jsx";
import { useUser } from "../../context";
dayjs.extend(advancedFormat);

export default function UserProfilePage() {
  const { data } = useFetch(getUsers);
  const { username } = useParams();
  const { user } = useUser();

  let users = [];
  if (data && data.users) {
    users = data.users;
  }

  return (
    <>
      <div className="container">
        {users.map((profileUser) => {
          return username === profileUser.username ? (
            <div key={profileUser.username}>
              <h1 className="user-username">@{profileUser.username}</h1>
              <div className="user-profile-container">
                <img
                  className="user-avatar-image"
                  src={profileUser.avatar_url}
                  alt="user-avatar-image"
                />

                <ul className="user-info-list">
                  <li>
                    <strong>Name:</strong> {profileUser.name}
                  </li>
                  <li>
                    <strong>Username:</strong> {profileUser.username}
                  </li>
                  <li>
                    <strong>Email:</strong> {profileUser.email}
                  </li>
                  <li>
                    <strong>Joined:</strong>{" "}
                    {dayjs(profileUser.created_at).format("MMMM Do, YYYY")}
                  </li>
                </ul>
                {/* Show LogoutButton only if signed-in user is viewing own profile */}
                {user?.username === profileUser.username && (
                  <LogoutButton
                    id="user-profile-logout-button"
                    redirectTo="/login"
                  />
                )}
              </div>
            </div>
          ) : null;
        })}
      </div>
    </>
  );
}
