import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-container">
      <p>
        <strong>&copy; {new Date().getFullYear()} Daily Spews</strong>
      </p>
      <div className="footer-links-container">
        <Link className="footer-link" to="/about">
          About
        </Link>
        |
        <a
          className="footer-link"
          href="https://github.com/kevpstephens"
          target="_blank"
          rel="noopener noreferrer"
        >
          The Dev
        </a>
      </div>
    </footer>
  );
}
