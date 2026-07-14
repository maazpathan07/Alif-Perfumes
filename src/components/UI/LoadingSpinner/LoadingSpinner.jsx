import styles from "./LoadingSpinner.module.css";

function LoadingSpinner({
  text = "Loading...",
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}></div>
      <p>{text}</p>
    </div>
  );
}

export default LoadingSpinner;