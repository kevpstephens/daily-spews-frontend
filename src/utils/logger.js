/* eslint-disable no-console */

/** ============================================================
 *! logger.js
 *
 * Centralized logging utility for the Daily Spews application.
 * Provides environment-aware logging with different levels and formatting.
 * Replaces direct console.log/error usage throughout the codebase.
 *============================================================ */

// Log levels with priority (higher number = higher priority)
const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

// Current environment configuration
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// Set minimum log level based on environment
const MIN_LOG_LEVEL = isDevelopment ? LOG_LEVELS.DEBUG : LOG_LEVELS.WARN;

/**
 * Formats log message with timestamp and level
 * @param {string} level - Log level (DEBUG, INFO, WARN, ERROR)
 * @param {string} message - Log message
 * @param {any} data - Additional data to log
 * @returns {Array} Formatted log arguments
 */
function formatLogMessage(level, message, data) {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level}]`;

  if (data !== undefined) {
    return [prefix, message, data];
  }
  return [prefix, message];
}

/**
 * Internal logging function that respects log levels and environment
 * @param {number} level - Numeric log level
 * @param {string} levelName - Log level name
 * @param {Function} consoleFn - Console function to use
 * @param {string} message - Log message
 * @param {any} data - Additional data to log
 */
function log(level, levelName, consoleFn, message, data) {
  // Skip logging if below minimum level
  if (level < MIN_LOG_LEVEL) {
    return;
  }

  // In production, only log warnings and errors
  if (isProduction && level < LOG_LEVELS.WARN) {
    return;
  }

  const formattedArgs = formatLogMessage(levelName, message, data);
  consoleFn(...formattedArgs);
}

/**
 * Logger object with different log level methods
 */
const logger = {
  /**
   * Debug level logging - only in development
   * @param {string} message - Debug message
   * @param {any} data - Optional additional data
   */
  debug: (message, data) => {
    log(LOG_LEVELS.DEBUG, "🐞 DEBUG", console.log, message, data);
  },

  /**
   * Info level logging
   * @param {string} message - Info message
   * @param {any} data - Optional additional data
   */
  info: (message, data) => {
    log(LOG_LEVELS.INFO, "ℹ️ INFO", console.info, message, data);
  },

  /**
   * Warning level logging
   * @param {string} message - Warning message
   * @param {any} data - Optional additional data
   */
  warn: (message, data) => {
    log(LOG_LEVELS.WARN, "⚠️ WARN", console.warn, message, data);
  },

  /**
   * Error level logging - always logged
   * @param {string} message - Error message
   * @param {any} data - Optional additional data (often an Error object)
   */
  error: (message, data) => {
    log(LOG_LEVELS.ERROR, "⛔️ ERROR", console.error, message, data);
  },

  /**
   * Group logging for related messages
   * @param {string} groupName - Name of the log group
   * @param {Function} fn - Function to execute within the group
   */
  group: (groupName, fn) => {
    if (isDevelopment) {
      console.group(groupName);
      fn();
      console.groupEnd();
    } else {
      fn();
    }
  },

  /**
   * Log API requests/responses (development only)
   * @param {string} method - HTTP method
   * @param {string} url - Request URL
   * @param {any} data - Request/response data
   */
  api: (method, url, data) => {
    if (isDevelopment) {
      logger.debug(`API ${method.toUpperCase()} ${url}`, data);
    }
  },

  /**
   * Log user actions (development only)
   * @param {string} action - User action description
   * @param {any} data - Action data
   */
  userAction: (action, data) => {
    if (isDevelopment) {
      logger.info(`User Action: ${action}`, data);
    }
  },

  /**
   * Performance logging
   * @param {string} operation - Operation name
   * @param {number} duration - Duration in milliseconds
   */
  performance: (operation, duration) => {
    if (isDevelopment) {
      logger.debug(`Performance: ${operation} took ${duration}ms`);
    }
  },
};

export default logger;
