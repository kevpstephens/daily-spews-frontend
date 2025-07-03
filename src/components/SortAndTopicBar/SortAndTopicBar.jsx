/** ============================================================
 *! SortAndTopicBar.jsx

 * This component combines sorting and topic filtering controls for articles,
 * and includes a reset button to clear filters and sort order.
 *============================================================ */

import "./SortAndTopicBar.css";
import SortBar from "../SortBar/SortBar";
import TopicFilterBar from "../TopicFilterBar/TopicFilterBar";
import { ListRestart } from "lucide-react";

export default function SortAndTopicBar({ handleReset }) {
  return (
    <>
      {/* Container that holds sorting, topic filter, and reset button */}
      <div className="sort-and-topic-bar-container">
        {/* Dropdown for choosing article sort order */}
        <SortBar />

        {/* Dropdown for filtering articles by topic */}
        <TopicFilterBar />

        {/* Button to reset sorting and filtering */}
        <button
          className="sort-and-topic-bar-reset-button"
          onClick={handleReset}
        >
          <ListRestart className="reset-button-icon" />
        </button>
      </div>
    </>
  );
}
