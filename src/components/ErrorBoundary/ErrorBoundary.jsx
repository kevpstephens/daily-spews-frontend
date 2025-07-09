/** ============================================================
 *! ErrorBoundary.jsx

 * A React component that catches JavaScript errors in child components.
 * Displays a fallback UI and logs the error for debugging purposes.
 *============================================================ */

import PropTypes from "prop-types";
import React from "react";

import logger from "../../utils/logger";
import "./ErrorBoundary.css";

// Error boundary class component for handling rendering errors
class ErrorBoundary extends React.Component {
  // Initialise state to track error occurrence
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Lifecycle method: update state when an error is thrown
  static getDerivedStateFromError(error) {
    // Update state to render fallback UI on next render
    return { hasError: true, error };
  }

  // Lifecycle method: log error details
  componentDidCatch(error, errorInfo) {
    logger.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  // Render fallback UI if an error was caught
  render() {
    if (this.state.hasError) {
      // Display user-friendly error message and raw error for debugging
      return (
        <div className="error-boundary-container">
          <h1 className="error-boundary-title">
            Oops, something went wrong :s
          </h1>
          <p className="error-boundary-message">
            Apologies! Please try refreshing the page or come back later.
          </p>
          <pre className="error-boundary-details">
            {this.state.error && this.state.error.toString()}
          </pre>
        </div>
      );
    }

    // Otherwise, render child components normally
    return this.props.children;
  }
}

//! ===================================================== */
//! Prop types
//! ===================================================== */
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
