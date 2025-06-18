//? URL: daily-spews.com/about

import "./AboutPage.css";
export default function AboutPage() {
  return (
    <>
      <div className="about-page-container">
        <h1>A little bit about Daily Spews...</h1>
        <img
          className="spewing-mascot"
          src="src/assets/logo/daily-spews-alt-logo-cropped.png"
          alt="Daily Spews Mascot"
        />
        <p>
          Daily Spews is a satirical news site built as part of the Northcoders
          Software Engineering Bootcamp. Powered by React, PostgreSQL, and
          Express — with a (un)healthy dose of caffeine — it explores modern
          headlines with a touch of humour, a dash of interactivity, topped off
          with the most delicate caressing of chaos.
        </p>
        <p>
          Built with lots of love by{" "}
          <a
            className="footer-link"
            href="https://github.com/kevpstephens"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kevin Stephenson
          </a>
          .
        </p>
      </div>
    </>
  );
}
