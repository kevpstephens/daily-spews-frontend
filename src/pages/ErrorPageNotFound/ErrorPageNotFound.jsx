/** ============================================================
 *! ErrorPageNotFound.jsx
 *? URL: daily-spews.onrender.com/*error*
 
 * 404 error page displayed when users navigate to non-existent routes.
 * Simple static component with user-friendly error messaging.
 *============================================================ */

import "./ErrorPageNotFound.css";

export default function ErrorPageNotFoundPage() {
  return (
    <>
      <div className="error-page-not-found-message-card">
        <h2 className="error-page-not-found-error-message">
          ❌ Yikes! Something has gone a little wrong... ❌
        </h2>
        <h3>404 - Page Not Found</h3>
        <p>The page that you're looking for doesn't exist..!?</p>
      </div>
    </>
  );
}
