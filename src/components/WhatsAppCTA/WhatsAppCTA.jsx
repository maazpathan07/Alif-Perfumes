import { MessageCircle } from "lucide-react";

import Button from "../Button/Button";
import Section from "../UI/Section";

import styles from "./WhatsAppCTA.module.css";

const WHATSAPP_NUMBER = "917874378413";

function WhatsAppCTA() {
  const handleWhatsApp = () => {
    const message = `🌿 Assalamu Alaikum

I would like to know more about your products.

Please help me choose the right fragrance.

JazakAllahu Khair 🤍`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
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
          Premium Customer Support
        </span>

        <h2>
          Need Help Choosing Your Perfect Fragrance?
        </h2>

        <p>
          Our fragrance experts are ready to help you choose the perfect Arabic perfume. Chat with us directly on WhatsApp for quick assistance.
        </p>

        <Button onClick={handleWhatsApp}>
          <MessageCircle
            size={18}
            strokeWidth={2.2}
          />
          Chat on WhatsApp
        </Button>

      </div>

    </Section>
  );
}

export default WhatsAppCTA;