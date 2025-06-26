import "./ErrorMessageCard.css";

export default function ErrorMessageCard({
  error,
  articleError,
  topicError,
  profileError,
}) {
  let errorMessage = "";
  if (articleError) {
    error = "404 - Article doesn't exist";
    errorMessage = "The article that you're looking for doesn't exist!";
  } else if (topicError) {
    error = "404 - Topic doesn't exist";
    errorMessage = "The topic that you're looking for doesn't exist!";
  } else if (profileError) {
    error = "404 - Profile not found";
    errorMessage = "The profile that you're looking for doesn't exist!";
  }

  return (
    <>
      <div className="error-message-card">
        <h1 className="generic-error-message">
          ❌ Yikes! Something has gone a little wrong... ❌
        </h1>
        <h2>{error}</h2>
        <p>{errorMessage}</p>
      </div>
    </>
  );
}
