/** ============================================================
 *! LoginPage.jsx
 *? URL: daily-spews.onrender.com/login

 * User authentication page with email/password login form.
 * Features password visibility toggle and admin-only dev login tools.
 * Redirects to user profile upon successful authentication.
 *============================================================ */

import "./LoginPage.css";
import { useState } from "react";
import { loginUser } from "../../api/api";
import { useUser } from "../../context";
import { Link, useNavigate } from "react-router-dom";
import DevLoginForm from "../../components/DevLoginForm/DevLoginForm";
import { Eye, EyeClosed, LogInIcon } from "lucide-react";
import { toast } from "react-toastify";

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
      console.error("Login failed:", err);
      toast.error("Login failed. Please check your credentials.", {
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

        <form onSubmit={handleLogin} className="login-form">
          <p>
            New to <strong>Daily Spews</strong>? Don't fret, you've come to the
            right place! Please create an account for full feature access.
          </p>
          <Link to="/signup" className="sign-up-button">
            Sign-Up
          </Link>
          <p>
            Wait...you already have an account?! What are you waiting for?!!?!?
          </p>

          {/* Email input */}
          <label htmlFor="email">
            <strong>Email:</strong>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <label htmlFor="password">
            <strong>Password:</strong>
          </label>
          <div className="login-page-password-input-wrapper">
            <input
              id="login-page-password-input"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            {/* Toggle password visibility */}
            <button
              id="login-page-show-password-toggle"
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
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
