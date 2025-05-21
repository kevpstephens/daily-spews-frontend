export default function ErrorMessageCard({ error }) {
  return (
    <div className="error-message-card">
      <h2>❌ Oops! Something went wrong... ❌</h2>
      <p>{error}</p>
    </div>
  );
}
