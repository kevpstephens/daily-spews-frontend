/** ============================================================
 *! Pagination.jsx

 * Displays pagination controls for navigating paginated article lists.
 * Shows current page, total page count, and article range.
 *============================================================ */

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import PropTypes from "prop-types";
import "./Pagination.css";

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalCount,
  limit,
}) {
  const totalPages = Math.ceil(totalCount / limit); // Calculate the total number of pages based on article count and page limit
  const start = (currentPage - 1) * limit + 1; // Calculate the index of the first article on the current page
  const end = Math.min(currentPage * limit, totalCount); // Calculate the index of the last article on the current page

  return (
    <div className="pagination-container">
      {/* Previous page button - disabled if on first page */}
      <button
        aria-label={`Go to page ${Math.max(currentPage - 1, 1)}`}
        disabled={currentPage === 1}
        id="previous-page-button"
        type="button"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      >
        <ChevronLeftIcon className="pagination-icon" />
      </button>

      {/* Display current page and article range */}
      <div className="pagination-page-display">
        <span id="page-number">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>
        <p className="pagination-info">
          Showing articles <strong>{start}</strong>–<strong>{end}</strong> of{" "}
          <strong>{totalCount}</strong>
        </p>
      </div>

      {/* Next page button - disabled if on last page */}
      <button
        aria-label={`Go to page ${Math.min(currentPage + 1, totalPages)}`}
        disabled={currentPage === totalPages}
        id="next-page-button"
        type="button"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      >
        <ChevronRightIcon className="pagination-icon" />
      </button>
    </div>
  );
}

//! ===================================================== */
//! Prop types
//! ===================================================== */
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
};
