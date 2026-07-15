import { Link } from "react-router-dom";
import styles from "./Button.module.css";

function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  to,
}) {
  const classes = `${styles.button} ${styles[variant]} ${className}`;

  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        style={{ textDecoration: "none" }}
      >
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={classes}
    >
      <span>{children}</span>
    </button>
  );
}


export default Button;