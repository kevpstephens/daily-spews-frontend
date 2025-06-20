import "./SignupPage.css";
import { useState, useEffect } from "react";
import { registerUser } from "../../api/api";
import { useUser } from "../../context";
import { useNavigate, Link } from "react-router-dom";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar_url, setAvatar_url] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { setUser } = useUser();
  const navigate = useNavigate();

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

    setIsSubmitting(true);

    try {
      const payload = {
        username,
        name,
        email,
        password,
        avatar_url: avatar_url.trim() === "" ? null : avatar_url.trim(),
      };

      const data = await registerUser(payload);
      setUser(data.user);
      navigate(`/users/${data.user.username}`);
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Signup failed. Please try again.");
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
        <label htmlFor="username">Username:</label>
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

        <label htmlFor="name">Name:</label>
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

        <label htmlFor="avatar_url">Avatar URL (optional):</label>
        <input
          id="avatar_url"
          name="avatar_url"
          type="url"
          value={avatar_url}
          onChange={(event) => setAvatar_url(event.target.value)}
          disabled={isSubmitting}
          placeholder="https://example.com/avatar.jpg"
        />

        <label htmlFor="email">Email:</label>
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

        <label htmlFor="password">Password:</label>
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
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <label htmlFor="confirmPassword">Confirm Password:</label>
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
            {showConfirmPassword ? "🙈" : "👁️"}
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

        <button type="submit" disabled={isSubmitting || !isFormValid}>
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log in here.</Link>
      </p>
    </div>
  );
}
