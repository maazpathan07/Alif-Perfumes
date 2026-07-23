import { useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";

import styles from "./Modal.module.css";

function Modal({
  open,
  title,
  children,
  onClose,
}) {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  /* ── Escape key handler ── */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }

      /* ── Focus trap ── */
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input:not([disabled]), select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [onClose]
  );

  /* ── Save & restore focus, attach listeners ── */
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement;
      document.addEventListener("keydown", handleKeyDown);

      // Focus the modal container after mount
      requestAnimationFrame(() => {
        if (modalRef.current) {
          const firstFocusable = modalRef.current.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (firstFocusable) {
            firstFocusable.focus();
          } else {
            modalRef.current.focus();
          }
        }
      });
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (!open && previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={styles.modal}
        onClick={(e) =>
          e.stopPropagation()
        }
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={modalRef}
        tabIndex={-1}
      >
        <div className={styles.header}>

          <h2 id="modal-title">{title}</h2>

          <button
            onClick={onClose}
            className={styles.close}
            aria-label="Close dialog"
            type="button"
          >
            <X size={22} aria-hidden="true" />
          </button>

        </div>

        <div className={styles.body}>
          {children}
        </div>

      </div>
    </div>
  );
}

export default Modal;