import "./UserProfilePage.css";
import { useParams } from "react-router-dom";
import { getUserByUsername } from "../../api/api";
import useFetch from "../../hooks/useFetch";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import LogoutButton from "../../components/LogoutButton/LogoutButton.jsx";
import { useUser } from "../../context";
import ErrorMessageCard from "../../components/ErrorMessageCard/ErrorMessageCard.jsx";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.jsx";
dayjs.extend(advancedFormat);

export default function UserProfilePage() {
  const { username } = useParams();
  const { user } = useUser();
  const { data, isLoading, error } = useFetch(
    () => getUserByUsername(username),
    [username]
  );

  const profileUser = data?.user;

  if (isLoading) return <LoadingScreen userProfileLoad={true} />;
  if (error || !profileUser) return <ErrorMessageCard profileError={true} />;

  return (
    <div className="container">
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
          <LogoutButton id="user-profile-logout-button" redirectTo="/login" />
        )}
      </div>
    </div>
  );
}
