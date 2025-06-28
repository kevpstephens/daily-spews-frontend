import { useRef, useEffect } from "react";
import "./AboutPage.css";
export default function AboutPage() {
  const mascotRef = useRef(null);

  useEffect(() => {
    const mascot = mascotRef.current;
    if (!mascot) return;

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
          alt="Daily Spews Mascot"
        />
        <p>
          Daily Spews is a satirical news site built as part of the Northcoders
          Software Development Bootcamp. Powered by React, PostgreSQL, and
          Express - with a (un)healthy dose of caffeine - it explores modern
          headlines with a touch of humour, a dash of interactivity, topped with
          the most delicate caressing of chaos.
        </p>
        <p>
          Built with lots of love,{" "}
          <a
            className="kevin-stephenson-link"
            href="https://github.com/kevpstephens"
            target="_blank"
            rel="noopener noreferrer"
          >
            <br />
            <span className="kevin-stephenson-name">Kevin Stephenson</span>
          </a>
        </p>
      </div>
    </>
  );
}
