//? URL: daily-spews.com/*error*

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
