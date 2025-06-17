import PageHeader from "../components/PageHeader";

export default function ErrorPageNotFoundPage() {
  return (
    <>
      <PageHeader />
      <div className="error-message-card">
        <h2 className="generic-error-message">
          ❌ Yikes! Something has gone a little wrong... ❌
        </h2>
        <h3>404 - Page Not Found</h3>
        <p>The page that you're looking for doesn't exist.</p>
      </div>
    </>
  );
}
