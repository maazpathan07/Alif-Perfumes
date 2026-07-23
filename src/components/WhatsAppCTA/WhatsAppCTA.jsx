import { MessageCircle } from "lucide-react";

import Button from "../Button/Button";
import Section from "../UI/Section";

import styles from "./WhatsAppCTA.module.css";

import useSettings from "../../hooks/useSettings";

function WhatsAppCTA() {
  const { settings } = useSettings();

  const handleWhatsApp = () => {
    const number = settings?.whatsapp || "917874378413";
    const message = `🌿 Assalamu Alaikum

I would like to know more about your products.

Please help me choose the right fragrance.

JazakAllahu Khair 🤍`;

    window.open(
      `https://wa.me/${number}?text=${encodeURIComponent(
        message
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Section>

      <div className={styles.banner}>

        <span className={styles.tag}>
          {settings?.ctaTag || "Premium Customer Support"}
        </span>

        <h2>
          {settings?.ctaTitle || "Need Help Choosing Your Perfect Fragrance?"}
        </h2>

        <p>
          {settings?.ctaDesc || "Our fragrance experts are ready to help you choose the perfect Arabic perfume. Chat with us directly on WhatsApp for quick assistance."}
        </p>

        <Button onClick={handleWhatsApp}>
          <MessageCircle
            size={18}
            strokeWidth={2.2}
            aria-hidden="true"
          />
          Chat on WhatsApp
        </Button>

      </div>

    </Section>
  );
}

export default WhatsAppCTA;