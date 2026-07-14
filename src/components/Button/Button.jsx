import styles from "./Button.module.css";

function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={`${styles.button} ${styles[variant]} ${className}`}
    >
      <span>{children}</span>
    </button>
  );
}

export default Button;