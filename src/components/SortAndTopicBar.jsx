import "./SortAndTopicBar.css";
import SortBar from "./SortBar/SortBar";
import TopicFilterBar from "./TopicFilterBar/TopicFilterBar";
import { ListRestart } from "lucide-react";

export default function SortAndTopicBar({ handleReset }) {

  return (
    <>
      <div className="sort-and-topic-bar-container">
        <SortBar />
        <TopicFilterBar />
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
