/** ============================================================
 *! SignupPage.jsx
 *? URL: daily-spews.onrender.com/signup

 * User registration form with avatar upload and cropping functionality.
 * Features real-time form validation, password strength checking, and
 * image processing with crop modal. Handles both FormData and JSON payloads.
 * Redirects to user profile upon successful registration.
 *============================================================ */
import { Eye, EyeClosed, UploadIcon, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { registerUser } from "../../api/api";
import AvatarCropModal from "../../components/AvatarCropModal/AvatarCropModal.jsx";
import { useUser } from "../../context";
import logger from "../../utils/logger";
import "./SignupPage.css";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/jpg",
];

export default function SignupPage() {
  // Form field states
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar_url, setAvatar_url] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Avatar cropping modal states
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [isProcessingAvatar, setIsProcessingAvatar] = useState(false);

  // Form validation states
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { setUser } = useUser();
  const navigate = useNavigate();

  // Cleanup effect for previewUrl to prevent memory leaks
  useEffect(() => {
    return () => {
      // Cleanup previewUrl on component unmount
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // File validation helper
  const validateFile = (file) => {
    if (!file) return "No file selected";

    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Please select a valid image file (JPEG, PNG, GIF, or WebP).";
    }

    if (file.size > MAX_FILE_SIZE) {
      return "File size must be less than 5MB";
    }
    return null;
  };

  // Reset file input helper
  const resetFileInput = () => {
    const fileInput = document.getElementById("avatar_url");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const validateUsername = () => {
    if (username.length > 0 && username.length < 3) {
      setUsernameError("Username must be at least 3 characters.");
      return false;
    } else {
      setUsernameError("");
      return true;
    }
  };

  const validatePasswords = () => {
    if (password.length > 0 && password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return false;
    } else if (confirmPassword.length > 0 && password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  // Validate passwords reactively after state updates
  useEffect(() => {
    if (passwordTouched) {
      validatePasswords();
    }
  }, [password, confirmPassword, passwordTouched]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSignup = async (event) => {
    event.preventDefault();

    if (!validateUsername() || !validatePasswords()) {
      return;
    }

    if (isProcessingAvatar) {
      logger.warn("Avatar is still processing, please wait");
      return;
    }

    setIsSubmitting(true);

    try {
      let payload;
      let config = {};

      // Handle file upload vs regular form data
      if (avatar_url instanceof File) {
        // Additional validation for the file before sending
        if (avatar_url.size === 0) {
          throw new Error("Avatar file is empty");
        }

        if (avatar_url.size > MAX_FILE_SIZE) {
          throw new Error("Avatar file is too large");
        }

        // Validate all required fields before creating FormData
        if (
          !username.trim() ||
          !name.trim() ||
          !email.trim() ||
          !password.trim()
        ) {
          throw new Error("All required fields must be filled");
        }

        payload = new FormData();
        payload.append("username", username.trim());
        payload.append("name", name.trim());
        payload.append("email", email.trim());
        payload.append("password", password.trim());
        payload.append("avatar", avatar_url);

        config = {
          timeout: 30000, // Add timeout for file uploads
          withCredentials: true,
        };
      } else {
        // JSON payload for registration without file upload
        payload = {
          username,
          name,
          email,
          password,
          avatar_url: avatar_url?.trim() || null,
        };

        config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        };
      }

      const data = await registerUser(payload, config);
      logger.info("Registration successful:", data);
      setUser(data.user);
      navigate(`/users/${data.user.username}`);
    } catch (err) {
      logger.error("Signup failed:", err);
      logger.error("Error details:", err.response?.data);

      // More specific error messages based on error type
      let errorMessage = "Signup failed! Please try again.";
      if (err.message.includes("Avatar")) {
        errorMessage = "Avatar upload failed! Please try a different image.";
      } else if (err.response?.status === 413) {
        errorMessage = "File too large! Please choose a smaller image.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      import("react-toastify").then(({ toast }) =>
        toast.error(errorMessage, {
          className: "toast-message",
        })
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form validation check - all fields must be valid to enable submit
  const isFormValid =
    username.length >= 3 &&
    name.length >= 2 &&
    email.length > 0 &&
    password.length >= 6 &&
    password === confirmPassword &&
    usernameError === "" &&
    passwordError === "";

  return (
    <div className="signup-page-container">
      <h2>Create a New Account</h2>

      {/* Signup form */}
      <form className="signup-form" noValidate onSubmit={handleSignup}>
        {/* Basic Information Section */}
        <fieldset className="signup-form-fieldset">
          <legend className="signup-form-legend">Basic Information</legend>

          <label htmlFor="username">*Username:</label>
          {usernameError && (
            <p
              aria-live="assertive"
              className="signup-page-form-error"
              role="alert"
            >
              *{usernameError}
            </p>
          )}

          {/* Username input */}
          <input
            autoComplete="username"
            disabled={isSubmitting}
            id="username"
            maxLength={20}
            minLength={3}
            name="username"
            value={username}
            required
            onBlur={validateUsername}
            onChange={(event) => {
              setUsername(event.target.value);
              validateUsername();
            }}
          />

          {/* Name input */}
          <label htmlFor="name">*Name:</label>
          <input
            autoComplete="name"
            disabled={isSubmitting}
            id="name"
            maxLength={50}
            minLength={2}
            name="name"
            value={name}
            required
            onChange={(event) => setName(event.target.value)}
          />
        </fieldset>

        {/* Profile Picture Section */}
        <fieldset className="signup-form-fieldset">
          <legend className="signup-form-legend">
            Profile Picture (Optional)
          </legend>

          {/* Show upload error */}
          {uploadError && (
            <div
              aria-live="assertive"
              className="signup-page-avatar-upload-error"
              role="alert"
            >
              {uploadError}
            </div>
          )}

          {/* Avatar upload section */}
          <div className="avatar-upload-wrapper">
            <div className="avatar-preview-container">
              <img
                alt="Profile preview"
                className="avatar-preview-image"
                src={
                  previewUrl || "/assets/users/default-user-image-purple.avif"
                }
              />
              <div
                aria-describedby="avatar-description"
                className="avatar-upload-overlay"
                role="button"
                tabIndex={0}
                onClick={() => document.getElementById("avatar_url").click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    document.getElementById("avatar_url").click();
                  }
                }}
              >
                <span>Choose Avatar</span>
                <UploadIcon size={16} />
              </div>
            </div>
            <p className="signup-form-help-text" id="avatar-description">
              Upload a profile picture (JPEG, PNG, GIF, or WebP, max 5MB)
            </p>
          </div>

          <input
            accept="image/*"
            disabled={isSubmitting}
            id="avatar_url"
            name="avatar_url"
            style={{ display: "none" }}
            type="file"
            onChange={(event) => {
              const file = event.target.files[0];
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
                setIsProcessingAvatar(true);
                setCropModalOpen(true);
              }
            }}
          />

          {/* Avatar Crop Modal */}
          {cropModalOpen && imagePreview && (
            <AvatarCropModal
              imageSrc={imagePreview}
              onCancel={() => {
                setCropModalOpen(false);
                setIsProcessingAvatar(false);
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
                try {
                  // Validate the cropped blob
                  if (!croppedBlob || croppedBlob.size === 0) {
                    throw new Error("Invalid cropped image");
                  }

                  const croppedFile = new File(
                    [croppedBlob],
                    selectedFile?.name || "avatar.jpg",
                    { type: "image/jpeg" }
                  );

                  // Cleanup previous previewUrl before setting new one
                  if (previewUrl && previewUrl.startsWith("blob:")) {
                    URL.revokeObjectURL(previewUrl);
                  }

                  // Set the cropped file as the avatar
                  setAvatar_url(croppedFile);
                  setPreviewUrl(URL.createObjectURL(croppedFile));

                  // Clear any previous errors
                  setUploadError(null);
                } catch (err) {
                  logger.error("Crop processing failed:", err);
                  setUploadError(
                    "Failed to process cropped image. Please try again."
                  );

                  // Reset avatar state on error
                  setAvatar_url("");
                  if (previewUrl && previewUrl.startsWith("blob:")) {
                    URL.revokeObjectURL(previewUrl);
                  }
                  setPreviewUrl(null);
                } finally {
                  setCropModalOpen(false);
                  setIsProcessingAvatar(false); // Mark avatar processing as complete
                  // Clean up the original object URL
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
        </fieldset>

        {/* Account Credentials Section */}
        <fieldset className="signup-form-fieldset">
          <legend className="signup-form-legend">Account Credentials</legend>

          {/* Email input */}
          <label htmlFor="email">*Email:</label>
          <input
            autoComplete="email"
            disabled={isSubmitting}
            id="email"
            name="email"
            type="email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />

          {/* Password input with visibility toggle */}
          <label htmlFor="password">*Password:</label>
          <div className="signup-page-password-input-wrapper">
            <input
              aria-describedby="password-help"
              autoComplete="new-password"
              disabled={isSubmitting}
              id="signup-page-password-input"
              minLength={6}
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              required
              onBlur={() => setPasswordTouched(true)}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <button
              aria-label={showPassword ? "Hide password" : "Show password"}
              id="signup-page-show-password-toggle"
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <Eye className="signup-page-eye-icon" />
              ) : (
                <EyeClosed className="signup-page-eye-icon" />
              )}
            </button>
          </div>
          <p className="signup-form-help-text" id="password-help">
            Password must be at least 6 characters long
          </p>

          {/* Confirm password input with visibility toggle */}
          <label htmlFor="confirmPassword">*Confirm Password:</label>
          <div className="signup-page-password-input-wrapper">
            <input
              autoComplete="new-password"
              disabled={isSubmitting}
              id="signup-page-confirm-password-input"
              minLength={6}
              name="password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              required
              onBlur={() => setPasswordTouched(true)}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
            <button
              id="signup-page-show-confirm-password-toggle"
              type="button"
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <Eye className="signup-page-eye-icon" />
              ) : (
                <EyeClosed className="signup-page-eye-icon" />
              )}
            </button>
          </div>

          {passwordError && passwordTouched && (
            <p
              aria-live="assertive"
              className="signup-page-form-error"
              role="alert"
            >
              *{passwordError}
            </p>
          )}
        </fieldset>

        <button
          disabled={isSubmitting || !isFormValid || isProcessingAvatar}
          type="submit"
        >
          {isSubmitting
            ? "Signing up..."
            : isProcessingAvatar
              ? "Processing avatar..."
              : "Sign Up"}
          <UserPlus className="sign-up-button-icon" />
        </button>
      </form>

      {/* Login link */}
      <p>
        Already have an account? <Link to="/login">Log in here.</Link>
      </p>
    </div>
  );
}
