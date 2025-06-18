import "./Pagination.css";

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalCount,
  limit,
}) {
  const totalPages = Math.ceil(totalCount / limit);
  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, totalCount);

  return (
    <div className="pagination-container">
      <button
        id="previous-page-button"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <div className="pagination-page-display">
        <span id="page-number">
          Page {currentPage} of {totalPages}
        </span>
        <p className="pagination-info">
          Showing articles {start}–{end} of {totalCount}
        </p>
      </div>

      <button
        id="next-page-button"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
