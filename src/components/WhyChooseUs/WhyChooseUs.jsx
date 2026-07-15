import { useMemo } from "react";

import {
  Gem,
  Sparkles,
  BadgeCheck,
  MessageCircle,
} from "lucide-react";

import Section from "../UI/Section";
import Title from "../UI/Title";

import { Reveal, Hover } from "../../animations";

import styles from "./WhyChooseUs.module.css";

import useSettings from "../../hooks/useSettings";

function WhyChooseUs() {
  const { settings } = useSettings();

  const features = useMemo(
    () => [
      {
        icon: (
          <Gem
            size={34}
            strokeWidth={2}
          />
        ),
        title: settings?.wcuCard1Title || "Premium Quality",
        text: settings?.wcuCard1Desc || "Luxury fragrances crafted using carefully selected premium ingredients.",
      },

      {
        icon: (
          <Sparkles
            size={34}
            strokeWidth={2}
          />
        ),
        title: settings?.wcuCard2Title || "Long Lasting",
        text: settings?.wcuCard2Desc || "Rich fragrances designed to stay fresh and elegant throughout the day.",
      },

      {
        icon: (
          <BadgeCheck
            size={34}
            strokeWidth={2}
          />
        ),
        title: settings?.wcuCard3Title || "100% Original",
        text: settings?.wcuCard3Desc || "Authentic products sourced directly with complete quality assurance.",
      },

      {
        icon: (
          <MessageCircle
            size={34}
            strokeWidth={2}
          />
        ),
        title: settings?.wcuCard4Title || "WhatsApp Support",
        text: settings?.wcuCard4Desc || "Quick ordering and instant customer support directly on WhatsApp.",
      },
    ],
    [settings]
  );

  return (
    <Section>

      <Title
        title={settings?.wcuTitle || "Why Choose Alif Perfumes"}
        subtitle={settings?.wcuSubtitle || "Premium fragrances crafted for elegance, luxury and confidence."}
      />

      <div className={styles.grid}>

        {features.map((item, index) => (
          <Reveal
            key={item.title}
            delay={index * 0.1}
          >

            <Hover>

              <div className={styles.card}>

                <div className={styles.icon}>
                  {item.icon}
                </div>

                <h3>{item.title}</h3>

                <p>{item.text}</p>

              </div>

            </Hover>

          </Reveal>
        ))}

      </div>

    </Section>
  );
}

export default WhyChooseUs;