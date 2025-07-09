import { useState, useEffect, useCallback, useRef } from "react";

export default function useDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

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

  return {
    isOpen,
    keyboardNavigation,
    dropdownRef,
    triggerRef,
    open,
    close,
    toggle,
    handleKeyboardOpen,
  };
}
