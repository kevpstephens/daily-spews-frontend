import "./LoginPage.css";
import { useState } from "react";
import { loginUser } from "../../api/api";
import { useUser } from "../../context";
import { useNavigate } from "react-router-dom";
import DevLoginForm from "../../components/DevLoginForm/DevLoginForm";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleProdLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await loginUser({ email, password });
      setUser(data.user);
      navigate(`/users/${data.user.username}`);
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      {import.meta.env.DEV && <DevLoginForm />}
      <div className="login-page-container">
        <h2>Login to Daily Spews</h2>
        <form onSubmit={handleProdLogin} className="login-form">
          <p>
            New to <strong>Daily Spews</strong>? Don't fret, fren, you've come
            to the right place! Please create an account to access the full
            suite of features.
          </p>
          <button className="sign-up-button">Sign-Up</button>
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
          <div className="password-input-wrapper">
            <input
              id="password-input"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button
              id="show-password-toggle"
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
