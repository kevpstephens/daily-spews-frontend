import { useEffect, useState } from "react";
import "./SortAndTopicBar.css";
import SortBar from "./SortBar/SortBar";
import TopicFilterBar from "./TopicFilterBar/TopicFilterBar";
import { ListRestart } from "lucide-react";

export default function SortAndTopicBar({ handleReset }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="sort-and-topic-bar-container">
        {isMobile ? (
          <div className="sort-and-topic-bar-sort-mobile-container">
            <SortBar />
            <TopicFilterBar />
            <button
              className="sort-and-topic-bar-reset-button"
              onClick={handleReset}
            >
              <ListRestart className="reset-button-icon" />
            </button>
          </div>
        ) : (
          <>
            <SortBar />
            <TopicFilterBar />
          </>
        )}

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
