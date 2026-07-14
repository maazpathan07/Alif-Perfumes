import Container from "./Container";
import styles from "./Section.module.css";

function Section({
  children,
  id,
  className = "",
}) {
  return (
    <section
      id={id}
      className={`${styles.section} ${className}`.trim()}
    >
      <Container>
        {children}
      </Container>
    </section>
  );
}

export default Section;