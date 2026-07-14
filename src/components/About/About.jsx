import Section from "../UI/Section";
import Button from "../Button/Button";

import { MessageCircle } from "lucide-react";

import { Reveal, Hover } from "../../animations";

import useSettings from "../../hooks/useSettings";
import { openWhatsApp } from "../../utils/whatsapp";

import styles from "./About.module.css";

function About() {
  const { settings } = useSettings();

  const handleWhatsApp = async () => {
    await openWhatsApp(`Assalamu Alaikum,

I would like to know more about ${
      settings?.businessName || "your business"
    }.

Please share more details.

JazakAllahu Khair 🤍`);
  };

  return (
    <>
      {/* Hero */}

      <Section>

        <Reveal>

          <div className={styles.hero}>

            <span className={styles.tag}>

              ✨ About{" "}

              {settings?.businessName ||
                "Our Store"}

            </span>

            <h1>

              {settings?.tagline ||
                "Your Trusted Islamic Lifestyle Store"}

            </h1>

            <p>

              {settings?.footerDescription ||

                "We are committed to providing premium Islamic lifestyle products with honesty, quality and excellent customer service. Our goal is to make authentic products easily available through a simple WhatsApp ordering experience."}

            </p>

          </div>

        </Reveal>

      </Section>

      {/* Mission & Vision */}

      <Section>

        <div className={styles.grid}>

          <Reveal direction="left">

            <Hover>

              <div>

                <h2>Our Mission</h2>

                <p>

                  To provide premium Islamic lifestyle products with trust, honesty and affordability while delivering excellent customer support.

                </p>

              </div>

            </Hover>

          </Reveal>

          <Reveal direction="right">

            <Hover>

              <div>

                <h2>Our Vision</h2>

                <p>

                  To become one of India's most trusted Islamic lifestyle brands by offering authentic products and an outstanding customer experience.

                </p>

              </div>

            </Hover>

          </Reveal>

        </div>

      </Section>

      {/* Categories */}

      <Section>

        <Reveal>

          <div className={styles.values}>

            <h2>What You'll Find</h2>

            <div className={styles.cards}>

              <Hover>
                <div>🌿 Arabic Perfumes</div>
              </Hover>

              <Hover>
                <div>🧴 Attars</div>
              </Hover>

              <Hover>
                <div>📿 Tasbeeh</div>
              </Hover>

              <Hover>
                <div>🕌 Islamic Caps</div>
              </Hover>

              <Hover>
                <div>🌿 Miswak</div>
              </Hover>

              <Hover>
                <div>🎁 Gift Sets</div>
              </Hover>

              <Hover>
                <div>🧴 Bakhoor</div>
              </Hover>

              <Hover>
                <div>📖 Islamic Books</div>
              </Hover>

            </div>

          </div>

        </Reveal>

      </Section>

      {/* CTA */}

      <Section>

        <Reveal>

          <div className={styles.cta}>

            <h2>

              Contact{" "}

              {settings?.businessName ||
                "Us"}

            </h2>

            <p>

              Have questions about our products or services?

              Contact us directly on WhatsApp and we'll be happy to assist you.

            </p>

            <Button onClick={handleWhatsApp}>

              <MessageCircle
                size={18}
                strokeWidth={2.2}
              />

              &nbsp;

              Chat on WhatsApp

            </Button>

          </div>

        </Reveal>

      </Section>
    </>
  );
}

export default About;