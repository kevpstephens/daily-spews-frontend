export default function Pagination({ articles }) {
  return (
    <div className="pagination-container">
      <button id="previous-page-button">Previous</button>
      <div className="pagination-page-display">
        <span id="page-number">Page 1</span>
        <p className="pagination-info">
          Showing articles 1 of {articles.length}
        </p>
      </div>

      <button id="next-page-button">Next</button>
    </div>
  );
}
