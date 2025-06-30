import "./SignupPage.css";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { registerUser } from "../../api/api";
import { useUser } from "../../context";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeClosed, UploadIcon } from "lucide-react";
import AvatarCropModal from "../../components/AvatarCropModal/AvatarCropModal.jsx";
import defaultImage from "/assets/users/default-user-image-purple.avif";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/jpg",
];

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar_url, setAvatar_url] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cropping modal states
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [isProcessingAvatar, setIsProcessingAvatar] = useState(false);

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
  }, [password, confirmPassword, passwordTouched]);

  const handleSignup = async (event) => {
    event.preventDefault();

    if (!validateUsername() || !validatePasswords()) {
      return;
    }

    if (isProcessingAvatar) {
      console.log("❌ Avatar is still processing, please wait");
      return;
    }

    setIsSubmitting(true);

    try {
      let payload;
      let config = {};

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
      console.log("✅ Registration successful:", data);
      setUser(data.user);
      navigate(`/users/${data.user.username}`);
    } catch (err) {
      console.error("❌ Signup failed:", err);
      console.error("❌ Error details:", err.response?.data);

      // More specific error messages
      let errorMessage = "Signup failed. Please try again.";
      if (err.message.includes("Avatar")) {
        errorMessage = "Avatar upload failed. Please try a different image.";
      } else if (err.response?.status === 413) {
        errorMessage = "File too large. Please choose a smaller image.";
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

      <form onSubmit={handleSignup} className="signup-form" noValidate>
        <label htmlFor="username">*Username:</label>
        {usernameError && (
          <p
            className="signup-page-form-error"
            role="alert"
            aria-live="assertive"
          >
            *{usernameError}
          </p>
        )}
        <input
          id="username"
          name="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
            validateUsername();
          }}
          onBlur={validateUsername}
          required
          minLength={3}
          maxLength={20}
          autoComplete="username"
          disabled={isSubmitting}
        />

        <label htmlFor="name">*Name:</label>
        <input
          id="name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          minLength={2}
          maxLength={50}
          autoComplete="name"
          disabled={isSubmitting}
        />

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

        <div className="avatar-upload-wrapper">
          <div className="avatar-preview-container">
            <img
              src={previewUrl || defaultImage}
              alt="Avatar Preview"
              className="avatar-preview-image"
            />
            <div
              className="avatar-upload-overlay"
              onClick={() => document.getElementById("avatar_url").click()}
            >
              <span>Choose Avatar</span>
              <UploadIcon size={16} />
            </div>
          </div>
        </div>

        <input
          id="avatar_url"
          name="avatar_url"
          type="file"
          accept="image/*"
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
          style={{ display: "none" }}
          disabled={isSubmitting}
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
                console.error("❌ Crop processing failed:", err);
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

        <label htmlFor="email">*Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="email"
          disabled={isSubmitting}
        />

        <label htmlFor="password">*Password:</label>
        <div className="signup-page-password-input-wrapper">
          <input
            id="signup-page-password-input"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            onBlur={() => setPasswordTouched(true)}
            required
            minLength={6}
            autoComplete="new-password"
            disabled={isSubmitting}
          />
          <button
            id="signup-page-show-password-toggle"
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <Eye className="signup-page-eye-icon" />
            ) : (
              <EyeClosed className="signup-page-eye-icon" />
            )}
          </button>
        </div>

        <label htmlFor="confirmPassword">*Confirm Password:</label>
        <div className="signup-page-password-input-wrapper">
          <input
            id="signup-page-confirm-password-input"
            name="password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
            onBlur={() => setPasswordTouched(true)}
            required
            minLength={6}
            autoComplete="new-password"
            disabled={isSubmitting}
          />
          <button
            id="signup-page-show-confirm-password-toggle"
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            aria-label={
              showConfirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
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
            className="signup-page-form-error"
            role="alert"
            aria-live="assertive"
          >
            *{passwordError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !isFormValid || isProcessingAvatar}
        >
          {isSubmitting
            ? "Signing up..."
            : isProcessingAvatar
            ? "Processing avatar..."
            : "Sign Up"}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log in here.</Link>
      </p>
    </div>
  );
}
