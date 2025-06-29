import "./ErrorBoundary.css";
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to render fallback UI on next render
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an external service here
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
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

    return this.props.children;
  }
}

export default ErrorBoundary;
