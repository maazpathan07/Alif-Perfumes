import styles from "./ConfirmModal.module.css";

function ConfirmModal({
  open,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onCancel}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{title}</h2>

        <p>{message}</p>

        <div className={styles.actions}>

          <button
            className={styles.cancel}
            onClick={onCancel}
          >
            {cancelText}
          </button>

          <button
            className={styles.confirm}
            onClick={onConfirm}
          >
            {confirmText}
          </button>

        </div>

      </div>
    </div>
  );
}

export default ConfirmModal;