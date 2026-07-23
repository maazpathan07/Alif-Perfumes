import styles from "./LoadingSpinner.module.css";

function LoadingSpinner({
  text = "Loading...",
}) {
  return (
    <div
      className={styles.wrapper}
      role="status"
      aria-live="polite"
    >
      <div className={styles.spinner} aria-hidden="true"></div>
      <p>{text}</p>
    </div>
  );
}

export default LoadingSpinner;