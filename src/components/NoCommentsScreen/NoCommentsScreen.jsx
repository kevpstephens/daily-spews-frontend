/** ============================================================
 *! NoCommentsScreen.jsx

 * Displays a playful message and mascot when no comments exist
 *============================================================ */

import "./NoCommentsScreen.css";

export default function NoCommentsScreen() {
  return (
    <>
      <section className="no-comments-container">
        {/* Display shrugging mascot image */}
        <img
          alt="Daily Spews mascot shrugging"
          id="mascot-shrugging-image"
          src="/assets/mascot/mascot-shrugging.png"
        />

        <article className="no-comments-message">
          <p>There are no comments...yet.</p>
          <p>
            But haven't you always wanted to be the equivalent of that person
            who somehow always manages to say (<strong>first</strong>) on a
            YouTube video viewed by gajillions within zeptoseconds of uploading?
          </p>
          <p>Think of the clout.</p>
          <p>The kudos.</p>
          <p>The opportunity.</p>
          <p>This is your chance, anon. Rise.</p>
          <p> xoxo Sir Daily Spews xoxo</p>
        </article>
      </section>
    </>
  );
}
