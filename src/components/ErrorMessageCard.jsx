export default function ErrorMessageCard({ error }) {
  return (
    <>
      <div className="error-message-card">
        <h2 className="generic-error-message">
          ❌ Yikes! Something has gone a little wrong... ❌
        </h2>
        <p>{error}</p>
      </div>
    </>
  );
}
