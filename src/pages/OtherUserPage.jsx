import { useParams } from "react-router-dom";
import { getUsers } from "../api/api";
import useFetch from "../hooks/useFetch";
import PageHeader from "../components/PageHeader";

export default function OtherUserPage() {
  const { data, isLoading, error } = useFetch(getUsers);
  const { username } = useParams();

  let users = [];
  if (data && data.users) {
    users = data.users;
  }

  return (
    <>
      <PageHeader />
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
