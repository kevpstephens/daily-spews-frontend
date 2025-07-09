/** ============================================================
 *! Footer.jsx

 * Site footer with copyright and navigation links.
 * Simple component with copyright year auto-update and developer link.
 *============================================================ */
import { Link } from "react-router-dom";

import "./styles/components/Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      {/* Dynamic copyright with current year */}
      <p>
        <strong>&copy; {new Date().getFullYear()} Daily Spews</strong>
      </p>

      {/* Footer navigation links */}
      <div className="footer-links-container">
        <Link className="footer-link" to="/about">
          About
        </Link>
        |
        <Link className="footer-link" to="/faqs">
          FAQs
        </Link>
        |
        <a
          className="footer-link"
          href="https://www.kevin-stephenson.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          The Dev
        </a>
      </div>
    </footer>
  );
}
