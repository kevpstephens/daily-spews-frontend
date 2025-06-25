import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
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
        <ChevronLeftIcon className="pagination-icon" />
      </button>

      <div className="pagination-page-display">
        <span id="page-number">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>
        <p className="pagination-info">
          Showing articles <strong>{start}</strong>–<strong>{end}</strong> of{" "}
          <strong>{totalCount}</strong>
        </p>
      </div>

      <button
        id="next-page-button"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon className="pagination-icon" />
      </button>
    </div>
  );
}
