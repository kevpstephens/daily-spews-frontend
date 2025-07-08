/** ============================================================
 *! LoadingScreen.jsx

 * Displays an animated mascot with a context-aware loading message.
 * Includes shaking animation to simulate mascot "spewing".
 *============================================================ */

import "./LoadingScreen.css";
import { useEffect, useRef } from "react";
import pluralToSingular from "../../utils/pluralToSingular";

// Returns a context-specific loading message based on props
function getLoadingMessage({
  item,
  topicItem,
  singleArticleLoad,
  topicArticleLoad,
  userProfileLoad,
}) {
  const singularTopicItem = pluralToSingular(topicItem);

  // Message for single article page
  if (singleArticleLoad) {
    return "Please wait while we spew out this article for you...";
  }

  // Message for topic-based articles (special message for puppies)
  if (topicArticleLoad) {
    return singularTopicItem === "puppy"
      ? "PUPPIES OMGFAASAFAA"
      : `Please wait while we spew out some ${singularTopicItem} articles for you...`;
  }

  // Message for user profile loading
  if (userProfileLoad) {
    return "Please wait while we spew out your profile for you...";
  }

  // Message for general articles list
  if (item === "articles") {
    return "Hold up while I spew all these articles...";
  }

  // Generic message for any provided item
  if (item) {
    return `${item} being spewed expeditiously...`;
  }

  // Default message if no context is available
  return "Loading spews...";
}

export default function LoadingScreen(props) {
  const mascotRef = useRef(null); // Ref to the mascot image element
  const message = getLoadingMessage(props); // Determine loading message based on incoming props

  // Add shake animation after initial loading animation completes
  useEffect(() => {
    const mascot = mascotRef.current;
    if (!mascot) return;

    const handleAnimationEnd = () => {
      mascot.classList.add("shake");
    };

    mascot.addEventListener("animationend", handleAnimationEnd);

    return () => {
      mascot.removeEventListener("animationend", handleAnimationEnd);
    };
  }, []);

  return (
    <div role="status" aria-live="polite" aria-label="Loading content">
      {/* Animated spewing mascot image */}
      <img
        ref={mascotRef}
        className="spewing-mascot"
        src="/assets/mascot/mascot-spewing-loading.png"
        alt="Daily Spews mascot spewing content"
        aria-hidden="true"
      />

      {/* Display dynamic loading message */}
      <p className="loading-message" aria-label={`Loading: ${message}`}>
        {message}
      </p>

      {/* Screen reader only text */}
      <span className="sr-only">Loading content, please wait...</span>
    </div>
  );
}
