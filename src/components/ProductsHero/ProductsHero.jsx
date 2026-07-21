import styles from "./ProductsHero.module.css";
import Section from "../UI/Section";
import { Reveal } from "../../animations";
import useSettings from "../../hooks/useSettings";

function ProductsHero() {
  const { settings } = useSettings();

  return (
    <Section>
      <Reveal>
        <div className={styles.hero}>

          <span className={styles.tag}>
            {settings?.productsHeroTag || "✨ Premium Arabic Collection"}
          </span>

          <h1>{settings?.productsHeroTitle || "Explore Our Fragrances"}</h1>

          <p>
            {settings?.productsHeroDesc || "Discover premium Arabic perfumes, attars, and luxury scents crafted with quality, elegance and trust."}
          </p>

        </div>
      </Reveal>
    </Section>
  );
}

export default ProductsHero;