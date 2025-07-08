/** ============================================================
 *! AboutPage.jsx
 *? URL: daily-spews.onrender.com/about

 * Static about page for Daily Spews with animated mascot.
 * Features project description, creator info, and social links.
 * Includes mascot animation that triggers a shake effect on completion.
 *============================================================ */

import { useRef, useEffect } from "react";
import "./AboutPage.css";
import { ExternalLink, Github, Linkedin } from "lucide-react";

export default function AboutPage() {
  const mascotRef = useRef(null);

  useEffect(() => {
    const mascot = mascotRef.current;
    if (!mascot) return;

    // Add shake class when initial mascot animation completes
    const handleAnimationEnd = () => {
      mascot.classList.add("shake");
    };

    mascot.addEventListener("animationend", handleAnimationEnd);
    return () => {
      mascot.removeEventListener("animationend", handleAnimationEnd);
    };
  }, []);

  return (
    <>
      <div className="about-page-container">
        <h1>A little bit about Daily Spews...</h1>
        <img
          ref={mascotRef}
          className="about-page-spewing-mascot spewing-mascot"
          src="/assets/mascot/mascot-spewing-loading.png"
          alt="Daily Spews mascot spewing content"
        />
        <p>
          Daily Spews is a satirical news site built as part of the Northcoders
          Software Development Bootcamp. Powered by React, PostgreSQL, and
          Express - with a (un)healthy dose of caffeine - it explores modern
          headlines with a touch of humour, a dash of interactivity, topped with
          the most delicate caressing of chaos.
        </p>
        <div className="sign-off-container">
          <p>Built with lots of love,</p>

          <a
            className="kevin-stephenson-link"
            href="https://www.kevin-stephenson.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kevin Stephenson
          </a>

          <div className="external-links-container">
            <a
              className="github-link"
              href="https://github.com/kevpstephens"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="github-icon" />
            </a>
            <a
              className="linkedin-link"
              href="https://www.linkedin.com/in/kevin-p-stephenson/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="linkedin-icon" />
            </a>
            <a
              className="personal-website-link"
              href="https://www.kevin-stephenson.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="external-link-icon" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
