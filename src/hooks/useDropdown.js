import { useState, useEffect, useCallback, useRef } from "react";

export default function useDropdown(options = {}) {
  const { showOverlay = false } = options;
  const [isOpen, setIsOpen] = useState(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  // Manage overlay visibility when showOverlay option is enabled
  useEffect(() => {
    if (showOverlay) {
      if (isOpen) {
        setOverlayVisible(true);
      } else if (overlayVisible) {
        // Wait for fade-out before unmounting
        const timeout = setTimeout(() => setOverlayVisible(false), 300);
        return () => clearTimeout(timeout);
      }
    }
  }, [isOpen, overlayVisible, showOverlay]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        triggerRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setKeyboardNavigation(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        setKeyboardNavigation(false);
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setKeyboardNavigation(false);
  }, []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleKeyboardOpen = useCallback(() => {
    setKeyboardNavigation(true);
    setIsOpen(true);
  }, []);

  // Handle overlay click/keyboard interactions
  const handleOverlayInteraction = useCallback(() => {
    setIsOpen(false);
    setKeyboardNavigation(false);
  }, []);

  const handleOverlayKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setKeyboardNavigation(false);
      // Return focus to trigger element
      triggerRef.current?.focus();
    }
  }, []);

  return {
    isOpen,
    keyboardNavigation,
    dropdownRef,
    triggerRef,
    open,
    close,
    toggle,
    handleKeyboardOpen,
    // Overlay-related returns
    overlayVisible,
    handleOverlayInteraction,
    handleOverlayKeyDown,
  };
}
