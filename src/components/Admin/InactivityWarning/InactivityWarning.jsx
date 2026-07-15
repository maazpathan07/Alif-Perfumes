import { Clock, LogOut } from "lucide-react";
import styles from "./InactivityWarning.module.css";

function fmt(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function InactivityWarning({ secondsLeft, onStay }) {
  return (
    <div className={styles.toast} role="alert" aria-live="assertive">

      <div className={styles.icon}>
        <Clock size={22} />
      </div>

      <div className={styles.body}>
        <p className={styles.title}>Session Expiring Soon</p>
        <p className={styles.sub}>
          Aap <strong>{fmt(secondsLeft)}</strong> me automatically logout ho
          jayenge.
        </p>
      </div>

      <div className={styles.actions}>
        <button className={styles.stayBtn} onClick={onStay}>
          Stay Logged In
        </button>
        <div className={styles.timer}>{fmt(secondsLeft)}</div>
      </div>

      <LogOut size={14} className={styles.logoutIcon} />

    </div>
  );
}

export default InactivityWarning;
