import { X } from "lucide-react";

import styles from "./Modal.module.css";

function Modal({
  open,
  title,
  children,
  onClose,
}) {
  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
    >
      <div
        className={styles.modal}
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <div className={styles.header}>

          <h2>{title}</h2>

          <button
            onClick={onClose}
            className={styles.close}
          >
            <X size={22} />
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