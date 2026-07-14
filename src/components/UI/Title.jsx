import styles from "./Title.module.css";

function Title({ title, subtitle }) {
  return (
    <div className={styles.heading}>

      <h2>{title}</h2>

      {subtitle && <p>{subtitle}</p>}

    </div>
  );
}

export default Title;