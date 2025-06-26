import "./ErrorMessageCard.css";

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

export default function ErrorMessageCard({
  error,
  articleError,
  topicError,
  profileError,
}) {
  let type = null;
  if (articleError) type = "article";
  else if (topicError) type = "topic";
  else if (profileError) type = "profile";

  const fallbackTitle = error || "An unexpected error occurred";
  const fallbackMessage =
    "We couldn’t fetch the content you're looking for. Please try again.";

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
