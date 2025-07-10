/** ============================================================
 *! LoginPage.jsx
 *? URL: daily-spews.onrender.com/login

 * User authentication page with email/password login form.
 * Features password visibility toggle and admin-only dev login tools.
 * Redirects to user profile upon successful authentication.
 *============================================================ */

import "./LoginPage.css";
import { Eye, EyeClosed, LogInIcon, User, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "../../api/api";
import DevLoginForm from "../../components/DevLoginForm/DevLoginForm";
import { useUser } from "../../context";
import logger from "../../utils/logger";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await loginUser({ email, password });
      setUser(data.user);
      toast.success(`Login successful! Greetings, @${data.user.username}!`, {
        className: "toast-message",
      });
      navigate(`/users/${data.user.username}`);
    } catch (err) {
      logger.error("Login failed:", err);
      toast.error("Login failed. Please check your credentials.", {
        className: "toast-message",
      });
    }
  };

  const handleGuestLogin = async () => {
    try {
      const data = await loginUser({
        email: import.meta.env.VITE_GUEST_USER_EMAIL,
        password: import.meta.env.VITE_GUEST_USER_PASSWORD,
      });
      setUser(data.user);
      toast.success(
        "Welcome! You're now signed in as a guest user. Enjoy exploring Daily Spews!",
        {
          className: "toast-message",
        }
      );
      navigate(`/users/${data.user.username}`);
    } catch {
      toast.error("Guest login failed. Please try again later.", {
        className: "toast-message",
      });
    }
  };

  return (
    <>
      {/* Admin-only development login shortcuts */}
      {user && user.username === "admin" && <DevLoginForm />}

      {/* Login form */}
      <div className="login-page-container">
        <h2>Login to Daily Spews</h2>

        <form autoComplete="on" className="login-form" onSubmit={handleLogin}>
          <p>
            New to <strong>Daily Spews</strong>? Don't fret, you've come to the
            right place! Please create an account for full feature access.
          </p>
          <Link className="sign-up-button" to="/signup">
            Sign Up
            <UserPlus className="sign-up-button-icon" />
          </Link>
          <p>
            Wait...you already have an account?! What are you waiting for?!!?!?
          </p>

          {/* Test User Login Button */}
          <div className="guest-login-section">
            <p className="guest-login-text">
              Want to explore the full experience without having to sign-up
              right now? Sign-in as a guest user!
            </p>
            <button
              className="guest-login-button"
              type="button"
              onClick={handleGuestLogin}
            >
              <User className="guest-login-button-icon" />
              Try as Guest User
            </button>
          </div>

          <div className="login-divider">
            <span>or</span>
          </div>

          {/* Email input */}
          <label htmlFor="email">
            <strong>Email:</strong>
          </label>
          <input
            autoComplete="email"
            id="email"
            name="email"
            type="email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="login-page-password-input">
            <strong>Password:</strong>
          </label>
          <div className="login-page-password-input-wrapper">
            <input
              autoComplete="current-password"
              id="login-page-password-input"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />

            {/* Toggle password visibility */}
            <button
              aria-label={showPassword ? "Hide password" : "Show password"}
              id="login-page-show-password-toggle"
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <Eye className="login-page-eye-icon" />
              ) : (
                <EyeClosed className="login-page-eye-icon" />
              )}
            </button>
          </div>

          <button className="login-form-button" type="submit">
            Login
            <LogInIcon className="login-form-button-icon" />
          </button>
        </form>
      </div>
    </>
  );
}
