import styles from "./ProductsHero.module.css";
import Section from "../UI/Section";
import { Reveal } from "../../animations";

function ProductsHero() {
  return (
    <Section>
      <Reveal>
        <div className={styles.hero}>

          <span className={styles.tag}>
            ✨ Premium Islamic Collection
          </span>

          <h1>Explore Our Products</h1>

          <p>
            Discover premium Islamic products including Arabic perfumes,
            attars, tasbeeh, Islamic caps, miswak, bakhoor, gift sets and
            much more. Quality products delivered with trust and an easy
            WhatsApp ordering experience.
          </p>

        </div>
      </Reveal>
    </Section>
  );
}

export default ProductsHero;