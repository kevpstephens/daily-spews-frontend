/** ============================================================
 *! ErrorMessageCard.jsx

 * Displays a contextual or fallback error message to the user.
 * Supports specific error types (article, topic, profile).
 *============================================================ */

import "./ErrorMessageCard.css";

// Predefined error titles and messages for different error types
const errorMap = {
  article: {
    title: "404 - Article doesn't exist",
    message: "The article that you're looking for doesn't exist!",
  },
  topic: {
    title: "404 - Topic doesn't exist",
    message: "The topic that you're looking for doesn't exist!",
  },
  profile: {
    title: "404 - Profile not found",
    message: "The profile that you're looking for doesn't exist!",
  },
};

// Reusable error message component with fallback and specific error states
export default function ErrorMessageCard({
  error,
  articleError,
  topicError,
  profileError,
}) {
  // Determine which specific error type to use
  let type = null;
  if (articleError) type = "article";
  else if (topicError) type = "topic";
  else if (profileError) type = "profile";

  // Fallback error title and message if no specific type is matched
  const fallbackTitle = error || "An unexpected error occurred";
  const fallbackMessage =
    "We couldn’t fetch the content you're looking for. Please try again.";

  // Use mapped error if type exists, otherwise use fallback
  const title = type ? errorMap[type].title : fallbackTitle;
  const message = type ? errorMap[type].message : fallbackMessage;

  return (
    <>
      <section className="error-message-card">
        <h1>❌ Yikes! Something has gone a little wrong... ❌</h1>
        <h2>{title}</h2>
        <p>{message}</p>
      </section>
    </>
  );
}
