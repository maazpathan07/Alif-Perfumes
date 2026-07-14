import { Inbox } from "lucide-react";

import styles from "./EmptyState.module.css";

function EmptyState({
  title = "No Data Found",
  subtitle = "There's nothing to display here.",
}) {
  return (
    <div className={styles.empty}>

      <div className={styles.icon}>
        <Inbox size={46} />
      </div>

      <h2>{title}</h2>

      <p>{subtitle}</p>

    </div>
  );
}

export default EmptyState;