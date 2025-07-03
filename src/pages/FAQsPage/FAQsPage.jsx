/** ============================================================
 *! FAQsPage.jsx
 *? URL: daily-spews.onrender.com/faqs

 * Features common user questions with satirical answers that match the app's tone.
 *============================================================ */

import "./FAQsPage.css";
import {
  HelpCircle,
  Heart,
  MessageSquare,
  PencilLine,
  UserCircle,
  Filter,
} from "lucide-react";

export default function FAQsPage() {
  return (
    <>
      <div className="faqs-page-container">
        <h1>Frequently Asked Questions</h1>

        <div className="faqs-content">
          <div className="faq-item">
            <h3>
              <HelpCircle size={20} />
              How do I post an article?
              <PencilLine size={20} />
            </h3>
            <p>
              You must be logged in to post articles. Click your avatar in the
              top right corner, then select "Post Article" from the dropdown.
              Fill in the title, body, select a topic, and optionally upload an
              image (max 5MB - accepted formats: JPEG/PNG/GIF/WebP). Images are
              automatically cropped to 16:9 ratio. Hit submit and intently gaze
              upon your masterpiece as hundreds of anonymous commenters rip it
              to shreds.
            </p>
          </div>

          <div className="faq-item">
            <h3>
              <HelpCircle size={20} />
              How does voting work?
              <Heart size={20} />
            </h3>
            <p>
              You must be logged in to vote. Each article and comment has thumbs
              up/down buttons. You can only vote once per item. The vote count
              is displayed with a heart icon. Upvotes turn green, downvotes turn
              red when pressed.
            </p>
          </div>

          <div className="faq-item">
            <h3>
              <HelpCircle size={20} />
              Can I comment on articles?
              <MessageSquare size={20} />
            </h3>
            <p>
              Yes! Scroll down to the comments section on any article. You must
              be logged in to comment. Type your thoughts in the textarea (it
              auto-expands as you type) and hit submit. You can also vote on
              comments, and if you're the comment author, you can delete your
              own comments. Keep it civil (ish)!
            </p>
          </div>

          <div className="faq-item">
            <h3>
              <HelpCircle size={20} />
              How do I filter by topics?
              <Filter size={20} />
            </h3>
            <p>
              Use the topic dropdown in the sort bar on the Articles page. You
              can also visit the Topics page to see all available topics, or use
              the horizontal scrolling topics bar on the homepage. Click any
              topic to see all articles in that category. Use the reset button
              to clear filters and return to all articles.
            </p>
          </div>

          <div className="faq-item">
            <h3>
              <HelpCircle size={20} />
              How do I update my profile?
              <UserCircle size={20} />
            </h3>
            <p>
              Click your avatar in the top right, then select "Profile" from the
              dropdown. On your profile page, hover over your avatar to see an
              "Upload New Avatar" overlay. Click it to select an image (max 5MB
              - accepted formats: JPEG/PNG/GIF/WebP). Images are automatically
              cropped to a circle. You can also see your join date and basic
              info on your profile. Updating other account info is currently
              unavailable.
            </p>
          </div>

          <div className="faq-item">
            <h3>
              <HelpCircle size={20} />
              Why the spewing mascot?
            </h3>
            <p>idk tbh.</p>
          </div>
        </div>
      </div>
    </>
  );
}
