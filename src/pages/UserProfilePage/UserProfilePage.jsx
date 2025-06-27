import { useEffect, useState } from "react";
import { uploadUserAvatar } from "../../api/api";
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
import AvatarCropModal from "../../components/AvatarCropModal/AvatarCropModal.jsx";
import { UploadIcon } from "lucide-react";

dayjs.extend(advancedFormat);

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/jpg",
];

export default function UserProfilePage() {
  const { username } = useParams();
  const { user, setUser } = useUser();
  const { data, isLoading, error } = useFetch(
    () => getUserByUsername(username),
    [username]
  );

  const profileUser = data?.user;

  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  // File validation function
  const validateFile = (file) => {
    if (!file) return "No file selected";

    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Please select a valid image file (JPEG, PNG, GIF, or WebP)";
    }

    if (file.size > MAX_FILE_SIZE) {
      return "File size must be less than 5MB";
    }

    return null;
  };

  // Reset file input
  const resetFileInput = () => {
    const fileInput = document.getElementById("avatar-upload");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  useEffect(() => {
    if (data?.user?.avatar_url) {
      setAvatarUrl(data.user.avatar_url);
    }
  }, [data]);

  if (isLoading) return <LoadingScreen userProfileLoad={true} />;
  if (error || !profileUser) return <ErrorMessageCard profileError={true} />;

  return (
    <div className="user-profile-page-container">
      <h1 className="user-username">@{profileUser.username}</h1>
      {user?.username === profileUser.username ? (
        <>
          {/* Show upload error */}
          {uploadError && (
            <div
              style={{
                color: "red",
                marginBottom: "10px",
                padding: "8px",
                backgroundColor: "#fee",
                border: "1px solid #fcc",
                borderRadius: "4px",
              }}
            >
              {uploadError}
            </div>
          )}

          {/* Show uploading state */}
          {uploading && (
            <div
              style={{
                marginBottom: "10px",
                padding: "8px",
                backgroundColor: "#e6f3ff",
                border: "1px solid #b3d9ff",
                borderRadius: "4px",
              }}
            >
              Uploading avatar...
            </div>
          )}

          <div className="avatar-container">
            <img
              className="user-avatar-image"
              src={avatarUrl}
              alt="user-avatar-image"
            />
            <>
              <label
                className={`avatar-overlay ${uploading ? "disabled" : ""}`}
                htmlFor="avatar-upload"
              >
                <div className="avatar-overlay-content">
                  <span>Upload New Avatar</span>
                  <UploadIcon size={20} />
                </div>
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    // Validate file before proceeding
                    const validationError = validateFile(file);
                    if (validationError) {
                      setUploadError(validationError);
                      resetFileInput();
                      return;
                    }

                    setUploadError(null);
                    setImagePreview(URL.createObjectURL(file));
                    setSelectedFile(file);
                    setCropModalOpen(true);
                  }
                }}
                disabled={uploading}
                style={{ display: "none" }}
              />
            </>
          </div>

          {cropModalOpen && imagePreview && (
            <AvatarCropModal
              imageSrc={imagePreview}
              onCancel={() => {
                setCropModalOpen(false);
                // Clean up the object URL to prevent memory leaks
                if (imagePreview) {
                  URL.revokeObjectURL(imagePreview);
                }
                setImagePreview(null);
                setSelectedFile(null);
                setUploadError(null);
                resetFileInput();
              }}
              onCropComplete={async (croppedBlob) => {
                setUploading(true);
                setUploadError(null);

                try {
                  const croppedFile = new File(
                    [croppedBlob],
                    selectedFile?.name || "avatar.jpg",
                    { type: "image/jpeg" }
                  );

                  const response = await uploadUserAvatar(
                    user.username,
                    croppedFile
                  );

                  // Add cache busting to ensure new image loads
                  const newAvatarUrl = `${response.avatar_url}?t=${Date.now()}`;

                  setAvatarUrl(newAvatarUrl);
                  setUser((prevUser) => ({
                    ...prevUser,
                    avatar_url: newAvatarUrl,
                  }));
                } catch (err) {
                  console.error("Upload failed", err);
                  setUploadError(
                    err.response?.data?.message ||
                      "Failed to upload avatar. Please try again."
                  );
                } finally {
                  setUploading(false);
                  setCropModalOpen(false);
                  // Clean up the object URL
                  if (imagePreview) {
                    URL.revokeObjectURL(imagePreview);
                  }
                  setImagePreview(null);
                  setSelectedFile(null);
                  resetFileInput();
                }
              }}
            />
          )}
        </>
      ) : (
        <div className="avatar-container">
          <img
            className="user-avatar-image"
            src={avatarUrl}
            alt="user-avatar-image"
          />
        </div>
      )}

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
  );
}
