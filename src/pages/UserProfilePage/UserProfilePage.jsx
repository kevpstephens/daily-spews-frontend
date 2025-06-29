/** !============================================================
 * UserProfilePage.jsx
 * https://daily-spews.onrender.com/users/:username

 * Displays a user's profile info, avatar, and tools for managing their own profile.
 * Allows signed-in users to upload and crop a new avatar image.
 *============================================================ */

import "./UserProfilePage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { UploadIcon } from "lucide-react";
import { uploadUserAvatar, getUserByUsername } from "../../api/api";
import useFetch from "../../hooks/useFetch";
import { useUser } from "../../context";
import LogoutButton from "../../components/LogoutButton/LogoutButton.jsx";
import ErrorMessageCard from "../../components/ErrorMessageCard/ErrorMessageCard.jsx";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen.jsx";
import AvatarCropModal from "../../components/AvatarCropModal/AvatarCropModal.jsx";
import PostNewArticleButton from "../../components/PostNewArticleButton/PostNewArticleButton.jsx";
dayjs.extend(advancedFormat);

// Constraints for avatar uploads
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/jpg",
];

// !============================================================
// !     User Profile Page Component
// !============================================================
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

  // Update avatar preview when the fetched user data changes
  useEffect(() => {
    if (data?.user?.avatar_url) {
      setAvatarUrl(data.user.avatar_url);
    }
  }, [data]);

  // Sync avatar preview with current user context (for own profile)
  useEffect(() => {
    if (user?.username === username && user?.avatar_url) {
      setAvatarUrl(user.avatar_url);
    }
  }, [user, username]);

  if (isLoading) return <LoadingScreen userProfileLoad={true} />;
  if (error || !profileUser) return <ErrorMessageCard profileError={true} />;

  // !============================================================
  // !     Render profile UI
  // !============================================================
  return (
    <div className="user-profile-page-container">
      <h1 className="user-username">@{profileUser.username}</h1>

      {user?.username === profileUser.username && (
        <PostNewArticleButton className="user-profile-page-post-article-button" />
      )}

      {/* Conditional logic: allow avatar update and posting only if viewing own profile */}
      {user?.username === profileUser.username ? (
        <>
          {uploadError && (
            <div className="upload-error-message">{uploadError}</div>
          )}

          {/* Show uploading state */}
          {uploading && (
            <div className="uploading-avatar-message">Uploading avatar...</div>
          )}

          <div className="avatar-container">
            <img
              className="user-avatar-image"
              src={avatarUrl}
              alt="user-avatar-image"
              key={avatarUrl} // Force re-render to reflect updated avatar
            />
            <>
              <label
                className={`avatar-overlay ${uploading ? "disabled" : ""}`}
                htmlFor="avatar-upload"
              >
                <div className="avatar-overlay-content">
                  <span>Upload New Avatar</span>
                  <UploadIcon size={22.5} />
                </div>
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    // Validate file type and size before opening crop modal
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
              // Handle cancellation from cropping modal (cleanup preview, state, etc.)
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
              // Handle confirmed avatar crop and upload
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

                  // Get the clean URL without cache busting first
                  const cleanAvatarUrl =
                    response.user?.avatar_url || response.avatar_url;

                  // Add cache busting to ensure new image loads
                  const newAvatarUrl = `${cleanAvatarUrl}?t=${Date.now()}`;

                  // Update local state immediately
                  setAvatarUrl(newAvatarUrl);

                  // Update global user context
                  setUser((prevUser) => ({
                    ...prevUser,
                    avatar_url: newAvatarUrl,
                  }));

                  console.log("✅ Avatar updated successfully:", newAvatarUrl);
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
              aspectRatio={1} // Ensure avatar crop is a square
              cropShape="round" // Display circular crop UI to match profile avatar style
              title="Crop Avatar"
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

      {/* Basic user info section */}
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

      {/* Show logout option if the current user is viewing their own profile */}
      {user?.username === profileUser.username && (
        <LogoutButton id="user-profile-logout-button" redirectTo="/login" />
      )}
    </div>
  );
}
