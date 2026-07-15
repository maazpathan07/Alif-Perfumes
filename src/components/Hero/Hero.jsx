


import styles from "./Hero.module.css";

import Section from "../UI/Section";
import Button from "../Button/Button";

import perfume from "../../assets/products/perfume-1.png";

import {
  Reveal,
  Floating,
} from "../../animations";
import useSettings from "../../hooks/useSettings";

function Hero() {
  const { settings } = useSettings();

  return (
    <Section>

      <div className={styles.hero}>

        {/* Left */}

        <Reveal direction="left">

          <div className={styles.left}>

            <span className={styles.tag}>
              ✨ {settings?.tagline || "Premium Arabic Fragrances"}
            </span>

            <h1>
              {settings?.heroTitle ? (
                settings.heroTitle.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < settings.heroTitle.split("\n").length - 1 && <br />}
                  </span>
                ))
              ) : (
                <>
                  Luxury Arabic
                  <br />
                  Perfumes
                </>
              )}
            </h1>

            <p>
              {settings?.heroDescription ||
                "Discover authentic Arabic fragrances crafted with premium ingredients. Experience elegance, confidence and long-lasting luxury in every spray."}
            </p>

            <div className={styles.buttons}>

              <Button to="/products">
                Shop Collection
              </Button>

              <Button to="/about" variant="secondary">
                Explore
              </Button>

            </div>

            <div className={styles.stats}>

              <Reveal delay={0.1}>

                <div>

                  <h3>{settings?.heroStat1Number || "500+"}</h3>

                  <span>
                    {settings?.heroStat1Label || "Premium Products"}
                  </span>

                </div>

              </Reveal>

              <Reveal delay={0.2}>

                <div>

                  <h3>{settings?.heroStat2Number || "5000+"}</h3>

                  <span>
                    {settings?.heroStat2Label || "Happy Customers"}
                  </span>

                </div>

              </Reveal>

              <Reveal delay={0.3}>

                <div>

                  <h3>{settings?.heroStat3Number || "100%"}</h3>

                  <span>
                    {settings?.heroStat3Label || "Original Fragrances"}
                  </span>

                </div>

              </Reveal>

            </div>

          </div>

        </Reveal>

        {/* Right */}

        <Reveal direction="right">

          <div className={styles.right}>

            <Floating>

              <div className={styles.imageBox}>

                <img
                  src={settings?.heroImage || perfume}
                  alt={settings?.businessName || "Luxury Arabic Perfume"}
                  className={styles.perfume}
                  loading="eager"
                />

              </div>

            </Floating>

          </div>

        </Reveal>

      </div>

    </Section>
  );
}

export default Hero;