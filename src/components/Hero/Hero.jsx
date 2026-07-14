import { Link } from "react-router-dom";

import styles from "./Hero.module.css";

import Section from "../UI/Section";
import Button from "../Button/Button";

import perfume from "../../assets/products/perfume-1.png";

import {
  Reveal,
  Floating,
} from "../../animations";

function Hero() {
  return (
    <Section>

      <div className={styles.hero}>

        {/* Left */}

        <Reveal direction="left">

          <div className={styles.left}>

            <span className={styles.tag}>
              ✨ Premium Arabic Fragrances
            </span>

            <h1>
              Luxury Arabic
              <br />
              Perfumes
            </h1>

            <p>
              Discover authentic Arabic fragrances crafted with premium
              ingredients. Experience elegance, confidence and
              long-lasting luxury in every spray.
            </p>

            <div className={styles.buttons}>

              <Link to="/products">

                <Button>
                  Shop Collection
                </Button>

              </Link>

              <Link to="/about">

                <Button variant="secondary">
                  Explore
                </Button>

              </Link>

            </div>

            <div className={styles.stats}>

              <Reveal delay={0.1}>

                <div>

                  <h3>500+</h3>

                  <span>
                    Premium Products
                  </span>

                </div>

              </Reveal>

              <Reveal delay={0.2}>

                <div>

                  <h3>5000+</h3>

                  <span>
                    Happy Customers
                  </span>

                </div>

              </Reveal>

              <Reveal delay={0.3}>

                <div>

                  <h3>100%</h3>

                  <span>
                    Original Fragrances
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
                  src={perfume}
                  alt="Luxury Arabic Perfume"
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