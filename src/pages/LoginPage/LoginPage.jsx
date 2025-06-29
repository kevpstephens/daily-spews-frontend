import "./LoginPage.css";
import { useState } from "react";
import { loginUser } from "../../api/api";
import { useUser } from "../../context";
import { Link, useNavigate } from "react-router-dom";
import DevLoginForm from "../../components/DevLoginForm/DevLoginForm";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleProdLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await loginUser({ email, password });
      // Save authenticated user to context after login
      setUser(data.user);
      toast.success(`Login successful! Greetings, @${data.user.username}!`, {
        className: "toast-message",
      });
      // Optionally: Re-fetch user from cookie session if needed
      // setUser will already populate the user context if response is valid
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
      {user && user.username === "admin" && <DevLoginForm />}
      <div className="login-page-container">
        <h2>Login to Daily Spews</h2>
        <form onSubmit={handleProdLogin} className="login-form">
          <p>
            New to <strong>Daily Spews</strong>? Don't fret, fren, you've come
            to the right place! Please create an account to access the full
            suite of features.
          </p>
          <Link to="/signup" className="sign-up-button">
            Sign-Up
          </Link>
          <p>
            Wait...you already have an account?! What are you waiting for?!!?!?
          </p>
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
          </button>
        </form>
      </div>
    </>
  );
}
